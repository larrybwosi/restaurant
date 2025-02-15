import OrderItemCard from "./OrderItemCard"
import TipSelector from "./TipSelector"
import type { OrderItemType } from "@/types/order"

interface OrderSummaryProps {
  orderItems: OrderItemType[]
  setOrderItems: React.Dispatch<React.SetStateAction<OrderItemType[]>>
  tip: number
  setTip: React.Dispatch<React.SetStateAction<number>>
  tipAmount: number
  subtotal: number
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderItems, setOrderItems, tip, setTip, tipAmount, subtotal }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg lg:p-6 transition-shadow duration-300 hover:shadow-xl">
      <h2 className="text-xl font-semibold mb-6 border-b pb-2 text-gray-800 dark:text-gray-200 flex items-center">
        <span className="inline-block w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
        Order Summary
      </h2>
      <div className="space-y-6">
        {orderItems.map((item) => (
          <OrderItemCard key={item.id} item={item} setOrderItems={setOrderItems} />
        ))}
      </div>
      <TipSelector tip={tip} setTip={setTip} tipAmount={tipAmount} subtotal={subtotal}/>
    </div>
  )
}

export default OrderSummary

