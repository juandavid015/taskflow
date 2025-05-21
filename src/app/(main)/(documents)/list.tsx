import { Tables } from "@/lib/types/database.types";
import { ExternalLink, Trash } from "lucide-react";
import { isDefaultDocument, isDesignDocument } from "@/lib/types/types";
import EmptyState from "@/components/ui/empty-state";
import CreateDocumentDialog from "./create-document-dialog";

interface ListProps {
  documents: Tables<"documents">[];
  onSelect: (document: Tables<"documents">) => void;
  onDelete: (document: Tables<"documents">) => void;
  documentTypes: Tables<"document_types">[];
  onCreate?: (newDoc: Tables<'documents'>) => void;
}

function DocumentList({ documents, onSelect, onDelete, documentTypes, onCreate }: ListProps) {
  const typeStyles = (type: string) => {
    switch (type) {
      case "Design":
        return "text-indigo-500";
      case "Default":
        return " text-cyan-400";
    }
  };
  const getTypeName = (typeId: string) => {
    return documentTypes.find((t) => t.id === typeId)?.name || "";
  };
  return (
    documents.length === 0 ? (
      <EmptyState
        title="No documents"
        message="You haven't created any documents yet."
        actionButton={
          <CreateDocumentDialog documentTypes={documentTypes} onCreate={onCreate} />
        }
        className="h-full"
      />
    ) : (
      <div className="grid gap-6 w-full p-8 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
        {documents.map((document) => {
          const content = isDefaultDocument(document)
            ? document.content
            : isDesignDocument(document)
            ? document.content?.content
            : "";

          return (
            <div
              key={document.id}
              className="group relative flex flex-col gap-2 bg-[#181818] border border-white/10 p-4 rounded-lg  transition  hover:border-primary cursor-pointer min-h-[80x]"
              onClick={() => onSelect(document)}
            >
              {/* Card Content */}
              <div className="flex justify-between items-center gap-2">
                <h4 className="text-sm font-semibold line-clamp-1 ">
                  {document.title}
                </h4>

                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-white group-hover:inline hidden" />
                  <Trash
                    className="w-4 h-4 hover:text-red-600 group-hover:inline hidden cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(document);
                    }}
                  />
                </div>
              </div>
              <p className="text-xs text-white/70 line-clamp-2">{content}</p>
              <span className={`text-xs w-fit mt-auto ${typeStyles(getTypeName(document.type_id) || "")}`}>
                {getTypeName(document.type_id)}
              </span>
            </div>
          );
        })}
      </div>
    )
  );
}

export default DocumentList;
