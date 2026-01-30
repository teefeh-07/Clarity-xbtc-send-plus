// Validation utilities

export const isValidStacksAddress = (address: string): boolean => {
    return /^S[PM][A-Z0-9]{38,39}$/.test(address);
};