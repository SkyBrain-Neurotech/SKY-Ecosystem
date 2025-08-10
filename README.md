# SkyBrain NeuroBank - Decentralized Neural Data Ecosystem

A standalone web application for the SkyBrain decentralized neural data ecosystem, featuring NFT minting, research marketplace, and staking pools.

## Features

- **Neural Data NFTs**: Convert EEG recordings into valuable NFTs
- **Research Marketplace**: Submit data to verified research projects from top institutions
- **Staking Pools**: Earn rewards by staking SKY tokens
- **Quality Scoring**: AI-powered data quality assessment
- **Privacy-First**: GDPR compliant with blockchain-based consent management

## Architecture

This app contains extracted web3 functionality from the main SkyBrain application, including:

- **Sky Ecosystem Service**: Core blockchain and NFT functionality
- **Session Tokenizer**: EEG data to NFT conversion
- **Research Projects**: Active neuroscience research integration
- **Staking Pools**: Token staking and rewards system

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
The app will run on `http://localhost:3001` (different port from main app to avoid conflicts)

### Build
```bash
npm run build
```

### Lint & Type Check
```bash
npm run lint
npm run type-check
```

## Key Components

### Core Services
- `src/utils/skyEcosystem.ts` - Main blockchain service
- `src/components/SessionTokenizer.tsx` - NFT minting component

### Pages
- `src/pages/NeuroBank.tsx` - Main landing page (converted from Neiry branding)

### UI Components
- `src/components/ui/` - Reusable UI components (card, button, badge)

## Differences from Main App

- **Separate Port**: Runs on port 3001 to avoid conflicts
- **Independent**: No dependencies on main app
- **Web3 Focused**: Specialized for blockchain/NFT functionality
- **SkyBrain Branding**: Converted from Neiry to SkyBrain theming

## Integration

This app can be integrated with the main SkyBrain application via:
- Shared API endpoints
- Cross-origin communication
- Embedded iframe components
- Shared authentication tokens

## Research Partners

Active research collaborations with:
- Stanford Neuroscience Lab
- MIT Brain & Cognitive Sciences  
- Johns Hopkins Sleep Center
- Harvard Medical School
- UC Berkeley Neuroscience Institute
- Yale Center for Emotional Intelligence

## Contact

- **General**: contact@skybrain.in
- **Legal**: legal@skybrain.in
- **Security**: security@skybrain.in
- **Support**: help@skybrain.in

---

© 2025 SkyBrain Technologies Private Limited. All rights reserved.