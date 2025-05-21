"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tables } from "@/lib/types/database.types";
import FormHeader from "@/components/forms/form-header";
import { Plus } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { createDocument } from "./actions";
import { useRouter } from "next/navigation";

interface CreateDocumentDialogProps {
  documentTypes: Tables<"document_types">[];
  trigger?: React.ReactNode;
  onCreate?: (doc: Tables<"documents">) => void;
}

export default function CreateDocumentDialog({
  documentTypes,
  trigger,
  onCreate,
}: CreateDocumentDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedTypeId, setSelectedTypeId] = useState<string>(
    documentTypes[0]?.id || ""
  );
  const router = useRouter();

  const handleCreate = async () => {
    const selectedType = documentTypes.find((t) => t.id === selectedTypeId);
    if (!selectedType) return;
    let content: unknown = "";
    if (selectedType.name === "Design") {
      content = {
        content: "",
        header: { coverImage: null },
        sidebar: { content: [] },
      };
    } else {
      content = "";
    }
    try {
      const contentString = typeof content === "string" ? content : JSON.stringify(content);
      const newDoc = await createDocument("", contentString, selectedType.id);
      setOpen(false);
      if (onCreate) {
        onCreate(newDoc);
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to create document:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="ghost" className="bg-yellow-green text-dark-gray font-bold hover:bg-yellow-green/90 cursor-pointer rounded-sm">Create Document</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-md w-full bg-dark-gray border-none outline-none p-8">
        <DialogTitle className="sr-only">Create New Document</DialogTitle>
        <FormHeader
          title="Create New Document"
          description="Select a document type to start with. You can edit the title and content later."
          icon={<Plus className="w-4 h-4" />}
        />
        <div className="flex flex-col gap-4 p-6">
          <label htmlFor="doc-type" className="text-white font-medium mb-1">
            Document Type
          </label>
          <Select value={selectedTypeId} onValueChange={setSelectedTypeId}>
            <SelectTrigger className="bg-[#232323] text-white border border-white/10">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent className="bg-[#232323] text-white">
              {documentTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedTypeId && (
            <div className="text-xs text-white/60 mt-2">
              {documentTypes.find((t) => t.id === selectedTypeId)?.description}
            </div>
          )}
        </div>
        <DialogFooter className="p-6 pt-0">
          <DialogClose asChild>
            <Button variant="ghost" className="border border-white/20 cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleCreate}
            className="bg-yellow-green text-dark-gray font-bold hover:bg-yellow-green/90 cursor-pointer"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
