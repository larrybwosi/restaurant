export interface OrderItemOption {
  id: string
  name: string
  selected: string
  choices: string[]
  price?: number
}

export interface OrderItemTopping {
  id: string
  name: string
  selected: boolean
  price: number
}

export interface OrderItemType {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  options: OrderItemOption[]
  toppings: OrderItemTopping[]
  specialInstructions: string
  category?: string;
}

export function calculateItemTotal(item: OrderItemType): number {
  let total = item.price * item.quantity

  item.options.forEach((option) => {
    if (option.price && option.selected) {
      total += option.price * item.quantity
    }
  })

  item.toppings.forEach((topping) => {
    if (topping.selected) {
      total += topping.price * item.quantity
    }
  })

  return total
}

