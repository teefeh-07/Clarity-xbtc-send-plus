import React from 'react';
import { Card, Spinner } from './ui';
import { useTransactions } from '../hooks/useTransactions';
import { useWallet } from '../hooks/useWallet';

export const TransactionHistory: React.FC = () => {
    const { address } = useWallet();
    const { transactions, loading } = useTransactions(address);
    
    if (loading) return <Spinner />;
    
    return (
        <Card title="Transaction History">
            {transactions.length === 0 ? (
                <p>No transactions yet</p>
            ) : (
                <ul>
                    {transactions.map((tx: any, i: number) => (
                        <li key={i}>{tx.hash}</li>
                    ))}
                </ul>
            )}
        </Card>
    );
};