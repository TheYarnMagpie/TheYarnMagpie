document.addEventListener("DOMContentLoaded", function () {
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (!headerPlaceholder) return;

  // Determine the correct path to header.html based on the current page's location
  const scriptPath = document.currentScript.src;
const repoRoot = scriptPath.substring(0, scriptPath.lastIndexOf('/js/'));
const path = `${repoRoot}/components/header.html`;

    fetch(path)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        headerPlaceholder.innerHTML = data;
      })
      .catch(error => {
        console.error('Error loading header:', error);
      });
    });
    