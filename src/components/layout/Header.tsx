import React from 'react';
import { ConnectWallet } from '../ConnectWallet';

export const Header: React.FC = () => {
    return (
        <header className="app-header">
            <div className="logo">
                <h1>xBTC Send Plus</h1>
            </div>
            <nav className="nav-links">
                <a href="/">Home</a>
                <a href="/transfer">Transfer</a>
                <a href="/batch">Batch</a>
                <a href="/history">History</a>
            </nav>
            <div className="wallet-section">
                <ConnectWallet />
            </div>
        </header>
    );
};