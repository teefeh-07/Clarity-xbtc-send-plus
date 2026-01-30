# Clarity xBTC Send Plus

A powerful Stacks blockchain application for efficient xBTC batch transfers.

## Features

- Single and batch xBTC transfers
- Automatic xBTC to STX swap integration
- Wallet integration (Hiro Wallet, WalletConnect)
- Transaction history tracking
- Real-time balance updates

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Blockchain**: Stacks, Clarity 4
- **Wallet**: @stacks/connect, WalletConnect
- **Styling**: CSS Variables, Custom Design System

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Smart Contracts

- `xbtc-send-many.clar` - Original batch transfer contract
- `xbtc-send-plus.clar` - Enhanced transfer with tracking
- `transfer-log.clar` - Transfer logging and history

## License

GPL-3.0