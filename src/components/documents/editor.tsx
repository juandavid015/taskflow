interface DocumentEditorProps {
  content: string;
  onContentChange: (value: string) => void;
  onSave: () => void;
}

export function DocumentEditor({
  content,
  onContentChange,
  onSave,
}: DocumentEditorProps) {
  return (
    <textarea
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
      onBlur={onSave}
      placeholder="Write your markdown here..."
      className="w-full h-[calc(100vh-300px)] bg-transparent border-none outline-none resize-none"
    />
  );
}
