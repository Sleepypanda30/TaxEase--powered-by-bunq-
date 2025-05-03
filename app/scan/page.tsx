"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, ImageIcon, FileText, Upload, Shield, X } from "lucide-react"
import { useTaxDocument } from "@/context/TaxDocumentContext"
import Link from "next/link"

export default function ScanPage() {
  const router = useRouter()
  const { setDocument } = useTaxDocument()
  const [uploading, setUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [documentType, setDocumentType] = useState<"pdf" | "image" | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const fileType = file.type.includes("pdf") ? "pdf" : "image"
    setDocumentType(fileType)

    if (fileType === "image") {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      // For PDFs we don't have a preview
      setPreviewImage(null)
    }
  }

  const processDocument = async () => {
    if (!documentType) {
      alert("Please select a document first")
      return
    }

    setUploading(true)

    // Simulate uploading and processing with AWS/NVIDIA
    setTimeout(() => {
      setUploading(false)

      // In a real app, you would upload the document to your AWS backend
      // and get the processed results back

      // For the MVP, we'll simulate a successful upload and processing
      setDocument({
        id: "doc-" + Date.now(),
        type: documentType,
        uri: previewImage || "",
        processed: true,
      })

      router.push("/results")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <Link href="/" className="text-gray-400">
          <X size={24} />
        </Link>
        <h1 className="text-xl font-bold">Scan Document</h1>
        <div className="w-6"></div> {/* Empty div for spacing */}
      </header>

      <main className="p-4">
        <h2 className="text-2xl font-bold text-center mb-2">Upload Your Tax Document</h2>
        <p className="text-center text-gray-400 mb-8">We accept tax transcripts, W-2s, 1099s, and other tax forms</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <label className="flex flex-col items-center justify-center bg-gray-900 p-6 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
            <div className="bg-purple-900 bg-opacity-30 p-3 rounded-full mb-3">
              <Camera className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-sm font-medium">Take Photo</span>
            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileUpload} />
          </label>

          <label className="flex flex-col items-center justify-center bg-gray-900 p-6 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
            <div className="bg-purple-900 bg-opacity-30 p-3 rounded-full mb-3">
              <ImageIcon className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-sm font-medium">Choose Image</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </label>

          <label className="flex flex-col items-center justify-center bg-gray-900 p-6 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
            <div className="bg-purple-900 bg-opacity-30 p-3 rounded-full mb-3">
              <FileText className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-sm font-medium">Select PDF</span>
            <input type="file" accept="application/pdf" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>

        {(previewImage || documentType === "pdf") && (
          <div className="bg-gray-900 p-6 rounded-lg mb-8">
            <h2 className="text-lg font-semibold mb-4 text-center">Document Preview</h2>

            {documentType === "pdf" ? (
              <div className="flex flex-col items-center justify-center bg-gray-800 p-8 rounded-lg mb-6">
                <FileText className="w-16 h-16 text-red-500 mb-3" />
                <span className="text-gray-300 font-medium">PDF Document</span>
              </div>
            ) : (
              previewImage && (
                <div className="flex justify-center mb-6">
                  <img
                    src={previewImage || "/placeholder.svg"}
                    alt="Document preview"
                    className="max-w-full h-auto max-h-80 rounded-lg"
                  />
                </div>
              )
            )}

            <button
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              onClick={processDocument}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-5 w-5" />
                  Process Document
                </>
              )}
            </button>
          </div>
        )}

        <div className="bg-gray-900 p-4 rounded-lg flex items-start">
          <Shield className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-300">
            Your documents are securely processed and never stored permanently. We use industry-standard encryption to
            protect your data.
          </p>
        </div>
      </main>
    </div>
  )
}
