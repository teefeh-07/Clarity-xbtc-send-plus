const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Helper to run shell commands
function run(cmd) {
    console.log(`Running: ${cmd}`);
    try {
        execSync(cmd, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Command failed: ${cmd}`);
        process.exit(1);
    }
}

const PROJECT_ROOT = process.cwd();

const tasks = [
    {
        branch: 'chore/setup-clarinet',
        message: 'chore: update Clarinet.toml configuration',
        files: [
            {
                path: 'Clarinet.toml',
                content: `[project]
name = "Clarity-xbtc-send-plus"
description = "A Clarinet project for xBTC send many functionality"
authors = []
telemetry = false
cache_dir = "./.cache"
requirements = []
[contracts.xbtc-send-many]
path = "contracts/xbtc-send-many.clar"
clarity_version = 4
epoch = "3.3"

[repl.analysis]
passes = ["check_checker"]

[repl.analysis.check_checker]
strict = false
trusted_sender = false
trusted_caller = false
callee_filter = false
`
            }
        ]
    },
    {
        branch: 'chore/init-package',
        message: 'chore: initialize package.json',
        files: [
            {
                path: 'package.json',
                content: JSON.stringify({
                    name: "clarity-xbtc-send-plus",
                    private: true,
                    version: "1.0.0",
                    type: "module",
                    scripts: {
                        "dev": "vite",
                        "build": "tsc && vite build",
                        "preview": "vite preview"
                    },
                    dependencies: {},
                    devDependencies: {}
                }, null, 2)
            }
        ]
    },
    {
        branch: 'feat/add-stacks-deps',
        message: 'feat: add stacks blockchain dependencies',
        files: [
            {
                path: 'package.json',
                update: (content) => {
                    const pkg = JSON.parse(content);
                    pkg.dependencies = {
                        ...pkg.dependencies,
                        "@stacks/connect": "^7.3.0",
                        "@stacks/transactions": "^6.0.0",
                        "@stacks/network": "^6.0.0",
                        "@stacks/common": "^6.0.0"
                    };
                    return JSON.stringify(pkg, null, 2);
                }
            }
        ]
    },
    {
        branch: 'feat/add-walletconnect-deps',
        message: 'feat: add wallet connect dependencies',
        files: [
             {
                path: 'package.json',
                update: (content) => {
                    const pkg = JSON.parse(content);
                    pkg.dependencies = {
                        ...pkg.dependencies,
                        "@walletconnect/web3wallet": "^1.10.0",
                        "@walletconnect/core": "^2.11.0"
                    };
                    return JSON.stringify(pkg, null, 2);
                }
            }
        ]
    },
    {
        branch: 'feat/add-chainhooks-dep',
        message: 'feat: add chainhooks client dependency',
        files: [
             {
                path: 'package.json',
                update: (content) => {
                    const pkg = JSON.parse(content);
                    pkg.dependencies = {
                        ...pkg.dependencies,
                        "@hirosystems/chainhooks-client": "^1.0.0"
                    };
                    return JSON.stringify(pkg, null, 2);
                }
            }
        ]
    },
    {
        branch: 'feat/add-vite-react-deps',
        message: 'feat: add vite and react dependencies',
        files: [
             {
                path: 'package.json',
                update: (content) => {
                    const pkg = JSON.parse(content);
                    pkg.dependencies = {
                        ...pkg.dependencies,
                        "react": "^18.2.0",
                        "react-dom": "^18.2.0",
                         "lucide-react": "^0.300.0"
                    };
                    pkg.devDependencies = {
                        ...pkg.devDependencies,
                         "@types/react": "^18.2.43",
                        "@types/react-dom": "^18.2.17",
                        "@vitejs/plugin-react": "^4.2.1",
                        "typescript": "^5.2.2",
                        "vite": "^5.0.8"
                    };
                    return JSON.stringify(pkg, null, 2);
                }
            }
        ]
    },
    {
        branch: 'chore/setup-tsconfig',
        message: 'chore: setup typescript configuration',
        files: [
            {
                path: 'tsconfig.json',
                content: JSON.stringify({
                    "compilerOptions": {
                        "target": "ES2020",
                        "useDefineForClassFields": true,
                        "lib": ["ES2020", "DOM", "DOM.Iterable"],
                        "module": "ESNext",
                        "skipLibCheck": true,
                        "moduleResolution": "bundler",
                        "allowImportingTsExtensions": true,
                        "resolveJsonModule": true,
                        "isolatedModules": true,
                        "noEmit": true,
                        "jsx": "react-jsx",
                        "strict": true,
                        "noUnusedLocals": true,
                        "noUnusedParameters": true,
                        "noFallthroughCasesInSwitch": true
                    },
                    "include": ["src"],
                    "references": [{ "path": "./tsconfig.node.json" }]
                }, null, 2)
            },
            {
                path: 'tsconfig.node.json',
                content: JSON.stringify({
                    "compilerOptions": {
                        "composite": true,
                        "skipLibCheck": true,
                        "module": "ESNext",
                        "moduleResolution": "bundler",
                        "allowSyntheticDefaultImports": true
                    },
                    "include": ["vite.config.ts"]
                }, null, 2)
            }
        ]
    },
    {
        branch: 'chore/setup-vite-config',
        message: 'chore: configure vite',
        files: [
            {
                path: 'vite.config.ts',
                content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})`
            }
        ]
    },
    {
        branch: 'feat/setup-index-html',
        message: 'feat: create index.html entry point',
        files: [
            {
                path: 'index.html',
                content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Clarity xBTC Plus</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
            }
        ]
    },
    {
        branch: 'feat/setup-src-dir',
        message: 'feat: create src directory structure',
        files: [
            {
                path: 'src/placeholder.txt',
                content: 'Initialization'
            }
        ]
    },
    {
        branch: 'feat/add-main-tsx',
        message: 'feat: add main application entry point',
        files: [
            {
                path: 'src/main.tsx',
                content: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`
            }
        ]
    },
    {
        branch: 'style/add-index-css',
        message: 'style: add global styles',
        files: [
            {
                path: 'src/index.css',
                content: `:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}`
            }
        ]
    },
    {
        branch: 'feat/add-app-tsx',
        message: 'feat: add main app component structure',
        files: [
            {
                path: 'src/App.tsx',
                content: `import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Clarity xBTC Send Plus</h1>
      <div className="card">
        <p>
          Connect your wallet to get started.
        </p>
      </div>
    </div>
  )
}

