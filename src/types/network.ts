// Network types

export type NetworkType = 'mainnet' | 'testnet' | 'devnet';

export interface NetworkConfig {
    apiUrl: string;
    networkType: NetworkType;
    chainId: number;
}