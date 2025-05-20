import { Sidebar } from "@/components/sidebar";
import { createServerSupabaseClient } from "@/app/server/client";
import { currentUser } from "@clerk/nextjs/server";
import Content from "./(documents)/content";

export default async function Home() {
  const client = createServerSupabaseClient();
  const user = await currentUser();

  if (!user?.id) {
    return null;
  }

  const { data: documents } = await client
    .from("documents")
    .select("*, type:document_types(*)")
    .eq("owner_id", user.id);

  const { data: documentTypes } = await client
    .from("document_types")
    .select("*");

  console.log("documents", documents);
  return (
    <main className="font-[family-name:var(--font-geist-sans)] flex-1 flex w-full h-full">
      <Sidebar />
      <Content
        documents={documents ?? []}
        documentTypes={documentTypes ?? []}
      />
    </main>
  );
}
