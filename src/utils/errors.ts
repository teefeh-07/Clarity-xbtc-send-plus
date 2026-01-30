// Error handling utilities

export class AppError extends Error {
    constructor(
        message: string,
        public code: string,
        public details?: any
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const createError = (code: string, message: string, details?: any) => {
    return new AppError(message, code, details);
};

export const ERROR_CODES = {
    WALLET_NOT_CONNECTED: 'WALLET_NOT_CONNECTED',
    INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
    INVALID_ADDRESS: 'INVALID_ADDRESS',
    TRANSACTION_FAILED: 'TRANSACTION_FAILED',
    NETWORK_ERROR: 'NETWORK_ERROR',
} as const;