FROM node:22 as build

WORKDIR /app

COPY . .

RUN npm install


FROM node:22-alpine

WORKDIR /app

COPY --from=build /app /app

EXPOSE $PORT

CMD ["npm", "run", "start:dev:migrate"]
