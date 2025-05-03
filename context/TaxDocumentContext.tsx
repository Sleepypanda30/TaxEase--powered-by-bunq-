"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface TaxDocument {
  id: string
  type: "pdf" | "image"
  uri: string
  processed: boolean
}

interface TaxDocumentContextType {
  document: TaxDocument | null
  setDocument: (document: TaxDocument | null) => void
}

const TaxDocumentContext = createContext<TaxDocumentContextType | undefined>(undefined)

export function TaxDocumentProvider({ children }: { children: ReactNode }) {
  const [document, setDocument] = useState<TaxDocument | null>(null)

  return <TaxDocumentContext.Provider value={{ document, setDocument }}>{children}</TaxDocumentContext.Provider>
}

export function useTaxDocument() {
  const context = useContext(TaxDocumentContext)
  if (context === undefined) {
    throw new Error("useTaxDocument must be used within a TaxDocumentProvider")
  }
  return context
}
