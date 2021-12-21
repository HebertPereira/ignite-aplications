import React from 'react'
import { TransactionContextProps, useTransactions } from '../../providers/Auth';

import { TransactionsTableContainer } from './styles';

interface TransactionsTableProps {
    id: number,
    title: string,
    amount: number,
    category: string,
    createAt: string,
    type: string
}

function TransactionsTable() {
    const { transactions }: TransactionContextProps = useTransactions();

    return (
        <TransactionsTableContainer>
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((item: TransactionsTableProps) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td className={item.type}>
                                    {new Intl.NumberFormat('pt-br', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(item.amount)}
                                </td>
                                <td>{item.category}</td>
                                <td>
                                    {new Intl.DateTimeFormat('pt-br').format(new Date(item.createAt))}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </TransactionsTableContainer>
    );
}

export default TransactionsTable;
