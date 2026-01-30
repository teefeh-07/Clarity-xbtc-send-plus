import React from 'react';
import { formatAddress } from '../../utils/format';

interface AddressProps {
    address: string;
    full?: boolean;
    copyable?: boolean;
}

export const Address: React.FC<AddressProps> = ({
    address,
    full = false,
    copyable = true
}) => {
    const displayAddress = full ? address : formatAddress(address);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(address);
    };

    return (
        <div className="address">
            <span>{displayAddress}</span>
            {copyable && (
                <button onClick={handleCopy} title="Copy address">
                    📋
                </button>
            )}
        </div>
    );
};