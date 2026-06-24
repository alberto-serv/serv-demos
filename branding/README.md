# SERV branding — drop-in kit

Ready-to-use brand files for any demo in `serv-demos`. Full rationale lives in
[`../BRANDING.md`](../BRANDING.md). Built for **Next.js 16 + Tailwind v4 + framer-motion + shadcn/ui**.

## Wiring a new demo

1. **Deps** (Tailwind v4 setup):
   ```bash
   npm i framer-motion lucide-react class-variance-authority clsx tailwind-merge
   npm i -D tailwindcss @tailwindcss/postcss tw-animate-css
   ```

2. **Tokens** — replace your `src/app/globals.css` with `branding/globals.css`
   (or paste its `@theme` + `:root` + `.dark` blocks). This defines all colors,
   `--radius: 0.2rem`, and the `gradient-xy` animation.

3. **Fonts** — in `app/layout.tsx`:
   ```tsx
   import { instrumentSans, outfit } from "@/branding/fonts"
   import { cn } from "@/lib/utils"

   <body className={cn(instrumentSans.variable, outfit.variable, "font-sans antialiased bg-background text-foreground")}>
   ```

4. **`cn` helper** — make sure `src/lib/utils.ts` exports the standard shadcn `cn`:
   ```ts
   import { clsx, type ClassValue } from "clsx"
   import { twMerge } from "tailwind-merge"
   export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
   ```

5. **Gradient** — use the components:
   ```tsx
   import { GradientCTASection, GradientText, AnimatedGradient } from "@/branding/AnimatedGradient"

   <GradientCTASection>
     <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter leading-none">
       Put sales on <GradientText>autopilot.</GradientText>
     </h2>
   </GradientCTASection>
   ```

## Cheat sheet
- Brand gradient order: **primary `#7B39ED` → secondary `#F97068` → tertiary `#FAC748`**.
- Headings: `font-heading font-bold tracking-tighter`. Body: `font-light text-muted-foreground`.
- Everything is `rounded-sm`. Primary CTA = `bg-foreground text-background`.
- Motion easing: `[0.16, 1, 0.3, 1]`.
