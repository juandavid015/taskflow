"use client";

import { useOrganization } from "@clerk/nextjs";
import { useState } from "react";
import { MultiAvatar } from "@/components/ui/multi-avatar";
import AddMembersForm from "./add-members";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function MembersDialog() {
  const { memberships } = useOrganization({
    memberships: {
      keepPreviousData: true,
    },
  });
  const [open, setOpen] = useState(false);

  const avatars =
    memberships?.data?.map((member) => {
      return {
        id: member.publicUserData?.userId ?? "",
        username: `${member.publicUserData?.firstName} ${member.publicUserData?.lastName}`,
        imageUrl: member.publicUserData?.imageUrl,
      };
    }) ?? [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MultiAvatar avatars={avatars} onAdd={() => setOpen(true)} />
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full p-0 border-none outline-none">
        <AddMembersForm />
      </DialogContent>
    </Dialog>
  );
}

export default MembersDialog;
