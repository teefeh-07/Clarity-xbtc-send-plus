// Wallet service

import { AppConfig, showConnect, UserSession } from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);

export const createUserSession = () => new UserSession({ appConfig });

export const connectWallet = (
    userSession: UserSession,
    onSuccess: (data: any) => void
) => {
    showConnect({
        appDetails: {
            name: 'xBTC Send Plus',
            icon: window.location.origin + '/icon.png',
        },
        redirectTo: '/',
        onFinish: onSuccess,
        userSession,
    });
};