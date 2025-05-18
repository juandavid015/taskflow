"use client";

import { useOrganization } from "@clerk/nextjs";
import { OrganizationCustomRoleKey } from "@clerk/types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AddMemberIcon } from "../../../../../components/icons";
import FormHeader from "../../../../../components/forms/form-header";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { EmailTagsInput } from "./tags-input";
import { Notification, NotificationType } from "../../../../../components/notifications/notification";

const formSchema = z.object({
  emails: z
    .array(z.string().email({ message: "Please enter a valid email address." }))
    .min(1, { message: "Please enter at least one email address." }),
  role: z.enum(["org:admin", "org:member"], {
    required_error: "Please select a role.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

type NotificationState = {
  open: boolean;
  message: string;
  title: string;
  type: NotificationType | null;
};

// Form to invite new members to the organization.
const AddMembersForm = () => {
  const { organization, invitations } = useOrganization();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { emails: [], role: "org:member" },
  });

  const [notification, setNotification] = React.useState<NotificationState>({
    open: false,
    message: "",
    title: "",
    type: null,
  });

  const inviteMembersMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      await organization?.inviteMembers({
        emailAddresses: values.emails,
        role: values.role as OrganizationCustomRoleKey,
      });
    },
    onSuccess: () => {
      setNotification({
        open: true,
        message: "Invitations have been sent to the provided email addresses.",
        title: "Members invited successfully!",
        type: NotificationType.Success,
      });
    },
    onError: (error) => {
      console.error(error);
      setNotification({
        open: true,
        message: error.message,
        title: "Failed to invite members!",
        type: NotificationType.Error,
      });
    },
    onSettled: () => {
      form.reset();
      invitations?.revalidate?.();
    },
  });

  const onSubmit = async (values: FormValues) => {
    await inviteMembersMutation.mutateAsync(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg w-full p-8 flex flex-col gap-4 bg-dark-coal text-white rounded-lg"
      >
        <FormHeader
          title="Add Members"
          description="Collaborate with more members by adding them to your workspace."
          icon={<AddMemberIcon className="w-6 h-6 fill-white" />}
        />

        <FormField
          control={form.control}
          name="emails"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Emails</FormLabel>
              <FormDescription>
                Enter or paste one or more email addresses, separated by spaces
                or commas.
              </FormDescription>
              <FormControl>
                <EmailTagsInput
                  value={field.value}
                  onChange={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="min-w-[120px]">
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || "org:member"}
                >
                  <SelectTrigger className="w-full bg-dark-gray">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-gray text-white">
                    <SelectItem value="org:admin">Admin</SelectItem>
                    <SelectItem value="org:member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {notification.open && (
          <Notification
            message={notification.message}
            title={notification.title}
            onClose={() =>
              setNotification({
                open: false,
                message: "",
                title: "",
                type: null,
              })
            }
            type={notification.type || NotificationType.Success}
          />
        )}
        <Button
          variant="ghost"
          type="submit"
          disabled={form.formState.isSubmitting}
          className="h-10 mt-6 border border-white/30 cursor-pointer"
        >
          {form.formState.isSubmitting ? "Inviting..." : "Invite"}
        </Button>
      </form>
    </Form>
  );
};

export default AddMembersForm;
