import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBar from "./_components/SideBar";
import Navbar from "./_components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdullayev",
  description: "Generated by Abdullayev",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-full overflow-y-hidden">
          <Navbar />
          <div className="flex  ">
            <div className="md:w-1/4 w-0 ">
              <SideBar />
            </div>
            <div className="md:w-3/4 w-full  owerflow-y-scroll ">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
