// Number utilities

export const toMicroUnits = (amount: number, decimals: number = 8): number => {
    return Math.round(amount * Math.pow(10, decimals));
};

export const fromMicroUnits = (amount: number, decimals: number = 8): number => {
    return amount / Math.pow(10, decimals);
};

export const formatUSD = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

export const formatNumber = (amount: number, decimals: number = 2): string => {
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: decimals,
    }).format(amount);
};