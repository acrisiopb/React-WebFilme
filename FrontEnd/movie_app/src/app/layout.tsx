'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Navbar from "@/components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { usePathname } from "next/navigation";
import { AuthProvider } from "./context/AuthContext";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Movies App",
//   description: "A simple movies app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
        <AuthProvider>
      <body>
        {pathname !== '/register' && <Navbar /> }
        {children}
        <ToastContainer />
      </body>
      </AuthProvider>
    </html>
  );
}
