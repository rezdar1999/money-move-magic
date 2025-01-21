import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

interface Transaction {
  code: number;
  senderName: string;
  senderPhone: string;
  receiverName: string;
  receiverPhone: string;
  destination: string;
  amount: number;
  commissionPaid: boolean;
  received: boolean;
  receivedAt?: Date;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'code' | 'received'>) => void;
  getTransaction: (code: number) => Transaction | undefined;
  markAsReceived: (code: number) => void;
}

const TransactionContext = createContext<TransactionContextType | null>(null);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [lastCode, setLastCode] = useState(1000);

  const addTransaction = (transaction: Omit<Transaction, 'code' | 'received'>) => {
    const newCode = lastCode + 1;
    setLastCode(newCode);
    setTransactions([...transactions, { ...transaction, code: newCode, received: false }]);
    toast.success('تم إضافة الحوالة بنجاح');
  };

  const getTransaction = (code: number) => {
    return transactions.find(t => t.code === code);
  };

  const markAsReceived = (code: number) => {
    setTransactions(transactions.map(t => 
      t.code === code ? { ...t, received: true, receivedAt: new Date() } : t
    ));
    toast.success('تم استلام الحوالة بنجاح');
  };

  return (
    <TransactionContext.Provider value={{ 
      transactions, 
      addTransaction, 
      getTransaction,
      markAsReceived 
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}