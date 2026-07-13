---
name: "Didier Ambunga Portfolio"
description: "A high-contrast engineering portfolio with a dark lab aesthetic and vivid signal accents."
colors:
  background: "#08090d"
  surface: "#0d0f17"
  surface-card: "#0d0f17"
  border: "#ffffff14"
  text-primary: "#f8fafc"
  text-secondary: "#94a3b8"
  text-muted: "#475569"
  accent-cyan: "#00f2fe"
  accent-purple: "#8b5cf6"
  accent-pink: "#ec4899"
  accent-amber: "#f59e0b"
  accent-green: "#10b981"
typography:
  display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(3rem, 6vw, 5.6rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Outfit, sans-serif"
    fontSize: "2.2rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Outfit, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.85rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.08em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "24px"
  pill: "30px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.accent-cyan}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
  card-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "24px"
  input-field:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "14px 16px"
---

# Design System: Didier Ambunga Portfolio

## 1. Overview

This system is built for a technical portfolio that reads like an engineering lab notebook with a confident, modern signal palette. It combines a grounded dark surface with bright cyan, violet, and amber accents to keep the visual voice distinctive without relying on generic glassmorphism or terminal clichés.

The site leans into polished structure: clear hierarchy, strong contrast, and a restrained glow-based energy that supports technical storytelling. The design avoids repetitive ornamental scaffolding like tiny uppercase section labels or hero-metric templates, and it keeps the experience focused on capability, craft, and real work.

**Key Characteristics:**
- High contrast dark palette with vivid signal colors.
- Clean, geometric type with a sharp display hierarchy.
- Subtle surface lift and glow rather than heavy shadow or glass by default.
- Purposeful component rhythm for cards, buttons, and interactive sections.

## 2. Colors

The palette is anchored in a deep night-lab surface, with electric accents that feel like active circuitry and system state.

### Primary
- **Electric Cyan** (#00f2fe): the main call-to-action and highlight color, used for buttons, interactive links, badges, and active state accents.

### Secondary
- **Lab Purple** (#8b5cf6): a complementary accent for hero glow, interactive focus, and soft gradient transitions.
- **Signal Pink** (#ec4899): a tertiary highlight used sparingly for emphasis and visual tension.
- **Signal Amber** (#f59e0b): for status cues, badge accents, and contrast-rich labels.
- **Signal Green** (#10b981): for positive status, active circuit state, and confirmation feedback.

### Neutral
- **Midnight** (#08090d): page background and deepest surface tone.
- **Night Surface** (#0d0f17): cards, sections, and layered container surfaces.
- **Paper White** (#f8fafc): primary text and key content.
- **Soft Mist** (#94a3b8): secondary text, captions, and supportive copy.
- **Muted Slate** (#475569): tertiary text and subtle informational tone.

### Named Rules
**The Signal Rule.** Use the primary accent on the strongest actions and interactive elements only; the rest of the page stays on neutral surfaces.

## 3. Typography

**Display Font:** Outfit, sans-serif
**Body Font:** Outfit, sans-serif
**Label / Mono Font:** JetBrains Mono, monospace

**Character:** The typography feels precise and contemporary, with a geometric headline voice balanced by the restrained readability of a single sans-serif system font and a monospace accent for technical details.

### Hierarchy
- **Display** (800, clamp(3rem, 6vw, 5.6rem), 1.05, -0.03em): hero titles and main page statements.
- **Headline** (700, 2.2rem, 1.2, -0.02em): section headings, large section calls, and major labels.
- **Title** (700, 1.45rem, 1.3): card titles and important content headings.
- **Body** (400, 1rem, 1.6): paragraphs, descriptive copy, and long-form text; keep line length around 65–75ch.
- **Label** (600, 0.85rem, 1.5, 0.08em): metadata, status text, button labels, and monospace UI details.

### Named Rules
**The One Family Rule.** The system uses Outfit for primary text and JetBrains Mono only for technical labels, status, and accent metadata.

## 4. Elevation

Depth is conveyed through tonal layering, subtle backdrops, and occasional soft glow rather than heavy multi-layer shadows. Surfaces are generally low-rise; hover and active states introduce modest lift or border emphasis.

### Shadow Vocabulary
- **Hover Lift** (`0 10px 20px rgba(0, 0, 0, 0.25)`): used sparingly on interactive cards and buttons when they are hovered to signal interactivity.
- **Soft Glow** (`0 0 10px rgba(0, 242, 254, 0.25)`): used for active accent surfaces, badges, and selected states to support the technical glow aesthetic.

### Named Rules
**The Flat Default Rule.** Surfaces rest flat and only gain perceptible depth in response to hover, focus, or active state.

## 5. Components

### Buttons
- **Shape:** pill corners (30px) for buttons and CTA pills.
- **Primary:** solid electric cyan background with white text, generous padding, bold weight, and a subtle upward hover lift.
- **Secondary:** dark surface background with white text, light border or tinted surface outline, and the same pill silhouette.
- **Hover / Focus:** color shift or glow on hover, with a short transform and ease-out transition.

### Cards
- **Corner Style:** rounded 24px.
- **Background:** deep night surface tone (#0d0f17) with a translucent or softly layered fill.
- **Shadow Strategy:** flat at rest, modest lift on hover only; avoid large blur shadows and paired border-shadow combos.
- **Border:** fine translucent border for separation, not a decorative stripe.
- **Internal Padding:** 24px for main cards, 16px for compact insets.

### Inputs / Fields
- **Style:** low-contrast dark fill with a subtle border, rounded 12px.
- **Focus:** accent border glow and background brightening, with clear state change.
- **Error / Disabled:** not present in the current system, but the field style should remain minimalist and consistent.

### Navigation
- **Style:** inline horizontal nav on wide screens, full-screen slide-in panel on mobile.
- **Typography:** understated navigational copy with a stronger text color on active / hover states.
- **Mobile Treatment:** fixed off-canvas panel that slides in from the left and preserves the dark surface.

### Technical Accent Elements
- **Mono labels and system status labels** use JetBrains Mono with small uppercase spacing and bright accent color to convey signal state.

## 6. Do's and Don'ts

### Do:
- **Do** keep body text high contrast on dark surfaces: use `#f8fafc` on `#08090d` and `#0d0f17`.
- **Do** use accent color sparingly for calls to action, interactive links, and status highlights.
- **Do** preserve a clean page hierarchy without repeating tiny uppercase section labels on every section.
- **Do** keep the experience grounded in a technical portfolio voice, not a decorative or magazine style.

### Don't:
- **Don't** use gradient text over gradients; keep text solid and legible.
- **Don't** pair two similar sans families; keep Outfit as the main voice and JetBrains Mono only for technical labels.
- **Don't** apply large rounded corners or heavy glassmorphism to cards and surfaces.
- **Don't** rely on repeated hero-metric templates or identical card grids as the primary storytelling device.
