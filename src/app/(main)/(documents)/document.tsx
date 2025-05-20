"use client";

import { Database } from "../../../lib/types/database.types";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Eye } from "lucide-react";
import { isDefaultDocument, isDesignDocument } from "@/lib/types/types";
import { DefaultDocumentView } from "@/components/documents/default-view";
import { DesignDocumentView } from "@/components/documents/design-view";

type DocumentProps = {
  document: Database["public"]["Tables"]["documents"]["Row"] | undefined | null;
};

export default function Document({ document }: DocumentProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  if (!document) return null;

  return (
    <Tabs
      value={activeTab}
      onValueChange={(v) => setActiveTab(v as "edit" | "preview")}
      className="p-4"
    >
      <TabsList className="bg-[#272727] p-2 w-fit h-fit">
        <TabsTrigger
          value="edit"
          className="data-[state=active]:bg-[#373737] data-[state=active]:text-white rounded-sm flex items-center gap-2 rounded-sm bg-[#272727] cursor-pointer hover:bg-[#272727]/50"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </TabsTrigger>
        <TabsTrigger
          value="preview"
          className="data-[state=active]:bg-[#373737] data-[state=active]:text-white rounded-sm flex items-center gap-2 rounded-sm bg-[#272727] cursor-pointer hover:bg-[#272727]/50"
        >
          <Eye className="w-4 h-4" />
          Preview
        </TabsTrigger>
      </TabsList>
      {isDefaultDocument(document) && (
        <DefaultDocumentView document={document} />
      )}
      {isDesignDocument(document) && <DesignDocumentView document={document} />}
    </Tabs>
  );
}
