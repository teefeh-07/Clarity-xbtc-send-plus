import React from 'react';
import { Card } from '../ui/Card';
import { formatAmount } from '../../utils/format';

interface TransferSummaryProps {
    totalAmount: number;
    recipientCount: number;
    estimatedFee: number;
}

export const TransferSummary: React.FC<TransferSummaryProps> = ({
    totalAmount,
    recipientCount,
    estimatedFee,
}) => {
    return (
        <Card title="Transfer Summary">
            <div className="summary-row">
                <span>Recipients:</span>
                <span>{recipientCount}</span>
            </div>
            <div className="summary-row">
                <span>Total Amount:</span>
                <span>{formatAmount(totalAmount)} xBTC</span>
            </div>
            <div className="summary-row">
                <span>Estimated Fee:</span>
                <span>{formatAmount(estimatedFee)} STX</span>
            </div>
        </Card>
    );
};