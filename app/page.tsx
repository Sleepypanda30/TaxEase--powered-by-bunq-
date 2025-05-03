"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, FileText, DollarSign, ArrowUp, ArrowDown, Plus, HomeIcon, Clock, UserCircle } from "lucide-react"
import AccountCard from "@/components/AccountCard"
import ActionButton from "@/components/ActionButton"
import NotificationBar from "@/components/NotificationBar"

export default function Home() {
  const [userName, setUserName] = useState("John Smith")
  const [hasNotification, setHasNotification] = useState(true)

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-xs text-gray-400">
        <div>10:13</div>
        <div className="flex items-center gap-2">
          <span>4G</span>
          <span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 10L12 16L6 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>53%</span>
        </div>
      </div>

      <div className="flex-1 pb-16">
        {/* User Profile Section */}
        <div className="flex justify-between items-center px-5 py-3">
          <div className="flex items-center">
            <div className="relative mr-4">
              <div className="w-10 h-10 rounded-full bg-gray-700"></div>
              {hasNotification && (
                <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  1
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold">Home</h1>
          </div>
          <div className="text-purple-500">
            <UserCircle size={40} />
          </div>
        </div>

        {/* Awaiting Events Section */}
        <div className="px-5 py-3">
          <h2 className="text-xl font-bold mb-3">Awaiting Events</h2>
          <div className="bg-gray-900 rounded-lg p-4 flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mr-4">
              <FileText size={24} color="white" />
            </div>
            <div>
              <p className="font-medium">Update on the status of your account application</p>
              <p className="text-gray-400 text-sm">Check here to see if any action is required.</p>
            </div>
          </div>
        </div>

        {/* User Name Section with Dropdown */}
        <div className="flex justify-between items-center px-5 py-3">
          <h2 className="text-xl font-bold">{userName}</h2>
          <ChevronDown size={24} />
        </div>

        {/* Account Cards */}
        <div className="px-5">
          <AccountCard title="Total Balance" amount="€0.00" icon="wallet" color="#8e44ad" />
          <AccountCard title="Main" amount="€0.00" icon="dollar-sign" color="#d35400" />
          <AccountCard title="Savings Account" status="Pending" icon="file-text" color="#333333" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-16 left-0 right-0 flex justify-around items-center px-5 py-2">
        <ActionButton icon={<ArrowUp size={24} />} label="Pay" color="#d35400" />
        <ActionButton icon={<ArrowDown size={24} />} label="Request" color="#2980b9" />
        <Link href="/scan">
          <ActionButton icon={<Plus size={24} />} label="Add" color="#8e44ad" />
        </Link>
      </div>

      {/* Notification Bar */}
      <NotificationBar
        message="We need a bit more information to verify Shivangi's account"
        icon={<FileText size={20} />}
      />

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-black border-t border-gray-800 py-3 px-5">
        <div className="flex flex-col items-center text-blue-500">
          <HomeIcon size={24} />
          <span className="text-xs mt-1">Home</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <Clock size={24} />
          <span className="text-xs mt-1">Travel</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <DollarSign size={24} />
          <span className="text-xs mt-1">Budgeting</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <span className="text-[10px] bg-gray-700 rounded px-1">BETA</span>
          <span className="text-xs mt-1">Stocks</span>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <span className="text-[10px] bg-gray-700 rounded px-1">BETA</span>
          <span className="text-xs mt-1">Crypto</span>
        </div>
      </div>
    </div>
  )
}
