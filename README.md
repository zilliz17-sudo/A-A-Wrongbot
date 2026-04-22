# A-A-Wrongbot

Turn blunt or overly logical messages into emotionally validating, connection-friendly reframes — with selectable tones (Standard, Comic Relief, Mildly Spicy, Blunt-But-Kind, Fabio Heartthrob).

Stack: **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Groq** (server-side only).

## Local setup

1. Copy environment template:

   ```bash
   cp .env.example .env.local
   ```

2. Create **`.env.local`** in the project root (same folder as `package.json`). Add your developer key from the [Groq Console](https://console.groq.com) using the variable name **`GROQ_API_KEY`**. Do not paste keys into `.env.example`, `README`, tests, or any committed file.

   Optional in `.env.local`: **`GROQ_MODEL`** (defaults to `llama-3.3-70b-versatile` if unset).

3. Install and run:

   ```bash
   npm install
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## GitHub

From this directory (not your home folder):

```bash
git init
git add .
git commit -m "Initial commit: A-A-Wrongbot"
gh repo create A-A-Wrongbot --description "A-A-Wrongbot: emotional reframe + personas" --public --source=. --remote=origin --push
```

Requires [GitHub CLI](https://cli.github.com/) (`gh auth login`).

## Deploy on Vercel (free tier)

**Quick import (if you skipped this before):** open [Import this repo on Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fzilliz17-sudo%2FA-A-Wrongbot&project-name=a-a-wrongbot), sign in if asked, then continue through the wizard.

1. Ensure this repo is on GitHub (see **GitHub** above).
2. Import **A-A-Wrongbot** (link above, or [Vercel → New Project](https://vercel.com/new) → pick the GitHub repo).
3. Under **Environment Variables**, add **`GROQ_API_KEY`** (same value as in your local `.env.local`) and optionally **`GROQ_MODEL`** (see Local setup).
4. Deploy — Vercel runs `next build` automatically.

CLI alternative (requires a one-time browser login): run `npx vercel login` then `npx vercel --prod` from this folder.

Do **not** expose `GROQ_API_KEY` in the browser; this app only calls Groq from `app/api/reframe/route.ts`.

## Secrets (Groq)

- Never commit real keys. Use **`.env.local`** locally and **Vercel environment variables** in production.
- If a key ever appears in GitHub (push, gist, or chat), **revoke it in the [Groq console](https://console.groq.com)** and create a new one, then update `.env.local` and Vercel.

## Safety note

This is a **communication assistant**, not therapy or medical care. The system prompt includes basic refusal guidance for self-harm or harm to others.
