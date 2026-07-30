# Where Your Privacy Policy URL Comes From

Hadal English is a fully static app (see `GOOGLE_PLAY_DEPLOYMENT_GUIDE.md`), and it
already includes an in-app Privacy Policy page at the `/privacy-policy` route
(`client/src/pages/privacy-policy.tsx`). **You don't need to host the policy
separately** — once you deploy the app to any static host, your Privacy Policy URL
for the Google Play Console is simply:

```
https://<your-deployed-domain>/privacy-policy
```

For example, if you deploy to Vercel/Netlify/Cloudflare Pages/Firebase and get
`https://hadal-english.vercel.app`, your Privacy Policy URL is
`https://hadal-english.vercel.app/privacy-policy`.

`PRIVACY_POLICY.md` in this repo is the source-of-truth text (kept in sync with the
in-app page) in case you ever want to publish it somewhere else too, e.g. a GitHub
Pages repo or Google Sites page. But for Play Console submission, the in-app route
above is the simplest and recommended option — it's already built, already
deployed with the app, and always reflects the current version.

## Quick checklist before submitting

1. ✅ Deploy the app (`npm run build`, then host the `dist/` folder).
2. ✅ Visit `https://<your-domain>/privacy-policy` and confirm it loads over HTTPS.
3. ✅ Paste that URL into Google Play Console → App content → Privacy policy.
