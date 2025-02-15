import { Button } from "@/components/ui/button"
import { Printer, ArrowLeft } from "lucide-react"
import type { OrderItemType } from "@/types/order"

interface ReceiptProps {
  orderItems: OrderItemType[]
  subtotal: number
  tax: number
  tip: number
  tipAmount: number
  total: number
  paymentMethod: "card" | "mpesa" | null
  onBack: () => void
}

const Receipt: React.FC<ReceiptProps> = ({
  orderItems,
  subtotal,
  tax,
  tip,
  tipAmount,
  total,
  paymentMethod,
  onBack,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md mx-auto border-t-4 border-indigo-600">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Eagle's Nest</h2>
          <p className="text-gray-600 dark:text-gray-400">123 Skyview Drive, Cityville</p>
          <p className="text-gray-600 dark:text-gray-400">(555) 123-4567</p>
        </div>

        <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-4">
          <div className="flex justify-between text-gray-600 dark:text-gray-400 mb-2">
            <span>Date:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Time:</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="mb-6">
          {orderItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span className="text-gray-800 dark:text-gray-200">
                {item.quantity}x {item.name}
              </span>
              <span className="text-gray-600 dark:text-gray-400">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span className="text-gray-800 dark:text-gray-200">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 dark:text-gray-400">Tax</span>
            <span className="text-gray-800 dark:text-gray-200">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600 dark:text-gray-400">Tip ({tip}%)</span>
            <span className="text-gray-800 dark:text-gray-200">${tipAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span className="text-gray-800 dark:text-gray-200">Total</span>
            <span className="text-indigo-700 dark:text-indigo-400">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Payment Method: {paymentMethod === "card" ? "Credit Card" : "M-Pesa"}
          </p>
        </div>

        <div className="text-center mt-8">
          <div className="mb-6 text-green-600 dark:text-green-400 font-medium">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Payment Successful
            </div>
            <p className="text-gray-600 dark:text-gray-400">Thank you for dining with us!</p>
          </div>
          <Button
            onClick={() => window.print()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center mx-auto shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <Printer size={20} className="mr-2" />
            Print Receipt
          </Button>
          <Button
            onClick={onBack}
            variant="link"
            className="mt-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors duration-200"
          >
            <ArrowLeft size={16} className="mr-2" />
            Return to Order
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Receipt

