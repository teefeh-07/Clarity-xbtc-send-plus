import React from 'react';
import { Header } from '../components/layout/Header';
import { Container } from '../components/layout/Container';
import { TransactionHistory } from '../components/TransactionHistory';

export const HistoryPage: React.FC = () => {
    return (
        <>
            <Header />
            <main>
                <Container>
                    <h2>Transaction History</h2>
                    <TransactionHistory />
                </Container>
            </main>
        </>
    );
};