export default App`
            }
        ]
    },
        {
        branch: 'style/add-app-css',
        message: 'style: add app specific styles',
        files: [
            {
                path: 'src/App.css',
                content: `#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}`
            }
        ]
    },
    // Adding more granular feature components
    {
        branch: 'feat/create-hooks-dir',
        message: 'feat: create hooks directory',
         files: [
            {
                path: 'src/hooks/README.md',
                content: '# Custom Hooks'
            }
        ]
    },
     {
        branch: 'feat/create-components-dir',
        message: 'feat: create components directory',
         files: [
            {
                path: 'src/components/README.md',
                content: '# React Components'
            }
        ]
    },
    {
        branch: 'feat/add-stacks-context',
        message: 'feat: implement stacks connection context',
        files: [
            {
                path: 'src/context/StacksContext.tsx',
                content: `import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';

interface StacksContextValue {
    userSession: UserSession;
    authenticate: () => void;
    userData: any;
}

const StacksContext = createContext<StacksContextValue | undefined>(undefined);

export const StacksProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const appConfig = new AppConfig(['store_write', 'publish_data']);
    const userSession = new UserSession({ appConfig });
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        if (userSession.isSignInPending()) {
            userSession.handlePendingSignIn().then(userData => {
                setUserData(userData);
            });
        } else if (userSession.isUserSignedIn()) {
            setUserData(userSession.loadUserData());
        }
    }, []);

    const authenticate = () => {
        showConnect({
            appDetails: {
                name: 'Clarity xBTC Send Plus',
                icon: window.location.origin + '/vite.svg',
            },
            redirectTo: '/',
            onFinish: () => {
                setUserData(userSession.loadUserData());
            },
            userSession,
        });
    };

    return (
        <StacksContext.Provider value={{ userSession, authenticate, userData }}>
            {children}
        </StacksContext.Provider>
    );
};

export const useStacks = () => {
    const context = useContext(StacksContext);
    if (context === undefined) {
        throw new Error('useStacks must be used within a StacksProvider');
    }
    return context;
};`
            }
        ]
    },
    {
        branch: 'feat/add-wallet-connect-btn',
        message: 'feat: create wallet connect button component',
        files: [
            {
                path: 'src/components/ConnectWallet.tsx',
                content: `import React from 'react';
import { useStacks } from '../context/StacksContext';

export const ConnectWallet: React.FC = () => {
    const { authenticate, userData } = useStacks();

    if (userData) {
        return (
            <button className="wallet-btn connected">
                {userData.profile.stxAddress.mainnet}
            </button>
        );
    }

    return (
        <button className="wallet-btn" onClick={authenticate}>
            Connect Wallet
        </button>
    );
};`
            }
        ]
    },
    {
        branch: 'refactor/app-use-provider',
        message: 'refactor: wrap app in stacks provider',
        files: [
            {
                path: 'src/main.tsx',
                content: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StacksProvider } from './context/StacksContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StacksProvider>
        <App />
    </StacksProvider>
  </React.StrictMode>,
)`
            }
        ]
    },
    {
        branch: 'feat/add-navbar',
        message: 'feat: add navigation bar component',
         files: [
            {
                path: 'src/components/Navbar.tsx',
                content: `import React from 'react';
import { ConnectWallet } from './ConnectWallet';

export const Navbar = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', alignItems: 'center', background: '#333' }}>
            <div className="logo">xBTC Plus</div>
            <ConnectWallet />
        </nav>
    );
};`
            }
        ]
    },
     {
        branch: 'feat/integrate-navbar',
        message: 'feat: integrate navbar into app layout',
         files: [
            {
                path: 'src/App.tsx',
                content: `import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <h1>Clarity xBTC Send Plus</h1>
        <div className="card">
          <p>
            Welcome to the future of Stacks transactions.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App`
            }
        ]
    },
    {
        branch: 'chore/add-gitignore',
        message: 'chore: add gitignore for node projects',
        files: [
            {
                path: '.gitignore',
                content: `node_modules
