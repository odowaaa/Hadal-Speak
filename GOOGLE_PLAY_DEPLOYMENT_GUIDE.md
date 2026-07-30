# Hadal English - Google Play Store Deployment Guide

## Overview

Hadal English is a fully static Progressive Web App (PWA) — there is no backend
server or database. `npm run build` produces a `dist/` folder of plain HTML/CSS/JS
that can be hosted anywhere that serves static files, and wrapped as an Android app
with a Trusted Web Activity (TWA).

## What's already done in this repo

- ✅ Web App Manifest (`client/public/manifest.json`) with `any` and `maskable`
  icons, shortcuts, and theme colors
- ✅ Service worker (`client/public/sw.js`) for offline support, plus an
  `offline.html` fallback page
- ✅ Real app icons: `icon-192.png`, `icon-512.png`, `icon-maskable-192.png`,
  `icon-maskable-512.png`, `apple-touch-icon.png`, and favicons — all in
  `client/public/`
- ✅ In-app Privacy Policy page at the `/privacy-policy` route
- ✅ No database/account required — all user data (progress, settings) is stored
  in the browser's `localStorage`, so there's nothing to provision before deploying

## Step 1: Build the app

```bash
npm install
npm run build
```

This produces a `dist/` folder containing the complete static site.

## Step 2: Deploy to a static host (pick one)

Any of these give you a free HTTPS URL, which is required for both PWA install and
TWA/Play Store packaging.

### Vercel
```bash
npm install -g vercel
vercel --prod
```
Framework preset: "Other". Build command: `npm run build`. Output directory: `dist`.

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Cloudflare Pages / Firebase Hosting / GitHub Pages
Any static host works the same way: run `npm run build`, then upload/point the host
at the `dist/` folder. Make sure the host is configured for SPA fallback (serve
`index.html` for unknown routes) so client-side routes like `/lessons` work on
refresh.

Once deployed, confirm:
- `https://<your-domain>/` loads the app
- `https://<your-domain>/manifest.json` returns the manifest
- `https://<your-domain>/privacy-policy` shows the privacy policy

## Step 3: Package as an Android app (TWA)

You have two options — PWABuilder is the fastest if you don't want to install
Android tooling locally.

### Option A: PWABuilder (recommended, no local Android setup)

1. Go to [pwabuilder.com](https://www.pwabuilder.com/) and enter your deployed URL.
2. Let it analyze the manifest and service worker (should score well given the
   files already in this repo).
3. Click "Package for Stores" → "Android" → download the generated Android
   package (an Android Studio project + signing key).
4. Follow PWABuilder's instructions to build the `.aab` (Android App Bundle) with
   Android Studio, or use the bundled Gradle wrapper from the command line.

### Option B: Bubblewrap CLI (Google's official tool)

Requires Node.js, JDK 17+, and the Android SDK (Android Studio installs both).

```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://<your-domain>/manifest.json
```

Suggested answers when prompted:
- **Package name:** `com.hadalenglish.twa` (or your own reverse-domain id)
- **App name:** `Hadal English`
- **Theme color:** `#2563eb`
- **Background color:** `#ffffff`
- **Icon:** use `icon-512.png` (already maskable-safe)

```bash
bubblewrap build
```

This produces `app-release-bundle.aab` plus a signing key — **back up the signing
key somewhere safe**; you need the same key for every future update.

## Step 4: Digital Asset Links (required so the app opens without a browser bar)

After building, Bubblewrap/PWABuilder prints a SHA-256 certificate fingerprint.
Create `client/public/.well-known/assetlinks.json`:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.hadalenglish.twa",
    "sha256_cert_fingerprints": ["YOUR_APP_FINGERPRINT_HERE"]
  }
}]
```

Redeploy so it's live at `https://<your-domain>/.well-known/assetlinks.json`, then
verify with Google's
[Statement List Generator/Tester](https://developers.google.com/digital-asset-links/tools/generator).

## Step 5: Google Play Console submission

### Create the app
1. Go to [Google Play Console](https://play.google.com/console) → "Create app"
2. **App name:** Hadal English - Speak & Learn
3. **Default language:** English (United States)
4. **App or game:** App · **Free or paid:** Free

### App content
- **Privacy policy URL:** `https://<your-domain>/privacy-policy`
- **Ads:** No
- **Data safety form:** Since the app has no server and no accounts, declare
  **no data collected or shared** (see `PRIVACY_POLICY.md` for the exact wording
  to justify this)
- **Content rating:** complete the questionnaire — educational language-learning app
- **Target audience:** general audience, not primarily directed at children

### Store listing
- **Short description:** Learn English through practical lessons for Somali speakers
- **Full description:**
  ```
  Hadal English is a language learning app designed specifically for
  Somali-speaking adults who want to improve their English skills.

  Key Features:
  • Three progressive learning levels (Beginner, Intermediate, Advanced)
  • Bilingual content with Somali translations
  • Interactive voice practice and pronunciation guides
  • Cultural context tips for real-world conversations
  • Progress tracking, streaks, and achievements — all saved on your device
  • Works offline once installed, no account required

  Perfect for:
  - Somali speakers learning English
  - Students preparing for English proficiency tests
  - Professionals improving workplace English

  Download now and start your English learning journey!
  ```
- **App icon:** `client/public/icon-512.png`
- **Feature graphic:** create a 1024x500 promotional image (not included in this repo)
- **Screenshots:** take 2-8 screenshots of the running app on a phone

### Upload the release
1. Release → Production → "Create new release"
2. Upload `app-release-bundle.aab`
3. Add release notes, e.g.:
   ```
   Initial release of Hadal English!

   ✓ Three learning levels with progressive difficulty
   ✓ Bilingual English-Somali content
   ✓ Voice practice and pronunciation guides
   ✓ Interactive quizzes and progress tracking
   ✓ Dark mode support
   ✓ Works offline, no account needed
   ```
4. Save, review, and submit.

## Step 6: Test before submitting

- [ ] Load the deployed URL in Chrome on Android and confirm "Add to Home Screen"
      / install prompt appears
- [ ] Turn on airplane mode after one visit and confirm the app still opens
      (service worker offline support)
- [ ] Click through all lessons, complete a quiz, confirm progress persists after
      closing and reopening the app
- [ ] Toggle dark mode and language (English/Somali) and confirm both apply across
      every page
- [ ] Confirm the installed TWA opens full-screen with no browser address bar
      (this only works once `assetlinks.json` is correctly deployed)

## Timeline

- **App review:** typically 1-3 days (longer for a first-time developer account)
- **Updates:** usually reviewed faster than the initial submission

## Contact

**Developer:** Abdinur Mohamed Odowa
**Email:** odowaa1996@gmail.com
**WhatsApp:** +252616538992

## Additional Resources

- [Google Play Console](https://play.google.com/console)
- [PWABuilder](https://www.pwabuilder.com/)
- [Bubblewrap Documentation](https://github.com/GoogleChromeLabs/bubblewrap)
- [Trusted Web Activity docs](https://developer.chrome.com/docs/android/trusted-web-activity/)
