<div align="center">

<p>
  <a>
    <img href="" src="assets\Pterom.svg" height="auto">
  </a>
</p>

[![GitHub Issues](https://img.shields.io/github/issues/Code-Sorcerers/Pterom.svg?style=for-the-badge)](https://github.com/Code-Sorcerers/Pterom/issues)
![Updated Badge](https://badges.pufler.dev/updated/Code-Sorcerers/Pterom?style=for-the-badge)
![Current Version](https://img.shields.io/github/v/release/Code-Sorcerers/Pterom?style=for-the-badge)
[![Support Server](https://img.shields.io/discord/862036528934158356.svg?label=Discord&logo=Discord&colorB=7289da&style=for-the-badge)](https://discord.gg/kU25cFa9YR)

---

## 📌 What am I?

Pterom is a open source API wrapper for Pterodactyl that is built with TypeScript. It will support the Application & Client side of the API. Currenty it is a work in progress.

---

## ❓ How do I work?

This library works by querying the Pterodactyl API V1 \(REST requests\) using a library called [AXIOS](https://www.npmjs.com/package/axios).

---

## 💻 Getting started with installation

First install pterom with your package manager.

```bash
npm i pterom
or
yarn add pterom
```

```ts
// Import it

// ESM
import Pterom from 'pterom';

// CJS
const Pterom = require('pterom');

// Create a new instance
// Remember that client and app sides have diffrent API keys
const pt = new Pterom('YourHostHere', 'YourApiKeyHere');

// Choose what class you want to use

// For client
pt.client;
// For application
pt.app;

// You can then use the functions after choosing the class
pt.client.listServers();
pt.app.listServers();

// To use app and client in the same file there needs to be 2 instances to separate them
const appSide = new Pterom('appHost', 'appApiKey');
const clientSide = new Pterom('clientHost', 'clientApiKey');

appSide.app.listServers();
clientSide.client.listServers();

// And away you go coding!
// Any issues please just open a issue on github
// And join the convo by clicking the discord button above
```

---

## 📖 Documentation (coming soon)

The full documentation will be started on once there is a stable version. But JSDocs will be included within the code.

---

## 🧾 License

This project is licensed under the terms of the **GPL-3.0 License**.

> You can check out the full license [HERE](https://github.com/Code-Sorcerers/Pterom/blob/main/LICENSE)

</div>
