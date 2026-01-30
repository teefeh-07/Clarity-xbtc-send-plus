import React from 'react';
import { Header } from '../components/layout/Header';
import { Container } from '../components/layout/Container';

export const SettingsPage: React.FC = () => {
    return (
        <>
            <Header />
            <main>
                <Container>
                    <h2>Settings</h2>
                    <div className="settings-section">
                        <h3>Network</h3>
                        <select>
                            <option value="mainnet">Mainnet</option>
                            <option value="testnet">Testnet</option>
                        </select>
                    </div>
                </Container>
            </main>
        </>
    );
};