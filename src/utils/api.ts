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

export const buildApiUrl = (
    endpoint: string,
    params?: Record<string, string>
): string => {
    const url = new URL(endpoint, HIRO_API);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }
    return url.toString();
};