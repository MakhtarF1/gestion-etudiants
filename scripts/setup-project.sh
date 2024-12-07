#!/bin/bash

# Couleurs pour une meilleure lisibilité
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=== Installation du Projet de Gestion des Étudiants ===${NC}"

# Vérification de Git
if ! command -v git &> /dev/null; then
    echo -e "${RED}Git n'est pas installé. Veuillez installer Git avant de continuer.${NC}"
    exit 1
fi

# Vérification de Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js n'est pas installé. Veuillez installer Node.js avant de continuer.${NC}"
    exit 1
fi

# Configuration initiale
echo -e "\n${GREEN}1. Configuration initiale du projet${NC}"
git init
git add .
git commit -m "Initial commit: Configuration initiale du projet"

# Création des branches
echo -e "\n${GREEN}2. Création des branches de développement${NC}"
git branch develop
git branch release
git checkout develop

# Installation des dépendances
echo -e "\n${GREEN}3. Installation des dépendances${NC}"
npm install

# Configuration de l'environnement
echo -e "\n${GREEN}4. Configuration de l'environnement de développement${NC}"
if [ ! -f ".gitignore" ]; then
    echo "node_modules/" > .gitignore
    echo "dist/" >> .gitignore
    echo ".angular/" >> .gitignore
    echo "*.log" >> .gitignore
fi

# Démarrage du serveur
echo -e "\n${GREEN}5. Démarrage du serveur de développement${NC}"
echo -e "${BLUE}Le serveur démarre sur http://localhost:4200${NC}"
npm start