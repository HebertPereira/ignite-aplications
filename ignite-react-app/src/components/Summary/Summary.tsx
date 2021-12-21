import React from 'react';
import { TransactionContextProps, useTransactions } from '../../providers/Auth';
import formatMonetary from '../../utils/fomatMonetary';

import { SummaryContainer } from './styles'

function Summary() {
    const { transactions }: TransactionContextProps = useTransactions();

    const summary = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'deposit') {
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        }
        else {
            acc.withdraws += transaction.amount;
            acc.total += transaction.amount;
        }
        return acc
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0
    })
    return (
        <SummaryContainer>
            <div>
                <header>
                    <p>Entradas</p>
                    <span>@Icone</span>
                </header>
                <strong>{formatMonetary(summary.deposits)}</strong>
            </div>
            <div>
                <header>
                    <p>Saidas</p>
                    <span>@Icone</span>
                </header>
                <strong>{formatMonetary(summary.withdraws)}</strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <span>@Icone</span>
                </header>
                <strong>{formatMonetary(summary.total)}</strong>
            </div>
        </SummaryContainer>
    );
}

export default Summary;