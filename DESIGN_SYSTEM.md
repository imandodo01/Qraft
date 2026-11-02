# Qraft — Design System

**Status:** Initial design direction  
**Goal:** A calm, useful, coherent interface that makes small tasks feel effortless.

## 1. Experience principles

- Clear hierarchy over decoration.
- Tool content is the focus.
- Familiar controls and predictable interactions.
- Responsive by default.
- Consistent behavior across categories.
- Useful feedback without noisy animations or excessive dialogs.

## 2. Brand direction

Working name: **Qraft**  
Working tagline: **Your everyday digital toolbox.**

The identity should feel practical, modern, friendly, and dependable. Avoid making the entire product look like a developer-only dashboard: contact and everyday tools should feel equally at home.

The exact logo, palette, typography, and brand assets remain to be selected during visual design.

## 3. Layout

### Desktop
- Persistent or collapsible side navigation.
- Main content area with clear page title and description.
- Tool workspace with input and output regions.
- Optional preview panel for visual tools.

### Mobile
- Compact header and accessible navigation.
- Single-column tool layouts.
- Inputs and primary actions remain easy to reach.
- Preview and output should not require awkward horizontal scrolling.

## 4. Shared page pattern

A tool page should normally include:
1. Breadcrumb or category context.
2. Tool name.
3. Short explanation.
4. Input area.
5. Primary action or live-processing behavior.
6. Output/preview area.
7. Copy, download, or reset actions as appropriate.
8. Brief format or privacy notes where relevant.

Not every tool needs every element.

## 5. Shared components

Potential reusable components:
- App shell and navigation.
- Search input and category filter.
- Text field, textarea, select, checkbox, and file input.
- Primary and secondary buttons.
- Copy action with success feedback.
- Download action.
- Inline validation message.
- Toast/notice.
- Empty state.
- Preview panel.
- Confirmation dialog only for destructive actions.

## 6. Interaction states

Every interactive tool should consider:
- Initial/empty.
- Editing.
- Valid input.
- Invalid input.
- Processing (only when processing is non-trivial).
- Success.
- Export failure.
- Unsupported browser capability.

Avoid displaying a loading state for operations that complete instantly.

## 7. Accessibility

- Use semantic HTML.
- Associate labels with inputs.
- Ensure keyboard operation.
- Provide visible focus indicators.
- Use sufficient color contrast.
- Do not communicate status through color alone.
- Provide text alternatives for meaningful images.
- Respect reduced-motion preferences.
- Announce asynchronous status updates appropriately.

## 8. Visual tokens

Define CSS custom properties for:
- Color roles (background, surface, text, muted text, border, accent, danger, success).
- Typography scale and line heights.
- Spacing scale.
- Border radii.
- Shadows.
- Content widths.
- Focus ring.
- Motion duration/easing.

Choose actual values during implementation and document them here. Avoid hardcoding one-off values throughout tool styles.

## 9. Business card design

The card designer needs a clear separation between:
- Contact data.
- Design/template configuration.
- Rendered preview.
- Export settings.

Templates should be responsive previews but export to intentional dimensions. Provide a clear distinction between a screen-oriented digital card and print-oriented dimensions. Do not imply print-ready output until size, bleed, and export fidelity have been validated.

## 10. Content and microcopy

- Use plain language.
- Explain formats briefly.
- Label destructive actions clearly.
- State when data stays in the browser, but only when technically true.
- Prefer specific errors such as “Enter a valid JSON document” over generic “Something went wrong.”
