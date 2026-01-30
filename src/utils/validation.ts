// Validation utilities

export const isValidStacksAddress = (address: string): boolean => {
    return /^S[PM][A-Z0-9]{38,39}$/.test(address);
};

export const isValidAmount = (amount: number): boolean => {
    return amount > 0 && Number.isFinite(amount);
};