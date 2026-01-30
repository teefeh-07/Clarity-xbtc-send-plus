// Form types

export interface TransferFormData {
    recipient: string;
    amount: string;
    memo: string;
}

export interface BatchFormData {
    recipients: Array<{
        address: string;
        amount: string;
        memo: string;
    }>;
}