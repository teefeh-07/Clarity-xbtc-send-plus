import React from 'react';
import { formatAmount } from '../../utils/format';

interface BalanceProps {
    amount: number;
    currency: string;
    decimals?: number;
}

export const Balance: React.FC<BalanceProps> = ({
    amount,
    currency,
    decimals = 8
}) => {
    return (
        <div className="balance">
            <span className="amount">{formatAmount(amount, decimals)}</span>
            <span className="currency">{currency}</span>
        </div>
    );
};