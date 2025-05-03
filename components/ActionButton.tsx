"use client"

import type { ReactNode } from "react"

interface ActionButtonProps {
  icon: ReactNode
  label: string
  color: string
  onClick?: () => void
}

export default function ActionButton({ icon, label, color, onClick }: ActionButtonProps) {
  return (
    <div className="flex flex-col items-center">
      <button
        className="w-14 h-14 rounded-full flex items-center justify-center mb-1"
        style={{ backgroundColor: color }}
        onClick={onClick}
      >
        {icon}
      </button>
      <span className="text-sm text-white">{label}</span>
    </div>
  )
}
