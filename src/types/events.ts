// Event types for application state

export interface WalletConnectedEvent {
    type: 'WALLET_CONNECTED';
    address: string;
    timestamp: number;
}

export interface TransactionSubmittedEvent {
    type: 'TRANSACTION_SUBMITTED';
    txId: string;
    timestamp: number;
}