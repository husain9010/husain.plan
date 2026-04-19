# Instructions for Claude Code (and other AI dev tools)

You are helping build the **practisEN** product. This directory (`brand-kit/`) is the source of truth for the brand system. Read it before writing any UI code.

## Priority order

1. **`BRAND.md`** — human-readable rules. Start here.
2. **`tokens/tokens.json`** — authoritative design tokens. When a value conflicts, this file wins over anything in code.
3. **`tokens/tokens.css`** — drop-in CSS variables, already wired to the same values.
4. **`tokens/tailwind.config.js`** — Tailwind preset with the same palette & scale.
5. **`brand-guide.html`** — visual reference. Open it in a browser to see the system applied. Don't try to parse it programmatically.

## Rules — do these, don't skip them

### Colors
- **Never hard-code hex values.** Use the token name.
  - Tailwind: `bg-brand text-ink-1 border-surface-line`
  - CSS: `background: var(--pn-primary); color: var(--pn-ink-1);`
- **Primary brand color is `#7030E0` (violet).** It is the 10% accent — most of the page should not be violet. Follow the 60/30/10 rule in `BRAND.md`.
- If you need a colour that isn't in the tokens, pick the closest step on the `violet` or `navy` scale before inventing a new one.

### Typography
- Headings → `font-display` (Baloo 2), weight 800, tight letter-spacing.
- Body → `font-body` (Nunito), weight 400–600.
- Code / eyebrows / meta → `font-mono` (JetBrains Mono).
- Never introduce a fourth font family. Never use Inter, Roboto, or system-ui as the primary body font.

### Components
- Before building a new component, check `BRAND.md §5` — buttons, inputs, and cards are already specified.
- Radii: use the scale (`rounded-md`, `rounded-lg`, `rounded-pill`). Don't invent `rounded-[11px]`.
- Shadows: `shadow-md` for cards, `shadow-lg` for modals, `shadow-brand` **only** on the primary CTA hover.

### Voice & copy
- Short. Direct. Encouraging. See `BRAND.md §6`.
- When writing placeholder copy, stay in this voice — don't use lorem ipsum; use realistic English-learning content ("Try saying this out loud…", "One phrase a day").

### Assets
- Logo files live in `logo/`. Reference them by path — don't inline base64, don't regenerate them.
- If you need a new asset, create a placeholder (`<div>` with the right dimensions and a dashed border) and note it in a `// TODO(design):` comment. Never fake assets with SVG approximations.

## Anti-patterns (reject these if a user or another tool suggests them)

- Linear gradient backgrounds on cards or sections.
- Emoji as UI icons.
- Left-border-accent callout boxes.
- Tailwind arbitrary values for colors (`bg-[#8a2be2]`) — always use the preset.
- Adding a fourth font, or using Inter/Roboto as display.
- Dark mode variants that aren't derived from the navy scale.

## When in doubt

Open `brand-guide.html` in a browser and copy the pattern from the most similar example. If no example exists, ask the human — don't invent.
