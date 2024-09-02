import type { Metadata } from "next";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";

import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";
import { NextAuthProvider } from "@/components/AuthProvider/AuthProvider";
import Toast from "@/components/Toast/Toast";


const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Lulu Guest Lodge",
  description: "Discover the best Lodge rooms",
  icons: {
    icon: "/assets/icons/LuluLodge_LogoBlack.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontSans.className}>
      <NextAuthProvider>
      <ThemeProvider>
        <Toast />
      <main className="font-normal">
          <Header />
          {children}
          <Footer />
        </main>
         </ThemeProvider>
      </NextAuthProvider>
        
      </body>
    </html>
  );
}
