import React, { useState } from 'react';
import { ArrowLeft, Printer, Plus, Minus, Trash2, Clock, CreditCard, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

const OrderCheckout = () => {
  const [orderItems, setOrderItems] = useState([
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

  const [expandedItem, setExpandedItem] = useState(null);
  const [tip, setTip] = useState(15);
  const [showReceipt, setShowReceipt] = useState(false);

  const toggleItemExpansion = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const updateQuantity = (id, change) => {
    setOrderItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const updateOption = (itemId, optionId, value) => {
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
  };

  const toggleTopping = (itemId, toppingId) => {
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
  };

  const updateSpecialInstructions = (itemId, instructions) => {
    setOrderItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, specialInstructions: instructions }
          : item
      )
    );
  };

  const calculateItemTotal = (item) => {
    let total = item.price * item.quantity;
    
    // Add selected options cost
    item.options?.forEach(option => {
      if (option.price && option.selected) {
        total += option.price * item.quantity;
      }
    });
    
    // Add selected toppings cost
    item.toppings?.forEach(topping => {
      if (topping.selected) {
        total += topping.price * item.quantity;
      }
    });
    
    return total;
  };

  const subtotal = orderItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const tipAmount = (subtotal * tip) / 100;
  const tax = subtotal * 0.0825;
  const total = subtotal + tipAmount + tax;

  const OrderItem = ({ item }) => {
    const isExpanded = expandedItem === item.id;
    
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div className="ml-4 flex-grow">
            <h3 className="font-semibold text-gray-800">{item.name}</h3>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            <button
              onClick={() => toggleItemExpansion(item.id)}
              className="text-amber-500 hover:text-amber-600 text-sm flex items-center mt-2"
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={16} className="mr-1" />
                  Hide options
                </>
              ) : (
                <>
                  <ChevronDown size={16} className="mr-1" />
                  Customize order
                </>
              )}
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateQuantity(item.id, -1)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Minus size={20} />
            </button>
            <span className="font-semibold">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, 1)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Plus size={20} />
            </button>
            <button
              onClick={() => updateQuantity(item.id, -item.quantity)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4 border-t pt-4">
            {/* Options */}
            {item.options?.map(option => (
              <div key={option.id} className="space-y-2">
                <label className="font-medium text-gray-700">{option.name}</label>
                <div className="flex flex-wrap gap-2">
                  {option.choices.map(choice => (
                    <button
                      key={choice}
                      onClick={() => updateOption(item.id, option.id, choice)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        option.selected === choice
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {choice} {option.price ? `(+$${option.price.toFixed(2)})` : ''}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Toppings */}
            {item.toppings?.length > 0 && (
              <div className="space-y-2">
                <label className="font-medium text-gray-700">Additional Toppings</label>
                <div className="space-y-2">
                  {item.toppings.map(topping => (
                    <div key={topping.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${item.id}-${topping.id}`}
                        checked={topping.selected}
                        onChange={() => toggleTopping(item.id, topping.id)}
                        className="rounded text-amber-500 focus:ring-amber-500"
                      />
                      <label htmlFor={`${item.id}-${topping.id}`} className="ml-2 text-gray-700">
                        {topping.name} (+${topping.price.toFixed(2)})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div className="space-y-2">
              <label className="font-medium text-gray-700 flex items-center">
                <MessageSquare size={16} className="mr-2" />
                Special Instructions
              </label>
              <textarea
                value={item.specialInstructions}
                onChange={(e) => updateSpecialInstructions(item.id, e.target.value)}
                placeholder="Any special requests?"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                rows="2"
              />
            </div>

            {/* Item Total */}
            <div className="text-right text-gray-700">
              Item Total: <span className="font-semibold">${calculateItemTotal(item).toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ... (keep the existing Receipt component and other code)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button onClick={() => window.history.back()} className="text-gray-600 hover:text-gray-900 mr-4">
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
            <div className="space-y-4">
              {orderItems.map(item => (
                <OrderItem key={item.id} item={item} />
              ))}
            </div>

            {/* ... (keep existing delivery info section) */}
          </div>

          {/* ... (keep existing payment summary section) */}
        </div>
      </main>
    </div>
  );
};

export default OrderCheckout;