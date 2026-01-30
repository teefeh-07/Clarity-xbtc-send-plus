// Transaction types

export interface TransactionRecipient {
    to: string;
    amount: number;
    memo?: string;
}