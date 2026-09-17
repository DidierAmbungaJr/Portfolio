---
name: "Didier Ambunga Portfolio"
description: "A high-contrast engineering portfolio with a modern glassmorphism design, optical vibrancy and San Francisco (SF Pro) typography."
colors:
  background: "#07090e"
  surface: "rgba(13, 17, 26, 0.62)"
  surface-card: "rgba(13, 17, 26, 0.65)"
  border: "rgba(255, 255, 255, 0.12)"
  border-bright: "rgba(255, 255, 255, 0.24)"
  text-primary: "#f8fafc"
  text-secondary: "#cbd5e1"
  text-muted: "#7b8a9d"
  accent-cyan: "#00d4f5"
  accent-purple: "#7c49e5"
  accent-pink: "#ec4899"
  accent-amber: "#f5b942"
  accent-green: "#10b981"
typography:
  display:
    fontFamily: '"SF Pro Display", "SF Pro Text", "SF Pro", -apple-system, BlinkMacSystemFont, "San Francisco", system-ui, sans-serif'
    fontSize: "clamp(3.2rem, 7.5vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: '"SF Pro Display", "SF Pro Text", "SF Pro", -apple-system, BlinkMacSystemFont, "San Francisco", system-ui, sans-serif'
    fontSize: "2.2rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: '"SF Pro Text", "SF Pro", -apple-system, BlinkMacSystemFont, "San Francisco", system-ui, sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.01em"
  label:
    fontFamily: '"SF Mono", "JetBrains Mono", Menlo, Monaco, Consolas, monospace'
    fontSize: "0.85rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.05em"
rounded:
  sm: "8px"
  md: "14px"
  lg: "20px"
  xl: "24px"
  pill: "30px"
elevation:
  glass-blur: "blur(20px) saturate(180%)"
  glass-blur-heavy: "blur(32px) saturate(190%)"
  glass-specular: "inset 0 1px 1px 0 rgba(255, 255, 255, 0.18), inset 0 0 0 1px rgba(255, 255, 255, 0.04)"
  glass-shadow: "0 20px 45px -10px rgba(0, 0, 0, 0.5)"
components:
  button-primary:
    backgroundColor: "linear-gradient(135deg, #00f2fe 0%, #00b4d8 100%)"
    textColor: "#040914"
    rounded: "{rounded.pill}"
    padding: "0.95rem 2.2rem"
  button-secondary:
    backgroundColor: "var(--glass-bg-subtle)"
    textColor: "{colors.text-primary}"
    backdropFilter: "blur(16px) saturate(180%)"
    rounded: "{rounded.pill}"
    padding: "0.95rem 2.2rem"
  card-surface:
    backgroundColor: "{colors.surface}"
    backdropFilter: "{elevation.glass-blur}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Didier Ambunga Portfolio

## 1. Overview

Ce système allie l'ingénierie matérielle & logicielle de pointe à une interface **Glassmorphism moderne haute fidélité** et à la clarté typographique de **San Francisco (SF Pro)**.

Loin d'un flou laiteux décoratif sans relief, le design utilise les lois de la physique optique : réfraction chromatique grâce aux lueurs d'arrière-plan (cyan & violet), saturation accrue (`saturate(180%)`), reflets spéculaires supérieurs (`inset 0 1px 1px rgba(255,255,255,0.18)`), et contours cristallins de 1px.

**Caractéristiques Clés :**
- **Typographie San Francisco (SF Pro)** : clarté chirurgicale, proportion humaniste et rendu natif Apple.
- **Glassmorphism Optique** : `backdrop-filter: blur(...) saturate(...)` superposé à des halos d'ambiance dynamiques.
- **Bordures & Reflets Spéculaires** : liserés de lumière supérieurs simulant l'épaisseur du verre poli.
- **Signal & Contrastes Élevés** : fond noir spatial profond (#07090e) garantissant un ratio de contraste supérieur à 4.5:1 sur tous les textes.

## 2. Couleurs & Matériaux

### Matériaux Verre (Glass Tokens)
- **Glass Surface** (`rgba(13, 17, 26, 0.62)`): fond principal translucide des cartes et conteneurs.
- **Glass Subtle** (`rgba(255, 255, 255, 0.035)`): surfaces discrètes, badges et filtres inactifs.
- **Glass Border** (`rgba(255, 255, 255, 0.12)`): contour cristallin par défaut.
- **Glass Border Bright** (`rgba(255, 255, 255, 0.24)`): survol et états actifs.
- **Specular Highlight** (`inset 0 1px 1px 0 rgba(255, 255, 255, 0.18)`): reflet de lumière sur l'arête supérieure.

### Accents de Signal
- **Cyan Électrique** (`#00d4f5` / `#00f2fe`): actions primaires, points de statut actifs, lueurs interactives.
- **Violet Lab** (`#7c49e5` / `#8b5cf6`): halos d'ambiance, dégradés d'arrière-plan et transitions lumineuses.
- **Vert Signal** (`#10b981`): état système en ligne, validation circuit imprimé.

## 3. Typographie

- **Display & Titres** : San Francisco Pro (`SF Pro Display`), graisse 700 à 800, espacement ajusté `-0.02em` à `-0.03em`.
- **Corps de texte** : San Francisco Pro (`SF Pro Text`), graisse 400 à 500, interlignage 1.6 à 1.7, lisibilité sans fatigue.
- **Labels & Données Techniques** : `SF Mono` / `JetBrains Mono`, format compact et précis.

## 4. Composants Glassmorphism

- **Navigation Flottante** : barre supérieure en verre satiné avec flou à 32px, logo à hiérarchie claire et badge de statut de disponibilité à Kinshasa.
- **Piliers d'Ingénierie & Compétences** : cartes structurées en verre sombre poli avec reflets spéculaires et tags d'outillage concrets (sans pourcentages arbitraires).
- **Cartes Projets & Modale Interactive** : fiches descriptives complètes avec filtrage dynamique par domaine et fiches techniques détaillées en modale.
- **Formulaire & Contact** : panneau épuré avec redirection instantanée vers WhatsApp et coordonnées directes.
