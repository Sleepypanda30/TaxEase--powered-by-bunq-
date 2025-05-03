"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Share2, Info, X } from "lucide-react"
import { useTaxDocument } from "@/context/TaxDocumentContext"
import AdviceCard from "@/components/AdviceCard"
import TaxSummary from "@/components/TaxSummary"

export default function ResultsPage() {
  const router = useRouter()
  const { document } = useTaxDocument()
  const [loading, setLoading] = useState(true)
  const [taxData, setTaxData] = useState<any>(null)

  useEffect(() => {
    // Check if we have a document
    if (!document && typeof window !== "undefined") {
      router.push("/")
      return
    }

    // Simulate fetching processed data from AWS/NVIDIA backend
    const timer = setTimeout(() => {
      // Mock data - in a real app, this would come from your backend
      setTaxData({
        income: 75000,
        filingStatus: "Single",
        deductions: 12950,
        taxableIncome: 62050,
        federalTax: 9605,
        stateTax: 3102,
        advice: [
          {
            id: "1",
            title: "Retirement Contributions",
            description: "Increasing your 401(k) contribution could save you approximately $1,320 in taxes.",
            potentialSavings: 1320,
            priority: "high",
          },
          {
            id: "2",
            title: "Home Office Deduction",
            description: "You may qualify for a home office deduction of up to $1,500 based on your work situation.",
            potentialSavings: 1500,
            priority: "medium",
          },
          {
            id: "3",
            title: "Education Credits",
            description: "Consider the Lifetime Learning Credit for your continuing education expenses.",
            potentialSavings: 800,
            priority: "medium",
          },
          {
            id: "4",
            title: "Charitable Contributions",
            description: "Your charitable donations could be itemized for additional tax benefits.",
            potentialSavings: 450,
            priority: "low",
          },
        ],
      })
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [document, router])

  const shareResults = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My TaxEase Results",
          text: "Check out my tax advice from TaxEase! I could save up to $4,070 on my taxes.",
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      alert("Web Share API not supported in your browser")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mb-4"></div>
          <h2 className="text-xl font-bold mb-2 text-white">Analyzing your tax document...</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Our AI is processing your information and generating personalized advice
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pb-16">
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <Link href="/" className="text-gray-400">
          <X size={24} />
        </Link>
        <h1 className="text-xl font-bold">Your Tax Analysis</h1>
        <button
          onClick={shareResults}
          className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          aria-label="Share results"
        >
          <Share2 className="w-5 h-5 text-purple-500" />
        </button>
      </header>

      <main className="p-4">
        <TaxSummary taxData={taxData} />

        <div className="bg-purple-700 text-white rounded-lg p-6 mb-8 text-center">
          <h2 className="text-lg font-medium mb-1">Potential Tax Savings</h2>
          <p className="text-4xl font-bold mb-1">
            ${taxData.advice.reduce((total: number, item: any) => total + item.potentialSavings, 0).toLocaleString()}
          </p>
          <p className="text-sm opacity-80">Based on our analysis of your tax situation</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Personalized Tax Advice</h2>

          <div className="space-y-4">
            {taxData.advice.map((item: any) => (
              <AdviceCard key={item.id} advice={item} />
            ))}
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg flex items-start mb-8">
          <Info className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-300">
            This advice is for informational purposes only and does not constitute professional tax advice. Please
            consult with a tax professional before making financial decisions.
          </p>
        </div>
      </main>
    </div>
  )
}
