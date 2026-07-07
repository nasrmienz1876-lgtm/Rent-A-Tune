---
name: Rent A Tune
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434656'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#747688'
  outline-variant: '#c4c5d9'
  surface-tint: '#124af0'
  primary: '#0040e0'
  on-primary: '#ffffff'
  primary-container: '#2e5bff'
  on-primary-container: '#efefff'
  inverse-primary: '#b8c3ff'
  secondary: '#7c5800'
  on-secondary: '#ffffff'
  secondary-container: '#feb700'
  on-secondary-container: '#6b4b00'
  tertiary: '#565555'
  on-tertiary: '#ffffff'
  tertiary-container: '#6e6d6d'
  on-tertiary-container: '#f3f0ef'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c3ff'
  on-primary-fixed: '#001356'
  on-primary-fixed-variant: '#0035be'
  secondary-fixed: '#ffdea8'
  secondary-fixed-dim: '#ffba20'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5e4200'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Source Serif 4
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style
The design system is anchored in the concept of "The Professional Stage." It balances the reliability of a high-end logistics platform with the vibrant energy of a live performance. The aesthetic is clean and rhythmic, utilizing structural alignment and purposeful white space to evoke the precision of a musical score.

The target audience ranges from amateur musicians seeking quality rentals to event organizers booking professional ensembles. To serve both, the style employs a **Modern Corporate** foundation—emphasizing trust and clarity—infused with **Editorial** flourishes through its serif typography. The visual language avoids clutter, opting for a high-contrast, premium feel that treats every instrument and artist as a featured soloist.

## Colors
This design system utilizes a high-contrast palette designed to guide users through a sophisticated marketplace.
- **Electric Blue (Primary):** Used for primary actions, navigational cues, and interactive states. It represents the "vibrancy" of the modern music scene.
- **Musical Gold (Secondary/Accent):** Reserved for moments of achievement, highlighting premium features, or status indicators that require "spotlight" attention.
- **Deep Charcoal (Surface/Text):** Provides the grounding "Deep Charcoal" base for typography and dark-mode containers, ensuring a professional, high-trust atmosphere.
- **Functional Neutrals:** A range of cool grays (from Slate-50 to Slate-900) support the hierarchy without competing with the brand colors.

## Typography
The typographic strategy pairs the timeless authority of a serif with the geometric efficiency of a sans-serif. 
- **Headlines:** Use **Source Serif 4** for all headings. This adds a "touch of elegance" and literary quality, making the rental of a violin or the booking of a jazz quartet feel like a premium experience.
- **Body & Interface:** **Montserrat** is used for all functional text, inputs, and descriptions. Its geometric nature ensures high readability and a "modern" feel that keeps the platform from feeling dated.
- **Rhythm:** Maintain strict vertical rhythm by adhering to the defined line-heights. Use "Label-LG" (uppercase with tracking) for section headers and categories to create a clear visual break.

## Layout & Spacing
The design system employs a **Fixed Grid** model for desktop to ensure a curated, "gallery-like" presentation of instruments. 
- **Grid:** A 12-column grid with 24px gutters. Content is centered within a 1280px container.
- **Rhythm:** All margins and paddings must be multiples of 8px. Use larger spacing (64px+) between major sections to allow the photography to breathe.
- **Mobile Adaptivity:** Transitions to a fluid 4-column grid with 16px side margins. On mobile, components like cards should take up the full width of the column to maximize the impact of the instrument photography.

## Elevation & Depth
Depth in the design system is handled with "Soft Stage Lighting." 
- **Ambient Shadows:** Use shadows with a large blur radius (16px-24px) and very low opacity (5-8%). The shadow color should be tinted with the Deep Charcoal (#121212) rather than pure black to maintain a clean look.
- **Tonal Layers:** Backgrounds use subtle shifts in gray (e.g., a Slate-50 background with White cards) rather than heavy borders.
- **Interaction:** Upon hover, cards should slightly lift (increase shadow spread) and scale (1.02x) to create a rhythmic, tactile response to user movement.

## Shapes
The shape language is "Rounded-Professional." 
- **Base Corner Radius:** 8px for standard components like input fields and small buttons.
- **Large Component Radius:** 12px-16px for cards and featured photography modules.
- **Consistency:** All interactive elements must share the same corner radius logic to feel part of a unified suite. Avoid pill-shapes for buttons to maintain a more structured, professional appearance; opt for the standard 8px radius instead.

## Components
### Buttons & 'Chat' Actions
The primary action is the **'Chat' Button**. It should be styled with a solid Electric Blue background and white text. Secondary actions (like 'View Details') should use an outlined style with a 2px Deep Charcoal border.

### Status Badges
Availability is critical. Use small, high-contrast badges with 4px rounded corners:
- **Available:** Electric Blue background with white text.
- **Booked/Unavailable:** Slate-200 background with Slate-600 text.
- **Exclusive:** Musical Gold background with Deep Charcoal text.

### Instrument & Band Cards
Cards are the heart of the design system. They must feature a 1:1 or 4:3 aspect ratio image at the top. Photography should be high-resolution with clean, often neutral backgrounds to emphasize the "musical gold" and "electric blue" UI elements. Text content within the card should be bottom-aligned with the price/rate clearly visible in the top-right corner of the content area.

### Input Fields
Inputs should be clean, using an 8px radius and a subtle 1px Slate-200 border. On focus, the border transitions to Electric Blue with a soft 4px glow.

### Rhythmic Separators
Instead of simple lines, use subtle "rhythmic" dividers—thin horizontal lines in Slate-100 that may be broken by a small icon or category label in the center.