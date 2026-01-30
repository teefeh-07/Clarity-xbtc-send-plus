import React from 'react';
import { formatAddress } from '../../utils/format';

interface TransactionLinkProps {
    txId: string;
    network?: 'mainnet' | 'testnet';
}

export const TransactionLink: React.FC<TransactionLinkProps> = ({
    txId,
    network = 'mainnet'
}) => {
    const explorerUrl = network === 'mainnet'
        ? `https://explorer.stacks.co/txid/${txId}`
        : `https://explorer.stacks.co/txid/${txId}?chain=testnet`;

    return (
        <a 
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transaction-link"
        >
            {formatAddress(txId)}
        </a>
    );
};