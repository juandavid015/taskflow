"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { TabsContent } from "@/components/ui/tabs";
import { DesignDocument } from "@/lib/types/types";
import { updateDocument } from "@/app/(main)/(documents)/actions";
import { DocumentHeader } from "./header";
import { DocumentEditor } from "./editor";
import { DocumentSidebar } from "./sidebar";

interface DesignDocumentViewProps {
  document: DesignDocument;
}

export function DesignDocumentView({ document }: DesignDocumentViewProps) {
  const [title, setTitle] = useState(document.title);
  const [content, setContent] = useState(document.content?.content || "");
  const [coverImage, setCoverImage] = useState<{
    url: string;
    alt: string;
  } | null>(document.content?.header?.coverImage || null);
  const [sidebarFiles, setSidebarFiles] = useState<
    { url: string; type: string }[]
  >(document.content?.sidebar?.content || []);

  const handleSave = async () => {
    try {
      const updatedContent = {
        content,
        header: {
          coverImage,
        },
        sidebar: {
          content: sidebarFiles,
        },
      };
      await updateDocument(document.id, title, JSON.stringify(updatedContent));
    } catch (error) {
      console.error("Failed to save document:", error);
    }
  };

  const handleCoverImageChange = (url: string) => {
    setCoverImage({ url, alt: "Document cover image" });
    handleSave();
  };

  const handleCoverImageRemove = () => {
    setCoverImage(null);
    handleSave();
  };

  const handleSidebarFileAdd = (url: string, type: string) => {
    setSidebarFiles((prev) => [...prev, { url, type }]);
    handleSave();
  };

  const handleSidebarFileRemove = (index: number) => {
    setSidebarFiles((prev) => prev.filter((_, i) => i !== index));
    handleSave();
  };

  return (
    <>
      <TabsContent value="edit" className="flex gap-16 w-full h-full">
        <div className="flex flex-col gap-6 w-full h-full">
          <DocumentHeader
            title={title}
            coverImage={coverImage}
            isEditable
            onTitleChange={setTitle}
            onSave={handleSave}
            onCoverImageChange={handleCoverImageChange}
            onCoverImageRemove={handleCoverImageRemove}
            documentId={document.id}
            isDesignDocument={true}
          />
          <DocumentEditor
            content={content}
            onContentChange={setContent}
            onSave={handleSave}
          />
        </div>
        <DocumentSidebar
          files={sidebarFiles}
          isEditable
          onFileAdd={handleSidebarFileAdd}
          onFileRemove={handleSidebarFileRemove}
          documentId={document.id}
        />
      </TabsContent>
      <TabsContent value="preview" className="flex gap-16 w-full h-full">
        <div className="flex flex-col gap-6 w-full h-full">
          <DocumentHeader
            title={title}
            coverImage={coverImage}
            documentId={document.id}
            isDesignDocument={true}
          />
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
        <DocumentSidebar files={sidebarFiles} documentId={document.id} />
      </TabsContent>
    </>
  );
}
