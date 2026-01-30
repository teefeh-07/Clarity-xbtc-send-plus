// Contract types

export interface ContractCallOptions {
    contractAddress: string;
    contractName: string;
    functionName: string;
    functionArgs: any[];
}

export interface ContractDeployOptions {
    codeBody: string;
    contractName: string;
    network: 'mainnet' | 'testnet';
}