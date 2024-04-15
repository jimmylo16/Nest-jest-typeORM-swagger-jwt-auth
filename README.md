## Description

Add Description

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running inside a docker container

Make sure that you have docker installed and running in your pc, this will execute the docker-compose.yml file:

```bash
$ docker compose up -d
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Local Database

To use the local database (optional) type in the terminal:

```bash
$ npm run db
```

this will turn down the docker-compose.yml file db service:

```bash
$ npm run db:down
```

## Migrations

You can add autoload entities in order to create the database automatically (not recomended for production), instead you can run the following typeOrm commands to create the migration (Just in case that you dont have the migration folder and file inside the db folder you can skip this step), every time that you make a change in the entities a new migration should be generated:

1. The name should be descriptive , but you should store all the migrations in the same folder:

```bash
$ npm run migration:generate db/migrations/testMigration
```

This will generate inside the `db/migration` folder a typescript file with all the querys to create the tables

2. To load this testMigration with the CLI you can use

```bash
$ npm run migration:run
```

3. In case that you already have a migration file and want to purge your db, you can use:

```bash
$ npm run migration:revert
```

## Endpoints Docs

To see the swagger docs you can run the server and then go to the following url (change the port if needed):

```
http://localhost:3000/api
```

If you want to have this documentation in postman instead, you can import it, to do that:

1. Make sure that you have postman or another API platform installed
2. Start the server
3. Go to import
4. Import as an url
5. Paste `http://localhost:3000/api-json` -> this will generate the json from the swagger docs
6. Click in import
