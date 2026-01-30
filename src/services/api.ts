// API service for external calls

const API_BASE = 'https://api.mainnet.hiro.so';

export const fetchTransaction = async (txId: string) => {
    const response = await fetch(`${API_BASE}/extended/v1/tx/${txId}`);
    return response.json();
};