# thing-assistant

Yes, another `chat-with-your-pdf`-like app. But it's open-source (and self-hostable)!

## Why we need another one?

Probably we don't need another one, but this implementation is a [mobile application](https://github.com/jrafaaael/thing-assistant-mobile) instead of a web application. Also we use a local db (`postgres` with `pgvector` extension) instead of a vector store service.

## Local development

### Requirements

1. `Docker` and `docker-compose`
2. `Node.js@18`

### Run it!

1. Clone the repo and install dependencies

```bash
git clone git@github.com:jrafaaael/thing-assistant-backend.git
cd thing-assistant-backend/
npm i
```

2. Create `.env` file with correct values

```bash
cp .env.example .env
```

3. Run the container

```bash
docker compose up
```

4. In a separate terminal, start the development server

```bash
npm run start:dev
```

## Features

- [x] Chat history

- [ ] Replies

- [ ] Chat with web pages

- [ ] OCR for pdf files

- [ ] Multi-file rooms

- [ ] Chat with multiple llm on-the-fly

## Others

- 🐋 Fix `Dockerfile`
- 🤔 Create a monorepo with both mobile and backend code
