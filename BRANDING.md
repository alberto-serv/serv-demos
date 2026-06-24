# SERV — Branding Guidelines

Extracted from the production marketing site (`goserv.com`). Use this as the single
source of truth for all `serv-demos` work so every demo looks like it belongs to SERV.

Stack of record: **Next.js 16 + React 19 + Tailwind CSS v4 + framer-motion + shadcn/ui (Radix)**.

---

## 1. Brand Color System

SERV runs a **tri-color brand**: a purple primary with a coral + amber accent pair.
The three brand colors almost always appear *together* as a gradient (see §5).

| Token        | Hex        | Role                                           |
|--------------|------------|------------------------------------------------|
| `primary`    | `#7B39ED`  | Purple — primary brand, links, emphasis, focus ring |
| `secondary`  | `#F97068`  | Coral — second gradient stop, secondary buttons |
| `tertiary`   | `#FAC748`  | Amber — third gradient stop, highlights         |
| `foreground` | `#2D2D2D`  | Near-black text **and** primary CTA button background |
| `background` | `#FFFFFF`  | Page background                                 |
| `muted`      | `#E0DFDA`  | Muted surfaces                                  |
| `muted-foreground` | `#666666` | Secondary / body-supporting text           |
| `border` / `input` | `#DDDCD8` | Hairlines, inputs                           |

**Primary-foreground / secondary-foreground:** `#FFFFFF`. **Tertiary-foreground:** `#2D2D2D`.

### Dark mode (`.dark`)
| Token | Hex |
|-------|-----|
| `background` | `#1A1A1A` |
| `foreground` | `#F0EFEA` |
| `card` | `#2A2A2A` |
| `muted` | `#3A3A3A` |
| `muted-foreground` | `#A0A0A0` |
| `border` / `input` | `#4A4A4A` |

> Brand colors (`primary` / `secondary` / `tertiary`) **do not change** between light and
> dark — only the neutrals invert.

---

## 2. Typography

Two Google fonts, loaded via `next/font/google`:

- **Outfit** → headings (`--font-heading`, Tailwind `font-heading`)
- **Instrument Sans** → body / UI (`--font-instrument`, Tailwind `font-sans`, the default)

### Heading style signature
Headlines are tight and confident:
```
font-heading font-bold tracking-tighter leading-[0.95]   /* or leading-none */
text-5xl md:text-6xl     /* hero */
text-4xl md:text-6xl     /* section CTA */
```
A single word/line is usually colored with `text-primary` or a gradient clip for emphasis.

### Body style signature
```
font-light text-muted-foreground tracking-tight leading-relaxed
text-lg md:text-xl
```
Body copy is **light weight** (`font-light`) and muted — this is a defining SERV trait.

---

## 3. Shape & Radius

- `--radius: 0.2rem` — **sharp, near-square corners**. Everything uses `rounded-sm`.
- Avoid pill/large radii. The brand reads crisp and modern, not soft.

---

## 4. Buttons

Primary CTA is **not** the purple — it's the dark `foreground` color, square-ish:
```tsx
<Button
  size="lg"
  className="bg-foreground text-background hover:bg-foreground/90 font-semibold px-8 h-12 rounded-sm"
>
  Book a Demo
</Button>
```
shadcn `buttonVariants` are available: `default` (purple `bg-primary`), `secondary`
(coral), `outline`, `ghost`, `link`. Use the dark `bg-foreground` style for hero/CTA
"Book a Demo" actions to match the site.

---

## 5. The Animated Gradient (signature element)

The brand's hero element is a **diagonal purple→coral→amber gradient that slowly drifts**.

### 5a. Keyframe (already in `globals.css`)
```css
--animate-gradient-xy: gradient-xy 15s ease infinite;

@keyframes gradient-xy {
  0%, 100% { background-size: 400% 400%; background-position: 0% 50%; }
  50%      { background-size: 400% 400%; background-position: 100% 50%; }
}
```

### 5b. Full-bleed animated CTA background
The most-used pattern (every CTA section on the site). A drifting gradient behind a
floating frosted card:
```tsx
<section className="py-16 relative overflow-hidden">
  {/* animated gradient layer */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-tertiary animate-gradient-xy opacity-80" />

  {/* frosted content card */}
  <div className="container mx-auto px-4 relative z-10 text-center">
    <div className="bg-background/95 backdrop-blur-sm shadow-2xl rounded-sm p-10 md:p-16 max-w-4xl mx-auto border border-white/20">
      {/* heading + copy + CTA */}
    </div>
  </div>
</section>
```

### 5c. Subtle ambient version (hero backgrounds)
Same gradient at low opacity for a tinted-but-quiet backdrop:
```tsx
<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-tertiary/5 animate-gradient-xy opacity-50" />
```
Variants in use: `/10 via /5 to /10` (franchise hero), `/5` flat (blog/pricing hero).

### 5d. Gradient as a "border frame" around media
Hero images sit inside a 1px gradient frame over a frosted panel (NOT animated):
```tsx
<div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-tertiary rounded-sm opacity-90 p-1">
  <div className="w-full h-full bg-background/10 backdrop-blur-3xl rounded-sm overflow-hidden">
    <Image ... fill className="object-contain p-2 md:p-4" />
  </div>
</div>
```

### 5e. Gradient text
For emphasized headline words:
```tsx
<span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
  autopilot.
</span>
```

> **Rule of thumb:** `bg-gradient-to-br` (diagonal) for surfaces, `bg-gradient-to-r`
> (horizontal) for text. Brand order is always **primary → secondary → tertiary**.

---

## 6. Motion (framer-motion)

Entrances use a slow, premium easing curve — memorize it:
```ts
ease: [0.16, 1, 0.3, 1]
```
Common patterns:
```tsx
// Hero text
initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}

// Hero media (slight delay + scale)
initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}

// Scroll-in sections
initial={{ opacity: 0, scale: 0.95, y: 20 }}
whileInView={{ opacity: 1, scale: 1, y: 0 }}
viewport={{ once: true }} transition={{ duration: 0.6 }}
```

---

## 7. Layout conventions

- Container: `container mx-auto px-4`.
- Section vertical rhythm: `py-16` (CTA) / `pt-12 pb-12 md:pt-20 md:pb-20` (hero).
- Hero grid: `grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center`,
  copy in `md:col-span-6 lg:col-span-5`, media in `md:col-span-6 lg:col-span-7`.
- Navbar: `sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md`, `h-16`.
- Frosted surfaces (`bg-background/80…95 backdrop-blur`) are used heavily — lean into glass.

---

## 8. Logo & assets

- `logo.png` (wordmark) lives in `goserv.com/public/`. Navbar renders it at `h-8 w-24`,
  `object-contain`. Favicon: `favicon.png`.
- Customer logos: `goserv.com/public/logos/*.png`.
- Product screenshots live in `goserv.com/src/assets/images/`.

Copy the assets you need into `serv-demos/public/` rather than hot-linking.

---

## 9. Drop-in files for serv-demos

This folder ships ready-to-use copies so a new demo matches instantly:

- **`branding/globals.css`** — the full Tailwind v4 `@theme` + token block + gradient keyframe.
- **`branding/AnimatedGradient.tsx`** — the §5b CTA pattern as a reusable component.
- **`branding/fonts.ts`** — Outfit + Instrument Sans `next/font` setup for `layout.tsx`.

See `branding/README.md` for wiring instructions.
