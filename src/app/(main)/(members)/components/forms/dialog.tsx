"use client";

import { useOrganization } from "@clerk/nextjs";
import { MultiAvatar } from "@/components/ui/multi-avatar";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import AddMembersForm from "./add-members";

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
      <DialogTitle className="sr-only">Members</DialogTitle>
      <DialogContent className="max-w-lg w-full bg-dark-gray border-none outline-none p-0">
        <AddMembersForm />
      </DialogContent>
    </Dialog>
  );
}

export default MembersDialog;
