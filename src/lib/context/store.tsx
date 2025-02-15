"use client";
import { createContext, useContext, useEffect } from 'react';
import { observable, observe } from '@legendapp/state';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  discountCode: string | null;
  discount: number;
  deliveryFee: number;
  totalItems: number;
  subtotal: number;
  total: number;
}

interface CartContextValue extends CartState {
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (code: string, percentOff: number) => void;
  removeDiscount: () => void;
  updateDeliveryFee: (fee: number) => void;
  isInCart: (itemId: string) => boolean;
  getItemQuantity: (itemId: string) => number;
}

const cartState = observable<Omit<CartState, 'totalItems' | 'subtotal' | 'total'>>({
  items: [],
  discountCode: null,
  discount: 0,
  deliveryFee: 4.99,
});

// Computed properties
const totalItems = observable(() => 
  cartState.items.get().reduce((sum, item) => sum + item.quantity, 0)
);
const subtotal = observable(() =>
  cartState.items.get().reduce((sum, item) => sum + item.price * item.quantity, 0)
);
const total = observable(() =>
  subtotal.get() - cartState.discount.get() + cartState.deliveryFee.get()
);

// Context setup
const CartContext = createContext<CartContextValue>({} as CartContextValue);

// Helper functions
const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
  const items = cartState.items.get();
  const existingIndex = items.findIndex(i => i.id === item.id);
  const quantity = item.quantity ?? 1;

  if (existingIndex > -1) {
    cartState.items[existingIndex].quantity.set(q => q + quantity);
  } else {
    cartState.items.push({ ...item, quantity });
  }
};

const removeItem = (itemId: string) => {
  cartState.items.set(items => items.filter(item => item.id !== itemId));
};

const updateQuantity = (itemId: string, quantity: number) => {
  if (quantity < 1) return;
  
  cartState.items.set(items =>
    items.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    )
  );
};

const clearCart = () => {
  cartState.items.set([]);
  cartState.discountCode.set(null);
  cartState.discount.set(0);
};

const applyDiscount = (code: string, percentOff: number) => {
  cartState.discountCode.set(code);
  cartState.discount.set(subtotal.get() * (percentOff / 100));
};

const removeDiscount = () => {
  cartState.discountCode.set(null);
  cartState.discount.set(0);
};

const updateDeliveryFee = (fee: number) => {
  cartState.deliveryFee.set(fee);
};

const isInCart = (itemId: string) => {
  return cartState.items.get().some(item => item.id === itemId);
};

const getItemQuantity = (itemId: string) => {
  const item = cartState.items.get().find(item => item.id === itemId);
  return item?.quantity ?? 0;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // Load/save persistence
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        cartState.items.set(parsed.items || []);
        cartState.discountCode.set(parsed.discountCode ?? null);
        cartState.discount.set(parsed.discount || 0);
        cartState.deliveryFee.set(parsed.deliveryFee ?? 4.99);
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }

    const unobserve = observe(() => {
      const persistState = {
        items: cartState.items.get(),
        discountCode: cartState.discountCode.get(),
        discount: cartState.discount.get(),
        deliveryFee: cartState.deliveryFee.get(),
      };
      localStorage.setItem('cart', JSON.stringify(persistState));
    });

    return unobserve;
  }, []);

  const value = {
    items: cartState.items.get(),
    discountCode: cartState.discountCode.get(),
    discount: cartState.discount.get(),
    deliveryFee: cartState.deliveryFee.get(),
    totalItems: totalItems.get(),
    subtotal: subtotal.get(),
    total: total.get(),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyDiscount,
    removeDiscount,
    updateDeliveryFee,
    isInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};