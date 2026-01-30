// Clarity type helpers

import { 
    uintCV, 
    principalCV, 
    bufferCV,
    listCV,
    tupleCV
} from '@stacks/transactions';

export const toUint = (value: number) => uintCV(value);
export const toPrincipal = (address: string) => principalCV(address);