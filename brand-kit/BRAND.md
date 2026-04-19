# practisEN — Brand Guide

> **Tagline:** English, practised daily.
> **Version:** 1.0.0
> **Primary brand color:** `#7030E0` (violet)
> **Primary ink:** `#0B0B1E` (near-black navy)

This document is the source of truth for practisEN's visual identity. If `brand-guide.html` and this file disagree, **this file wins** — it's what code and AI tools read.

---

## 1. Logo

Files live in `brand-kit/logo/`.

| File | Use |
|---|---|
| `practisEN-logo-full.png` | Primary horizontal wordmark — web header, email signature, documents |
| `practisEN-logo-mark.png` | Square logomark — favicon, app icon, avatar, video watermark |

**Rules**
- Minimum width of horizontal wordmark: **120 px** digital / 25 mm print.
- Minimum size of logomark: **24 px** favicon, **80 px** avatar.
- **Clearspace:** always leave at least `x` of breathing room on all sides, where `x` = height of the logomark.
- Never stretch, rotate, recolor with gradients, or place on noisy backgrounds.
- On dark backgrounds, use the logo at full opacity on `--pn-navy-900` (`#0A1035`) or darker.

---

## 2. Color

### Brand
| Token | Hex | Use |
|---|---|---|
| `--pn-primary` | `#7030E0` | Primary CTAs, links, key accents |
| `--pn-primary-dark` | `#5B23BE` | Hover / pressed |
| `--pn-accent` | `#A78BFA` | Highlights, illustrative violet |
| `--pn-ink` | `#0B0B1E` | Body text, headings on light |

### The 60 / 30 / 10 rule
- **60%** neutral surfaces (`--pn-bg`, `--pn-card`, white)
- **30%** ink (text, dark navy sections)
- **10%** violet (CTAs, accents, highlights) — **never more**

### Full scales
Available in `tokens/tokens.json`, `tokens/tokens.css`, and `tokens/tailwind.config.js`:
- `violet-50 … violet-900`
- `navy-50 … navy-900`
- `ink-1 … ink-4`
- surface: `bg`, `bg-2`, `card`, `line`, `line-2`
- semantic: `success`, `warning`, `error`

### Contrast
- Body text: **ink-1 on surface-bg** → AAA.
- Never put `violet-300` text on white — use `violet-600` or darker for text.

---

## 3. Typography

Three families, loaded from Google Fonts via `tokens/fonts.css`.

| Role | Family | Weights used |
|---|---|---|
| **Display** — headings, hooks, logo | `Baloo 2` | 700, 800 |
| **Body** — paragraphs, UI | `Nunito` | 400, 500, 600, 700 |
| **Mono** — code, eyebrows, meta | `JetBrains Mono` | 400, 500 |

**Defaults**
```css
h1–h6 { font-family: 'Baloo 2'; font-weight: 800; letter-spacing: -0.02em; line-height: 1.05; }
body   { font-family: 'Nunito'; font-size: 15px; line-height: 1.55; }
.eyebrow { font-family: 'JetBrains Mono'; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; }
```

**Scale** (see `tokens.json → typography.size`): 12 → 13.5 → 15 → 17 → 19 → 24 → 32 → 44 → 56 → 72 → 96 px.

**Minimum sizes**
- 12 pt in print.
- 24 px on 1920×1080 slides.
- 44 px hit target on mobile.

---

## 4. Spacing, Radius, Shadow

- **Spacing scale** (px): 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.
- **Radius:** `sm 6` · `md 10` · `lg 14` · `xl 20` · `2xl 28` · `pill 999`.
- **Shadow:** prefer `md` for cards, `lg` for modals, `brand` (violet glow) only on the primary CTA hover.

---

## 5. Components (essential patterns)

### Button — primary
```html
<button class="btn-primary">Start a lesson</button>
```
```css
.btn-primary {
  background: var(--pn-primary);
  color: #fff;
  font-family: var(--pn-font-display);
  font-weight: 700;
  font-size: 15px;
  padding: 12px 22px;
  border-radius: var(--pn-r-pill);
  border: 0;
  box-shadow: var(--pn-sh-md);
  transition: transform var(--pn-dur-fast) var(--pn-ease-std),
              background var(--pn-dur-fast);
}
.btn-primary:hover { background: var(--pn-primary-dark); transform: translateY(-1px); }
```

### Button — secondary
Transparent background, 1.5 px `--pn-ink-1` border, ink text. Same padding and radius.

### Input
White fill, `1px solid var(--pn-line)` → `var(--pn-primary)` on focus (+ 3 px `--pn-violet-100` focus ring), radius `md`, 13 px padding.

### Card
`background: var(--pn-card); border: 1px solid var(--pn-line); border-radius: var(--pn-r-lg); padding: 24px;` — **never** add a gradient or a coloured left border.

---

## 6. Voice

**Do**
- Short, direct, encouraging. "Say it out loud." "Try again tomorrow."
- Use contractions. Talk to one learner, not a crowd.
- Use examples, not rules. Show, then name.

**Don't**
- Patronise ("Well done, little learner!")
- Academic hedging ("It could be argued that…")
- Emoji in product UI (social posts are OK if sparing).

---

## 7. Motion

- **Duration:** `160ms` micro / `240ms` standard / `320ms` entrance.
- **Easing:** `cubic-bezier(.2, .8, .2, 1)` for almost everything.
- **Rule of one:** only one violet element should animate per frame. Never a page-wide rainbow.

---

## 8. Don'ts (visual anti-patterns)

- No gradient backgrounds except the one decorative hero gradient used in `brand-guide.html`.
- No drop shadows on text.
- No rounded-corner containers with a coloured left-border stripe.
- No emoji substituted for real iconography in product UI.
- No font other than the three listed above.

---

## Files in this kit

```
brand-kit/
├── BRAND.md                     ← you are here
├── CLAUDE.md                    ← instructions for AI dev tools
├── brand-guide.html             ← full visual reference (open in browser)
├── logo/
│   ├── practisEN-logo-full.png
│   └── practisEN-logo-mark.png
└── tokens/
    ├── tokens.json              ← platform-agnostic design tokens
    ├── tokens.css               ← CSS custom properties
    ├── fonts.css                ← Google Fonts import
    └── tailwind.config.js       ← Tailwind preset
```

For questions or requests to extend the system, update `brand-guide.html` first, then reflect the change here and in the tokens.
