// Wallet related types

export interface WalletState {
    connected: boolean;
    address: string | null;
    balance: number;
}