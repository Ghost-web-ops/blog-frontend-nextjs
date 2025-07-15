import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar"; // <-- استيراد النافبار
import Footer from "../components/Footer"; // <-- استيراد الفوتر
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "My Modern Blog",
  description: "A blog built with Next.js and Node.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"className="h-full" >
      <body className={`bg-slate-900 text-white flex flex-col min-h-full`}>
        <Toaster position="top-center" />
        <AuthProvider> 
        <Navbar /> {/* <-- وضع النافبار هنا */}
        <main className="flex-grow">{children}</main>
        <Footer /> {/* <-- وضع الفوتر هنا */}
        </AuthProvider>
      </body>
    </html>
  );
}