// Formatting utilities

export const formatAddress = (address: string): string => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatAmount = (amount: number, decimals: number = 8): string => {
    return (amount / Math.pow(10, decimals)).toFixed(decimals);
};

export const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString();
};