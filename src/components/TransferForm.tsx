import React, { useState } from 'react';
import { Button, Input, Card } from './ui';

export const TransferForm: React.FC = () => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    
    return (
        <Card title="Transfer xBTC">
            <Input value={recipient} onChange={setRecipient} placeholder="Recipient address" />
            <Input value={amount} onChange={setAmount} placeholder="Amount" type="number" />
            <Button onClick={() => {}}>Send</Button>
        </Card>
    );
};