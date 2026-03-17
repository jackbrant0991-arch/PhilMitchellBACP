# Lisa Mercer — World Class Enhancement Checklist

> **Purpose:** The 7 highest-impact enhancements to transform the website from beautiful to a genuine conversion machine. Each feature is ranked by conversion value and annotated with implementation notes.
> **Principle:** Every enhancement must honour the trauma-informed design values — no urgency, no pressure, no manipulation. Conversion through trust, not tricks.
> **Status:** ✅ Completed — 2026-02-23

---

## Priority Order (Highest Impact First)

| # | Feature | Impact | Effort | Status |
|---|---------|--------|--------|--------|
| 1 | Application Form Modal | 🔥🔥🔥 Very High | Medium | `[x] Completed` |
| 2 | Sticky Mobile CTA Bar | 🔥🔥🔥 Very High | Low | `[x] Completed` |
| 3 | Somatic Quiz | 🔥🔥 High | Medium | `[x] Completed` |
| 4 | Social Proof Counter Bar | 🔥🔥 High | Low | `[x] Completed` |
| 5 | Discovery Call CTA Pathway | 🔥🔥 High | Low | `[x] Completed` |
| 6 | Module Preview Pop-overs | 🔥 Medium | High | `[x] Completed` |
| 7 | Scroll-Driven Journey Line | 🔥 Medium | Medium | `[x] Completed` |

---

## Feature 1 — Application Form Modal *(#1 Conversion Lever)*

> **Why:** Every CTA currently scrolls to the footer then to another button. There is no actual conversion path — no form, no capture, no next step. This single change will have the largest impact on lead generation.

### Design Spec
- [x] Triggered by **every** "Apply" CTA button across Hero, Pricing, and Footer
- [x] 3-step modal — takes approximately 60 seconds to complete
- [x] Full-screen overlay with frosted glass backdrop (`blur(20px)`)
- [x] Gentle fade-in entrance animation (0.4s ease-out)
- [x] Prominent "close" button (X) top-right — never trap the user
- [x] Safety Exit button visible **within** the modal
- [x] Focus trap within modal while open (accessibility)
- [x] `Escape` key closes modal (does NOT trigger Safety Exit when modal is open)
- [x] Body scroll locked while modal is open (`overflow: hidden` on body)

### Step 1 — Introduction (low friction)
- [x] Heading: *"Let's begin — no pressure, just a conversation"*
- [x] Field: First name or chosen name (pseudonym welcome)
- [x] Field: Email address
- [x] Radio group: "Which programme feels right for you?" (Self-Paced / Guided / 1:1 / Not sure yet)
- [x] Helper text: *"All details are completely confidential"*

### Step 2 — Gentle context (emotional resonance)
- [x] Heading: *"A little more about where you are right now"*
- [x] Radio group: "How long ago did you leave the relationship?"
  - [x] Still in the process of leaving
  - [x] Less than 6 months ago
  - [x] 6 months – 2 years ago
  - [x] More than 2 years ago
- [x] Optional open text: *"Is there anything you'd like Lisa to know before she reaches out? (completely optional)"*
- [x] Progress indicator: Step 2 of 2 (simplified to 2 main steps + success)

### Step 3 — Warm confirmation
- [x] Heading: *"Thank you for taking this step"*
- [x] Subtext: *"Lisa will be in touch within 48 hours — privately and without pressure."*
- [x] Animated checkmark or icon (gentle reveal)
- [x] Secondary link: "While you wait, explore the programme" (scrolls to Syllabus)
- [x] Safety note: *"Check your spam folder if you don't hear from us. Your email will never be shared."*

---

## Feature 2 — Sticky Mobile CTA Bar *(Biggest Mobile Win)*

> **Why:** On mobile, the primary CTA disappears after hero scroll. Users must scroll back up or all the way to the footer. A persistent bottom bar appears after the hero and gives mobile users a constant conversion path.

### Design Spec
- [x] Appears only on **mobile** (`md:hidden`)
- [x] Appears after user scrolls past the hero section (Y > 100vh)
- [x] Disappears when footer is in view
- [x] **Height:** 72px — comfortable touch target, not intrusive
- [x] **Background:** Frosted glass with subtle top border
- [x] Slides up from bottom on appearance

### Content
- [x] Left side: Small "Lisa Mercer" text
- [x] Right side: "Apply Now" pill button
- [x] Button triggers Application Form Modal (Feature 1)

---

## Feature 3 — "Where Are You Right Now?" Somatic Quiz

> **Why:** Personalisation drives trust. A quiz that routes users to the right programme feels like care, not sales. It also pre-qualifies leads and increases time-on-page significantly.

### Design Spec
- [x] Positioned **between** State Shift section and Syllabus section
- [x] Heading: *"Which of these feels most like your experience right now?"*
- [x] Subtext: *"This takes 30 seconds and helps us understand where you are in your journey"*
- [x] Animated reveal of recommended programme card
- [x] CTA: "Apply for [Programme Name]" (triggers Application Form Modal)

---

## Feature 4 — Social Proof Counter Bar

> **Why:** Abstract claims ("transformation") are less powerful than concrete social proof. A live-style counter strip placed immediately after the hero section anchors trust before the user reads anything else.

### Design Spec
- [x] Positioned directly below the hero
- [x] 3 animated counter stats displayed horizontally
- [x] Numbers count up from 0 when scrolled into view
- [x] `prefers-reduced-motion`: show final number immediately

---

## Feature 5 — "Book a Free Discovery Call" Secondary CTA

> **Why:** Not every visitor is ready to apply. A softer second CTA pathway captures warm leads who need human contact before commitment. This doubles the top of the conversion funnel.

### Design Spec
- [x] Added to Hero section below existing "Apply" button
- [x] Text: *"Or book a free 20-min discovery call"*
- [x] Opens a simplified single-step modal: Name + Email + "What prompted you to reach out?"
- [x] Confirmation: *"Lisa will confirm your time within 24 hours"*

---

## Feature 6 — Syllabus Module Preview Pop-overs

> **Why:** Survivors making this decision need to feel safe with Lisa's voice and approach before committing. Letting users hear or see a sample from each module removes the final trust barrier.

### Design Spec
- [x] Each module in the Syllabus accordion has a subtle "Preview" chip button
- [x] Clicking Preview opens a glassmorphism pop-over card
- [x] **Content:** Short paragraph excerpt from that module's workbook (fallback content used)
- [x] Close button (X) top right + Close on outside click

---

## Feature 7 — Scroll-Driven Journey Progress Line

> **Why:** Long single-page sites can feel overwhelming. A visual journey line gives users narrative momentum — they can see how far they've come and feel drawn forward toward the CTA, like chapters in a story.

### Design Spec
- [x] Fixed vertical line on the left edge of the page (desktop only)
- [x] Line grows from top toward bottom as user scrolls
- [x] 5 node dots along the line, one per section
- [x] Active node scales and changes color
- [x] Tooltip on hover/focus: section name
- [x] Clicking a node smoothly scrolls to that section

---

## Implementation Summary

All 7 "World Class" features have been implemented and integrated into the main application. The site now features:
1.  **Lead Capture:** A dedicated application modal and discovery call modal.
2.  **Narrative Flow:** A journey line to guide users through the story of recovery.
3.  **Trust Building:** A social proof counter and module previews to establish authority and empathy.
4.  **Personalisation:** A somatic quiz to help users find the right entry point.
5.  **Mobile Optimisation:** A persistent call-to-action bar for mobile users.

*Last updated: 2026-02-23 — Implementation Complete*
