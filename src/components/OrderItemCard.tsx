"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Minus, Trash2, ChevronUp, ChevronDown, MessageSquare, Flame, Salad, ChefHat } from "lucide-react"
import { OrderItemType } from "@/types/order"
import { cn } from "@/lib/utils"
import { IconPepper } from "@tabler/icons-react"

interface OrderItemCardProps {
  item: OrderItemType
  setOrderItems: React.Dispatch<React.SetStateAction<OrderItemType[]>>
}

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

const OrderItemCard: React.FC<OrderItemCardProps> = ({ item, setOrderItems }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpansion = () => setIsExpanded(!isExpanded)

  const updateQuantity = (change: number) => {
    setOrderItems((items) =>
      items
        .map((i) => (i.id === item.id ? { ...i, quantity: Math.max(0, i.quantity + change) } : i))
        .filter((i) => i.quantity > 0),
    )
  }

  const updateOption = (optionId: string, value: string) => {
    setOrderItems((items) =>
      items.map((i) =>
        i.id === item.id
          ? {
              ...i,
              options: i.options.map((opt) => (opt.id === optionId ? { ...opt, selected: value } : opt)),
            }
          : i,
      ),
    )
  }

  const toggleTopping = (toppingId: string) => {
    setOrderItems((items) =>
      items.map((i) =>
        i.id === item.id
          ? {
              ...i,
              toppings: i.toppings.map((top) => (top.id === toppingId ? { ...top, selected: !top.selected } : top)),
            }
          : i,
      ),
    )
  }

  const updateSpecialInstructions = (instructions: string) => {
    setOrderItems((items) => items.map((i) => (i.id === item.id ? { ...i, specialInstructions: instructions } : i)))
  }

  return (
    <div className="group bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-sm p-3 sm:p-4 transition-all duration-300 hover:shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
      {/* Mobile Image */}
      <div className="sm:hidden relative w-full h-40 mb-3 rounded-xl overflow-hidden shadow-inner">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 112px, 96px"
        />
        <Badge className="absolute top-2 right-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 backdrop-blur-sm text-white">
          ×{item.quantity}
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        {/* Desktop Image */}
        <div className="hidden sm:block relative w-24 h-24 rounded-xl overflow-hidden shadow-inner">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 112px, 96px"
          />
          <Badge className="absolute top-1 right-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 backdrop-blur-sm text-white">
            ×{item.quantity}
          </Badge>
        </div>
        
        {/* Content Section */}
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <div className="space-y-1">
              <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg tracking-tight">
                {item.name}
              </h3>
              <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">
                ${item.price.toFixed(2)} each
              </p>
            </div>
            
            {/* Quantity Controls */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-2 flex-1 sm:flex-none">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => updateQuantity(-1)}
                  className="rounded-full border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-transform hover:scale-105"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium text-gray-800 dark:text-gray-200 w-6 text-center">
                  {item.quantity}
                </span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => updateQuantity(1)}
                  className="rounded-full border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-transform hover:scale-105"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                variant="destructive" 
                size="icon" 
                onClick={() => updateQuantity(-item.quantity)}
                className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white transition-transform hover:scale-105"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Expand Button */}
          <Button 
            variant="ghost" 
            onClick={toggleExpansion} 
            className="w-full h-auto p-0 mt-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:bg-transparent group"
          >
            <div className="flex items-center justify-center gap-1 py-1 transition-all duration-300 group-hover:gap-2">
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 transition-transform" />
                  <span className="text-sm">Collapse options</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 transition-transform" />
                  <span className="text-sm">Customize your order</span>
                </>
              )}
            </div>
          </Button>
        </div>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className={cn(
          "mt-4 space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700",
          "transition-all duration-300 ease-in-out overflow-hidden",
          isExpanded ? "opacity-100" : "opacity-0"
        )}>
          {item.options.map((option) => (
            <div key={option.id} className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium text-sm">
                {option.name.includes('Spicy') ? <Flame className="h-4 w-4 text-red-500" /> : 
                 option.name.includes('Salad') ? <Salad className="h-4 w-4 text-green-500" /> : 
                 <ChefHat className="h-4 w-4 text-indigo-500" />}
                {option.name}
              </Label>
              <div className="flex flex-wrap gap-2">
                {option.choices.map((choice) => (
                  <Button
                    key={choice}
                    variant={option.selected === choice ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateOption(option.id, choice)}
                    className={cn(
                      "transition-all duration-150 transform hover:scale-105",
                      option.selected === choice 
                        ? "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg" 
                        : "border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20"
                    )}
                  >
                    {choice} {option.price ? `(+$${option.price.toFixed(2)})` : ""}
                  </Button>
                ))}
              </div>
            </div>
          ))}

          {item.toppings.length > 0 && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium text-sm">
                <IconPepper className="h-4 w-4 text-orange-500" />
                Additional Toppings
                <span className="text-xs text-gray-500 font-normal">(Select up to 3)</span>
              </Label>
              <div className="grid gap-2">
                {item.toppings.map((topping) => (
                  <div 
                    key={topping.id} 
                    className="flex items-center gap-2 py-1.5 px-3 rounded-md transition-all duration-150 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:shadow-sm"
                  >
                    <Checkbox
                      id={`${item.id}-${topping.id}`}
                      checked={topping.selected}
                      onCheckedChange={() => toggleTopping(topping.id)}
                      className="h-5 w-5 rounded-md border-gray-300 dark:border-gray-600 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-indigo-600 data-[state=checked]:to-blue-600"
                    />
                    <Label
                      htmlFor={`${item.id}-${topping.id}`}
                      className="font-normal text-gray-600 dark:text-gray-400 cursor-pointer flex-1 flex justify-between items-center"
                    >
                      <span>{topping.name}</span>
                      <span className="text-indigo-600 dark:text-indigo-400 ml-2 text-sm">
                        +${topping.price.toFixed(2)}
                      </span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium text-sm">
              <MessageSquare className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
              Special Instructions
              <span className="text-xs text-gray-500 font-normal">(Optional)</span>
            </Label>
            <Textarea
              value={item.specialInstructions}
              onChange={(e) => updateSpecialInstructions(e.target.value)}
              placeholder="e.g., No onions, extra sauce, dietary restrictions..."
              className="resize-none border-gray-200 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-lg bg-white dark:bg-gray-800/50 transition-shadow duration-200 focus:shadow-lg"
              rows={2}
            />
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg text-right backdrop-blur-sm shadow-inner">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Item Total:</span>
            <span className="ml-2 text-lg font-bold text-indigo-600 dark:text-indigo-400">
              ${calculateItemTotal(item).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderItemCard