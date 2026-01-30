import React from 'react';

interface AlertProps {
    title?: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    dismissible?: boolean;
    onDismiss?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
    title,
    message,
    type,
    dismissible = false,
    onDismiss
}) => {
    return (
        <div className={`alert alert-${type}`}>
            {title && <h4>{title}</h4>}
            <p>{message}</p>
            {dismissible && (
                <button onClick={onDismiss} className="dismiss-btn">
                    Dismiss
                </button>
            )}
        </div>
    );
};