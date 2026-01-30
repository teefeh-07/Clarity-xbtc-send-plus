import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Container } from '../components/layout/Container';

export const HomePage: React.FC = () => {
    return (
        <>
            <Header />
            <main>
                <Container>
                    <section className="hero">
                        <h1>Welcome to xBTC Send Plus</h1>
                        <p>The most efficient way to send xBTC on Stacks</p>
                    </section>
                </Container>
            </main>
            <Footer />
        </>
    );
};