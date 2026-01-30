// Stacks blockchain service

import { StacksMainnet, StacksTestnet } from '@stacks/network';

export const getNetwork = (isMainnet: boolean = true) => {
    return isMainnet ? new StacksMainnet() : new StacksTestnet();
};