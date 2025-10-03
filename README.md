# 🔷 KaspaZof

**Moniteur local sécurisé pour Kaspa**

KaspaZof est un tableau de bord local pour surveiller le réseau Kaspa, les prix de KAS, et gérer un portefeuille chiffré. Conçu pour une utilisation locale uniquement, il offre une interface intuitive et des fonctionnalités de sécurité robustes.

## ⚠️ Important - Usage Local Uniquement

**Ce projet est conçu UNIQUEMENT pour une utilisation locale. Ne jamais exposer les ports à Internet.**

- ✅ Utilisez sur votre machine locale
- ✅ Utilisez sur votre réseau local privé (LAN)
- ❌ NE PAS exposer à Internet
- ❌ NE PAS déployer sur un serveur public

## 🚀 Fonctionnalités

### Backend (FastAPI)
- ✅ Endpoint de santé (`/health`)
- ✅ Portefeuille chiffré avec cryptographie AES
- ✅ Proxy prix CoinGecko (KAS vs USD/EUR/BTC)
- ✅ Documentation API interactive (Swagger)
- ✅ Connexion au nœud Kaspad

### Frontend (React + Vite)
- ✅ Dashboard temps réel
- ✅ Graphiques de prix KAS (USD, EUR, BTC)
- ✅ Indicateurs de statut système
- ✅ Interface moderne et responsive
- ✅ Mise à jour automatique des prix

### Infrastructure
- ✅ Docker Compose pour orchestration
- ✅ Service Kaspad intégré
- ✅ Volumes persistants pour données
- ✅ Réseau isolé sécurisé

## 📋 Prérequis

