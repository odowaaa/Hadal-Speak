# Hadal English - Deployment Status Summary

## What's ready in this repo

- **PWA files:** `client/public/manifest.json`, `client/public/sw.js`,
  `client/public/offline.html`
- **Real app icons:** `icon-192.png`, `icon-512.png`, `icon-maskable-192.png`,
  `icon-maskable-512.png`, `apple-touch-icon.png`, `favicon-16.png`,
  `favicon-32.png` — all generated PNGs, nothing left to convert
- **No backend to provision:** the app is a static site; all user data (lesson
  progress, quiz scores, settings) lives in the browser's `localStorage`
- **In-app Privacy Policy:** `/privacy-policy` route, kept in sync with
  `PRIVACY_POLICY.md`
- **Verified build:** `npm run check` (TypeScript) and `npm run build` (Vite)
  both pass cleanly
- **Screenshots:** 5 phone screenshots in `client/public/screenshots/`, wired
  into `manifest.json`'s `screenshots` field
- **Deployed:** live at https://hadal-speak.vercel.app/ (Vercel, auto-deploys
  from `main` on every push; `vercel.json` handles SPA routing)

## What you still need to do

1. **Package it as an Android app** with PWABuilder or Bubblewrap (Step 3) —
   point it at `https://hadal-speak.vercel.app/`.
2. **Add `.well-known/assetlinks.json`** with your app's signing fingerprint so
   the installed app opens without a browser address bar (Step 4).
3. **Create a 1024x500 feature graphic** for the Play Store listing (separate
   from the in-app screenshots — a promotional banner image; not yet in this
   repo).
4. **Submit to Google Play Console** (Step 5) — the Data Safety form should
   declare "no data collected or shared," since there is no server.

## Key facts for the Play Store listing

- **App name:** Hadal English - Speak & Learn
- **Suggested package name:** `com.hadalenglish.twa`
- **Category:** Education
- **Price:** Free
- **Theme color:** `#2563eb`

## Developer contact

- **Developer:** Abdinur Mohamed Odowa
- **Email:** odowaa1996@gmail.com
- **WhatsApp:** +252616538992

See `GOOGLE_PLAY_DEPLOYMENT_GUIDE.md` for the full step-by-step guide.
