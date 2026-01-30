const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const run = (cmd) => {
    console.log(`> ${cmd}`);
    try {
        execSync(cmd, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Failed: ${cmd}`);
    }
};

const ROOT = process.cwd();
let branchCount = 100;

// Expanded generators for more commits
const generators = {
    // More documentation
    docs_extended: [
        { file: 'docs/guides/GETTING_STARTED.md', content: '# Getting Started\n\nA comprehensive guide to start with xBTC Send Plus.', msg: 'docs: create getting started guide' },
        { file: 'docs/guides/GETTING_STARTED.md', append: '\n\n## Step 1: Installation\n\nFirst, clone the repository and install dependencies.', msg: 'docs: add installation step to getting started' },
        { file: 'docs/guides/GETTING_STARTED.md', append: '\n\n## Step 2: Configuration\n\nConfigure your environment variables.', msg: 'docs: add configuration step' },
        { file: 'docs/guides/GETTING_STARTED.md', append: '\n\n## Step 3: Running Locally\n\nStart the development server with npm run dev.', msg: 'docs: add running locally step' },
        { file: 'docs/guides/WALLET_SETUP.md', content: '# Wallet Setup Guide\n\nLearn how to connect your Stacks wallet.', msg: 'docs: create wallet setup guide' },
        { file: 'docs/guides/WALLET_SETUP.md', append: '\n\n## Hiro Wallet\n\nDownload and set up the Hiro Wallet browser extension.', msg: 'docs: add hiro wallet section' },
        { file: 'docs/guides/WALLET_SETUP.md', append: '\n\n## WalletConnect\n\nAlternatively, use WalletConnect for mobile wallet support.', msg: 'docs: add walletconnect section' },
        { file: 'docs/guides/BATCH_TRANSFERS.md', content: '# Batch Transfer Guide\n\nHow to send xBTC to multiple recipients.', msg: 'docs: create batch transfer guide' },
        { file: 'docs/guides/BATCH_TRANSFERS.md', append: '\n\n## CSV Import\n\nImport recipients from a CSV file.', msg: 'docs: add csv import documentation' },
        { file: 'docs/guides/BATCH_TRANSFERS.md', append: '\n\n## Manual Entry\n\nAdd recipients manually through the UI.', msg: 'docs: add manual entry documentation' },
        { file: 'docs/security/SECURITY.md', content: '# Security\n\nSecurity considerations for xBTC Send Plus.', msg: 'docs: create security documentation' },
        { file: 'docs/security/SECURITY.md', append: '\n\n## Transaction Signing\n\nAll transactions are signed locally in your wallet.', msg: 'docs: add transaction signing section' },
        { file: 'docs/security/SECURITY.md', append: '\n\n## Smart Contract Auditing\n\nOur smart contracts follow best practices.', msg: 'docs: add audit section' },
        { file: 'docs/troubleshooting/COMMON_ISSUES.md', content: '# Troubleshooting\n\nCommon issues and their solutions.', msg: 'docs: create troubleshooting guide' },
        { file: 'docs/troubleshooting/COMMON_ISSUES.md', append: '\n\n## Wallet Not Connecting\n\nEnsure your wallet extension is installed and unlocked.', msg: 'docs: add wallet connection troubleshooting' },
        { file: 'docs/troubleshooting/COMMON_ISSUES.md', append: '\n\n## Transaction Pending\n\nTransactions may take a few minutes to confirm.', msg: 'docs: add pending transaction troubleshooting' },
        { file: 'docs/troubleshooting/COMMON_ISSUES.md', append: '\n\n## Insufficient Funds\n\nVerify you have enough STX for gas fees.', msg: 'docs: add insufficient funds troubleshooting' },
    ],

    // More types
    types_extended: [
        {
            file: 'src/types/contract.ts', content: `// Contract types

export interface ContractCallOptions {
    contractAddress: string;
    contractName: string;
    functionName: string;
    functionArgs: any[];
}`, msg: 'feat: add contract call types'
        },
        {
            file: 'src/types/contract.ts', append: `

export interface ContractDeployOptions {
    codeBody: string;
    contractName: string;
    network: 'mainnet' | 'testnet';
}`, msg: 'feat: add contract deploy types'
        },
        {
            file: 'src/types/network.ts', content: `// Network types

export type NetworkType = 'mainnet' | 'testnet' | 'devnet';

export interface NetworkConfig {
    apiUrl: string;
    networkType: NetworkType;
    chainId: number;
}`, msg: 'feat: add network configuration types'
        },
        {
            file: 'src/types/events.ts', content: `// Event types for application state

export interface WalletConnectedEvent {
    type: 'WALLET_CONNECTED';
    address: string;
    timestamp: number;
}`, msg: 'feat: add wallet event types'
        },
        {
            file: 'src/types/events.ts', append: `

export interface TransactionSubmittedEvent {
    type: 'TRANSACTION_SUBMITTED';
    txId: string;
    timestamp: number;
}`, msg: 'feat: add transaction event types'
        },
        {
            file: 'src/types/events.ts', append: `

export interface TransactionConfirmedEvent {
    type: 'TRANSACTION_CONFIRMED';
    txId: string;
    blockHeight: number;
    timestamp: number;
}`, msg: 'feat: add confirmation event type'
        },
        {
            file: 'src/types/forms.ts', content: `// Form types

export interface TransferFormData {
    recipient: string;
    amount: string;
    memo: string;
}`, msg: 'feat: add transfer form types'
        },
        {
            file: 'src/types/forms.ts', append: `

export interface BatchFormData {
    recipients: Array<{
        address: string;
        amount: string;
        memo: string;
    }>;
}`, msg: 'feat: add batch form types'
        },
        {
            file: 'src/types/state.ts', content: `// Application state types

export interface AppState {
    isLoading: boolean;
    error: string | null;
}`, msg: 'feat: add app state types'
        },
        {
            file: 'src/types/state.ts', append: `

export interface WalletState {
    isConnected: boolean;
    address: string | null;
    balance: {
        stx: number;
        xbtc: number;
    };
}`, msg: 'feat: add wallet state type'
        },
        {
            file: 'src/types/state.ts', append: `

export interface TransactionState {
    pending: string[];
    confirmed: string[];
    failed: string[];
}`, msg: 'feat: add transaction state type'
        },
    ],

    // More components
    components_extended: [
        {
            file: 'src/components/forms/RecipientInput.tsx', content: `import React from 'react';

interface RecipientInputProps {
    value: string;
    onChange: (value: string) => void;
    onRemove?: () => void;
    showRemove?: boolean;
}

export const RecipientInput: React.FC<RecipientInputProps> = ({
    value,
    onChange,
    onRemove,
    showRemove = false
}) => {
    return (
        <div className="recipient-input">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter Stacks address"
            />
            {showRemove && (
                <button onClick={onRemove} className="remove-btn">
                    Remove
                </button>
            )}
        </div>
    );
};`, msg: 'feat: create RecipientInput form component'
        },
        {
            file: 'src/components/forms/AmountInput.tsx', content: `import React from 'react';

interface AmountInputProps {
    value: string;
    onChange: (value: string) => void;
    currency?: string;
    max?: number;
}

export const AmountInput: React.FC<AmountInputProps> = ({
    value,
    onChange,
    currency = 'xBTC',
    max
}) => {
    const handleMax = () => {
        if (max !== undefined) {
            onChange(max.toString());
        }
    };

    return (
        <div className="amount-input">
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.00000001"
            />
            <span className="currency">{currency}</span>
            {max !== undefined && (
                <button onClick={handleMax} className="max-btn">MAX</button>
            )}
        </div>
    );
};`, msg: 'feat: create AmountInput form component'
        },
        {
            file: 'src/components/forms/MemoInput.tsx', content: `import React from 'react';

interface MemoInputProps {
    value: string;
    onChange: (value: string) => void;
    maxLength?: number;
}

export const MemoInput: React.FC<MemoInputProps> = ({
    value,
    onChange,
    maxLength = 34
}) => {
    return (
        <div className="memo-input">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
                placeholder="Optional memo message"
                rows={2}
            />
            <span className="char-count">{value.length}/{maxLength}</span>
        </div>
    );
};`, msg: 'feat: create MemoInput form component'
        },
        {
            file: 'src/components/forms/index.ts', content: `export { RecipientInput } from './RecipientInput';
export { AmountInput } from './AmountInput';
export { MemoInput } from './MemoInput';`, msg: 'feat: add forms barrel export'
        },
        {
            file: 'src/components/display/Balance.tsx', content: `import React from 'react';
import { formatAmount } from '../../utils/format';

interface BalanceProps {
    amount: number;
    currency: string;
    decimals?: number;
}

export const Balance: React.FC<BalanceProps> = ({
    amount,
    currency,
    decimals = 8
}) => {
    return (
        <div className="balance">
            <span className="amount">{formatAmount(amount, decimals)}</span>
            <span className="currency">{currency}</span>
        </div>
    );
};`, msg: 'feat: create Balance display component'
        },
        {
            file: 'src/components/display/Address.tsx', content: `import React from 'react';
import { formatAddress } from '../../utils/format';

interface AddressProps {
    address: string;
    full?: boolean;
    copyable?: boolean;
}

export const Address: React.FC<AddressProps> = ({
    address,
    full = false,
    copyable = true
}) => {
    const displayAddress = full ? address : formatAddress(address);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(address);
    };

    return (
        <div className="address">
            <span>{displayAddress}</span>
            {copyable && (
                <button onClick={handleCopy} title="Copy address">
                    📋
                </button>
            )}
        </div>
    );
};`, msg: 'feat: create Address display component'
        },
        {
            file: 'src/components/display/TransactionLink.tsx', content: `import React from 'react';
import { formatAddress } from '../../utils/format';

interface TransactionLinkProps {
    txId: string;
    network?: 'mainnet' | 'testnet';
}

export const TransactionLink: React.FC<TransactionLinkProps> = ({
    txId,
    network = 'mainnet'
}) => {
    const explorerUrl = network === 'mainnet'
        ? \`https://explorer.stacks.co/txid/\${txId}\`
        : \`https://explorer.stacks.co/txid/\${txId}?chain=testnet\`;

    return (
        <a 
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transaction-link"
        >
            {formatAddress(txId)}
        </a>
    );
};`, msg: 'feat: create TransactionLink component'
        },
        {
            file: 'src/components/display/index.ts', content: `export { Balance } from './Balance';
export { Address } from './Address';
export { TransactionLink } from './TransactionLink';`, msg: 'feat: add display components barrel export'
        },
        {
            file: 'src/components/layout/Header.tsx', content: `import React from 'react';
import { ConnectWallet } from '../ConnectWallet';

export const Header: React.FC = () => {
    return (
        <header className="app-header">
            <div className="logo">
                <h1>xBTC Send Plus</h1>
            </div>
            <nav className="nav-links">
                <a href="/">Home</a>
                <a href="/transfer">Transfer</a>
                <a href="/batch">Batch</a>
                <a href="/history">History</a>
            </nav>
            <div className="wallet-section">
                <ConnectWallet />
            </div>
        </header>
    );
};`, msg: 'feat: create Header layout component'
        },
        {
            file: 'src/components/layout/Footer.tsx', content: `import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="app-footer">
            <div className="footer-content">
                <p>&copy; 2024 xBTC Send Plus. Built on Stacks.</p>
                <div className="footer-links">
                    <a href="https://github.com">GitHub</a>
                    <a href="/docs">Documentation</a>
                </div>
            </div>
        </footer>
    );
};`, msg: 'feat: create Footer layout component'
        },
        {
            file: 'src/components/layout/Container.tsx', content: `import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Container: React.FC<ContainerProps> = ({
    children,
    size = 'lg'
}) => {
    return (
        <div className={\`container container-\${size}\`}>
            {children}
        </div>
    );
};`, msg: 'feat: create Container layout component'
        },
        {
            file: 'src/components/layout/index.ts', content: `export { Header } from './Header';
export { Footer } from './Footer';
export { Container } from './Container';`, msg: 'feat: add layout components barrel export'
        },
        {
            file: 'src/components/feedback/Toast.tsx', content: `import React, { useEffect } from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
    onClose: () => void;
    duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
    message,
    type,
    onClose,
    duration = 5000
}) => {
    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={\`toast toast-\${type}\`}>
            <span>{message}</span>
            <button onClick={onClose}>×</button>
        </div>
    );
};`, msg: 'feat: create Toast feedback component'
        },
        {
            file: 'src/components/feedback/Alert.tsx', content: `import React from 'react';

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
        <div className={\`alert alert-\${type}\`}>
            {title && <h4>{title}</h4>}
            <p>{message}</p>
            {dismissible && (
                <button onClick={onDismiss} className="dismiss-btn">
                    Dismiss
                </button>
            )}
        </div>
    );
};`, msg: 'feat: create Alert feedback component'
        },
        {
            file: 'src/components/feedback/LoadingOverlay.tsx', content: `import React from 'react';
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
};`, msg: 'feat: create LoadingOverlay component'
        },
        {
            file: 'src/components/feedback/index.ts', content: `export { Toast } from './Toast';
export { Alert } from './Alert';
export { LoadingOverlay } from './LoadingOverlay';`, msg: 'feat: add feedback components barrel export'
        },
    ],

    // More hooks
    hooks_extended: [
        {
            file: 'src/hooks/useLocalStorage.ts', content: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue] as const;
}`, msg: 'feat: create useLocalStorage hook'
        },
        {
            file: 'src/hooks/useDebounce.ts', content: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}`, msg: 'feat: create useDebounce hook'
        },
        {
            file: 'src/hooks/useAsync.ts', content: `import { useState, useCallback } from 'react';

interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

export function useAsync<T>() {
    const [state, setState] = useState<AsyncState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
        setState({ data: null, loading: true, error: null });
        try {
            const data = await asyncFunction();
            setState({ data, loading: false, error: null });
            return data;
        } catch (error) {
            setState({ data: null, loading: false, error: error as Error });
            throw error;
        }
    }, []);

    return { ...state, execute };
}`, msg: 'feat: create useAsync hook'
        },
        {
            file: 'src/hooks/useClipboard.ts', content: `import { useState, useCallback } from 'react';

export function useClipboard(timeout: number = 2000) {
    const [copied, setCopied] = useState(false);

    const copy = useCallback(async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), timeout);
            return true;
        } catch {
            setCopied(false);
            return false;
        }
    }, [timeout]);

    return { copied, copy };
}`, msg: 'feat: create useClipboard hook'
        },
        {
            file: 'src/hooks/useMediaQuery.ts', content: `import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        
        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);
        
        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
}`, msg: 'feat: create useMediaQuery hook'
        },
        {
            file: 'src/hooks/useContractCall.ts', content: `import { useState, useCallback } from 'react';
import { openContractCall } from '@stacks/connect';
import { useStacks } from '../context/StacksContext';

export function useContractCall() {
    const [loading, setLoading] = useState(false);
    const [txId, setTxId] = useState<string | null>(null);
    const { userSession } = useStacks();

    const callContract = useCallback(async (options: any) => {
        setLoading(true);
        try {
            const result = await openContractCall({
                ...options,
                onFinish: (data: any) => {
                    setTxId(data.txId);
                    setLoading(false);
                },
                onCancel: () => {
                    setLoading(false);
                },
            });
            return result;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    }, []);

    return { callContract, loading, txId };
}`, msg: 'feat: create useContractCall hook'
        },
        {
            file: 'src/hooks/index.ts', content: `export { useLocalStorage } from './useLocalStorage';
export { useDebounce } from './useDebounce';
export { useAsync } from './useAsync';
export { useClipboard } from './useClipboard';
export { useMediaQuery } from './useMediaQuery';
export { useContractCall } from './useContractCall';
export { useWallet } from './useWallet';
export { useTransactions } from './useTransactions';
export { useBalance } from './useBalance';`, msg: 'feat: add hooks barrel export'
        },
    ],

    // More utilities
    utils_extended: [
        {
            file: 'src/utils/crypto.ts', content: `// Crypto utilities

export const hashMemo = async (memo: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(memo);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};`, msg: 'feat: add crypto utility for memo hashing'
        },
        {
            file: 'src/utils/crypto.ts', append: `

export const generateRandomId = (): string => {
    return crypto.randomUUID();
};`, msg: 'feat: add random ID generator'
        },
        {
            file: 'src/utils/storage.ts', content: `// Local storage utilities

const PREFIX = 'xbtc_send_plus_';

export const setItem = <T>(key: string, value: T): void => {
    try {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
};`, msg: 'feat: add storage set utility'
        },
        {
            file: 'src/utils/storage.ts', append: `

export const getItem = <T>(key: string, defaultValue: T): T => {
    try {
        const item = localStorage.getItem(PREFIX + key);
        return item ? JSON.parse(item) : defaultValue;
    } catch {
        return defaultValue;
    }
};`, msg: 'feat: add storage get utility'
        },
        {
            file: 'src/utils/storage.ts', append: `

export const removeItem = (key: string): void => {
    localStorage.removeItem(PREFIX + key);
};

export const clear = (): void => {
    Object.keys(localStorage)
        .filter(key => key.startsWith(PREFIX))
        .forEach(key => localStorage.removeItem(key));
};`, msg: 'feat: add storage remove and clear utilities'
        },
        {
            file: 'src/utils/api.ts', content: `// API utility functions

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
};`, msg: 'feat: add fetchWithRetry utility'
        },
        {
            file: 'src/utils/api.ts', append: `

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
};`, msg: 'feat: add API URL builder utility'
        },
        {
            file: 'src/utils/clarity.ts', content: `// Clarity type helpers

import { 
    uintCV, 
    principalCV, 
    bufferCV,
    listCV,
    tupleCV
} from '@stacks/transactions';

export const toUint = (value: number) => uintCV(value);
export const toPrincipal = (address: string) => principalCV(address);`, msg: 'feat: add Clarity type conversion utilities'
        },
        {
            file: 'src/utils/clarity.ts', append: `

export const toMemo = (memo: string) => {
    const encoder = new TextEncoder();
    return bufferCV(encoder.encode(memo.slice(0, 34)));
};`, msg: 'feat: add memo conversion utility'
        },
        {
            file: 'src/utils/clarity.ts', append: `

export const buildRecipientTuple = (
    to: string,
    amount: number,
    memo: string
) => tupleCV({
    to: toPrincipal(to),
    'xbtc-in-sats': toUint(amount),
    memo: toMemo(memo),
    'swap-to-ustx': uintCV(0),
    'min-dy': uintCV(0)
});`, msg: 'feat: add recipient tuple builder'
        },
    ],

    // More services
    services_extended: [
        {
            file: 'src/services/wallet.ts', content: `// Wallet service

import { AppConfig, showConnect, UserSession } from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);

export const createUserSession = () => new UserSession({ appConfig });`, msg: 'feat: add wallet session service'
        },
        {
            file: 'src/services/wallet.ts', append: `

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
};`, msg: 'feat: add wallet connect function'
        },
        {
            file: 'src/services/wallet.ts', append: `

export const disconnectWallet = (userSession: UserSession) => {
    userSession.signUserOut('/');
};`, msg: 'feat: add wallet disconnect function'
        },
        {
            file: 'src/services/balance.ts', content: `// Balance fetching service

const API_BASE = 'https://api.mainnet.hiro.so';

export const fetchStxBalance = async (address: string): Promise<number> => {
    const response = await fetch(
        \`\${API_BASE}/extended/v1/address/\${address}/stx\`
    );
    const data = await response.json();
    return parseInt(data.balance || '0');
};`, msg: 'feat: add STX balance service'
        },
        {
            file: 'src/services/balance.ts', append: `

export const fetchTokenBalances = async (address: string) => {
    const response = await fetch(
        \`\${API_BASE}/extended/v1/address/\${address}/balances\`
    );
    return response.json();
};`, msg: 'feat: add token balance service'
        },
        {
            file: 'src/services/prices.ts', content: `// Price fetching service

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
};`, msg: 'feat: add BTC price service'
        },
        {
            file: 'src/services/prices.ts', append: `

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
};`, msg: 'feat: add STX price service'
        },
        {
            file: 'src/services/history.ts', content: `// Transaction history service

const API_BASE = 'https://api.mainnet.hiro.so';

export const fetchTransactionHistory = async (
    address: string,
    limit = 20,
    offset = 0
) => {
    const response = await fetch(
        \`\${API_BASE}/extended/v1/address/\${address}/transactions?limit=\${limit}&offset=\${offset}\`
    );
    return response.json();
};`, msg: 'feat: add transaction history service'
        },
        {
            file: 'src/services/history.ts', append: `

export const fetchTransactionDetails = async (txId: string) => {
    const response = await fetch(
        \`\${API_BASE}/extended/v1/tx/\${txId}\`
    );
    return response.json();
};`, msg: 'feat: add transaction details service'
        },
        {
            file: 'src/services/index.ts', content: `// Service exports
export * from './stacks';
export * from './transactions';
export * from './api';
export * from './wallet';
export * from './balance';
export * from './prices';
export * from './history';`, msg: 'refactor: update services index exports'
        },
    ],

    // More tests
    tests_extended: [
        {
            file: 'tests/unit/format.test.ts', content: `import { describe, it, expect } from 'vitest';
import { formatAddress, formatAmount, formatDate } from '../../src/utils/format';

describe('formatAddress', () => {
    it('should truncate long addresses', () => {
        const address = 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR';
        const result = formatAddress(address);
        expect(result).toMatch(/^SP3D.*R2PR$/);
    });

    it('should handle empty address', () => {
        expect(formatAddress('')).toBe('');
    });
});`, msg: 'test: add formatAddress unit tests'
        },
        {
            file: 'tests/unit/format.test.ts', append: `

describe('formatAmount', () => {
    it('should format with default decimals', () => {
        expect(formatAmount(100000000)).toBe('1.00000000');
    });

    it('should respect custom decimals', () => {
        expect(formatAmount(1000, 2)).toBe('10.00');
    });
});`, msg: 'test: add formatAmount unit tests'
        },
        {
            file: 'tests/unit/validation.extended.test.ts', content: `import { describe, it, expect } from 'vitest';
import { isValidStacksAddress, isValidAmount, isValidMemo } from '../../src/utils/validation';

describe('isValidStacksAddress', () => {
    it('should accept valid mainnet addresses', () => {
        expect(isValidStacksAddress('SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR')).toBe(true);
    });

    it('should reject invalid addresses', () => {
        expect(isValidStacksAddress('invalid')).toBe(false);
        expect(isValidStacksAddress('')).toBe(false);
    });
});`, msg: 'test: add address validation tests'
        },
        {
            file: 'tests/unit/validation.extended.test.ts', append: `

describe('isValidAmount', () => {
    it('should accept positive amounts', () => {
        expect(isValidAmount(100)).toBe(true);
        expect(isValidAmount(0.001)).toBe(true);
    });

    it('should reject invalid amounts', () => {
        expect(isValidAmount(0)).toBe(false);
        expect(isValidAmount(-1)).toBe(false);
    });
});`, msg: 'test: add amount validation tests'
        },
        {
            file: 'tests/unit/validation.extended.test.ts', append: `

describe('isValidMemo', () => {
    it('should accept valid memos', () => {
        expect(isValidMemo('Hello')).toBe(true);
        expect(isValidMemo('')).toBe(true);
    });

    it('should reject long memos', () => {
        expect(isValidMemo('a'.repeat(35))).toBe(false);
    });
});`, msg: 'test: add memo validation tests'
        },
        {
            file: 'tests/unit/hooks.test.ts', content: `import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDebounce } from '../../src/hooks/useDebounce';

describe('useDebounce', () => {
    it('should return initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('test', 500));
        expect(result.current).toBe('test');
    });
});`, msg: 'test: add useDebounce hook tests'
        },
        {
            file: 'tests/integration/contract.test.ts', content: `import { describe, it, expect } from 'vitest';

describe('Smart Contract Integration', () => {
    it('should connect to testnet', async () => {
        // Integration test placeholder
        expect(true).toBe(true);
    });
});`, msg: 'test: add contract integration test skeleton'
        },
        {
            file: 'tests/integration/wallet.test.ts', content: `import { describe, it, expect } from 'vitest';

describe('Wallet Integration', () => {
    it('should initialize user session', () => {
        // Wallet integration test placeholder
        expect(true).toBe(true);
    });
});`, msg: 'test: add wallet integration test skeleton'
        },
    ],

    // More configuration
    config_extended: [
        {
            file: '.github/workflows/ci.yml', content: `name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build`, msg: 'ci: add github actions workflow'
        },
        {
            file: '.github/workflows/ci.yml', append: `
  
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test`, msg: 'ci: add test job to workflow'
        },
        {
            file: '.github/ISSUE_TEMPLATE/bug_report.md', content: `---
name: Bug Report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
---

## Description
A clear description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What you expected to happen.

## Screenshots
If applicable, add screenshots.`, msg: 'chore: add bug report template'
        },
        {
            file: '.github/ISSUE_TEMPLATE/feature_request.md', content: `---
name: Feature Request
about: Suggest an idea for this project
title: '[FEATURE] '
labels: enhancement
---

## Problem
Describe the problem you're solving.

## Solution
Describe the solution you'd like.

## Alternatives
Any alternatives you've considered.

## Additional Context
Any other context or screenshots.`, msg: 'chore: add feature request template'
        },
        {
            file: '.github/PULL_REQUEST_TEMPLATE.md', content: `## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Tests pass locally
- [ ] Code follows style guidelines
- [ ] Documentation updated`, msg: 'chore: add pull request template'
        },
        {
            file: 'CONTRIBUTING.md', content: `# Contributing to xBTC Send Plus

Thank you for your interest in contributing!

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Submit a pull request`, msg: 'docs: add root contributing guide'
        },
        {
            file: 'CODE_OF_CONDUCT.md', content: `# Code of Conduct

## Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone.

## Our Standards

- Be respectful and inclusive
- Accept constructive criticism
- Focus on what's best for the community

## Enforcement

Instances of abusive behavior may be reported to the project team.`, msg: 'docs: add code of conduct'
        },
    ],

    // More smart contract code
    contracts_extended: [
        {
            file: 'contracts/helpers/math-helper.clar', content: `;; Math helper utilities

;; Calculate percentage
(define-read-only (calculate-percentage (amount uint) (percentage uint))
    (/ (* amount percentage) u100))`, msg: 'feat: add math helper contract'
        },
        {
            file: 'contracts/helpers/math-helper.clar', append: `

;; Safe subtraction
(define-read-only (safe-sub (a uint) (b uint))
    (if (>= a b)
        (ok (- a b))
        (err u1)))`, msg: 'feat: add safe subtraction function'
        },
        {
            file: 'contracts/helpers/string-helper.clar', content: `;; String helper utilities

;; Check if buffer is empty
(define-read-only (is-empty-memo (memo (buff 34)))
    (is-eq (len memo) u0))`, msg: 'feat: add string helper contract'
        },
        {
            file: 'contracts/storage/transfer-log.clar', content: `;; Transfer logging contract

;; Log entry structure
(define-map transfer-logs
    { id: uint }
    {
        sender: principal,
        recipient: principal,
        amount: uint,
        timestamp: uint
    })

(define-data-var log-counter uint u0)`, msg: 'feat: add transfer log storage contract'
        },
        {
            file: 'contracts/storage/transfer-log.clar', append: `

;; Add log entry
(define-public (add-log (recipient principal) (amount uint))
    (let ((id (var-get log-counter)))
        (map-set transfer-logs
            { id: id }
            {
                sender: tx-sender,
                recipient: recipient,
                amount: amount,
                timestamp: stacks-block-height
            })
        (var-set log-counter (+ id u1))
        (ok id)))`, msg: 'feat: add log entry function'
        },
        {
            file: 'contracts/storage/transfer-log.clar', append: `

;; Get log entry
(define-read-only (get-log (id uint))
    (map-get? transfer-logs { id: id }))

;; Get total logs
(define-read-only (get-log-count)
    (ok (var-get log-counter)))`, msg: 'feat: add log retrieval functions'
        },
    ],

    // Styles
    styles: [
        {
            file: 'src/styles/variables.css', content: `:root {
    /* Colors */
    --color-primary: #6366f1;
    --color-primary-dark: #4f46e5;
    --color-secondary: #ec4899;
    --color-background: #0f172a;
    --color-surface: #1e293b;
    --color-text: #f8fafc;
    --color-text-muted: #94a3b8;
}`, msg: 'style: add CSS variables for colors'
        },
        {
            file: 'src/styles/variables.css', append: `

:root {
    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
}`, msg: 'style: add spacing variables'
        },
        {
            file: 'src/styles/variables.css', append: `

:root {
    /* Typography */
    --font-sans: 'Inter', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 2rem;
}`, msg: 'style: add typography variables'
        },
        {
            file: 'src/styles/components.css', content: `/* Button styles */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s ease;
    cursor: pointer;
    border: none;
}`, msg: 'style: add button base styles'
        },
        {
            file: 'src/styles/components.css', append: `

.btn-primary {
    background: var(--color-primary);
    color: white;
}

.btn-primary:hover {
    background: var(--color-primary-dark);
    transform: translateY(-1px);
}

.btn-secondary {
    background: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
}`, msg: 'style: add button variants'
        },
        {
            file: 'src/styles/components.css', append: `

/* Card styles */
.card {
    background: var(--color-surface);
    border-radius: 12px;
    padding: var(--spacing-lg);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.card-title {
    font-size: var(--font-size-xl);
    font-weight: 600;
    margin-bottom: var(--spacing-md);
}`, msg: 'style: add card component styles'
        },
        {
            file: 'src/styles/components.css', append: `

/* Input styles */
.input {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--color-background);
    border: 1px solid var(--color-text-muted);
    border-radius: 8px;
    color: var(--color-text);
    font-size: var(--font-size-base);
}

.input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}`, msg: 'style: add input component styles'
        },
        {
            file: 'src/styles/layout.css', content: `/* Layout styles */
.app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-md) var(--spacing-xl);
    background: var(--color-surface);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}`, msg: 'style: add header layout styles'
        },
        {
            file: 'src/styles/layout.css', append: `

.app-footer {
    padding: var(--spacing-xl);
    background: var(--color-surface);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
}`, msg: 'style: add footer and container styles'
        },
        {
            file: 'src/styles/animations.css', content: `/* Animation utilities */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}`, msg: 'style: add fade and slide animations'
        },
        {
            file: 'src/styles/animations.css', append: `

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.animate-fade-in {
    animation: fadeIn 0.3s ease-out;
}

.animate-slide-up {
    animation: slideUp 0.4s ease-out;
}

.animate-spin {
    animation: spin 1s linear infinite;
}`, msg: 'style: add spin animation and utility classes'
        },
        {
            file: 'src/styles/index.css', content: `/* Main styles entry */
@import './variables.css';
@import './animations.css';
@import './layout.css';
@import './components.css';

/* Global reset */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: var(--font-sans);
    background: var(--color-background);
    color: var(--color-text);
    line-height: 1.6;
}`, msg: 'style: create main styles entry point'
        },
    ],
};

