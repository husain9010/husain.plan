# practisEN Brand Kit

Hand-off package for developers and AI coding tools.

## Quick start

```bash
# 1. Copy the kit into your project
cp -r brand-kit /your-app/brand

# 2a. Plain CSS — import the tokens
<link rel="stylesheet" href="/brand/tokens/fonts.css">
<link rel="stylesheet" href="/brand/tokens/tokens.css">

# 2b. Tailwind — wire in the preset
# tailwind.config.js
module.exports = {
  presets: [require('./brand/tokens/tailwind.config.js')],
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
};
```

## What's in here

```
brand-kit/
├── README.md                 ← you are here
├── BRAND.md                  ← the brand rules (start here)
├── CLAUDE.md                 ← instructions for Claude Code / AI tools
├── brand-guide.html          ← full visual reference
│
├── logo/
│   ├── practisEN-logo-full.png
│   └── practisEN-logo-mark.png
│
└── tokens/
    ├── tokens.json           ← platform-agnostic tokens
    ├── tokens.css            ← CSS variables (drop-in)
    ├── fonts.css             ← Google Fonts import
    └── tailwind.config.js    ← Tailwind preset
```

## For AI tools

Point Claude Code (or similar) at `brand-kit/CLAUDE.md` before it writes any UI code. It contains the do's, don'ts, and priority order for resolving design questions.

## Brand at a glance

- **Primary:** `#7030E0` violet
- **Ink:** `#0B0B1E` deep navy
- **Display font:** Baloo 2
- **Body font:** Nunito
- **Mono:** JetBrains Mono
- **Radius default:** 14 px (`--pn-r-lg`)
- **Tagline:** English, practised daily.

Full details → `BRAND.md`.
