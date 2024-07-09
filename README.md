# Node.js REST Application using typescript
## _api-typescript-node-jest_


> This project is a base setup for a Node.js REST Application using typescript.
> It is designed to serve as a starting point for other projects,
> providing a basic structure and common functionalities such as user management.

## Features

- Create API RESTful using typescript;
- Create, update, and list users;
- Unit test;
- Documentation;

## Tech

This project uses several open source projects to function correctly::

- [Docker] - Platform for developing, shipping, and running applications using containerization;
- [Node.js] - JavaScript runtime built on Chrome’s V8 JavaScript engine;
- [MongoDB] - MongoDB is a source-available, cross-platform, document-oriented database program. Classified as a NoSQL database product, MongoDB utilizes JSON-like documents with optional schemas;
- [mongoose] - Mongoose is a JavaScript object-oriented programming library that creates a connection between MongoDB and the Node.js JavaScript runtime environment;
- [pino] - Super fast, all natural JSON logger for Node.js;
- [express] - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.;
- [express-pino-logger] - An express middleware to log with pino. Incidentally, it also works without express;
- [swagger-ui-express] - This module allows you to serve auto-generated swagger-ui generated API docs from express, based on a swagger.json file;
- [jest] - Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase. It allows you to write tests with an approachable, familiar and feature-rich API;
- [supertest] - Supertest npm is a module for Node. js that allows testing of APIs using a small, powerful API; it simplifies the process of creating and running tests, identifies bugs easily;


## Installation

Dillinger requires [Node.js](https://nodejs.org/) v16+ to run.

### Usage
##### How to start

First of all, install the dependencies:

```bash
    yarn install
```


Enter the database container to create the base/user
```bash
docker exec -it mongo mongosh -u root -p example

use library

db.createUser({ user: "root", pwd: "example", roles: [ { role: "readWrite", db: "library" }] })
```

Run as development:
```bash
    docker-compose up -d
```

## How to test:

Run script:

```bash
    docker-compose up -d
    yarn run test
```

## Project structure:

A brief overview of how was structure the project and the database used.

### Language

- [Typescript](https://www.typescriptlang.org/)

### Structure:

It was used the project pattern like an MVC, so it has a layer of view that handles the request and delegate to the controller layer that does the business logic, that at the end delegate any query to the DB to model layer. So the project folder structure followed this pattern as defined below:

```
    src
    - controller // View Layer
    - service // Controller Layer
    - model // Model Layer
```

## License

MIT
**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job.)
[Docker]: <https://docs.docker.com/>
[Node.js]: <https://nodejs.org/docs/latest/api/>
[pino]: <https://www.npmjs.com/package/pino>
[express]: <https://www.npmjs.com/package/express>
[express-pino-logger]: <https://www.npmjs.com/package/express-pino-logger>
[MongoDB]: <https://www.mongodb.com/>
[mongoose]: <https://www.npmjs.com/package/mongoose>
[swagger-ui-express]: <https://www.npmjs.com/package/swagger-ui-express>
[jest]: <https://www.npmjs.com/package/jest>
[supertest]: <https://www.npmjs.com/package/supertest>
