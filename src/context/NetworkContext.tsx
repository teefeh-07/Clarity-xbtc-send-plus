import React, { createContext, useContext, useState } from 'react';
import { StacksMainnet, StacksTestnet } from '@stacks/network';

type NetworkType = 'mainnet' | 'testnet';

interface NetworkContextValue {
    networkType: NetworkType;
    network: StacksMainnet | StacksTestnet;
    setNetworkType: (type: NetworkType) => void;
}

const NetworkContext = createContext<NetworkContextValue | undefined>(undefined);

export const NetworkProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [networkType, setNetworkType] = useState<NetworkType>('mainnet');
    
    const network = networkType === 'mainnet' 
        ? new StacksMainnet() 
        : new StacksTestnet();

    return (
        <NetworkContext.Provider value={{ networkType, network, setNetworkType }}>
            {children}
        </NetworkContext.Provider>
    );
};

export const useNetwork = () => {
    const context = useContext(NetworkContext);
    if (!context) throw new Error('useNetwork must be used within NetworkProvider');
    return context;
};