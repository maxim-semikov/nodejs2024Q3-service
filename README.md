# Home Library Service
Link to task [Home Library Service: Part 2](https://github.com/AlreadyBored/nodejs-assignments/tree/main/assignments/containerization-database-orm) 

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop/).

## Downloading

```
git clone https://github.com/maxim-semikov/nodejs2024Q3-service.git
```
## Switch to the `develop-part2` branch

## Installing NPM modules

```
npm ci
```

## Add .env file

Rename .env.example to .env


## Create and running docker container.
Docker compose is based on images. You can also see docker images here: [app](https://hub.docker.com/r/maximsemikov/nodejs2024q3-service-app) abd [db](https://hub.docker.com/r/maximsemikov/nodejs2024q3-service-db)

```
npm docker:up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

```
npm run test
```
To run all tests without authorization

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
### Scan Docker containers
You can also run a report on scanning Docker images for vulnerabilities using the docker scout tool.

```aiignore
npm docker:scan
```
