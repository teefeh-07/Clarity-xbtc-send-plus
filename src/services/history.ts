// Transaction history service

const API_BASE = 'https://api.mainnet.hiro.so';

export const fetchTransactionHistory = async (
    address: string,
    limit = 20,
    offset = 0
) => {
    const response = await fetch(
        `${API_BASE}/extended/v1/address/${address}/transactions?limit=${limit}&offset=${offset}`
    );
    return response.json();
};

export const fetchTransactionDetails = async (txId: string) => {
    const response = await fetch(
        `${API_BASE}/extended/v1/tx/${txId}`
    );
    return response.json();
};