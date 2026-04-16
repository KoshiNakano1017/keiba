import type { Metadata } from "next";
import "./globals.css";
import { validateEnv } from "@/lib/env";

validateEnv();

export const metadata: Metadata = {
  title: "CrossFactor AI",
  description: "AIによる競馬予測サービス",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
