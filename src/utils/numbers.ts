// Number utilities

export const toMicroUnits = (amount: number, decimals: number = 8): number => {
    return Math.round(amount * Math.pow(10, decimals));
};

export const fromMicroUnits = (amount: number, decimals: number = 8): number => {
    return amount / Math.pow(10, decimals);
};