import React from 'react';
import { Spinner } from '../ui/Spinner';

interface LoadingOverlayProps {
    message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
    message = 'Loading...'
}) => {
    return (
        <div className="loading-overlay">
            <div className="loading-content">
                <Spinner />
                <p>{message}</p>
            </div>
        </div>
    );
};