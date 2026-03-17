# Lisa Mercer Somatic Recovery — Implementation Kickstart Checklist

> **Purpose:** Structured phase-by-phase checklist to guide the build of the Lisa Mercer Somatic Recovery website.
> **Key principle:** Every decision prioritises emotional safety, calm predictability, and survivor autonomy.
> **Status:** ✅ Core build complete — 2026-02-23

---

## Phase 1 — Visual Identity & Design System

### Colour Palette
- [x] Define and document CSS variables for all brand colours:
  - [x] Sage Green `#8DAA91` — primary (growth, safety, grounding)
  - [x] Warm Sand `#F5F5DC` — secondary (warmth, calm)
  - [x] Soft Slate `#4A4E69` — accent (depth, professionalism)
  - [x] Safety Red Tint `#DC2626` at 20% opacity — emergency use only
- [x] Confirm no colour carries meaning without a paired icon or text label

### Typography
- [x] Import Google Fonts: **Playfair Display** (headings) and **Inter** (body)
- [x] Configure `font-display: swap` for both fonts
- [x] Preload Playfair Display to prevent flash of unstyled text
- [x] Define type scale:
  - [x] H1: fluid `clamp(2.6rem, 6.5vw, 5.2rem)` — scales mobile through desktop
  - [x] Body: `lg` (18px minimum)
  - [x] Line-height: `1.6` (mobile) to `1.8` (desktop)

### Spacing & Shape Philosophy
- [x] Set section padding to `96px` (generous white space)
- [x] Apply pill-style buttons: `border-radius: 9999px`
- [x] Apply card radius: `border-radius: 24px` (soft, no harsh corners)
- [x] Confirm zero use of aggressive box shadows or sharp geometry

---

## Phase 2 — Safety Architecture *(Non-Negotiable)*

### Quick Exit Button
- [x] Place in **fixed header** (right side) on all pages
- [x] Place in **footer** (centred) on all pages
- [x] Style: Red-tinted background, `ShieldAlert` icon, "Safety Exit" label
- [x] Behaviour: `window.location.replace("https://google.com")` — no back-button return
- [x] Mobile touch target: minimum **56px** (footer) / **44px** (header)
- [x] Keyboard shortcut: `Esc` key triggers same redirect globally
- [x] `videoMode` prop — adapts colours for dark video vs light scrolled backgrounds

### Content Warnings
- [x] Autonomy language used throughout all copy
- [ ] Add gentle pre-screening copy above sensitive sections *(future enhancement)*
- [ ] Add "Skip to safety resources" anchor links *(future)*

---

## Phase 3 — Motion Design System

### Core Principles
- [x] All animations are scroll-triggered or click-triggered — zero auto-play
- [x] All curves use cubic-bezier equivalent of ease-out — no bounce or spring
- [x] All `whileInView` triggers fire **once only** — `viewport={{ once: true }}`
- [x] `prefers-reduced-motion` media query implemented globally in `index.css`

### Scroll-Triggered Reveals
- [x] Elements fade in + translate Y (20px to 0) on viewport entry
- [x] Duration: `0.6s`, timing: cubic-bezier ease-out
- [x] Stagger delay for list items: `0.1s–0.15s` between each item

### Accordion Animations
- [x] Height expansion with opacity fade: `0.3s` via Framer Motion `AnimatePresence`
- [x] Chevron icon rotates `0° to 180°` on open (Syllabus)
- [x] Plus icon rotates `0° to 45°` to become × on open (FAQ)
- [x] Timing: `ease-in-out` — confirmed no elastic bounce
- [x] Only one accordion item open at a time (auto-collapse siblings)

### Hover Micro-interactions
- [x] Cards: subtle lift `Y: -6px` via `somatic-card` CSS class
- [x] Pricing cards: `whileHover={{ y: -10 }}` Framer Motion
- [x] Buttons: gentle scale `1.03–1.05` with shadow depth increase
- [x] Colour/border transitions: `300ms`
- [x] No cursor-tracking, magnetic, or parallax effects

### Page Load Sequence
- [x] Header slides down from top (`0.65s`, cubic-bezier)
- [x] Hero stagger: RASA badge → Line 1 → Line 2 → subtext → CTA → trust badges
- [x] Trust badges appear last (`1.1s` delay) with gentle opacity pulse

### Dynamic Header
- [x] **Scroll progress bar** — sage green line extends across header bottom edge
- [x] **Frosted pill nav** — glass container with `layoutId` animated active section pill
- [x] **Active section tracking** — scroll listener highlights current section in nav
- [x] **Video-mode inversion** — white text + light exit btn over video; dark text over scrolled bg
- [x] **Animated hamburger** — icon rotates 90° on open/close swap via AnimatePresence

---

## Phase 4 — Section-by-Section Build

### Header (Fixed)
- [x] Default state: transparent background, full padding, white text over video
- [x] Scrolled state: `rgba(253,253,248,0.88)` + `blur(16px)`, reduced padding, subtle shadow
- [x] Scroll state transition: `500ms` smooth
- [x] Mobile: hamburger with animated swap and slide-down panel
- [x] Safety Exit prominent in header at all times, adapts to background colour

### Hero Section
- [x] **Background video** — `hero-vid.mp4` autoplay, muted, loop, `playsInline`, `aria-hidden`
- [x] **Multi-layer overlay** — dark vignette + sage tint + warm bottom fade
- [x] **Bottom gradient** — seamlessly fades hero into next section
- [x] Headline: *"Return to your body. Reclaim your worth."* — two staggered lines
- [x] Subtext fades in after headline with autonomy language
- [x] CTA: scale `1.04` hover, arrow slides right, sage glow on hover
- [x] Trust badges fade in at `1.1s` delay with gentle pulse animation
- [x] RASA affiliation pill badge above headline

