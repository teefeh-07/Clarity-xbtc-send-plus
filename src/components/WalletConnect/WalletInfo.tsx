import React from 'react';
import { useWallet } from '../../hooks/useWallet';
import { Address } from '../display/Address';
import { Balance } from '../display/Balance';

export const WalletInfo: React.FC = () => {
    const { address, connected } = useWallet();

    if (!connected || !address) {
        return <p>No wallet connected</p>;
    }

    return (
        <div className="wallet-info">
            <Address address={address} />
        </div>
    );
};