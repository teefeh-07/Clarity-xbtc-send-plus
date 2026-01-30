import React from 'react';
import { Header } from '../components/layout/Header';
import { Container } from '../components/layout/Container';
import { BatchTransfer } from '../components/BatchTransfer';

export const BatchPage: React.FC = () => {
    return (
        <>
            <Header />
            <main>
                <Container>
                    <h2>Batch Transfer</h2>
                    <p>Send xBTC to multiple recipients in one transaction</p>
                    <BatchTransfer />
                </Container>
            </main>
        </>
    );
};