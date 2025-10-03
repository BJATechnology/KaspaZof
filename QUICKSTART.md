# KaspaZof - Quick Start Guide

## 🚀 Installation Rapide

### En 3 étapes:

1. **Cloner et accéder au projet**
```bash
git clone https://github.com/BJATechnology/KaspaZof.git
cd KaspaZof
```

2. **Lancer l'installation automatique**
```bash
./scripts/setup.sh
```

3. **Accéder au dashboard**
Ouvrir votre navigateur: http://localhost:5173

C'est tout! 🎉

## 📝 Commandes Essentielles

### Démarrer KaspaZof
```bash
docker-compose up -d
```

### Arrêter KaspaZof
```bash
docker-compose down
```

### Voir les logs
```bash
docker-compose logs -f
```

### Relancer après modifications
```bash
docker-compose up -d --build
```

### Tester le système
```bash
./tests/smoke-test.sh
```

## 🔗 URLs Importantes

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Documentation API**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## 🔧 Configuration

Éditer le fichier `.env` pour configurer:
- `WALLET_ENCRYPTION_KEY` - Clé de chiffrement (générée automatiquement)
- `KASPAD_RPC_PASS` - Mot de passe RPC (⚠️ à changer!)
- `COINGECKO_API_KEY` - Clé API CoinGecko (optionnel)

## ⚠️ Sécurité - À RETENIR

1. ❌ **NE JAMAIS** exposer à Internet
2. ❌ **NE JAMAIS** committer le fichier `.env`
3. ✅ Utiliser uniquement en local
4. ✅ Changer les mots de passe par défaut

## 🆘 Problèmes Courants

### Les services ne démarrent pas
```bash
docker-compose down
docker-compose up -d
docker-compose logs
```

### Port déjà utilisé
```bash
# Trouver le processus
lsof -i :5173
lsof -i :8000

# Arrêter le processus ou changer le port dans docker-compose.yml
```

### Erreur de connexion backend
```bash
curl http://localhost:8000/health
docker-compose logs backend
```

## 📚 Documentation Complète

Voir [README.md](README.md) pour la documentation complète.

## 🎯 Fonctionnalités Principales

✅ Surveillance du réseau Kaspa en temps réel
✅ Prix KAS en USD, EUR, et BTC
✅ Graphiques historiques des prix
✅ Statut du système (Backend, Kaspad, Wallet)
✅ Interface moderne et responsive
✅ Mise à jour automatique toutes les 60 secondes

---

**KaspaZof - Moniteur Local pour Kaspa** 🔷
