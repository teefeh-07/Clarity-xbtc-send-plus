import React from 'react';
import { HomePage, TransferPage, BatchPage, HistoryPage, SettingsPage } from '../pages';

interface RouterProps {
    currentPath: string;
}

export const Router: React.FC<RouterProps> = ({ currentPath }) => {
    switch (currentPath) {
        case '/transfer':
            return <TransferPage />;
        case '/batch':
            return <BatchPage />;
        case '/history':
            return <HistoryPage />;
        case '/settings':
            return <SettingsPage />;
        default:
            return <HomePage />;
    }
};