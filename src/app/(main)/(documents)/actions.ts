"use server";

import { createServerSupabaseClient } from "@/app/server/client";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createDocument(title: string, content: string, typeId: string) {
  const client = createServerSupabaseClient();
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await client
    .from("documents")
    .insert({
      title,
      content,
      owner_id: user.id,
      type_id: typeId
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  revalidatePath("/");
  return data;
}

export async function updateDocument(
  id: string,
  title: string,
  content: string
) {
  const client = createServerSupabaseClient();

  const { error } = await client
    .from("documents")
    .update({
      title,
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/");
  return { success: true };
}

export async function deleteDocument(id: string) {
  const client = createServerSupabaseClient();

  // First, get the document to check if it has images
  const { data: document } = await client
    .from("documents")
    .select("content")
    .eq("id", id)
    .single();

  if (document?.content) {
    try {
      const content = JSON.parse(document.content as string);
      
      // Delete cover image if exists
      if (content.header?.coverImage?.url) {
        const coverImagePath = content.header.coverImage.url.split("/").pop();
        await client.storage
          .from("documents")
          .remove([`cover-images/${coverImagePath}`]);
      }

      // Delete sidebar images if exist
      if (content.sidebar?.content?.length) {
        const sidebarImagePaths = content.sidebar.content.map((url: string) => {
          const path = url.split("/").pop();
          return `sidebar-images/${path}`;
        });
        await client.storage
          .from("documents")
          .remove(sidebarImagePaths);
      }
    } catch (error) {
      console.error("Error deleting document images:", error);
    }
  }

  const { error } = await client
    .from("documents")
    .delete()
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/");
  return { success: true };
} 