import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FabricAnalysis {
  type: string;
  color: string;
  pattern: string;
  quality: string;
  length?: number;
  width?: number;
  sufficient: boolean;
}

export interface Design {
  id: string;
  name: string;
  style: string;
  neckline: string;
  image: string;
  accessories: Accessory[];
}

export interface Accessory {
  id: number;
  name: string;
  price: number;
  category: string;
  image?: string;
}

export interface Order {
  id: string;
  design: Design | null;
  fabric: string | null;
  accessories: Accessory[];
  notes: string;
  status: 'draft' | 'posted' | 'bidding' | 'booked' | 'in_progress' | 'completed';
  bids: Bid[];
  selectedTailor: Tailor | null;
  logistics: LogisticsOption | null;
  measurements: Measurements | null;
  payment: PaymentInfo | null;
}

export interface Bid {
  id: string;
  tailor: Tailor;
  amount: number;
  estimatedDays: number;
  message: string;
  createdAt: Date;
}

export interface Tailor {
  id: string;
  name: string;
  shopName: string;
  rating: number;
  reviewCount: number;
  avatar?: string;
  specialties: string[];
}

export interface LogisticsOption {
  type: 'home_pickup' | 'self_drop' | 'tailor_delivery';
  address?: string;
  date?: string;
  notes?: string;
}

export interface Measurements {
  chest: number;
  waist: number;
  hips: number;
  length: number;
  shoulder: number;
  sleeves: string;
  neckline: string;
  additionalNotes: string;
}

export interface PaymentInfo {
  method: string;
  status: 'pending' | 'completed';
  amount: number;
  transactionId?: string;
}

interface DesignContextType {
  // Fabric state
  uploadedFabric: string | null;
  setUploadedFabric: (fabric: string | null) => void;
  fabricAnalysis: FabricAnalysis | null;
  setFabricAnalysis: (analysis: FabricAnalysis | null) => void;
  
  // Design state
  generatedDesigns: Design[];
  setGeneratedDesigns: (designs: Design[]) => void;
  selectedDesign: Design | null;
  setSelectedDesign: (design: Design | null) => void;
  
  // Accessories state
  selectedAccessories: Accessory[];
  addAccessory: (accessory: Accessory) => void;
  removeAccessory: (id: number) => void;
  clearAccessories: () => void;
  
  // Order state
  currentOrder: Order | null;
  setCurrentOrder: (order: Order | null) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  
  // Workflow state
  workflowStep: 'fabric' | 'design' | 'accessories' | 'tryon' | 'order' | 'bidding' | 'booking' | 'payment';
  setWorkflowStep: (step: 'fabric' | 'design' | 'accessories' | 'tryon' | 'order' | 'bidding' | 'booking' | 'payment') => void;
  
  // User image for try-on
  userImage: string | null;
  setUserImage: (image: string | null) => void;
  
  // Reset all
  resetDesignFlow: () => void;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export const DesignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [uploadedFabric, setUploadedFabric] = useState<string | null>(null);
  const [fabricAnalysis, setFabricAnalysis] = useState<FabricAnalysis | null>(null);
  const [generatedDesigns, setGeneratedDesigns] = useState<Design[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [selectedAccessories, setSelectedAccessories] = useState<Accessory[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [workflowStep, setWorkflowStep] = useState<'fabric' | 'design' | 'accessories' | 'tryon' | 'order' | 'bidding' | 'booking' | 'payment'>('fabric');
  const [userImage, setUserImage] = useState<string | null>(null);

  const addAccessory = (accessory: Accessory) => {
    setSelectedAccessories(prev => 
      prev.find(a => a.id === accessory.id) ? prev : [...prev, accessory]
    );
  };

  const removeAccessory = (id: number) => {
    setSelectedAccessories(prev => prev.filter(a => a.id !== id));
  };

  const clearAccessories = () => {
    setSelectedAccessories([]);
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [...prev, order]);
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  const resetDesignFlow = () => {
    setUploadedFabric(null);
    setFabricAnalysis(null);
    setGeneratedDesigns([]);
    setSelectedDesign(null);
    setSelectedAccessories([]);
    setCurrentOrder(null);
    setWorkflowStep('fabric');
  };

  return (
    <DesignContext.Provider value={{
      uploadedFabric,
      setUploadedFabric,
      fabricAnalysis,
      setFabricAnalysis,
      generatedDesigns,
      setGeneratedDesigns,
      selectedDesign,
      setSelectedDesign,
      selectedAccessories,
      addAccessory,
      removeAccessory,
      clearAccessories,
      currentOrder,
      setCurrentOrder,
      orders,
      addOrder,
      updateOrder,
      workflowStep,
      setWorkflowStep,
      userImage,
      setUserImage,
      resetDesignFlow,
    }}>
      {children}
    </DesignContext.Provider>
  );
};

export const useDesign = () => {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error('useDesign must be used within a DesignProvider');
  }
  return context;
};
