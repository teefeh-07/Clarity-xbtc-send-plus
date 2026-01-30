import React from 'react';
import { Header } from '../components/layout/Header';
import { Container } from '../components/layout/Container';
import { TransferForm } from '../components/TransferForm';

export const TransferPage: React.FC = () => {
    return (
        <>
            <Header />
            <main>
                <Container>
                    <h2>Single Transfer</h2>
                    <TransferForm />
                </Container>
            </main>
        </>
    );
};