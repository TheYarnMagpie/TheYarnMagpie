document.addEventListener("DOMContentLoaded", function () {
  const head = document.getElementsByTagName("head")[0];
  const isSubpage = window.location.pathname.includes('/pages/');
  const path = isSubpage ? '../components/head.html' : 'components/head.html';

  fetch(path)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.text();
    })
    .then(data => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data;

      // Adjust all relative paths if we're on a subpage
      if (isSubpage) {
        tempDiv.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
          if (link.href.includes('/css/')) {
            link.href = link.href.replace('/css/', '/../css/');
          }
        });
      }

      [...tempDiv.children].forEach(el => head.appendChild(el));
    })
    .catch(error => {
      console.error('Error loading head:', error);
    });
});