import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { dark } from "@clerk/themes";
import MultisessionAppSupport from "@/app/contexts/multisession-support";
import QueryProvider from "@/app/contexts/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Flow",
  description: "Task Flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        afterMultiSessionSingleSignOutUrl="/"
        appearance={{
          baseTheme: dark,
          variables: {
            colorBackground: "#1a1a1a",
            colorText: "#e6e6e6",
          },
        }}
      >
        <MultisessionAppSupport>
          <QueryProvider>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}
            >
              {children}
            </body>
          </QueryProvider>
        </MultisessionAppSupport>
      </ClerkProvider>
    </html>
  );
}
