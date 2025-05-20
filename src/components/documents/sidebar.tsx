import { X } from "lucide-react";
import { FileUpload } from "@/components/ui/file-upload";

interface DocumentSidebarProps {
  files: { url: string; type: string }[];
  isEditable?: boolean;
  onFileAdd?: (url: string, type: string) => void;
  onFileRemove?: (index: number) => void;
  documentId: string;
}

export function DocumentSidebar({
  files,
  isEditable,
  onFileAdd,
  onFileRemove,
  documentId,
}: DocumentSidebarProps) {
  return (
    <div className="border-l border-white/10 p-8 flex flex-col gap-6 shrink-0 max-w-3xs h-full">
      {files.map((file, index) => (
        <div key={index} className="relative">
          {file.type === "image" ? (
            <img
              src={file.url}
              alt={`Sidebar file ${index + 1}`}
              className="object-cover w-full h-full rounded-sm"
            />
          ) : file.type === "video" ? (
            <video
              src={file.url}
              controls
              className="object-cover w-full h-full rounded-sm"
            />
          ) : null}
          {isEditable && onFileRemove && (
            <button
              onClick={() => onFileRemove(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      ))}
      {isEditable && onFileAdd && (
        <FileUpload
          bucketName="documents"
          path={`${documentId}/files`}
          onUploadComplete={onFileAdd}
          className="w-full h-32"
        />
      )}
    </div>
  );
} 