"use client"

import { useState, useMemo } from "react"
import OrderSummary from "./OrderSummary"
import DeliveryInfo from "./DeliveryInfo"
import PaymentSummary from "./PaymentSummary"
import Receipt from "./Receipt"
import { ArrowLeft } from "lucide-react"
import { OrderItemType } from "@/types/order"
import { useCart } from "@/lib/context/store"

export default function OrderCheckout () {
  const [orderItems, setOrderItems] = useState<OrderItemType[]>([
    {
      id: 1,
      name: "Eagle's Signature Steak",
      price: 35.0,
      quantity: 1,
      image: "https://media.istockphoto.com/id/594465522/photo/grilling-steaks-on-flaming-grill-and-shot-with-selective-focus.jpg?b=1&s=612x612&w=0&k=20&c=268d7HewWCy8KdUde1VXwlVcV2248LYPQUmOUeJ1vzc=",
      options: [
        {
          id: "doneness",
          name: "Doneness",
          selected: "Medium",
          choices: ["Rare", "Medium Rare", "Medium", "Medium Well", "Well Done"],
        },
        { id: "sauce", name: "Sauce", selected: "", choices: ["Peppercorn", "Mushroom", "Garlic Butter"], price: 2.5 },
      ],
      toppings: [
        { id: "mushrooms", name: "Sautéed Mushrooms", selected: false, price: 3.0 },
        { id: "onions", name: "Caramelized Onions", selected: false, price: 2.5 },
        { id: "bleuCheese", name: "Bleu Cheese Crumbles", selected: false, price: 3.5 },
      ],
      specialInstructions: "",
    },
    {
      id: 2,
      name: "Grilled Mountain Salmon",
      price: 28.0,
      quantity: 1,
      image: "https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      options: [
        {
          id: "cooking",
          name: "Cooking Preference",
          selected: "Medium",
          choices: ["Medium Rare", "Medium", "Well Done"],
        },
      ],
      toppings: [
        { id: "capers", name: "Capers", selected: false, price: 1.5 },
        { id: "lemonButter", name: "Lemon Butter Sauce", selected: false, price: 2.0 },
        { id: "dill", name: "Fresh Dill", selected: false, price: 1.0 },
      ],
      specialInstructions: "",
    },
  ])

    const { items } = useCart()

  const [tip, setTip] = useState(15)
  const [showReceipt, setShowReceipt] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mpesa" | null>(null)

  const calculateItemTotal = (item: OrderItemType): number => {
    let total = item.price * item.quantity
    item.options.forEach((option) => {
      if (option.price && option.selected) {
        total += option.price
      }
    })
    item.toppings.forEach((topping) => {
      if (topping.price && topping.selected) {
        total += topping.price
      }
    })
    return total
  }
  const subtotal = useMemo(() => orderItems.reduce((sum, item) => sum + calculateItemTotal(item), 0), [orderItems])

  const tipAmount = useMemo(() => (subtotal * tip) / 100, [subtotal, tip])
  const tax = useMemo(() => subtotal * 0.0825, [subtotal])
  const total = useMemo(() => subtotal + tipAmount + tax, [subtotal, tipAmount, tax]) 
  

  const handlePayment = (method: "card" | "mpesa") => {
    setPaymentMethod(method)
    // In a real application, you would handle the payment process here
    // For now, we'll just show the receipt after a short delay
    setTimeout(() => {
      setShowReceipt(true)
    }, 500)
  }

  if (showReceipt) {
    return (
      <Receipt
        orderItems={orderItems}
        subtotal={subtotal}
        tax={tax}
        tip={tip}
        tipAmount={tipAmount}
        total={total}
        paymentMethod={paymentMethod}
        onBack={() => setShowReceipt(false)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customize Your Order</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 space-y-6">
            <OrderSummary
              orderItems={orderItems}
              setOrderItems={setOrderItems}
              tip={tip}
              setTip={setTip}
              tipAmount={tipAmount}
              subtotal={subtotal}
            />
            <DeliveryInfo />
          </div>
          <div className="lg:w-1/3">
            <PaymentSummary
              subtotal={subtotal}
              tax={tax}
              tip={tip}
              tipAmount={tipAmount}
              total={total}
              onPayment={handlePayment}
            />
          </div>
        </div>
      </main>
    </div>
  )
}


