import React from 'react';
import { RecipientInput } from '../forms/RecipientInput';

interface Recipient {
    address: string;
    amount: string;
    memo: string;
}

interface RecipientListProps {
    recipients: Recipient[];
    onChange: (index: number, field: keyof Recipient, value: string) => void;
    onRemove: (index: number) => void;
}

export const RecipientList: React.FC<RecipientListProps> = ({
    recipients,
    onChange,
    onRemove,
}) => {
    return (
        <div className="recipient-list">
            {recipients.map((recipient, index) => (
                <div key={index} className="recipient-item">
                    <RecipientInput
                        value={recipient.address}
                        onChange={(value) => onChange(index, 'address', value)}
                        onRemove={() => onRemove(index)}
                        showRemove={recipients.length > 1}
                    />
                </div>
            ))}
        </div>
    );
};