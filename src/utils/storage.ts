// Local storage utilities

const PREFIX = 'xbtc_send_plus_';

export const setItem = <T>(key: string, value: T): void => {
    try {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
};