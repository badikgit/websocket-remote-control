# RSSchool NodeJS websocket task template
> Static http server and base task packages. 
> By default WebSocket client tries to connect to the 8080 port.

## Installation
1. Clone/download repo
```bash
git clone {repository URL} {path to the folder where the repository would be saved}
cd {path to the folder where the repository was saved}/crud-api
```
2. `npm install`
3. Rename file `.env.test` to `.env`

## Usage
**Development**

`npm run start:dev`

* App served @ `http://localhost:8181` with nodemon

**Production**

`npm run start`

* App served @ `http://localhost:8181` without nodemon

---

**All commands**

Command | Description
--- | ---
`npm run start:dev` | App served @ `http://localhost:8181` with nodemon
`npm run start` | App served @ `http://localhost:8181` without nodemon
`npm run lint` | Analysis of all supported files by ESLint rules
`npm run prettier` | Rewrite all supported files by Prettier rules
`npm run fix` | Fix all supported files by Prettier and ESLint rules
`npm run build` | Creating app build in `dist` folder

**Note**: replace `npm run` with `yarn` in `package.json` if you use yarn.
