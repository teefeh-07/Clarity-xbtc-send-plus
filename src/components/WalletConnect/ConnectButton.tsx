import React from 'react';
import { useWallet } from '../../hooks/useWallet';
import { Button } from '../ui/Button';

export const ConnectButton: React.FC = () => {
    const { connected, connect } = useWallet();

    if (connected) {
        return <Button variant="secondary">Disconnect</Button>;
    }

    return (
        <Button onClick={connect}>
            Connect Wallet
        </Button>
    );
};