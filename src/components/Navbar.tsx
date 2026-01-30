import React from 'react';
import { ConnectWallet } from './ConnectWallet';

export const Navbar = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', alignItems: 'center', background: '#333' }}>
            <div className="logo">xBTC Plus</div>
            <ConnectWallet />
        </nav>
    );
};