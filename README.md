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

1. Clone the repo and install dependencies

```bash
git clone git@github.com:jrafaaael/thing-assistant.git
cd thing-assistant/
yarn install
```

2. Create `.env.*` files and populate with correct values

```bash
cp backend/.env.example backend/.env && cp mobile/.env.example mobile/.env.local
```

3. Create a development build **(if you already have xCode and Android Studio installed, you can use `--local` flag to build the project locally instead of Expo servers)**

```bash
yarn mobile:build:dev:android # or yarn mobile:build:dev:ios
```

4. Run the container

```bash
docker compose up
```

5. In a separate terminal, start the backend development server

```bash
yarn backend:dev
```

4. In a separate terminal, start the mobile development server

```bash
yarn mobile:dev
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

## Others

- 🐋 Fix `Dockerfile`
