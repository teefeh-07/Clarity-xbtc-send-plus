// API utility functions

const HIRO_API = 'https://api.mainnet.hiro.so';

export const fetchWithRetry = async (
    url: string,
    options?: RequestInit,
    retries = 3
): Promise<Response> => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) return response;
        } catch (error) {
            if (i === retries - 1) throw error;
        }
        await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
    throw new Error('Max retries reached');
};