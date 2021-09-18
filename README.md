<div align="center">

<p>
  <a>
    <img href="" src="https://cdn.discordapp.com/attachments/754460402729091212/879178582281322516/Pterom.jpg" height="auto">
  </a>
</p>

[![GitHub Issues](https://img.shields.io/github/issues/Code-Sorcerers/Pterom.svg?style=for-the-badge)](https://github.com/Code-Sorcerers/Pterom/issues)
![Updated Badge](https://badges.pufler.dev/updated/Code-Sorcerers/Pterom?style=for-the-badge)
![Current Version](https://img.shields.io/github/v/release/Code-Sorcerers/Pterom?style=for-the-badge)
![Bulid](https://img.shields.io/github/workflow/status/Code-Sorcerers/Pterom/Continuous%20integration%20&%20deployment?style=for-the-badge)
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

---

## ✨ Contributors

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/cainthebest"><img src="https://avatars.githubusercontent.com/u/75994858?v=4?s=100" width="100px;" alt=""/><br /><sub><b>cainthebest</b></sub></a><br /><a href="https://github.com/Code-Sorcerers/Pterom/commits?author=cainthebest" title="Code">💻</a> <a href="https://github.com/Code-Sorcerers/Pterom/commits?author=cainthebest" title="Documentation">📖</a></td>
    <td align="center"><a href="https://npmjs.org/coloras"><img src="https://avatars.githubusercontent.com/u/67773205?v=4?s=100" width="100px;" alt=""/><br /><sub><b>mister</b></sub></a><br /><a href="https://github.com/Code-Sorcerers/Pterom/commits?author=mister-coded" title="Code">💻</a> <a href="https://github.com/Code-Sorcerers/Pterom/commits?author=mister-coded" title="Documentation">📖</a></td>
    <td align="center"><a href="http://ghostdev.xyz"><img src="https://avatars.githubusercontent.com/u/47755378?v=4?s=100" width="100px;" alt=""/><br /><sub><b>GHOST</b></sub></a><br /><a href="https://github.com/Code-Sorcerers/Pterom/commits?author=ghostdevv" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Rejxcted"><img src="https://avatars.githubusercontent.com/u/85765707?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Rejxcted</b></sub></a><br /><a href="https://github.com/Code-Sorcerers/Pterom/commits?author=Rejxcted" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

---

|          Emoji/Type          |       Represents       |                                       Comments                                       |
| :--------------------------: | :--------------------: | :----------------------------------------------------------------------------------: |
|       🐛 <br /> `bug`        |      Bug reports       |                 Links to issues reported by the user on this project                 |
|       💻 <br /> `code`       |          Code          |                     Links to commits by the user on this project                     |
|       📖 <br /> `doc`        |     Documentation      | Links to commits by the user on this project, Wiki, or other source of documentation |
|     💡 <br /> `example`      |        Examples        |                   People that have created examples to help others                   |
|    💵 <br /> `financial`     |   Financial Support    |                     People or orgs who provide financial support                     |
|      🤔 <br /> `ideas`       |    Ideas & Planning    |                                                                                      |
|   🚧 <br /> `maintenance`    |      Maintenance       |                       People who help in maintaining the repo                        |
|   🧑‍🏫 <br /> `mentoring`   |       Mentoring        |                          People who mentor new contributors                          |
| 📆 <br/> `projectManagement` |   Project Management   |                                                                                      |
|     💬 <br /> `question`     |  Answering Questions   |                          Answering Questions in Issues etc.                          |
|      👀 <br /> `review`      | Reviewed Pull Requests |                                                                                      |
|     🛡️ <br /> `security`     |        Security        |                Identify and/or reduce security threats, Privacy, etc                 |
|       ⚠️ <br /> `test`       |         Tests          |                            People that have created tests                            |
|     ✅ <br /> `tutorial`     |       Tutorials        |              content creators that have made tutorials on this wrapper               |
|   📓 <br /> `userTesting`    |      User Testing      |                     People that have found an issue via testing                      |

</div>
