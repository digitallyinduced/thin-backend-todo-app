# Thin React Starter

## Usage

Create a new project:

```bash
npx degit digitallyinduced/thin-typescript-react-starter myproject
```

On first start install the npm dependencies:

```bash
npm install
```

Set the `BACKEND_URL` in `.env` to your project's url:

```bash
# .env
BACKEND_URL=https://REPLACE ME.di1337.com
```

After this you can start the web server and esbuild watcher:

```bash
npm run dev
```

## Type Checking

The application server will not display type errors by default. For that you need to start a second process:

```bash
npm run typecheck
```

Before the first type check, open the Project Settings and install the provided TypeScript type declaration for your project.

## Bundling for Production

```bash
export BACKEND_URL="https://REPLACE ME.thinbackend.app"
npm run build
```
