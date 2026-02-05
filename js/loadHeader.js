document.addEventListener("DOMContentLoaded", function () {
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (!headerPlaceholder) return;

  // Determine the correct path to header.html based on the current page's location
  const path = window.location.pathname.includes('/pages/') ? '../components/header.html' : 'components/header.html';

const basePath = window.location.pathname.includes('/TheYarnMagpie/') 
  ? '/TheYarnMagpie/' 
  : '/';

const head = document.head;

['css/styles.css', 'css/gallery-styles.css', 'css/about.css', 'css/tools.css', 'css/contact-form.css', 'css/header.css'].forEach(file => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = basePath + file;
  head.appendChild(link);
});

// Optional: add the font link too
const font = document.createElement('link');
font.rel = 'stylesheet';
font.href = 'https://fonts.googleapis.com/css2?family=Gwendolyn&display=swap';
head.appendChild(font);

  fetch(path)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      headerPlaceholder.innerHTML = data;

      // Adjust all data-href links to work with current base path
      const basePath = window.location.pathname.includes('/TheYarnMagpie/') ? '/TheYarnMagpie/' : '/';
      document.querySelectorAll('a[data-href]').forEach(link => {
        const dataHref = link.getAttribute('data-href') || '';

        // Basic hardening: ignore empty values and disallow dangerous URL schemes
        const trimmed = dataHref.trim();
        if (!trimmed) {
          return;
        }
        const lower = trimmed.toLowerCase();
        if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:')) {
          return;
        }

        // Build a safe URL relative to the current origin and basePath
        let safePath = trimmed;
        if (safePath.startsWith('/')) {
          safePath = safePath.substring(1);
        }

        try {
          const url = new URL(basePath + safePath, window.location.origin);
          // Ensure we stay on the same origin
          if (url.origin === window.location.origin) {
            link.href = url.toString();
          }
        } catch (e) {
          // If constructing the URL fails, leave the link unchanged
        }
      });
    })
    .catch(error => {
      console.error('Error loading header:', error);
    });
});