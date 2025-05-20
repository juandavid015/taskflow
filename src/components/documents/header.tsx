import { ImageUpload } from "@/components/ui/image-upload";

interface DocumentHeaderProps {
  title: string;
  coverImage?: { url: string; alt: string } | null;
  isEditable?: boolean;
  onTitleChange?: (value: string) => void;
  onSave?: () => void;
  onCoverImageChange?: (url: string) => void;
  onCoverImageRemove?: () => void;
  documentId: string;
  isDesignDocument?: boolean;
}

export function DocumentHeader({
  title,
  coverImage,
  isEditable,
  onTitleChange,
  onSave,
  onCoverImageChange,
  onCoverImageRemove,
  documentId,
  isDesignDocument,
}: DocumentHeaderProps) {
  return (
    <div className="flex gap-4 items-center">
      {isEditable && isDesignDocument ? (
        <ImageUpload
          bucketName="documents"
          path={`${documentId}/cover`}
          onUploadComplete={(url) => onCoverImageChange?.(url)}
          onRemove={onCoverImageRemove}
          currentImageUrl={coverImage?.url}
          className="w-16 h-16"
        />
      ) : (
        coverImage &&
        isDesignDocument && (
          <img
            src={coverImage.url}
            alt={coverImage.alt}
            className="w-16 h-16 object-cover rounded-sm"
          />
        )
      )}
      {isEditable ? (
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange?.(e.target.value)}
          onBlur={onSave}
          placeholder="Document title"
          className="text-3xl font-bold bg-transparent border-none outline-none"
        />
      ) : (
        <h1 className="text-3xl font-bold">{title}</h1>
      )}
    </div>
  );
}
