// Event types for application state

export interface WalletConnectedEvent {
    type: 'WALLET_CONNECTED';
    address: string;
    timestamp: number;
}