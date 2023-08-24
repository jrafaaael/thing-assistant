# thing-assistant

Yes, another `chat-with-your-pdf`-like app. But it's open-source (and self-hostable)!

## Why we need another one?

Probably we don't need another one, but this implementation is a mobile application instead of a web application. Also we use a local db (`postgres` with `pgvector` extension) instead of a vector store service (see [backend implementation](https://github.com/jrafaaael/thing-assistant-backend)).

## Local development

### Requirements

1. `Node.js LTS`
2. **(OPTIONAL)** Expo EAS account and `eas-cli` **(no needed if you have installed `xCode` and `Android Studio`)**

```bash
npm install -g eas-cli
eas login
```

### Run it!

1. Clone the repo and install dependencies

```bash
git clone git@github.com:jrafaaael/thing-assistant-mobile.git
cd thing-assistant-mobile/
npm i
```

2. Create `.env.local` file with correct values

```bash
cp .env.example .env.local
```

3. Create a development build **(if you have installed xCode and Android Studio you can use `--local` flag to build the project locally instead of Expo servers)**

```bash
eas build --profile development --platform all # or android or ios
```


4. Start the development server

```bash
yarn start
```

## Features

- [x] Chat history

- [ ] Replies

- [ ] Background uploads

- [ ] Chat with web pages

- [ ] Multi-file rooms

- [ ] Chat with multiple llm on-the-fly

## Others

- 🤔 Create a monorepo with both mobile and backend code