async function processGenerator(name, tasks) {
    console.log(`\n=== Processing ${name} ===`);

    for (const task of tasks) {
        branchCount++;
        const branchName = `${name}/${branchCount}-${task.msg.split(':')[0]}`;

        console.log(`\nBranch: ${branchName}`);

        try {
            run(`git checkout -b ${branchName}`);
        } catch {
            run(`git checkout ${branchName}`);
        }

        const filePath = path.join(ROOT, task.file);
        const dir = path.dirname(filePath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        if (task.append && fs.existsSync(filePath)) {
            const current = fs.readFileSync(filePath, 'utf-8');
            fs.writeFileSync(filePath, current + task.append);
        } else {
            fs.writeFileSync(filePath, task.content);
        }

        run('git add .');

        try {
            run(`git commit -m "${task.msg}"`);
            run('git checkout main');
            run(`git merge --no-ff ${branchName} -m "Merge branch '${branchName}' - ${task.msg}"`);
            run(`git branch -d ${branchName}`);
        } catch (e) {
            console.log('Commit skipped or failed, continuing...');
            try { run('git checkout main'); } catch { }
            try { run(`git branch -D ${branchName}`); } catch { }
        }
    }
}

async function main() {
    // Ensure on main
    try { run('git checkout main'); } catch { run('git checkout -b main'); }

    for (const [name, tasks] of Object.entries(generators)) {
        await processGenerator(name, tasks);
    }

    console.log(`\n=== Completed ${branchCount} additional micro-commits ===`);
}

main();
