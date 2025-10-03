# Contributing to KaspaZof

Merci de votre intérêt pour contribuer à KaspaZof! 🎉

## 🔒 Règles de Sécurité

Avant de contribuer, assurez-vous de:

1. ❌ **NE JAMAIS** committer de fichiers `.env` ou secrets
2. ❌ **NE JAMAIS** inclure de clés API ou mots de passe
3. ✅ Tester localement avant de soumettre
4. ✅ Respecter le principe de "local-only"

## 📝 Comment Contribuer

### 1. Fork et Clone

```bash
# Fork le projet sur GitHub
# Puis cloner votre fork
git clone https://github.com/VOTRE_USERNAME/KaspaZof.git
cd KaspaZof
```

### 2. Créer une Branche

```bash
git checkout -b feature/ma-nouvelle-fonctionnalite
```

### 3. Faire vos Changements

- Respecter le style de code existant
- Ajouter des commentaires si nécessaire
- Mettre à jour la documentation si pertinent

### 4. Tester Localement

```bash
# Tester avec Docker
docker-compose up -d --build

# Lancer les smoke tests
./tests/smoke-test.sh

# Vérifier les logs
docker-compose logs
```

### 5. Commit et Push

```bash
git add .
git commit -m "feat: ajout de ma nouvelle fonctionnalité"
git push origin feature/ma-nouvelle-fonctionnalite
```

### 6. Créer une Pull Request

1. Aller sur GitHub
2. Cliquer sur "New Pull Request"
3. Décrire vos changements
4. Soumettre!

## 💡 Idées de Contributions

### Frontend
- 🎨 Améliorer l'interface utilisateur
- 📊 Ajouter des graphiques supplémentaires
- 🌙 Mode sombre/clair
- 🌍 Internationalisation (i18n)

### Backend
- 🔐 Améliorer le chiffrement du wallet
- 📡 Ajouter plus d'endpoints API
- 🔄 Optimiser le cache des prix
- 📈 Ajouter des statistiques réseau

### Infrastructure
- 🐳 Optimiser les Dockerfiles
- 📦 Ajouter des tests unitaires
- 🔧 Améliorer les scripts d'installation
- 📝 Améliorer la documentation

### Sécurité
- 🛡️ Audit de sécurité
- 🔒 Améliorer les pratiques de chiffrement
- 🚨 Ajouter des alertes de sécurité
- 📋 Documentation de sécurité

## 🎯 Style de Code

### Python (Backend)
- Suivre PEP 8
- Utiliser des type hints
- Documenter les fonctions avec docstrings
- Limiter les lignes à 100 caractères

### JavaScript/React (Frontend)
- Utiliser des composants fonctionnels
- Préférer les hooks React
- Nommer les composants en PascalCase
- Nommer les fichiers comme les composants

### Commits
Utiliser des messages de commit clairs:
```
feat: ajouter nouvelle fonctionnalité
fix: corriger un bug
docs: mettre à jour la documentation
style: améliorer le style du code
refactor: refactoriser le code
test: ajouter des tests
chore: tâches de maintenance
```

## 🐛 Rapporter des Bugs

Pour rapporter un bug, créer une issue avec:
- 📝 Description claire du problème
- 🔄 Étapes pour reproduire
- 💻 Version de Docker/OS
- 📋 Logs pertinents

## 💬 Questions

Pour des questions:
- Ouvrir une Discussion sur GitHub
- Créer une issue avec le label "question"

## 📜 Code de Conduite

- Respecter les autres contributeurs
- Être constructif dans les critiques
- Accueillir les nouveaux contributeurs
- Maintenir un environnement inclusif

## ✅ Checklist avant Pull Request

- [ ] Code testé localement
- [ ] Documentation mise à jour
- [ ] Pas de secrets dans les commits
- [ ] Messages de commit clairs
- [ ] Smoke tests passent
- [ ] Code respecte le style du projet

## 🙏 Remerciements

Merci de contribuer à KaspaZof et à la communauté Kaspa! 

---

**Ensemble, construisons un meilleur moniteur Kaspa!** 🔷
