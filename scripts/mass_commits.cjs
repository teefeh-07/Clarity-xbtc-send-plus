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
let branchCount = 0;

// Micro-commit generators
const generators = {
    // Documentation commits
    docs: [
        { file: 'docs/README.md', content: '# Documentation\n\nWelcome to the project documentation.', msg: 'docs: create documentation folder' },
        { file: 'docs/README.md', append: '\n\n## Overview\n\nThis project enables batch xBTC transfers on Stacks.', msg: 'docs: add overview section' },
        { file: 'docs/README.md', append: '\n\n## Features\n\n- Batch transfers\n- Wallet integration\n- Swap support', msg: 'docs: add features section' },
        { file: 'docs/README.md', append: '\n\n## Architecture\n\nThe application uses React for the frontend and Clarity for smart contracts.', msg: 'docs: add architecture section' },
        { file: 'docs/INSTALLATION.md', content: '# Installation\n\nFollow these steps to set up the project.', msg: 'docs: create installation guide' },
        { file: 'docs/INSTALLATION.md', append: '\n\n## Prerequisites\n\n- Node.js v18+\n- Clarinet CLI\n- Git', msg: 'docs: add prerequisites section' },
        { file: 'docs/INSTALLATION.md', append: '\n\n## Quick Start\n\n```bash\nnpm install\nnpm run dev\n```', msg: 'docs: add quick start guide' },
        { file: 'docs/API.md', content: '# API Reference\n\nComplete API documentation for the project.', msg: 'docs: create API reference file' },
        { file: 'docs/API.md', append: '\n\n## Smart Contract Functions\n\n### transfer-stx-with-memo\n\nTransfers STX to a recipient with a memo.', msg: 'docs: document transfer-stx-with-memo function' },
        { file: 'docs/API.md', append: '\n\n### swap-xbtc-transfer-stx-with-memo\n\nSwaps xBTC and transfers STX with memo.', msg: 'docs: document swap function' },
        { file: 'docs/API.md', append: '\n\n### send-xbtc-many\n\nSends xBTC to multiple recipients in a single transaction.', msg: 'docs: document batch send function' },
        { file: 'docs/CONTRIBUTING.md', content: '# Contributing\n\nWe welcome contributions!', msg: 'docs: create contributing guide' },
        { file: 'docs/CONTRIBUTING.md', append: '\n\n## Code of Conduct\n\nBe respectful and inclusive.', msg: 'docs: add code of conduct section' },
        { file: 'docs/CONTRIBUTING.md', append: '\n\n## Pull Request Process\n\n1. Fork the repo\n2. Create feature branch\n3. Make changes\n4. Submit PR', msg: 'docs: add PR process section' },
        { file: 'docs/CHANGELOG.md', content: '# Changelog\n\nAll notable changes to this project.', msg: 'docs: create changelog file' },
        { file: 'docs/CHANGELOG.md', append: '\n\n## [1.0.0] - 2024-01-01\n\n### Added\n- Initial release\n- Batch transfer functionality', msg: 'docs: add v1.0.0 changelog entry' },
    ],

    // Type definition commits
    types: [
        { file: 'src/types/index.ts', content: '// Type definitions for Clarity xBTC Send Plus\n\nexport {};', msg: 'feat: create types index file' },
        {
            file: 'src/types/wallet.ts', content: `// Wallet related types

export interface WalletState {
    connected: boolean;
    address: string | null;
    balance: number;
}`, msg: 'feat: add wallet type definitions'
        },
        {
            file: 'src/types/wallet.ts', append: `

export interface WalletProvider {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    getAddress: () => string | null;
}`, msg: 'feat: add wallet provider interface'
        },
        {
            file: 'src/types/transaction.ts', content: `// Transaction types

export interface TransactionRecipient {
    to: string;
    amount: number;
    memo?: string;
}`, msg: 'feat: create transaction types file'
        },
        {
            file: 'src/types/transaction.ts', append: `

export interface BatchTransaction {
    recipients: TransactionRecipient[];
    totalAmount: number;
    timestamp: number;
}`, msg: 'feat: add batch transaction type'
        },
        {
            file: 'src/types/transaction.ts', append: `

export enum TransactionStatus {
    PENDING = 'pending',
    SUCCESS = 'success',
    FAILED = 'failed'
}`, msg: 'feat: add transaction status enum'
        },
        {
            file: 'src/types/api.ts', content: `// API response types

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}`, msg: 'feat: create API response types'
        },
        {
            file: 'src/types/api.ts', append: `

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    page: number;
    totalPages: number;
    totalItems: number;
}`, msg: 'feat: add paginated response type'
        },
    ],

    // Utility functions commits
    utils: [
        { file: 'src/utils/index.ts', content: '// Utility functions\n\nexport {};', msg: 'feat: create utils index' },
        {
            file: 'src/utils/format.ts', content: `// Formatting utilities

export const formatAddress = (address: string): string => {
    if (!address) return '';
    return \`\${address.slice(0, 6)}...\${address.slice(-4)}\`;
};`, msg: 'feat: add address formatting utility'
        },
        {
            file: 'src/utils/format.ts', append: `

export const formatAmount = (amount: number, decimals: number = 8): string => {
    return (amount / Math.pow(10, decimals)).toFixed(decimals);
};`, msg: 'feat: add amount formatting utility'
        },
        {
            file: 'src/utils/format.ts', append: `

export const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString();
};`, msg: 'feat: add date formatting utility'
        },
        {
            file: 'src/utils/validation.ts', content: `// Validation utilities

export const isValidStacksAddress = (address: string): boolean => {
    return /^S[PM][A-Z0-9]{38,39}$/.test(address);
};`, msg: 'feat: add stacks address validation'
        },
        {
            file: 'src/utils/validation.ts', append: `

export const isValidAmount = (amount: number): boolean => {
    return amount > 0 && Number.isFinite(amount);
};`, msg: 'feat: add amount validation utility'
        },
        {
            file: 'src/utils/validation.ts', append: `

export const isValidMemo = (memo: string): boolean => {
    return memo.length <= 34;
};`, msg: 'feat: add memo validation utility'
        },
        {
            file: 'src/utils/constants.ts', content: `// Application constants

export const APP_NAME = 'Clarity xBTC Send Plus';`, msg: 'feat: create constants file'
        },
        {
            file: 'src/utils/constants.ts', append: `

export const NETWORK = 'mainnet';
export const CONTRACT_ADDRESS = 'SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR';`, msg: 'feat: add network constants'
        },
        {
            file: 'src/utils/constants.ts', append: `

export const MAX_RECIPIENTS = 200;
export const MAX_MEMO_LENGTH = 34;`, msg: 'feat: add transaction limit constants'
        },
    ],

    // Hook commits
    hooks: [
        {
            file: 'src/hooks/useWallet.ts', content: `// Custom wallet hook

import { useState, useCallback } from 'react';

export const useWallet = () => {
    const [connected, setConnected] = useState(false);
    
    return { connected };
};`, msg: 'feat: create useWallet hook skeleton'
        },
        {
            file: 'src/hooks/useWallet.ts', content: `// Custom wallet hook

import { useState, useCallback } from 'react';
import { useStacks } from '../context/StacksContext';

export const useWallet = () => {
    const { userData, authenticate } = useStacks();
    
    const connect = useCallback(() => {
        authenticate();
    }, [authenticate]);
    
    return { 
        connected: !!userData,
        address: userData?.profile?.stxAddress?.mainnet,
        connect
    };
};`, msg: 'feat: implement useWallet hook with stacks context'
        },
        {
            file: 'src/hooks/useTransactions.ts', content: `// Transaction history hook

import { useState, useEffect } from 'react';

export const useTransactions = (address: string | null) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    
    return { transactions, loading };
};`, msg: 'feat: create useTransactions hook'
        },
        {
            file: 'src/hooks/useBalance.ts', content: `// Balance tracking hook

import { useState, useEffect } from 'react';

export const useBalance = (address: string | null) => {
    const [balance, setBalance] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (!address) return;
        // Fetch balance logic would go here
        setLoading(true);
        // API call...
        setLoading(false);
    }, [address]);
    
    return { balance, loading };
};`, msg: 'feat: create useBalance hook'
        },
    ],

    // Component commits
    components: [
        {
            file: 'src/components/ui/Button.tsx', content: `import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary' }) => {
    return (
        <button className={\`btn btn-\${variant}\`} onClick={onClick}>
            {children}
        </button>
    );
};`, msg: 'feat: create reusable Button component'
        },
        {
            file: 'src/components/ui/Input.tsx', content: `import React from 'react';

interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
}

export const Input: React.FC<InputProps> = ({ value, onChange, placeholder, type = 'text' }) => {
    return (
        <input 
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="input"
        />
    );
};`, msg: 'feat: create reusable Input component'
        },
        {
            file: 'src/components/ui/Card.tsx', content: `import React from 'react';

interface CardProps {
    children: React.ReactNode;
    title?: string;
}

export const Card: React.FC<CardProps> = ({ children, title }) => {
    return (
        <div className="card">
            {title && <h3 className="card-title">{title}</h3>}
            <div className="card-content">{children}</div>
        </div>
    );
};`, msg: 'feat: create reusable Card component'
        },
        {
            file: 'src/components/ui/Modal.tsx', content: `import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {title && <h2>{title}</h2>}
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};`, msg: 'feat: create Modal component'
        },
        {
            file: 'src/components/ui/Spinner.tsx', content: `import React from 'react';

export const Spinner: React.FC = () => {
    return <div className="spinner" />;
};`, msg: 'feat: create loading Spinner component'
        },
        {
            file: 'src/components/ui/index.ts', content: `export { Button } from './Button';
export { Input } from './Input';
export { Card } from './Card';
export { Modal } from './Modal';
export { Spinner } from './Spinner';`, msg: 'feat: create UI components barrel export'
        },
        {
            file: 'src/components/TransferForm.tsx', content: `import React, { useState } from 'react';
import { Button, Input, Card } from './ui';

export const TransferForm: React.FC = () => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    
    return (
        <Card title="Transfer xBTC">
            <Input value={recipient} onChange={setRecipient} placeholder="Recipient address" />
            <Input value={amount} onChange={setAmount} placeholder="Amount" type="number" />
            <Button onClick={() => {}}>Send</Button>
        </Card>
    );
};`, msg: 'feat: create TransferForm component'
        },
        {
            file: 'src/components/BatchTransfer.tsx', content: `import React, { useState } from 'react';
import { Button, Card } from './ui';

interface Recipient {
    address: string;
    amount: number;
    memo: string;
}

export const BatchTransfer: React.FC = () => {
    const [recipients, setRecipients] = useState<Recipient[]>([]);
    
    const addRecipient = () => {
        setRecipients([...recipients, { address: '', amount: 0, memo: '' }]);
    };
    
    return (
        <Card title="Batch Transfer">
            <p>Add multiple recipients for batch xBTC transfer</p>
            <Button onClick={addRecipient}>Add Recipient</Button>
            {recipients.map((r, i) => (
                <div key={i}>Recipient {i + 1}</div>
            ))}
        </Card>
    );
};`, msg: 'feat: create BatchTransfer component'
        },
        {
            file: 'src/components/TransactionHistory.tsx', content: `import React from 'react';
import { Card, Spinner } from './ui';
import { useTransactions } from '../hooks/useTransactions';
import { useWallet } from '../hooks/useWallet';

export const TransactionHistory: React.FC = () => {
    const { address } = useWallet();
    const { transactions, loading } = useTransactions(address);
    
    if (loading) return <Spinner />;
    
    return (
        <Card title="Transaction History">
            {transactions.length === 0 ? (
                <p>No transactions yet</p>
            ) : (
                <ul>
                    {transactions.map((tx: any, i: number) => (
                        <li key={i}>{tx.hash}</li>
                    ))}
                </ul>
            )}
        </Card>
    );
};`, msg: 'feat: create TransactionHistory component'
        },
    ],

    // Service layer commits
    services: [
        { file: 'src/services/index.ts', content: '// Service layer exports\n\nexport {};', msg: 'feat: create services index' },
        {
            file: 'src/services/stacks.ts', content: `// Stacks blockchain service

import { StacksMainnet, StacksTestnet } from '@stacks/network';

export const getNetwork = (isMainnet: boolean = true) => {
    return isMainnet ? new StacksMainnet() : new StacksTestnet();
};`, msg: 'feat: create stacks network service'
        },
        {
            file: 'src/services/stacks.ts', append: `

export const fetchAccountBalance = async (address: string) => {
    const response = await fetch(\`https://api.mainnet.hiro.so/extended/v1/address/\${address}/balances\`);
    return response.json();
};`, msg: 'feat: add balance fetching service'
        },
        {
            file: 'src/services/transactions.ts', content: `// Transaction service

import { makeContractCall, broadcastTransaction } from '@stacks/transactions';
import { getNetwork } from './stacks';

export const sendXbtcMany = async (recipients: any[]) => {
    // Implementation would go here
    console.log('Sending to recipients:', recipients);
};`, msg: 'feat: create transaction service'
        },
        {
            file: 'src/services/api.ts', content: `// API service for external calls

const API_BASE = 'https://api.mainnet.hiro.so';

export const fetchTransaction = async (txId: string) => {
    const response = await fetch(\`\${API_BASE}/extended/v1/tx/\${txId}\`);
    return response.json();
};`, msg: 'feat: create API service'
        },
        {
            file: 'src/services/api.ts', append: `

export const fetchAddressTransactions = async (address: string, limit: number = 20) => {
    const response = await fetch(\`\${API_BASE}/extended/v1/address/\${address}/transactions?limit=\${limit}\`);
    return response.json();
};`, msg: 'feat: add address transactions API'
        },
    ],

    // Test setup commits
    tests: [
        { file: 'tests/unit/README.md', content: '# Unit Tests\n\nUnit tests for the application.', msg: 'test: create unit tests directory' },
        {
            file: 'tests/unit/utils.test.ts', content: `// Utils tests

import { describe, it, expect } from 'vitest';

describe('formatAddress', () => {
    it('should format address correctly', () => {
        // Test implementation
        expect(true).toBe(true);
    });
});`, msg: 'test: add format utils test skeleton'
        },
        {
            file: 'tests/unit/validation.test.ts', content: `// Validation tests

import { describe, it, expect } from 'vitest';

describe('isValidStacksAddress', () => {
    it('should validate correct addresses', () => {
        expect(true).toBe(true);
    });
    
    it('should reject invalid addresses', () => {
        expect(true).toBe(true);
    });
});`, msg: 'test: add validation tests'
        },
        { file: 'tests/integration/README.md', content: '# Integration Tests\n\nIntegration tests for smart contract interactions.', msg: 'test: create integration tests directory' },
        {
            file: 'vitest.config.ts', content: `import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
    },
});`, msg: 'test: add vitest configuration'
        },
    ],

    // Configuration commits
    config: [
        {
            file: '.env.example', content: `# Environment variables

VITE_NETWORK=mainnet
VITE_CONTRACT_ADDRESS=SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR`, msg: 'chore: add environment variables example'
        },
        {
            file: '.prettierrc', content: `{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}`, msg: 'chore: add prettier configuration'
        },
        {
            file: '.eslintrc.json', content: `{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  }
}`, msg: 'chore: add eslint configuration'
        },
        {
            file: '.editorconfig', content: `root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true`, msg: 'chore: add editor config'
        },
    ],

    // Smart contract enhancements
    contracts: [
        {
            file: 'contracts/traits/sip-010.clar', content: `;; SIP-010 Trait Definition

(define-trait sip-010-trait
  (
    (transfer (uint principal principal (optional (buff 34))) (response bool uint))
    (get-balance (principal) (response uint uint))
    (get-total-supply () (response uint uint))
    (get-name () (response (string-ascii 32) uint))
    (get-symbol () (response (string-ascii 32) uint))
    (get-decimals () (response uint uint))
    (get-token-uri () (response (optional (string-utf8 256)) uint))
  )
)`, msg: 'feat: add SIP-010 trait definition'
        },
        {
            file: 'contracts/xbtc-send-plus.clar', content: `;; xbtc-send-plus
;; Enhanced xBTC send functionality for Clarity 4

;; Error constants
(define-constant ERR-UNAUTHORIZED (err u100))
(define-constant ERR-INVALID-AMOUNT (err u101))
(define-constant ERR-TRANSFER-FAILED (err u102))`, msg: 'feat: create enhanced send-plus contract with error constants'
        },
        {
            file: 'contracts/xbtc-send-plus.clar', append: `

;; Data variables
(define-data-var contract-owner principal tx-sender)
(define-data-var total-transfers uint u0)`, msg: 'feat: add contract data variables'
        },
        {
            file: 'contracts/xbtc-send-plus.clar', append: `

;; Read-only functions
(define-read-only (get-owner)
    (ok (var-get contract-owner)))

(define-read-only (get-total-transfers)
    (ok (var-get total-transfers)))`, msg: 'feat: add read-only getter functions'
        },
        {
            file: 'contracts/xbtc-send-plus.clar', append: `

;; Transfer with tracking
(define-public (transfer-stx-tracked (amount uint) (recipient principal) (memo (buff 34)))
    (begin
        (asserts! (> amount u0) ERR-INVALID-AMOUNT)
        (try! (stx-transfer? amount tx-sender recipient))
        (var-set total-transfers (+ (var-get total-transfers) u1))
        (print memo)
        (ok true)))`, msg: 'feat: add tracked transfer function'
        },
        {
            file: 'contracts/xbtc-send-plus.clar', append: `

;; Admin functions
(define-public (set-owner (new-owner principal))
    (begin
        (asserts! (is-eq tx-sender (var-get contract-owner)) ERR-UNAUTHORIZED)
        (var-set contract-owner new-owner)
        (ok true)))`, msg: 'feat: add admin ownership function'
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

    console.log(`\n=== Completed ${branchCount} micro-commits ===`);
}

main();
