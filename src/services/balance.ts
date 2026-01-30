// Balance fetching service

const API_BASE = 'https://api.mainnet.hiro.so';

export const fetchStxBalance = async (address: string): Promise<number> => {
    const response = await fetch(
        `${API_BASE}/extended/v1/address/${address}/stx`
    );
    const data = await response.json();
    return parseInt(data.balance || '0');
};

export const fetchTokenBalances = async (address: string) => {
    const response = await fetch(
        `${API_BASE}/extended/v1/address/${address}/balances`
    );
    return response.json();
};