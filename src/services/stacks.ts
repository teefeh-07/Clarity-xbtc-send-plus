// Stacks blockchain service

import { StacksMainnet, StacksTestnet } from '@stacks/network';

export const getNetwork = (isMainnet: boolean = true) => {
    return isMainnet ? new StacksMainnet() : new StacksTestnet();
};

export const fetchAccountBalance = async (address: string) => {
    const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/address/${address}/balances`);
    return response.json();
};