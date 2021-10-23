## build
```bash
$ git https://github.com/michael199619/rosatom
$ cd rosatom
$ cp .env.example .env # Update database 
$ yarn install
```

### fixtures ./src/db/fixures.ts

## start
```bash
$ yarn build
$ yarn start:dev
```
Server started at http://localhost:3001/

## start docker
```bash
$ cp .env.example .env
$ docker-compose up 
```

Server started at http://localhost:3001/ \
Swagger started at http://localhost:3001/docs

## tests
```bash
$ yarn test
```

## debug
```bash
$ npm run debug
```
