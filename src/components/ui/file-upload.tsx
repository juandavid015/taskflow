import { useState } from "react";
import { FilePlus, X, FileText, Image, Video, File } from "lucide-react";
import { useSupabaseClient } from "@/hooks/use-supabase-client";

interface FileUploadProps {
  bucketName: string;
  path: string;
  onUploadComplete: (url: string, type: string) => void;
  onRemove?: () => void;
  currentFile?: {
    url: string;
    type: string;
  };
  className?: string;
}

const FILE_ICONS = {
  'image': Image,
  'video': Video,
  'text': FileText,
  'default': File
};

const PREVIEWABLE_TYPES = ['image', 'video'];

export function FileUpload({
  bucketName,
  path,
  onUploadComplete,
  onRemove,
  currentFile,
  className = "",
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const client = useSupabaseClient();

  const getFileType = (file: File): string => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('text/')) return 'text';
    return 'default';
  };

  const getFileIcon = (type: string) => {
    return FILE_ICONS[type as keyof typeof FILE_ICONS] || FILE_ICONS.default;
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;
      const fileType = getFileType(file);

      const { error: uploadError } = await client.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = client.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      onUploadComplete(publicUrl, fileType);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const renderPreview = () => {
    if (!currentFile) return null;

    if (PREVIEWABLE_TYPES.includes(currentFile.type)) {
      if (currentFile.type === 'image') {
        return (
          <img
            src={currentFile.url}
            alt="Uploaded content"
            className="w-full h-full object-cover rounded-sm"
          />
        );
      }

      if (currentFile.type === 'video') {
        return (
          <video
            src={currentFile.url}
            controls
            className="w-full h-full object-cover rounded-sm"
          />
        );
      }
    }

    const Icon = getFileIcon(currentFile.type);
    return (
      <div className="flex items-center justify-center w-full h-full bg-[#272727] rounded-sm">
        <Icon className="w-8 h-8" />
      </div>
    );
  };

  return (
    <div className={`relative ${className}`}>
      {currentFile ? (
        <div className="relative group">
          {renderPreview()}
          {onRemove && (
            <button
              onClick={onRemove}
              className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      ) : (
        <label
          className={`h-full w-full flex items-center justify-center border-2 border-dashed border-white/10 rounded-sm cursor-pointer hover:border-white/20 transition-colors ${
            isUploading ? "opacity-50" : ""
          }`}
        >
          <input
            type="file"
            onChange={handleUpload}
            disabled={isUploading}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-2 p-4">
            <FilePlus className="w-6 h-6" />
            <span className="text-sm">Upload file</span>
          </div>
        </label>
      )}
    </div>
  );
} 