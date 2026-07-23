import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amy Wang — Portfolio",
  description: "Product design & engineering portfolio of Amy Wang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-neutral-900 font-sans selection:bg-neutral-200">
        <Header />
        <main className="flex-1 w-full px-3 sm:px-4 md:px-6 pt-0 pb-4 sm:pb-6">
          {children}
        </main>
      </body>
    </html>
  );
}
