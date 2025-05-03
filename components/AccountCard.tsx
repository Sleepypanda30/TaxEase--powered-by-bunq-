import { Wallet, DollarSign, FileText } from "lucide-react"

interface AccountCardProps {
  title: string
  amount?: string
  status?: string
  icon: string
  color: string
}

export default function AccountCard({ title, amount, status, icon, color }: AccountCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "wallet":
        return <Wallet size={24} color="#FFFFFF" />
      case "dollar-sign":
        return <DollarSign size={24} color="#FFFFFF" />
      case "file-text":
        return <FileText size={24} color="#FFFFFF" />
      default:
        return <Wallet size={24} color="#FFFFFF" />
    }
  }

  return (
    <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: color }}>
      <div className="flex items-center mb-2">
        {getIcon()}
        <span className="text-white ml-2">{title}</span>
      </div>

      {amount && <div className="text-3xl font-bold text-white">{amount}</div>}

      {status && <div className="text-xl font-bold text-green-400">{status}</div>}
    </div>
  )
}
