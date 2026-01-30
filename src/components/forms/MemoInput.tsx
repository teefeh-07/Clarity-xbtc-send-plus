import React from 'react';

interface MemoInputProps {
    value: string;
    onChange: (value: string) => void;
    maxLength?: number;
}

export const MemoInput: React.FC<MemoInputProps> = ({
    value,
    onChange,
    maxLength = 34
}) => {
    return (
        <div className="memo-input">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
                placeholder="Optional memo message"
                rows={2}
            />
            <span className="char-count">{value.length}/{maxLength}</span>
        </div>
    );
};