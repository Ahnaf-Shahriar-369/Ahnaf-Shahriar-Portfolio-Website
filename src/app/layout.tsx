import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Head from 'next/head';
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ahnaf Shahriar's Portfolio Website",
  description: "Ahnaf Shahriar's Portfolio Website. Deployed on Vercel & Netlify. Built with Next.js,Typescript and Tailwind CSS. ",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>

        <link rel="icon" href="/favicon.ico" />

      </Head>
        
      <body className={inter.className}>

        <ThemeProvider attribute="class" defaultTheme="dark" >{children}</ThemeProvider>


      </body>
    </html>
  )
}
