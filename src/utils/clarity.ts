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

export const toMemo = (memo: string) => {
    const encoder = new TextEncoder();
    return bufferCV(encoder.encode(memo.slice(0, 34)));
};

export const buildRecipientTuple = (
    to: string,
    amount: number,
    memo: string
) => tupleCV({
    to: toPrincipal(to),
    'xbtc-in-sats': toUint(amount),
    memo: toMemo(memo),
    'swap-to-ustx': uintCV(0),
    'min-dy': uintCV(0)
});