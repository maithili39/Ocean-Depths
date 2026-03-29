# ABYSS — An Ocean Descent in Seven Acts

A cinematic, scroll-driven descent from the ocean surface to the deepest point on Earth. Built for IIT Patna Frontend Odyssey 2026.

Inspired by the instrument panels of deep-sea submersibles, the editorial design of oceanographic journals, and the visual language of deep-sea documentary filmmaking.

## Tech
- **React (Vite)**
- **Framer Motion**
- **Vanilla CSS Keyframes**
- **Bespoke Hooks** (`useScrollDepth`, `useZone`, `useMouseGlow`)

## Design Decisions
- Every animation duration is intentionally non-round (e.g., 1.3s, 2.7s) to prevent generic easing.
- Every layout is intentionally asymmetric. No bootstrap grids. No rounded cards.
- The ocean doesn't arrange itself in equal-width columns. The typography bleeds off the page using `Playfair Display`, contrasting tightly with `Archivo Narrow` and `Share Tech Mono`.
- Navigation has been replaced by physical analog depth gauges.

## Run Locally
```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```