- **Docker** (version 20.10+)
- **Docker Compose** (version 2.0+)
- **OpenSSL** (pour génération de clés)
- **Bash** (pour scripts d'installation)

### Installation de Docker

**Ubuntu/Debian:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

**macOS:**
```bash
brew install --cask docker
```

**Windows:**
Téléchargez Docker Desktop depuis https://www.docker.com/products/docker-desktop

## 🔧 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/BJATechnology/KaspaZof.git
cd KaspaZof
```

### 2. Configuration de l'environnement

Le fichier `.env.example` contient les variables d'environnement nécessaires. Le script d'installation va le copier et générer automatiquement une clé de chiffrement.

**Variables importantes:**
- `WALLET_ENCRYPTION_KEY` - Clé pour chiffrer le portefeuille (générée automatiquement)
- `KASPAD_RPC_USER` - Nom d'utilisateur RPC Kaspad
- `KASPAD_RPC_PASS` - Mot de passe RPC Kaspad (⚠️ CHANGEZ-LE!)
- `COINGECKO_API_KEY` - Clé API CoinGecko (optionnel)

### 3. Lancer l'installation

```bash
./scripts/setup.sh
```

Le script va:
1. Vérifier que Docker est installé
2. Créer le fichier `.env` avec une clé de chiffrement sécurisée
3. Construire les images Docker
4. Démarrer les services
5. Ouvrir le frontend dans votre navigateur

### 4. Installation manuelle (alternative)

Si vous préférez une installation manuelle:

```bash
# Copier .env.example vers .env
cp .env.example .env

# Générer une clé de chiffrement sécurisée
openssl rand -hex 32

# Éditer .env et remplacer la clé
nano .env

# Construire et démarrer
docker-compose build
docker-compose up -d
```

## 🎯 Utilisation

### Accéder aux services

- **Frontend (Dashboard):** http://localhost:5173
- **Backend API:** http://localhost:8000
- **Documentation API:** http://localhost:8000/docs
- **Kaspad RPC:** localhost:16110

### Commandes utiles

```bash
# Voir les logs
docker-compose logs -f

# Voir les logs d'un service spécifique
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f kaspad

# Arrêter les services
docker-compose down

# Redémarrer les services
docker-compose restart

# Reconstruire après modifications
docker-compose up -d --build

# Supprimer volumes (⚠️ perte de données)
docker-compose down -v
```

### Tests de fumée (Smoke Tests)

Pour valider que tout fonctionne correctement:

```bash
./tests/smoke-test.sh
```

Les tests vérifieront:
- ✅ Conteneurs en cours d'exécution
- ✅ Endpoints API accessibles
- ✅ Frontend disponible
- ✅ Volumes Docker créés

## 🔒 Sécurité

### ⚠️ IMPORTANT - À FAIRE ABSOLUMENT

1. **Ne JAMAIS committer le fichier `.env`**
   - Le `.gitignore` le bloque automatiquement
   - Contient des secrets sensibles

2. **Changer les mots de passe par défaut**
   - `KASPAD_RPC_PASS` dans `.env`
   - Utilisez des mots de passe forts et uniques

3. **Protéger la clé de chiffrement**
   - `WALLET_ENCRYPTION_KEY` est critique
   - La sauvegarder de manière sécurisée
   - Ne jamais la partager

4. **Utilisation locale uniquement**
   - Ne pas exposer les ports 5173, 8000, 16110 à Internet
   - Utiliser uniquement sur réseau local sécurisé

5. **Sauvegardes**
   - Sauvegarder régulièrement les volumes Docker
   - Conserver `.env` dans un endroit sûr

### Bonnes pratiques

- ✅ Utiliser un VPN si accès depuis réseau public
- ✅ Configurer un firewall local
- ✅ Maintenir Docker à jour
- ✅ Surveiller les logs régulièrement
- ❌ Ne pas partager vos clés API
- ❌ Ne pas utiliser en production sans audit de sécurité

## 📁 Structure du projet

```
KaspaZof/
├── docker-compose.yml          # Orchestration Docker
├── .env.example                # Template variables d'environnement
├── .gitignore                  # Fichiers à ignorer
├── README.md                   # Cette documentation
│
├── backend/                    # API FastAPI
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── __init__.py
│       └── main.py             # API principale
│
├── frontend/                   # Interface React
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── components/
│           ├── Dashboard.jsx   # Tableau de bord
│           ├── Dashboard.css
│           ├── PriceChart.jsx  # Graphiques
│           └── PriceChart.css
│
├── scripts/
│   └── setup.sh                # Script d'installation
│
└── tests/
    └── smoke-test.sh           # Tests de validation
```

## 🐛 Dépannage

### Les services ne démarrent pas

```bash
# Vérifier les logs
docker-compose logs

# Vérifier que les ports ne sont pas déjà utilisés
netstat -tuln | grep -E '5173|8000|16110'

# Nettoyer et redémarrer
docker-compose down
docker-compose up -d
```

### Erreur "Cannot connect to backend"

1. Vérifier que le backend est démarré: `docker-compose ps`
2. Vérifier les logs: `docker-compose logs backend`
3. Tester manuellement: `curl http://localhost:8000/health`

### Erreur de prix CoinGecko

CoinGecko peut rate-limiter les requêtes. Solutions:
1. Ajouter une `COINGECKO_API_KEY` dans `.env`
2. Attendre quelques minutes avant de réessayer
3. Vérifier la connexion Internet

### Problèmes de permissions Docker

```bash
# Ajouter votre utilisateur au groupe docker
sudo usermod -aG docker $USER

# Se déconnecter et reconnecter, ou:
newgrp docker
```

## 🔄 Mises à jour

Pour mettre à jour KaspaZof:

```bash
# Récupérer les dernières modifications
git pull origin main

# Reconstruire et redémarrer
docker-compose down
docker-compose up -d --build
```

## 📊 API Endpoints

### Health Check
```bash
GET http://localhost:8000/health
```

### Prix Kaspa
```bash
GET http://localhost:8000/api/prices
```

### Statut Portefeuille
```bash
GET http://localhost:8000/api/wallet/status
```

### Documentation complète
Visitez http://localhost:8000/docs pour la documentation interactive Swagger.

## 🤝 Contribution

Les contributions sont les bienvenues! Pour contribuer:

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## ⚖️ Disclaimer

**KaspaZof est fourni "tel quel", sans garantie d'aucune sorte.**

- Ce projet est expérimental et destiné à un usage personnel
- Ne pas utiliser avec de grandes quantités de crypto-monnaie
- Toujours faire vos propres recherches (DYOR)
- Les auteurs ne sont pas responsables des pertes financières
- Utiliser à vos propres risques

## 🔗 Ressources

- [Kaspa Official](https://kaspa.org/)
- [Kaspa GitHub](https://github.com/kaspanet)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Docker Documentation](https://docs.docker.com/)
- [CoinGecko API](https://www.coingecko.com/en/api)

## 📧 Support

Pour des questions ou des problèmes:
- Ouvrir une issue sur GitHub
- Consulter la documentation
- Vérifier les logs avec `docker-compose logs`

---

**Fait avec ❤️ pour la communauté Kaspa**

*N'oubliez pas: Utilisez uniquement en local! 🔒*
