# A-A-Wrongbot

Pick a **character coach** (each has a voice and look). They explain **how your draft might land**, validate what you meant, then give a **copy-ready message**. Powered by **Groq** on the server.

**Web stack:** Next.js (App Router), TypeScript, Tailwind. **iOS shell:** Expo app in [`mobile/`](mobile/) (WebView → your deployed site).

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

## API limits

`POST /api/reframe` applies a **sliding-window rate limit per IP** (default **12 requests / 60 seconds** per server instance). Tune with optional env vars:

- `REFRAME_RATE_LIMIT_MAX` (default `12`)
- `REFRAME_RATE_LIMIT_WINDOW_MS` (default `60000`)

Messages are capped at **8000 characters**. For many serverless instances, move limits to **Redis/Upstash** so counts are global.

## App Store (iOS) — finish the “wrapper”

1. **Deploy the website** (Vercel) and confirm it works in Safari over **HTTPS**.
2. **Apple Developer Program** ($99/year) and **App Store Connect** listing (name, screenshots, privacy URL).
3. **Point the Expo shell at production:**

   ```bash
   cd mobile
   cp .env.example .env
   # set EXPO_PUBLIC_WEB_APP_URL=https://<your-vercel-app>.vercel.app
   ```

4. **Install EAS CLI** and configure (one-time): [Expo EAS Submit](https://docs.expo.dev/submit/introduction/).

   ```bash
   npm install -g eas-cli
   eas login
   cd mobile && eas build:configure
   eas build --platform ios
   ```

5. **Submit to TestFlight / App Store** via `eas submit` or Xcode Organizer.

The `mobile` app is a **WebView** around the live site: ship UX on the web first; the store binary tracks that URL. For a fully native UI later, port screens to React Native instead of WebView.


## Operator handoff checklist (April 2026)

Use this exact sequence to finish launch tasks that must be performed in external dashboards/devices:

1. **Vercel**
   - Import the project in Vercel.
   - Add `GROQ_API_KEY` in Project → Settings → Environment Variables.
   - Deploy to production and verify the HTTPS URL loads in Safari.
2. **Mobile `.env` + simulator verification**
   - `cd mobile && cp .env.example .env`
   - Set `EXPO_PUBLIC_WEB_APP_URL=https://<your-app>.vercel.app`
   - `npx expo start`
   - Press `i` to open iOS Simulator and confirm the hosted site loads in WebView.
3. **App Store release flow (when ready)**
   - Enroll in Apple Developer.
   - Run `eas build --platform ios`.
   - Run `eas submit --platform ios`.
   - In App Store Connect, finalize screenshots, privacy policy URL, and review metadata.

### Optional pre-submit cleanup

- Change `mobile/app.json` bundle/package IDs from `com.aawrongbot.app` to your own reverse-DNS identifier.
- Publish and use `https://<your-domain>/privacy` as the App Store privacy URL.

## Safety note

This is a **communication assistant**, not therapy or medical care. The system prompt includes basic refusal guidance for self-harm or harm to others.
