import React from 'react';

interface RecipientInputProps {
    value: string;
    onChange: (value: string) => void;
    onRemove?: () => void;
    showRemove?: boolean;
}

export const RecipientInput: React.FC<RecipientInputProps> = ({
    value,
    onChange,
    onRemove,
    showRemove = false
}) => {
    return (
        <div className="recipient-input">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter Stacks address"
            />
            {showRemove && (
                <button onClick={onRemove} className="remove-btn">
                    Remove
                </button>
            )}
        </div>
    );
};