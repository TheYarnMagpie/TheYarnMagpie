# TheYarnMagpie Site Code Quality Improvement Checklist

This checklist is organized by area (HTML, CSS, JS, Accessibility, Performance, etc.) and by file/component where appropriate.  
Check off each item as you address it.

---

## 1. General HTML

- [ ] Validate all HTML files for syntax errors and semantic correctness.
- [ ] Ensure all images have meaningful `alt` text (from JSON where dynamic).
- [ ] Use semantic elements (`<nav>`, `<main>`, `<header>`, `<section>`, `<article>`, etc.).
- [ ] Ensure every page has a unique `<title>` and `<meta description>`.
- [ ] Avoid duplicate IDs, especially when cloning templates.
- [ ] Confirm all forms have properly associated `<label>`s.
- [ ] Ensure all links and buttons are keyboard accessible.

---

## 2. Components

### `components/gallery-detail-card.html`
- [ ] Use `<template>` tag if not already used.
- [ ] Ensure placeholders for alt text, title, description, etc., are filled dynamically.
- [ ] No duplicate IDs in template structure.

### `components/head.html` & `header.html`
- [ ] All required meta tags present (charset, viewport, etc.).
- [ ] Navigation uses `<nav>`, with logical and accessible structure.
- [ ] Keyboard navigation and skip-to-content link available.

---

## 3. CSS

- [ ] Use a consistent naming convention (consider BEM or similar).
- [ ] Remove any unused or duplicate styles.
- [ ] Use CSS custom properties for shared colors in `colors.css`.
- [ ] Ensure all color combinations meet WCAG contrast standards.
- [ ] Add/verify responsive breakpoints for all layouts (`@media` queries).
- [ ] Check for touch targets and spacing for mobile usability.
- [ ] Consider combining and minifying CSS for production.

---

## 4. JavaScript

### `js/loadGallery.js`
- [ ] Use `fetch` with async/await for clarity and error handling.
- [ ] Validate and sanitize all data from `gallery.json` before injecting into DOM.
- [ ] Show loading state while fetching gallery data.
- [ ] Show user-friendly error message if gallery fails to load.
- [ ] Ensure alt text and captions are set from JSON.
- [ ] Lazy-load images for performance (e.g., `loading="lazy"`).

### `js/loadHead.js` & `loadHeader.js`
- [ ] Inject components before visible content to avoid FOUC.
- [ ] Error handling for component loading failures.
- [ ] Ensure navigation remains accessible after dynamic injection.

---

## 5. Data

### `data/gallery.json`
- [ ] Validate JSON (no syntax errors, well-structured).
- [ ] All items include: image path, alt text, title, description (and tags/categories, if used).
- [ ] Descriptive property names.
- [ ] Consider fields for sort order, tags, or categories if filtering will be added.

---

## 6. Accessibility

- [ ] All images have descriptive alt text.
- [ ] Color contrast meets WCAG AA minimums.
- [ ] All interactive elements are reachable and usable via keyboard.
- [ ] Forms are fully accessible (labels, error messages, etc.).
- [ ] Use ARIA attributes where appropriate.

---

## 7. Performance

- [ ] Optimize all images for web (compression, correct sizing).
- [ ] Defer loading of non-critical JS.
- [ ] Lazy-load images in gallery.
- [ ] Minify CSS and JavaScript for production.

---

## 8. SEO

- [ ] Ensure each page has a unique, descriptive `<title>` and `<meta description>`.
- [ ] Use semantic HTML and heading hierarchy.
- [ ] Use descriptive filenames for images and assets.

---

## 9. User Experience

- [ ] Show loading indicators for dynamic content.
- [ ] Display friendly error messages on failures.
- [ ] Ensure consistent layout and navigation across all pages.
- [ ] Test all layouts on mobile, tablet, and desktop.
- [ ] Provide feedback on form submissions.

---

## 10. Maintainability

- [ ] Comment complex code sections.
- [ ] Keep components and styles modular.
- [ ] Document how to add new gallery items via JSON.

---

**Tip:**  
Review each checklist item after relevant file changes. This will help maintain high code quality across your project.

- [ ] Overlay Accessibility
The overlay does not currently trap focus or respond to "Esc" key to close. Consider adding accessibility improvements in the future.

