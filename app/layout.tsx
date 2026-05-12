import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Dhruv Panchal | Full-Stack Developer",
  description: "Portfolio of Dhruv Panchal — MERN stack developer building scalable web applications with React, Node.js, and AWS.",
  icons: {
    icon: "/newFavi.png",
  },
  openGraph: {
    title: "Dhruv Panchal | Full-Stack Developer",
    description: "MERN stack developer building scalable web applications with React, Node.js, and AWS cloud infrastructure.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Panchal | Full-Stack Developer",
    description: "MERN stack developer building scalable web applications with React, Node.js, and AWS cloud infrastructure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/newFavi.png" type="image/png" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden" suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
