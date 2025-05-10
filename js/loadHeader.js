document.addEventListener("DOMContentLoaded", function () {
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (!headerPlaceholder) return;

  // Determine the correct path to header.html based on the current page's location
  const path = window.location.pathname.includes('/pages/') ? '../components/header.html' : 'components/header.html';

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
        link.href = basePath + link.getAttribute('data-href');
      });
    })
    .catch(error => {
      console.error('Error loading header:', error);
    });
});