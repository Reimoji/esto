# ESTO – Krediidiliin (demo)

Clickable, mobile-first demo of the ESTO credit line page. Built with Vite + React + React Router, plain CSS.

## Run locally

```bash
npm install
npm run dev
```

## What's clickable

- Sidebar navigation (all menu items route to a page; mobile uses a hamburger drawer)
- **Esita taotlus** → choose limit → sign contract → credit line becomes active
- **Võta raha välja** → withdraw an amount; balance and progress bar update
- FAQ accordion, **Klienditugi** button, language picker, chat bubble
- **Logi välja** resets the demo state (state is kept in localStorage)

## Deploy to Vercel

Import the repo in Vercel. Framework preset: **Vite**. No root directory setting needed.
`vercel.json` adds an SPA rewrite so deep links like `/krediidiliin` work.
