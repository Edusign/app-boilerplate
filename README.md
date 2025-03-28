![Logo Edusign](https://edusign.com/fr/wp-content/uploads/sites/2/2023/09/new-logo-square-edusign.png)
# Edusign App Boilerplate

Welcome to the official **Edusign** boilerplate repository! This project aims to provide a simple and efficient starting point for creating applications intended for our marketplace. It uses [Express](https://expressjs.com/), a minimalistic web framework for Node.js.

## Table of Contents

- [About](#about)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Support](#support)

## About

The **Edusign Express Boilerplate** is designed to be a "plug & play" repository allowing developers to quickly start developing applications integrated into the Edusign marketplace. It includes basic configurations and essential file structures to get started.

## Prerequisites

Before starting, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

Clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/Edusign/app-boilerplate
cd app-boilerplate
npm install
```

## Getting Started

To start the local server, use the following command:

```bash
npm start
```

Your application will then be accessible at [http://localhost:3000](http://localhost:3000).
Nothing will happen until the application receives a POST call on an `install`, `uninstall`, or `home` route.

- To test, you need to create [your first application on the Edusign platform](https://developers.edusign.com/docs/building-an-app#creating-your-first-app).
- You will need an HTTPS URL to test the server. For this, you can use the [local-tunnel](https://theboroer.github.io/localtunnel-www/) library or [ngrok](https://ngrok.com/docs/getting-started/).
  - For local-tunnel, first install the library:
  ```sh
  npm install -g localtunnel
  ```
  - Then start the server listener with the command:
  ```sh
  lt --port 3000 --subdomain my-new-app
  ```
  Feel free to customize the subdomain to suit your needs.
  
- Once the application is created on the platform and local-tunnel or ngrok is running, you need to [create your first action](https://developers.edusign.com/docs/glossary#app-actions).
  - In `Platform`, choose **Administration**.
  - In `Location`, choose **Dashboard**.
  - In URL, enter the URL provided by local-tunnel or ngrok with the api version, for example, `https://my-new-app.loca.lt/v1` (do not specify the port).
- Now it's time to test, go to your Edusign platform dashboard and you should see your new app working. Be sure to check the logs of your boilerplate.

## Project Structure

Here is an overview of the project's file structure:

```
app-boilerplate/
├── dist/
├── tests/
├── src/
│   ├── core/
│   ├── middlewares/
│   ├── routes/
│   │   ├── v1/   
│   │   │   ├── home.ts
│   │   │   ├── index.ts
│   │   │   ├── install.ts
│   │   │   └── uninstall.ts
│   │   └── webhook/   
│   │       ├── index.ts
│   │       └── onCourseEdited.ts
│   ├── types/
│   ├── utils/
│   ├── app.js
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

- **dist/**: Contains the transpiled static files.
- **test/**: Allows defining a suite of tests for the application.
- **src/**: Contains the application's source code.
  - **middlewares/**: Contains Express middlewares.
  - **core/**: Contains the technical logic of an action, which can be used across multiple routes.
  - **routes/**: Defines the API and Webhooks endpoints.
  - **types/**: Contains the different types used in the application.
  - **utils/**: Contains utility functions for the application.
  - **app.js**: Initializes the middlewares and routes.
  - **index.js**: Starts the server.
- **.gitignore**: List of files and directories to be ignored by Git.
- **package.json**: npm configuration file.
- **README.md**: Project documentation.

## Contributing

Contributions are welcome! To contribute, please follow these steps:

1. Fork the repository.
2. Create a branch for your feature (`git checkout -b feature/my-new-feature`).
3. Commit your changes (`git commit -m 'Add a new feature'`).
4. Push your branch (`git push origin feature/my-new-feature`).
5. Open a Pull Request.

## Support

If you have any questions or need help, feel free to open an issue in this repository.