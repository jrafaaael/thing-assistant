# thing-assistant

Yes, another `chat-with-your-pdf`-like app. But it's open-source (and self-hostable)!

## Why we need another one?

Probably we don't need another one, but this implementation is a mobile application instead of a web application. Also we use a local db (`postgres` with `pgvector` extension) instead of a vector store service.

## Local development

### Requirements

1. `Node.js LTS`
2. `Yarn`
3. `Docker` and `docker-compose`
4. **(OPTIONAL)** Expo EAS account and `eas-cli` **(no needed if you have installed `xCode` and `Android Studio`)**

```bash
npm install -g eas-cli
eas login
```

### Run it!

0. Clone the repo

```bash
git clone git@github.com:jrafaaael/thing-assistant.git
cd thing-assistant/
```

#### Server

1. Create `.env` file and provide values for the required variable `COHERE_API_KEY`. Consider changing `DATABASE_PASSWORD` to something randomly generated

```bash
cp docker/.env.example docker/.env
```

2. Run container

```bash
make dev
```

> [!IMPORTANT]
> The first time you run the container, you must perform database migrations. To do so, start the container (see previous step) and, in another terminal, run:
>
> ```bash
> docker compose exec thing-assistant-backend npx prisma migrate deploy
> ```

#### Mobile

1. Install dependencies

```bash
cd mobile/
yarn install
```

2. Create `.env.local` file and populate with correct values

```bash
cp .env.example .env.local
```

3. Create a development build **(if you already have xCode and Android Studio installed, you can use `--local` flag to build the project locally instead of Expo servers)**

```bash
yarn mobile:build:dev:android # OR yarn mobile:build:dev:ios
```

4. Start the mobile development server

```bash
yarn start
```

## Features

- [x] Chat history

- [ ] Replies

- [ ] Background uploads

- [ ] Chat with multiple file extension

- [ ] Chat with web pages

- [ ] Multi-file rooms

- [ ] OCR for pdf files

- [ ] Chat with multiple llm on-the-fly
