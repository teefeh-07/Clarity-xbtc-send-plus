// Wallet related types

export interface WalletState {
    connected: boolean;
    address: string | null;
    balance: number;
}

export interface WalletProvider {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    getAddress: () => string | null;
}