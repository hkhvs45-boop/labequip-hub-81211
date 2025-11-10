import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

export interface RFQItem {
  id: string;
  name: string;
  category: string;
  image: string;
  quantity: number;
}

interface RFQContextType {
  items: RFQItem[];
  addItem: (item: Omit<RFQItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearItems: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const RFQContext = createContext<RFQContextType | undefined>(undefined);

export const RFQProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<RFQItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (item: Omit<RFQItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        toast.info('محصول قبلاً اضافه شده است');
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      toast.success('محصول به لیست استعلام اضافه شد');
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('محصول از لیست حذف شد');
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const clearItems = () => {
    setItems([]);
  };

  return (
    <RFQContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearItems, isOpen, setIsOpen }}>
      {children}
    </RFQContext.Provider>
  );
};

export const useRFQ = () => {
  const context = useContext(RFQContext);
  if (!context) {
    throw new Error('useRFQ must be used within RFQProvider');
  }
  return context;
};
