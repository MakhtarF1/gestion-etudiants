#!/bin/bash

# Instructions pour Git
echo "Guide d'installation et de configuration du projet"
echo "================================================"
echo ""
echo "1. Cloner le projet :"
echo "git clone <URL_DU_REPO> gestion-etudiants"
echo "cd gestion-etudiants"
echo ""
echo "2. Créer et basculer sur la branche develop :"
echo "git checkout -b develop"
echo ""
echo "3. Installer les dépendances :"
echo "npm install"
echo ""
echo "4. Démarrer le serveur de développement :"
echo "npm start"
echo ""
echo "5. Pour déployer en production :"
echo "git checkout -b release"
echo "npm run build:prod"
echo "# Le dossier dist sera créé avec les fichiers de production"
echo ""
echo "6. Fusionner les modifications :"
echo "git checkout main"
echo "git merge release"
echo ""
echo "7. Créer un tag de version :"
echo "git tag -a v1.0.0 -m 'Version 1.0.0'"
echo "git push origin v1.0.0"

# Installation et démarrage automatique
npm install
npm start