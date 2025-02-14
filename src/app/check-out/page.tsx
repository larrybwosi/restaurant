'use client';
import React, { useState } from 'react';
import { ArrowLeft, Printer, Plus, Minus, Trash2, Clock, CreditCard } from 'lucide-react';

const OrderCheckout = () => {
  const [orderItems, setOrderItems] = useState([
    { id: 1, name: "Eagle's Signature Steak", price: 35.00, quantity: 1, image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6" },
    { id: 2, name: "Grilled Mountain Salmon", price: 28.00, quantity: 1, image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927" },
    { id: 3, name: "Truffle Fries", price: 12.00, quantity: 1, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877" }
  ]);

  const [tip, setTip] = useState(15);
  const [showReceipt, setShowReceipt] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const updateQuantity = (id, change) => {
    setOrderItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tipAmount = (subtotal * tip) / 100;
  const tax = subtotal * 0.0825; // 8.25% tax
  const total = subtotal + tipAmount + tax;

  const handlePayment = () => {
    setPaymentComplete(true);
    setShowReceipt(true);
  };

  const Receipt = () => (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
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
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600 mb-4">Thank you for dining with us!</p>
        <button
          onClick={() => window.print()}
          className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center mx-auto"
        >
          <Printer size={20} className="mr-2" />
          Print Receipt
        </button>
      </div>
    </div>
  );

  if (showReceipt) {
    return <Receipt />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button onClick={() => window.history.back()} className="text-gray-600 hover:text-gray-900 mr-4">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Order Summary */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-6">
                {orderItems.map(item => (
                  <div key={item.id} className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="ml-4 flex-grow">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
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
                ))}
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-4">Add a Tip</h3>
                <div className="flex space-x-4">
                  {[10, 15, 20, 25].map(percentage => (
                    <button
                      key={percentage}
                      onClick={() => setTip(percentage)}
                      className={`px-4 py-2 rounded-full ${
                        tip === percentage
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      } transition-colors duration-300`}
                    >
                      {percentage}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h2 className="text-xl font-semibold mb-6">Delivery Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 md:col-span-2"
                />
              </div>
              <div className="mt-4 flex items-center text-gray-600">
                <Clock size={20} className="mr-2" />
                <span>Estimated delivery time: 30-45 minutes</span>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Payment Summary</h2>
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
                    <span className="font-bold text-xl">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full mt-6 bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition-colors duration-300 flex items-center justify-center"
              >
                <CreditCard size={20} className="mr-2" />
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderCheckout;