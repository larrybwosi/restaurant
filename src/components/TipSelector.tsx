import React from 'react'
import { Tooltip } from '@/components/ui/tooltip'
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { IconInfoCircle } from '@tabler/icons-react'

interface TipSelectorProps {
  subtotal: number
  tip: number
  setTip: React.Dispatch<React.SetStateAction<number>>
  tipAmount: number
}

const TipSelector: React.FC<TipSelectorProps> = ({ subtotal, tip, setTip, tipAmount }) => {
  // Calculate what each percentage would be in dollars
  const getTipDollarAmount = (percentage: number) => {
    return (subtotal * (percentage / 100)).toFixed(2)
  }

  return (
    <div className="mt-8 bg-indigo-50 dark:bg-indigo-900 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">Add a Tip (Optional)</h3>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-200">
                <IconInfoCircle size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs text-sm">
              <p>Tips are an optional way to show appreciation for great service. 100% of your tip goes directly to the staff who prepared and delivered your order.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {[0, 10, 15, 20, 25].map((percentage) => (
          <button
            key={percentage}
            onClick={() => setTip(percentage)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              tip === percentage
                ? "bg-indigo-600 text-white shadow-md transform scale-105"
                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-800 border border-indigo-200 dark:border-indigo-700"
            }`}
          >
            {percentage === 0 ? 'No Tip' : `${percentage}%`}
          </button>
        ))}
        
        <div className="flex items-center">
          <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium ml-2">
            {tipAmount > 0 ? `$${tipAmount.toFixed(2)}` : ''}
          </span>
        </div>
      </div>
      
      {tip > 0 && (
        <div className="text-xs text-indigo-600 dark:text-indigo-400 italic">
          {tip}% tip (${getTipDollarAmount(tip)}) will be added to your total
        </div>
      )}
      
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
        Our staff appreciates your generosity. The recommended tip is 15-20% for great service.
      </p>
    </div>
  )
}

export default TipSelector