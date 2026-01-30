import React from 'react';

interface AmountInputProps {
    value: string;
    onChange: (value: string) => void;
    currency?: string;
    max?: number;
}

export const AmountInput: React.FC<AmountInputProps> = ({
    value,
    onChange,
    currency = 'xBTC',
    max
}) => {
    const handleMax = () => {
        if (max !== undefined) {
            onChange(max.toString());
        }
    };

    return (
        <div className="amount-input">
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.00000001"
            />
            <span className="currency">{currency}</span>
            {max !== undefined && (
                <button onClick={handleMax} className="max-btn">MAX</button>
            )}
        </div>
    );
};