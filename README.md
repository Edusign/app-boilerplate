# Edusign Express Boilerplate

Bienvenue dans le dépôt officiel du boilerplate **Edusign** ! Ce projet a pour but de fournir un point de départ simple et efficace pour la création d'applications destinées à notre marketplace. Il utilise [Express](https://expressjs.com/), un framework web minimaliste pour Node.js.

## Table des matières

- [À propos](#à-propos)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Démarrage](#démarrage)
- [Structure du projet](#structure-du-projet)
- [Contribuer](#contribuer)
- [Support](#support)

## À propos

Le **Edusign Express Boilerplate** est conçu pour être un dépôt "plug&play" permettant aux développeurs de démarrer rapidement le développement d'applications intégrées à la marketplace d'Edusign. Il inclut les configurations de base et les structures de fichiers essentielles pour débuter.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Installation

Clonez le dépôt et installez les dépendances nécessaires :

```bash
git clone https://github.com/Edusign/app-boilerplate
cd app-boilerplate
npm install
```

## Démarrage

Pour lancer le serveur de développement, utilisez la commande suivante :

```bash
npm start
```

Votre application sera alors accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Structure du projet

Voici un aperçu de la structure des fichiers du projet :

```
edusign-express-boilerplate/
├── dist/
├── tests/
├── src/
│   ├── core/
│   ├── middlewares/
│   ├── routes/
│   │   └── v1/   
│   │       ├─ home.ts
│   │       ├─ index.ts
│   │       ├─ install.ts
│   │       └── uninstall.ts
│   ├── types/
│   ├── utils/
│   ├── app.js
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

- **dist/** : Contient les fichiers statiques transpilés.
- **test/** : Permet de définir une suite de tests pour l'application
- **src/** : Contient le code source de l'application.
  - **middlewares/** : Contient les middlewares Express.
  - **core/** : Contient la logique technique d'une action, qui peut être utilisée sur plusieurs routes.
  - **routes/** : Définit les endpoints de l'API.
  - **types/** : Contient les différents types de l'application
  - **utils/** : Contient des fonctions utils pour l'application
  - **app.js** : Initialise les middlewares et les routes.
  - **index.js** : Démarre le serveur.
- **.gitignore** : Liste des fichiers et dossiers à ignorer par Git.
- **package.json** : Fichier de configuration npm.
- **README.md** : Documentation du projet.

## Contribuer

Les contributions sont les bienvenues ! Pour contribuer, veuillez suivre ces étapes :

1. Fork le dépôt
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-nouvelle-fonctionnalité`)
3. Committez vos modifications (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Poussez votre branche (`git push origin feature/ma-nouvelle-fonctionnalité`)
5. Ouvrez une Pull Request

## Support

Si vous avez des questions ou avez besoin d'aide, n'hésitez pas à ouvrir une issue dans ce dépôt.