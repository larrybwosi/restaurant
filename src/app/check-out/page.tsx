'use client';
import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { ArrowLeft, Printer, Plus, Minus, Trash2, Clock, CreditCard, ChevronUp, ChevronDown, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface OrderItemOption {
  id: string;
  name: string;
  selected: string;
  choices: string[];
  price?: number;
}

interface OrderItemTopping {
  id: string;
  name: string;
  selected: boolean;
  price: number;
}

interface OrderItemType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  options: OrderItemOption[];
  toppings: OrderItemTopping[];
  specialInstructions: string;
}

const OrderCheckout = () => {
  const [orderItems, setOrderItems] = useState<OrderItemType[]>([
    {
      id: 1,
      name: "Eagle's Signature Steak",
      price: 35.00,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6",
      options: [
        { id: 'doneness', name: 'Doneness', selected: 'Medium', choices: ['Rare', 'Medium Rare', 'Medium', 'Medium Well', 'Well Done'] },
        { id: 'sauce', name: 'Sauce', selected: '', choices: ['Peppercorn', 'Mushroom', 'Garlic Butter'], price: 2.50 }
      ],
      toppings: [
        { id: 'mushrooms', name: 'Sautéed Mushrooms', selected: false, price: 3.00 },
        { id: 'onions', name: 'Caramelized Onions', selected: false, price: 2.50 },
        { id: 'bleuCheese', name: 'Bleu Cheese Crumbles', selected: false, price: 3.50 }
      ],
      specialInstructions: ''
    },
    {
      id: 2,
      name: "Grilled Mountain Salmon",
      price: 28.00,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927",
      options: [
        { id: 'cooking', name: 'Cooking Preference', selected: 'Medium', choices: ['Medium Rare', 'Medium', 'Well Done'] }
      ],
      toppings: [
        { id: 'capers', name: 'Capers', selected: false, price: 1.50 },
        { id: 'lemonButter', name: 'Lemon Butter Sauce', selected: false, price: 2.00 },
        { id: 'dill', name: 'Fresh Dill', selected: false, price: 1.00 }
      ],
      specialInstructions: ''
    }
  ]);

  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [tip, setTip] = useState(15);
  const [showReceipt, setShowReceipt] = useState(false);

  const toggleItemExpansion = useCallback((id: number) => {
    setExpandedItem(current => current === id ? null : id);
  }, []);

  const updateQuantity = useCallback((id: number, change: number) => {
    setOrderItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  }, []);

  const updateOption = useCallback((itemId: number, optionId: string, value: string) => {
    setOrderItems(items =>
      items.map(item =>
        item.id === itemId
          ? {
              ...item,
              options: item.options.map(opt =>
                opt.id === optionId
                  ? { ...opt, selected: value }
                  : opt
              )
            }
          : item
      )
    );
  }, []);

  const toggleTopping = useCallback((itemId: number, toppingId: string) => {
    setOrderItems(items =>
      items.map(item =>
        item.id === itemId
          ? {
              ...item,
              toppings: item.toppings.map(top =>
                top.id === toppingId
                  ? { ...top, selected: !top.selected }
                  : top
              )
            }
          : item
      )
    );
  }, []);

  const updateSpecialInstructions = useCallback((itemId: number, instructions: string) => {
    setOrderItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, specialInstructions: instructions }
          : item
      )
    );
  }, []);

  const calculateItemTotal = useMemo(() => (item: OrderItemType) => {
    let total = item.price * item.quantity;
    
    item.options.forEach(option => {
      if (option.price && option.selected) {
        total += option.price * item.quantity;
      }
    });
    
    item.toppings.forEach(topping => {
      if (topping.selected) {
        total += topping.price * item.quantity;
      }
    });
    
    return total;
  }, []);

  const subtotal = useMemo(() => 
    orderItems.reduce((sum, item) => sum + calculateItemTotal(item), 0),
    [orderItems, calculateItemTotal]
  );

  const tipAmount = useMemo(() => (subtotal * tip) / 100, [subtotal, tip]);
  const tax = useMemo(() => subtotal * 0.0825, [subtotal]);
  const total = useMemo(() => subtotal + tipAmount + tax, [subtotal, tipAmount, tax]);

  const OrderItemCard = React.memo(({ item }: { item: OrderItemType }) => {
    const isExpanded = expandedItem === item.id;
    
    return (
      <Card className="rounded-lg shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-24 h-24">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 640px) 100vw, 96px"
              />
              <Badge className="absolute -top-2 -right-2">{item.quantity}</Badge>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-primary">${item.price.toFixed(2)}</p>
              <Button
                variant="link"
                onClick={() => toggleItemExpansion(item.id)}
                className="h-auto p-0"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="mr-1 h-4 w-4" />
                    Hide options
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-1 h-4 w-4" />
                    Customize order
                  </>
                )}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(item.id, -1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-medium">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(item.id, 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => updateQuantity(item.id, -item.quantity)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isExpanded && (
            <div className="mt-4 space-y-4 pt-4 border-t">
              {item.options.map(option => (
                <div key={option.id} className="space-y-2">
                  <Label>{option.name}</Label>
                  <div className="flex flex-wrap gap-2">
                    {option.choices.map(choice => (
                      <Button
                        key={choice}
                        variant={option.selected === choice ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateOption(item.id, option.id, choice)}
                      >
                        {choice} {option.price ? `(+$${option.price})` : ''}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}

              {item.toppings.length > 0 && (
                <div className="space-y-2">
                  <Label>Additional Toppings</Label>
                  <div className="grid gap-2">
                    {item.toppings.map(topping => (
                      <div key={topping.id} className="flex items-center gap-2">
                        <Checkbox
                          id={`${item.id}-${topping.id}`}
                          checked={topping.selected}
                          onCheckedChange={() => toggleTopping(item.id, topping.id)}
                        />
                        <Label htmlFor={`${item.id}-${topping.id}`} className="font-normal">
                          {topping.name} <span className="text-primary">(+${topping.price})</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Special Instructions
                </Label>
                <Textarea
                  value={item.specialInstructions}
                  onChange={(e) => updateSpecialInstructions(item.id, e.target.value)}
                  placeholder="Any special requests?"
                />
              </div>

              <div className="text-right text-sm font-medium bg-muted p-2 rounded">
                Item Total: ${calculateItemTotal(item).toFixed(2)}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  });
  const handlePayment = () => {
    // Animation before showing receipt
    setTimeout(() => {
      setShowReceipt(true);
    }, 500);
  };

  const Receipt = () => (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md mx-auto border-t-4 border-indigo-600">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Eagle's Nest</h2>
          <p className="text-gray-600">123 Skyview Drive, Cityville</p>
          <p className="text-gray-600">(555) 123-4567</p>
        </div>

        <div className="border-t border-b border-gray-200 py-4 mb-4">
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Date:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Time:</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="mb-6">
          {orderItems.map(item => (
            <div key={item.id} className="flex justify-between mb-2">
              <span className="text-gray-800">
                {item.quantity}x {item.name}
              </span>
              <span className="text-gray-600">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-800">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-800">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Tip ({tip}%)</span>
            <span className="text-gray-800">${tipAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-indigo-700">${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="mb-6 text-green-600 font-medium">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Payment Successful
            </div>
            <p className="text-gray-600">Thank you for dining with us!</p>
          </div>
          <button
            onClick={() => window.print()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center mx-auto shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <Printer size={20} className="mr-2" />
            Print Receipt
          </button>
          <button
            onClick={() => setShowReceipt(false)}
            className="mt-4 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            Return to Order
          </button>
        </div>
      </div>
    </div>
  );

  if (showReceipt) {
    return <Receipt />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button onClick={() => window.history.back()} className="text-indigo-600 hover:text-indigo-800 mr-4 transition-colors duration-200">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Customize Your Order</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Order Summary */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg p-6 transition-shadow duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-6 border-b pb-2 text-gray-800 flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
                Order Summary
              </h2>
              <div className="space-y-6">
                {orderItems.map(item => (
                <OrderItemCard key={item.id} item={item} />
                ))}
              </div>

              <div className="mt-8 bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-4 text-indigo-700">Add a Tip</h3>
                <div className="flex flex-wrap gap-2">
                  {[10, 15, 20, 25].map(percentage => (
                    <button
                      key={percentage}
                      onClick={() => setTip(percentage)}
                      className={`px-4 py-2 rounded-full transition-all duration-300 ${
                        tip === percentage
                          ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                          : 'bg-white text-gray-800 hover:bg-indigo-100 border border-indigo-200'
                      }`}
                    >
                      {percentage}%
                    </button>
                  ))}
                  <div className="flex items-center">
                    <span className="text-sm text-indigo-600 font-medium ml-2">
                      ${tipAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6 transition-shadow duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-6 border-b pb-2 text-gray-800 flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
                Delivery Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div className="relative md:col-span-2">
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
              </div>
              <div className="mt-6 flex items-center text-indigo-600 bg-indigo-50 p-3 rounded-lg">
                <Clock size={20} className="mr-2" />
                <span>Estimated delivery time: 30-45 minutes</span>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 transition-shadow duration-300 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-6 border-b pb-2 text-gray-800 flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
                Payment Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tip ({tip}%)</span>
                  <span className="font-semibold">${tipAmount.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl text-indigo-700">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg"
              >
                <CreditCard size={20} className="mr-2" />
                Complete Payment
              </button>
              
              <div className="mt-6 text-sm text-gray-500 text-center">
                <div className="flex items-center justify-center space-x-4 mb-2">
                  <img src="/api/placeholder/24/24" alt="Visa" className="opacity-70" />
                  <img src="/api/placeholder/24/24" alt="Mastercard" className="opacity-70" />
                  <img src="/api/placeholder/24/24" alt="Amex" className="opacity-70" />
                </div>
                Secure payment processing. Your data is protected.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Add global animation classes
const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}
`;

// Append style to head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}

export default OrderCheckout;