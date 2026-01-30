import React, { useState } from 'react';
import { Button, Card } from './ui';

interface Recipient {
    address: string;
    amount: number;
    memo: string;
}

export const BatchTransfer: React.FC = () => {
    const [recipients, setRecipients] = useState<Recipient[]>([]);
    
    const addRecipient = () => {
        setRecipients([...recipients, { address: '', amount: 0, memo: '' }]);
    };
    
    return (
        <Card title="Batch Transfer">
            <p>Add multiple recipients for batch xBTC transfer</p>
            <Button onClick={addRecipient}>Add Recipient</Button>
            {recipients.map((r, i) => (
                <div key={i}>Recipient {i + 1}</div>
            ))}
        </Card>
    );
};