interface TaxDataProps {
  income: number
  filingStatus: string
  deductions: number
  taxableIncome: number
  federalTax: number
  stateTax: number
}

interface TaxSummaryProps {
  taxData: TaxDataProps
}

export default function TaxSummary({ taxData }: TaxSummaryProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-5 mb-6">
      <h2 className="text-xl font-bold mb-4 text-white">Tax Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between py-2 border-b border-gray-800">
          <span className="text-gray-400">Filing Status</span>
          <span className="font-medium text-white">{taxData.filingStatus}</span>
        </div>

        <div className="flex justify-between py-2 border-b border-gray-800">
          <span className="text-gray-400">Total Income</span>
          <span className="font-medium text-white">${taxData.income.toLocaleString()}</span>
        </div>

        <div className="flex justify-between py-2 border-b border-gray-800">
          <span className="text-gray-400">Standard Deduction</span>
          <span className="font-medium text-white">${taxData.deductions.toLocaleString()}</span>
        </div>

        <div className="flex justify-between py-2 border-b border-gray-800">
          <span className="text-gray-400">Taxable Income</span>
          <span className="font-medium text-white">${taxData.taxableIncome.toLocaleString()}</span>
        </div>

        <div className="flex justify-between py-2 border-b border-gray-800">
          <span className="text-gray-400">Federal Tax</span>
          <span className="font-medium text-white">${taxData.federalTax.toLocaleString()}</span>
        </div>

        <div className="flex justify-between py-2 border-b border-gray-800">
          <span className="text-gray-400">State Tax</span>
          <span className="font-medium text-white">${taxData.stateTax.toLocaleString()}</span>
        </div>

        <div className="flex justify-between py-2 font-bold">
          <span className="text-white">Total Tax</span>
          <span className="text-purple-500">${(taxData.federalTax + taxData.stateTax).toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
