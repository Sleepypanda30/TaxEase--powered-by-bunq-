"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react"

interface AdviceProps {
  id: string
  title: string
  description: string
  potentialSavings: number
  priority: "high" | "medium" | "low"
}

interface AdviceCardProps {
  advice: AdviceProps
}

export default function AdviceCard({ advice }: AdviceCardProps) {
  const [expanded, setExpanded] = useState(false)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#e74c3c"
      case "medium":
        return "#f39c12"
      case "low":
        return "#27ae60"
      default:
        return "#AAAAAA"
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden" onClick={() => setExpanded(!expanded)}>
      <div className="p-4 cursor-pointer flex justify-between items-center">
        <div className="flex items-center">
          <div
            className="w-3 h-3 rounded-full mr-3"
            style={{ backgroundColor: getPriorityColor(advice.priority) }}
          ></div>
          <h3 className="font-medium text-white">{advice.title}</h3>
        </div>
        <div className="flex items-center">
          <div className="text-right mr-4">
            <div className="text-xs text-gray-400">Potential Savings</div>
            <div className="font-bold text-purple-500">${advice.potentialSavings}</div>
          </div>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {expanded && (
        <div className="p-4 pt-0 border-t border-gray-800">
          <p className="text-gray-300 mb-3">{advice.description}</p>
          <button className="text-purple-500 font-medium flex items-center text-sm">
            Learn More
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
    </div>
  )
}
