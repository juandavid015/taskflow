"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Document from "./document";
import { Database, Tables } from "@/lib/types/database.types";
import { useState } from "react";
import DocumentList from "./list";
import { FileText, ListCollapse, X, Plus } from "lucide-react";
import { createDocument } from "./actions";
import { deleteDocument } from "./actions";

interface ContentProps {
  documents: Tables<'documents'>[]
  documentTypes: Tables<'document_types'>[]
}

interface Tab {
  id: string;
  name: string;
  document: Database["public"]["Tables"]["documents"]["Row"] | null;
}

function Content({ documents, documentTypes }: ContentProps) {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "list", name: "List", document: null },
  ]);
  const [activeTab, setActiveTab] = useState<string>("list");
  const [docs, setDocs] = useState<Tables<'documents'>[]>(documents);

  const handleSelectDocument = (
    document: Database["public"]["Tables"]["documents"]["Row"]
  ) => {
    const existingTab = tabs.find((tab) => tab.document?.id === document.id);
    if (existingTab) {
      setActiveTab(existingTab.id);
      return;
    }

    const newTab: Tab = {
      id: document.id,
      name: document.title || "Untitled",
      document,
    };

    setTabs((prev) => [...prev, newTab]);
    setActiveTab(newTab.id);
  };

  const handleNewDocument = async () => {
    try {
      const newDoc = await createDocument("New Document", "", documentTypes[0].id);
      const newTab: Tab = {
        id: newDoc.id,
        name: newDoc.title || "Untitled",
        document: newDoc,
      };
      setTabs((prev) => [...prev, newTab]);
      setActiveTab(newTab.id);
    } catch (error) {
      console.error("Failed to create new document:", error);
    }
  };

  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (tabId === "list") return; // Prevent closing list tab

    setTabs((prev) => prev.filter((tab) => tab.id !== tabId));
    if (activeTab === tabId) {
      setActiveTab("list");
    }
  };

  const handleDeleteDocument = async (document: Tables<'documents'>) => {
    try {
      await deleteDocument(document.id);
      setDocs(prev => prev.filter(doc => doc.id !== document.id));
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex flex-col gap-0 w-full h-full"
    >
      <div className="border-b border-white/10 flex justify-center">
        <TabsList className="bg-transparent gap-2 p-2 h-fit border-b border-white/10 rounded-md overflow-x-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={
                "data-[state=active]:bg-yellow-green data-[state=active]:text-dark-gray rounded-sm flex items-center gap-2 " +
                "rounded-sm bg-[#272727] cursor-pointer hover:bg-[#272727]/50"
              }
            >
              {tab.id === "list" ? (
                <ListCollapse className="w-4 h-4" />
              ) : (
                <FileText className="w-4 h-4" />
              )}
              {tab.name}
              {tab.id !== "list" && (
                <span
                  role="button"
                  tabIndex={0}
                  className="w-fit h-fit hover:text-red-500 inline-flex items-center justify-center cursor-pointer"
                  onClick={(e) => handleCloseTab(tab.id, e)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleCloseTab(tab.id, e as unknown as React.MouseEvent);
                    }
                  }}
                >
                  <X className="w-4 h-4" />
                </span>
              )}
            </TabsTrigger>
          ))}
          <span
            role="button"
            tabIndex={0}
            className="w-8 h-8 hover:text-yellow-green flex items-center justify-center cursor-pointer rounded-sm bg-[#272727]"
            onClick={handleNewDocument}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleNewDocument();
              }
            }}
          >
            <Plus className="w-4 h-4" />
          </span>
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          {tab.id === "list" ? (
            <DocumentList
              documents={docs}
              onSelect={handleSelectDocument}
              onDelete={handleDeleteDocument}
              documentTypes={documentTypes}
              onCreate={(newDoc) => {
                const newTab = {
                  id: newDoc.id,
                  name: newDoc.title || "Untitled",
                  document: newDoc,
                };
                setTabs((prev) => [...prev, newTab]);
                setActiveTab(newTab.id);
                setDocs((prev) => [...prev, newDoc]);
              }}
            />
          ) : (
            <Document document={tab.document} />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default Content;
