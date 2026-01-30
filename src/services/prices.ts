// Price fetching service

export const fetchBtcPrice = async (): Promise<number> => {
    try {
        const response = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        );
        const data = await response.json();
        return data.bitcoin.usd;
    } catch {
        return 0;
    }
};

export const fetchStxPrice = async (): Promise<number> => {
    try {
        const response = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=blockstack&vs_currencies=usd'
        );
        const data = await response.json();
        return data.blockstack.usd;
    } catch {
        return 0;
    }
};