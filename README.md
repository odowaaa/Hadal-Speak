# Hadal English - Learn English for Somali Speakers

A mobile-first English learning application designed specifically for Somali-speaking adults. Learn English through practical daily-life lessons with bilingual content, interactive quizzes, and voice practice.

## Features

- **Three Learning Levels**: Beginner, Intermediate, and Advanced
- **Bilingual Content**: English-Somali translations and cultural context
- **Voice Practice**: Pronunciation guides with speech recognition
- **Interactive Quizzes**: Progress tracking and immediate feedback
- **Dark Mode**: Complete theme support with smooth transitions, shared across every page
- **PWA Ready**: Works offline and can be installed on mobile devices
- **Lesson Reminders**: Voice alerts in both English and Somali
- **No account, no server**: all progress and settings are saved locally on your device

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Shadcn/UI + Radix UI + Tailwind CSS
- **Routing**: Wouter
- **Data**: Static lesson content + `localStorage`-backed progress (no backend, no database)
- **Mobile**: PWA with service worker, offline fallback page, and installable manifest

This app is a fully static site — there is nothing to deploy but the built
`dist/` folder, and nothing to provision (no database, no server, no API keys).

## Getting Started

### Prerequisites
- Node.js 18 or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/odowaaa/hadal-speak.git
cd hadal-speak
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build   # outputs the static site to dist/
npm run preview # serve the production build locally to sanity-check it
```

## Google Play Store Deployment

This app is ready for Google Play Store deployment as a PWA (Progressive Web App) using Trusted Web Activity (TWA).

### Quick Deployment Steps:
1. `npm run build` and deploy the `dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, Firebase Hosting, GitHub Pages) to get an HTTPS URL
2. Package it as an Android app with [PWABuilder](https://www.pwabuilder.com/) or Bubblewrap: `npm install -g @bubblewrap/cli` then `bubblewrap init --manifest https://your-url/manifest.json`
3. Build: `bubblewrap build`
4. Upload the generated `.aab` file to Google Play Console

See `GOOGLE_PLAY_DEPLOYMENT_GUIDE.md` for detailed instructions and `DEPLOYMENT_SUMMARY.md` for a quick checklist of what's already done vs. what's left.

## Privacy Policy

Since the app has no server or accounts, the privacy policy is short: nothing is
collected, and all data (progress, settings) stays in your browser's local
storage. It's available at the `/privacy-policy` route and as `PRIVACY_POLICY.md`.

## Learning Content

The app includes three progressive levels:

### Level 1 - Beginner (Bilaabaha)
- Basic greetings and introductions
- Numbers and time
- Essential daily phrases
- Family and personal information

### Level 2 - Intermediate (Dhexdhexaadka)
- Workplace conversations
- Shopping and daily activities
- Past and future tense usage
- Cultural context integration

### Level 3 - Advanced (Horumarsan)
- Professional communication
- Complex storytelling
- Formal and informal registers
- Advanced grammar structures

## Developer

**Abdinur Mohamed Odowa**
- Email: odowaa1996@gmail.com
- WhatsApp: +252616538992

## License

MIT License - see `LICENSE` file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For support or questions about the app, please contact:
- Email: odowaa1996@gmail.com
- WhatsApp: +252616538992

---

Made with ❤️ for the Somali community learning English
