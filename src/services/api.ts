// API service for external calls

const API_BASE = 'https://api.mainnet.hiro.so';

export const fetchTransaction = async (txId: string) => {
    const response = await fetch(`${API_BASE}/extended/v1/tx/${txId}`);
    return response.json();
};

export const fetchAddressTransactions = async (address: string, limit: number = 20) => {
    const response = await fetch(`${API_BASE}/extended/v1/address/${address}/transactions?limit=${limit}`);
    return response.json();
};