import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster"
const inter = Inter({ subsets: ["latin"] });
import Container from "@/components/my-components/Container";
import Navbar from "@/components/my-components/Navbar";

export const metadata: Metadata = {
  title: "AI-Management",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
      <body className={inter.className}>
        <Container>
          <Navbar />
        {children}
       
        <Toaster />
        </Container>
        </body>
      </AuthProvider>
    </html>
  );
}
