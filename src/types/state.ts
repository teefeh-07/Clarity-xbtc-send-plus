// Application state types

export interface AppState {
    isLoading: boolean;
    error: string | null;
}

export interface WalletState {
    isConnected: boolean;
    address: string | null;
    balance: {
        stx: number;
        xbtc: number;
    };
}

export interface TransactionState {
    pending: string[];
    confirmed: string[];
    failed: string[];
}