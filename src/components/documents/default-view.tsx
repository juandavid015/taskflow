'use client'; 
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { TabsContent } from "@/components/ui/tabs";
import { DefaultDocument } from "@/lib/types/types";
import { updateDocument } from "@/app/(main)/(documents)/actions";
import { DocumentHeader } from "./header";
import { DocumentEditor } from "./editor";

interface DefaultDocumentViewProps {
  document: DefaultDocument;
}

export function DefaultDocumentView({ document }: DefaultDocumentViewProps) {
  const [title, setTitle] = useState(document.title);
  const [content, setContent] = useState(document.content || "");

  const handleSave = async () => {
    try {
      await updateDocument(document.id, title, content);
    } catch (error) {
      console.error("Failed to save document:", error);
    }
  };

  return (
    <>
      <TabsContent value="edit" className="flex flex-col gap-6">
        <DocumentHeader
          documentId={document.id}
          title={title}
          isEditable
          onTitleChange={setTitle}
          onSave={handleSave}
          isDesignDocument={false}
        />
        <DocumentEditor
          content={content}
          onContentChange={setContent}
          onSave={handleSave}
        />
      </TabsContent>
      <TabsContent value="preview" className="flex flex-col gap-6">
        <DocumentHeader
          title={title}
          documentId={document.id}
          isDesignDocument={false}
        />
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </TabsContent>
    </>
  );
}
