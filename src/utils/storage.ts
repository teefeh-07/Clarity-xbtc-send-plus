// Local storage utilities

const PREFIX = 'xbtc_send_plus_';

export const setItem = <T>(key: string, value: T): void => {
    try {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
};

export const getItem = <T>(key: string, defaultValue: T): T => {
    try {
        const item = localStorage.getItem(PREFIX + key);
        return item ? JSON.parse(item) : defaultValue;
    } catch {
        return defaultValue;
    }
};

export const removeItem = (key: string): void => {
    localStorage.removeItem(PREFIX + key);
};

export const clear = (): void => {
    Object.keys(localStorage)
        .filter(key => key.startsWith(PREFIX))
        .forEach(key => localStorage.removeItem(key));
};