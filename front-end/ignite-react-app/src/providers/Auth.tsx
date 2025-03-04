import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createAt: string;
}

type TransactionInputProps = Omit<Transaction, 'id' | 'createAt'>

interface TransactionsProviderProps {
    children: ReactNode
}

export interface TransactionContextProps {
    transactions: Transaction[],
    createTransaction: (transaction: TransactionInputProps) => Promise<void>;
}

export const TransactionContext = createContext<TransactionContextProps>(
    {} as TransactionContextProps
);

export function TransactionProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get(`/transactions`)
            .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInputProps) {
        const response = await api.post(`/transactions`, {
            ...transactionInput,
            createAt: new Date(),
        })

        const { transaction } = response.data

        setTransactions([
            ...transactions,
            transaction
        ])
    }

    return (
        <TransactionContext.Provider value={{
            transactions,
            createTransaction
        }}>
            {children}
        </TransactionContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionContext);
    return context;
}
