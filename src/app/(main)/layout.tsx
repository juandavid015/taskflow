import Navbar from "@/components/navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="w-full">
        <Navbar />
      </header>

      {children}
    </>
  );
}
