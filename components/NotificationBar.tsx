"use client"

import type { ReactNode } from "react"

interface NotificationBarProps {
  message: string
  icon: ReactNode
  onClick?: () => void
}

export default function NotificationBar({ message, icon, onClick }: NotificationBarProps) {
  return (
    <div className="fixed bottom-16 left-0 right-0 bg-blue-600 flex items-center p-4 cursor-pointer" onClick={onClick}>
      <div className="mr-3">{icon}</div>
      <p className="text-white">{message}</p>
    </div>
  )
}
