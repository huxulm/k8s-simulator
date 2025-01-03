import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "K8s Simulator Q&A",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
