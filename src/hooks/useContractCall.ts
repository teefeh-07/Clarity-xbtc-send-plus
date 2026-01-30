import { useState, useCallback } from 'react';
import { openContractCall } from '@stacks/connect';
import { useStacks } from '../context/StacksContext';

export function useContractCall() {
    const [loading, setLoading] = useState(false);
    const [txId, setTxId] = useState<string | null>(null);
    const { userSession } = useStacks();

    const callContract = useCallback(async (options: any) => {
        setLoading(true);
        try {
            const result = await openContractCall({
                ...options,
                onFinish: (data: any) => {
                    setTxId(data.txId);
                    setLoading(false);
                },
                onCancel: () => {
                    setLoading(false);
                },
            });
            return result;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    }, []);

    return { callContract, loading, txId };
}