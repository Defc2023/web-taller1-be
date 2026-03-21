import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Fakestagram",
  description: "Instagram clone — teaching project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {/* Sidebar is a client component (uses usePathname) */}
        {/* Main content — offset left by sidebar width on desktop, add bottom padding for mobile nav */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
