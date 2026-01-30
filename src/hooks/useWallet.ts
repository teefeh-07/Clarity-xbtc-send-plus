// Custom wallet hook

import { useState, useCallback } from 'react';

export const useWallet = () => {
    const [connected, setConnected] = useState(false);
    
    return { connected };
};