import { useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { useSupabaseClient } from "@/hooks/use-supabase-client";

interface ImageUploadProps {
  bucketName: string;
  path: string;
  onUploadComplete: (url: string) => void;
  onRemove?: () => void;
  currentImageUrl?: string;
  className?: string;
}

export function ImageUpload({
  bucketName,
  path,
  onUploadComplete,
  onRemove,
  currentImageUrl,
  className = "",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const client = useSupabaseClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { error: uploadError } = await client.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = client.storage.from(bucketName).getPublicUrl(filePath);

      onUploadComplete(publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {currentImageUrl ? (
        <div className="relative group w-full h-full">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={isUploading}
              className="hidden"
            />
            <img
              src={currentImageUrl}
              alt="Uploaded content"
              className="w-full h-full object-cover rounded-sm"
            />
          </label>
          {onRemove && (
            <button
              onClick={onRemove}
              className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <X className="w-2 h-2 text-white" />
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
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-2 p-4">
            <ImagePlus className="w-6 h-6" />
            <span className="text-sm">Upload image</span>
          </div>
        </label>
      )}
    </div>
  );
}
