import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TaxDocumentProvider } from "@/context/TaxDocumentContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TaxEase - Tax Advice Made Simple",
  description: "Upload your tax transcript and get personalized advice in seconds",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TaxDocumentProvider>
          <div className="max-w-md mx-auto min-h-screen bg-black text-white">{children}</div>
        </TaxDocumentProvider>
      </body>
    </html>
  )
}