dist
.env
.DS_Store
coverage
.vscode
`
            }
        ]
    }
];

async function main() {
    let commitCount = 0;
    
    // Ensure we are on main
    try {
        run('git checkout main');
    } catch {
        run('git checkout -b main');
    }

    for (const task of tasks) {
        console.log(`\nProcessing task: ${task.branch}`);
        
        // Create branch
        try {
            run(`git checkout -b ${task.branch}`);
        } catch {
            run(`git checkout ${task.branch}`);
        }

        // Apply changes
        for (const file of task.files) {
            const filePath = path.join(PROJECT_ROOT, file.path);
            const dir = path.dirname(filePath);
            
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            if (file.update && fs.existsSync(filePath)) {
                const current = fs.readFileSync(filePath, 'utf-8');
                const ignored = fs.writeFileSync(filePath, file.update(current));
            } else {
                fs.writeFileSync(filePath, file.content);
            }
            console.log(`Updated ${file.path}`);
        }

        // Commit
        run('git add .');
        try {
             run(`git commit -m "${task.message}"`);
        } catch (e) {
            console.log("Nothing to commit, skipping...");
            run('git checkout main');
            run(`git branch -D ${task.branch}`);
            continue;
        }

        // Merge
        run('git checkout main');
        run(`git merge --no-ff ${task.branch} -m "Merge pull request #${commitCount + 1} from ${task.branch}"`); // Simulate PR merge
        run(`git branch -d ${task.branch}`);
        
        commitCount++;
        console.log(`Completed ${commitCount} tasks.`);
    }

    console.log("All tasks completed successfully.");
}

main();
