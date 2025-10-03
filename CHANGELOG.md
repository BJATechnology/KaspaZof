# Changelog

All notable changes to KaspaZof will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-XX

### Added
- Initial release of KaspaZof
- Docker Compose orchestration with 3 services (backend, frontend, kaspad)
- FastAPI backend with REST API
  - Health check endpoint
  - CoinGecko price proxy (USD, EUR, BTC)
  - Encrypted wallet placeholder
  - Wallet status endpoint
  - Interactive API documentation (Swagger)
- React + Vite frontend
  - Real-time dashboard
  - Price display cards (USD, EUR, BTC)
  - Interactive price charts with Recharts
  - System status indicators
  - Auto-refresh every 60 seconds
  - Responsive design
- Kaspad service integration
- Installation script (setup.sh)
- Smoke tests for validation
- Comprehensive documentation
  - README.md (French)
  - QUICKSTART.md
  - CONTRIBUTING.md
  - Security guidelines
- Configuration files
  - .env.example with all required variables
  - .gitignore for sensitive files
  - docker-compose.yml
- Security features
  - Encrypted wallet support
  - Local-only deployment
  - Environment variable management
  - Automatic encryption key generation

### Security
- CORS configured for local use only
- Wallet encryption with cryptography library
- Environment variables for sensitive data
- .gitignore prevents committing secrets
- Security warnings in documentation

## [Unreleased]

### Planned Features
- Full wallet encryption implementation
- Transaction history tracking
- Network statistics dashboard
- Multi-language support (English, French)
- Dark/Light theme toggle
- Mobile app (React Native)
- Desktop app (Electron)
- Enhanced price charts with more timeframes
- Alert notifications for price changes
- Backup and restore functionality
- Advanced security features

---

For more information, see [README.md](README.md)
