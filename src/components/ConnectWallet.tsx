import React from 'react';
import { useStacks } from '../context/StacksContext';

export const ConnectWallet: React.FC = () => {
    const { authenticate, userData } = useStacks();

    if (userData) {
        return (
            <button className="wallet-btn connected">
                {userData.profile.stxAddress.mainnet}
            </button>
        );
    }

    return (
        <button className="wallet-btn" onClick={authenticate}>
            Connect Wallet
        </button>
    );
};