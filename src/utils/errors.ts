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