### State Shift Section (Bento Grid)
- [x] 2-column comparison (Survival vs Embodied) + 3 testimonials below
- [x] Left card slides from X: -20, right card from X: +20 on scroll enter
- [x] 4 items per card with icon circles
- [x] Hover: lift `Y: -6px`, shadow deepens
- [x] Testimonials: staggered `0.14s` delay, italic quotes, no type animation

### 12-Week Syllabus (Accordion)
- [x] 6 modules, first open by default
- [x] Week badge (sage pill) + focus tag (slate pill) + Playfair title per module
- [x] Smooth height + opacity expansion, chevron rotates 180°
- [x] Auto-collapse siblings on open
- [x] `64px` min touch targets, full-width on mobile

### Pricing Tiers
- [x] 3 cards — centre featured at `scale(1.03)` with top banner
- [x] Stagger reveal left → centre → right (`0.1s` delays)
- [x] All cards: `whileHover={{ y: -10 }}` with expanded shadow
- [x] Featured CTA: sage fill; secondary CTA: sage outline → fill on hover
- [x] "Apply" language throughout; Body-Back Guarantee badge shown

### FAQ Section
- [x] 7 questions, accordion style
- [x] Plus → × via 45° rotation on open
- [x] Smooth height + opacity, staggered reveals
- [x] Private email link at bottom with no-pressure framing

### Footer
- [x] Dark slate gradient background
- [x] Centred "Apply for the Programme" CTA with scale `1.05` + sage glow hover
- [x] Social icons: colour shift only on hover (no scale)
- [x] Safety Exit footer variant centred, `56px` touch target
- [x] Emergency "call 999" text — static, high-contrast red

---

## Phase 5 — Mobile-First Implementation

### Touch Targets
- [x] All interactive elements: minimum `48px × 48px`
- [x] Safety Exit (footer): `56px` height
- [x] Accordion headers: `64px` minimum height, full-width

### Gesture Handling
- [x] Vertical scroll only — no horizontal carousels or swipe gestures

### Responsive Typography
- [x] H1: `clamp(2.6rem, 6.5vw, 5.2rem)` — fluid across all breakpoints
- [x] Body: `18px` minimum, never smaller
- [x] Line-height: `1.6–1.8` throughout

### Performance
- [ ] Page load target under `2s` — *test on real device*
- [x] No spinning loaders used
- [ ] Lazy-load audit — *no images currently; revisit if images added*

---

## Phase 6 — Accessibility & Trauma-Informed Design

### Visual Accessibility
- [x] Visible `2px Sage Green` focus ring on all interactive elements via `:focus-visible`
- [x] No colour-only information — all colour-coded elements have icon or text pair
- [ ] WebAIM contrast ratio audit — *manual QA Phase 8*

### Cognitive Accessibility
- [x] Plain, accessible language throughout all copy
- [x] Consistent navigation patterns throughout
- [x] No unexplained jargon

### Motion Accessibility
- [x] `prefers-reduced-motion` in `index.css` disables all transforms and durations globally
- [x] Zero flashing, strobing, or rapid animation sequences

### Emotional Safety Audit
- [x] No countdown timers, "limited spots," or flashing sale banners
- [x] Autonomy language: "When you're ready," "At your pace," "Begin when you feel safe"
- [x] "Fix," "cure," "broken" absent from all copy
- [x] No before/after imagery
- [x] Multiple contact methods in footer: phone, email
- [x] Emergency `999` displayed in footer
- [x] Confidentiality statement in footer

---

## Phase 7 — Content & Trust Signals

### Tone Calibration
- [x] Headlines: empowering, not pressure-inducing
- [x] CTAs: "Apply" (qualifying), not "Buy" (transactional)
- [x] Body-Back Guarantee present without desperation framing

### Trust Signals
- [x] RASA Merseyside affiliation in hero badge and footer
- [x] Trust badges: "Trauma-Informed," "Nervous System Safe," "Body-Based"
- [x] Testimonials: first names or anonymous, focused on felt sense

---

## Phase 8 — Pre-Launch Quality Assurance *(Manual)*

### Safety
- [ ] Safety Exit tested on all target devices — instant redirect, no dialog
- [ ] `Esc` keyboard shortcut confirmed working
- [ ] Safety Exit cannot be delayed or blocked

### Accessibility
- [ ] `prefers-reduced-motion` verified at OS level
- [ ] Contrast ratios checked with WebAIM (target: 7:1)
- [ ] Touch targets verified on physical mobile devices
- [ ] Screen reader test: VoiceOver / NVDA
- [ ] Keyboard navigation: Tab, Enter, Esc all functional

### Content
- [x] No auto-playing audio — `muted` attribute on video
- [x] No aggressive pop-ups or exit-intent modals
- [x] Triggering words absent from all copy

### Performance
- [ ] Load time on simulated 3G (target: under 2s)
- [ ] Lighthouse performance score run

### Animations
- [ ] Accordion animations smooth on real devices (no flicker)
- [ ] Hero video loop seamless
- [ ] All hover states work on desktop and tablet

---

## Phase 9 — Ongoing Monitoring (Post-Launch)

- [ ] Monitor mobile bounce rate — should be low with calm design
- [ ] Track Safety Exit usage anonymously — high use may indicate triggering content
- [ ] A/B test CTA language: "Apply" vs "Learn More" vs "Begin"
- [ ] Quarterly copy review for triggering language
- [ ] Annual WCAG compliance re-audit

---

*Last updated: 2026-02-23 — Core build complete. Phase 8 manual QA remaining.*
