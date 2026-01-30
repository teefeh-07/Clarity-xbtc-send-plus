// Transaction types

export interface TransactionRecipient {
    to: string;
    amount: number;
    memo?: string;
}

export interface BatchTransaction {
    recipients: TransactionRecipient[];
    totalAmount: number;
    timestamp: number;
}