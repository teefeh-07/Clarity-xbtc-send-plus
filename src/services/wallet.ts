// Wallet service

import { AppConfig, showConnect, UserSession } from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);

export const createUserSession = () => new UserSession({ appConfig });