import { Tables } from "@/lib/types/database.types";
import { ExternalLink, Trash2 } from "lucide-react";
import { isDefaultDocument, isDesignDocument } from "@/lib/types/types";

interface ListProps {
  documents: Tables<"documents">[];
  onSelect: (document: Tables<"documents">) => void;
  documentTypes: Tables<'document_types'>[];
  onDelete: (document: Tables<"documents">) => void;
}

// Color mapping for document types
const typeColors: Record<string, string> = {
  Design: '#6366f1', // Indigo-500
  Default: '#22d3ee', // Cyan-400
  // Add more types as needed
};

function DocumentList({ documents, onSelect, documentTypes, onDelete }: ListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full h-full p-8">
      {documents.map((document) => {
        const content = isDefaultDocument(document)
          ? document.content
          : isDesignDocument(document)
          ? document.content?.content
          : "";
        const type = documentTypes.find((t) => t.id === document.type_id);
        const typeName = type?.name || "Unknown";
        return (
          <div
            key={document.id}
            className="group relative flex flex-col gap-2 bg-[#181818] border border-white/10 p-5 pr-12 rounded-lg shadow-sm transition hover:shadow-lg hover:border-primary cursor-pointer h-full"
            onClick={() => onSelect(document)}
          >
            {/* Vertical Tag */}
            <div className="absolute bottom-0 right-0 h-full w-8 flex items-end justify-center">
              <span
                className="text-white text-xs font-bold px-2 py-1 rounded-l-lg transform -rotate-90 whitespace-nowrap"
                style={{
                  background: typeColors[typeName] || '#a3a3a3', // Gray fallback
                  letterSpacing: '0.1em',
                }}
              >
                {typeName}
              </span>
            </div>
            {/* Card Content */}
            <div className="flex justify-between items-center gap-2">
              <h4 className="text-base font-semibold line-clamp-1">
                {document.title}
              </h4>
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-white group-hover:inline hidden" />
                <Trash2
                  className="w-4 h-4 text-red-400 hover:text-red-600 group-hover:inline hidden cursor-pointer"
                  onClick={e => {
                    e.stopPropagation();
                    onDelete(document);
                  }}
                />
              </div>
            </div>
            <p className="text-xs text-white/70 line-clamp-2">{content}</p>
          </div>
        );
      })}
    </div>
  );
}

export default DocumentList;
