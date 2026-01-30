// Transaction history hook

import { useState, useEffect } from 'react';

export const useTransactions = (address: string | null) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    
    return { transactions, loading };
};