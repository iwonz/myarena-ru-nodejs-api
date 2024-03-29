# MyArena.ru NodeJS API
🔫 Library for using  server API in MyArena.ru hosting.

🤘 Writing with TypeScript.

☝️ Support all basic MyArena.ru API methods.

## Installation
```bash
yarn add @iwonz/myarena-ru-nodejs-api
```
or
```bash
npm install @iwonz/myarena-ru-nodejs-api
```

## Usage
```javascript
import { Api } from '@iwonz/myarena-ru-nodejs-api';

const api = new Api('YOUR_MYARENA_RU_API_TOKEN');

api.getStatus().then((response) => console.log(response));
api.start().then((response) => console.log(response));
api.stop().then((response) => console.log(response));
api.restart().then((response) => console.log(response));
api.changeLevel('de_dust2').then((response) => console.log(response));
api.getMaps().then((response) => console.log(response.maps));
api.consoleCmd('amx_reloadadmins').then((response) => console.log(response));
api.getResources().then((response) => console.log(response));
```
or using async/await syntax
```javascript
import { Api } from '@iwonz/myarena-ru-nodejs-api';

const api = new Api('YOUR_MYARENA_RU_API_TOKEN');

async function main() {
    try {
      const status = await api.getStatus();
      await api.start();
      await api.stop();
      await api.restart();
      await api.changeLevel('de_dust2');
      const maps = await api.getMaps();
      await api.consoleCmd('amx_reloadadmins');
      const resources = await api.getResources();
    } catch (error) {
      console.error(error);
    }
}

main();
```
By default, library use `https://www.myarena.ru/api.php` as MyArena API entrypoint.
You can also redefine it (in case MyArena changed it during this time).

To do this, pass an object with property `apiEntrypoint` as the second arguments to the `Api` class constructor.
```javascript
import { Api } from '@iwonz/myarena-ru-nodejs-api';

const api = new Api('YOUR_MYARENA_RU_API_TOKEN', {
  apiEntrypoint: 'https://www.myarena.ru/api.php'
});
```
