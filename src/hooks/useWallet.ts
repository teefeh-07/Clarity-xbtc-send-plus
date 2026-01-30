// Custom wallet hook

import { useState, useCallback } from 'react';
import { useStacks } from '../context/StacksContext';

export const useWallet = () => {
    const { userData, authenticate } = useStacks();
    
    const connect = useCallback(() => {
        authenticate();
    }, [authenticate]);
    
    return { 
        connected: !!userData,
        address: userData?.profile?.stxAddress?.mainnet,
        connect
    };
};