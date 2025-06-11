import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
  title: "Ahnaf Shahriar's Portfolio Website",
  description: "Ahnaf Shahriar's Portfolio Website. Deployed on Vercel & Netlify. Built with Next.js,Typescript and Tailwind CSS.",


  openGraph: {
    title: "Ahnaf Shahriar's Portfolio Website",
    description: "Web developer - Ahnaf Shahriar's Portfolio Website. Deployed on Vercel & Netlify. Built with Next.js,Typescript and Tailwind CSS.",
    url: "https://ahnafshahriar.vercel.app/",
    siteName: "Ahnaf Shahriar",
    images: [
      {
        url: "/me-2.png",
        width: 1200,
        height: 630,
        alt: "Ahnaf Shahriar's Portfolio Website",
      },
    ],
    locale: "en_US",
    type: "website",
  },



  keywords: ["web developer", "portfolio", "Next.js", "React", "TypeScript", "Ahnaf Shahriar"],
  authors: [{ name: "Ahnaf Shahriar", url: "https://ahnafshahriar.vercel.app/" }],
  creator: "Ahnaf Shahriar",
  applicationName: "Ahnaf Shahriar's Portfolio Website",
 
  
  publisher: "Ahnaf Shahriar",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Ahnaf Shahriar's Portfolio Website",
    description: "Web developer - Ahnaf Shahriar's Portfolio Website.",
    images: ["/me-2.png"],
    creator: "Ahnaf_Shah_Riar",
    site: "https://ahnafshahriar.vercel.app/",
  },
  

  
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>


      

      <head>
      
      





        <link rel="icon" href="/favicon.ico" />
      </head>


      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}