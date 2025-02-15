'use client';
import React, { useState } from 'react';
import { PlusCircleIcon, MinusCircleIcon, ChevronDownIcon, ChevronUpIcon, XIcon, EditIcon } from 'lucide-react';

// Define the types
interface OrderItemOption {
  id: number;
  name: string;
  price: number;
  selected: boolean;
}

interface OrderItemTopping {
  id: number;
  name: string;
  price: number;
  selected: boolean;
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
  category?: string;
}

interface CartItemProps {
  item: OrderItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onUpdateOptions: (id: number, options: OrderItemOption[]) => void;
  onUpdateToppings: (id: number, toppings: OrderItemTopping[]) => void;
  onUpdateInstructions: (id: number, instructions: string) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onUpdateOptions,
  onUpdateToppings,
  onUpdateInstructions,
  onRemove
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [instructions, setInstructions] = useState(item.specialInstructions);

  // Calculate the base price (item price × quantity)
  const basePrice = item.price * item.quantity;
  
  // Calculate additional costs from selected options and toppings
  const optionsTotal = item.options
    .filter(option => option.selected)
    .reduce((sum, option) => sum + option.price, 0) * item.quantity;
  
  const toppingsTotal = item.toppings
    .filter(topping => topping.selected)
    .reduce((sum, topping) => sum + topping.price, 0) * item.quantity;
  
  // Calculate the total price for this item
  const totalPrice = basePrice + optionsTotal + toppingsTotal;

  const handleOptionToggle = (optionId: number) => {
    const updatedOptions = item.options.map(option => 
      option.id === optionId ? { ...option, selected: !option.selected } : option
    );
    onUpdateOptions(item.id, updatedOptions);
  };

  const handleToppingToggle = (toppingId: number) => {
    const updatedToppings = item.toppings.map(topping => 
      topping.id === toppingId ? { ...topping, selected: !topping.selected } : topping
    );
    onUpdateToppings(item.id, updatedToppings);
  };

  const handleInstructionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInstructions(e.target.value);
  };

  const handleInstructionsBlur = () => {
    onUpdateInstructions(item.id, instructions);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Main item row */}
      <div className="p-4 flex flex-col sm:flex-row">
        {/* Item image */}
        <div className="w-full sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover rounded-md" 
          />
        </div>

        {/* Item details */}
        <div className="flex-1 sm:ml-4 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-800">{item.name}</h3>
            <span className="font-semibold text-indigo-600">${totalPrice.toFixed(2)}</span>
          </div>

          {/* Selected options and toppings summary */}
          {(item.options.some(o => o.selected) || item.toppings.some(t => t.selected)) && (
            <div className="mb-2 text-sm text-gray-600">
              {item.options.filter(o => o.selected).map(o => o.name).join(', ')}
              {item.options.some(o => o.selected) && item.toppings.some(t => t.selected) ? ', ' : ''}
              {item.toppings.filter(t => t.selected).map(t => t.name).join(', ')}
            </div>
          )}

          {/* Quantity controls and remove button */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                className="text-gray-500 hover:text-indigo-600 transition-colors"
                aria-label="Decrease quantity"
              >
                <MinusCircleIcon className="w-6 h-6" />
              </button>
              <span className="font-medium text-gray-700 w-6 text-center">{item.quantity}</span>
              <button 
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="text-gray-500 hover:text-indigo-600 transition-colors"
                aria-label="Increase quantity"
              >
                <PlusCircleIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-indigo-600 text-sm font-medium flex items-center hover:text-indigo-700"
                aria-expanded={isExpanded}
                aria-controls={`customize-${item.id}`}
              >
                <EditIcon className="w-4 h-4 mr-1" />
                Customize
                {isExpanded ? 
                  <ChevronUpIcon className="w-4 h-4 ml-1" /> : 
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                }
              </button>
              <button 
                onClick={() => onRemove(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remove item"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded customization area */}
      {isExpanded && (
        <div 
          id={`customize-${item.id}`}
          className="border-t border-gray-100 px-4 py-3 space-y-4 bg-gray-50"
        >
          {/* Options section */}
          {item.options.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Sauce Options (Free)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.options.map(option => (
                  <label 
                    key={option.id} 
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={option.selected}
                      onChange={() => handleOptionToggle(option.id)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                    />
                    <span className="text-gray-700">{option.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Toppings section */}
          {item.toppings.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Extra Toppings</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.toppings.map(topping => (
                  <label 
                    key={topping.id} 
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={topping.selected}
                        onChange={() => handleToppingToggle(topping.id)}
                        className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      />
                      <span className="text-gray-700">{topping.name}</span>
                    </div>
                    <span className="text-gray-500 text-sm">
                      +${topping.price.toFixed(2)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Special instructions */}
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Special Instructions</h4>
            <textarea
              value={instructions}
              onChange={handleInstructionsChange}
              onBlur={handleInstructionsBlur}
              placeholder="Any special requests? (e.g., allergies, spice level)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              rows={3}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Example usage with sample data
const CartItemExample = () => {
  const [sampleItem, setSampleItem] = useState<OrderItemType>({
    id: 1,
    name: "Deluxe Burger",
    price: 12.99,
    quantity: 1,
    image: "/api/placeholder/150/150",
    options: [
      { id: 1, name: "Ketchup", price: 0, selected: true },
      { id: 2, name: "Mayonnaise", price: 0, selected: false },
      { id: 3, name: "BBQ Sauce", price: 0, selected: false },
      { id: 4, name: "Mustard", price: 0, selected: false },
    ],
    toppings: [
      { id: 1, name: "Extra Cheese", price: 1.50, selected: false },
      { id: 2, name: "Bacon", price: 2.00, selected: true },
      { id: 3, name: "Avocado", price: 1.75, selected: false },
      { id: 4, name: "Fried Egg", price: 1.25, selected: false },
    ],
    specialInstructions: "Medium well, please.",
    category: "Burgers"
  });

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setSampleItem(prev => ({ ...prev, quantity }));
  };

  const handleUpdateOptions = (id: number, options: OrderItemOption[]) => {
    setSampleItem(prev => ({ ...prev, options }));
  };

  const handleUpdateToppings = (id: number, toppings: OrderItemTopping[]) => {
    setSampleItem(prev => ({ ...prev, toppings }));
  };

  const handleUpdateInstructions = (id: number, specialInstructions: string) => {
    setSampleItem(prev => ({ ...prev, specialInstructions }));
  };

  const handleRemove = (id: number) => {
    alert(`Item ${id} would be removed`);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      <CartItem
        item={sampleItem}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateOptions={handleUpdateOptions}
        onUpdateToppings={handleUpdateToppings}
        onUpdateInstructions={handleUpdateInstructions}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default CartItemExample;