// js/loadHead.js

document.addEventListener("DOMContentLoaded", () => {
  const headerPlaceholder = document.getElementById("header-placeholder");
  const isPage = window.location.pathname.includes("/pages/");

  // 1. Determine path to header file
  // We add a timestamp (?v=...) to ensure we always fetch the latest HTML structure
  let headerFetchPath = isPage ? "../components/header.html" : "components/header.html";
  headerFetchPath += `?v=${Date.now()}`;

  fetch(headerFetchPath)
    .then((response) => {
      if (!response.ok) throw new Error("Header not found");
      return response.text();
    })
    .then((html) => {
      // 2. PARSE HTML: Create a temporary container to hold the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;

      // 3. FIX LOGO: Find the logo image and update its source
      const logoImg = tempDiv.querySelector('img[src*="tym-logo"]');
      if (logoImg) {
        // Force the correct path based on location
        // We use the "color" logo by default now
        const logoName = "tym-logo-color.png"; 
        const logoPath = isPage ? `../images/${logoName}` : `images/${logoName}`;
        
        // Add cache buster to image to ensure fresh load
        logoImg.setAttribute('src', `${logoPath}?t=${Date.now()}`);
      }

      // 4. FIX LINKS: Update navigation links for sub-pages
      if (isPage) {
        const links = tempDiv.querySelectorAll('a');
        links.forEach(link => {
          const href = link.getAttribute('href');
          
          // Only modify relative internal links
          // Skip: http, https, //, #, mailto
          if (href && 
              !href.match(/^(http|https|\/\/|#|mailto:)/) && 
              !href.startsWith('../')) {
            
            link.setAttribute('href', '../' + href);
          }
        });
      }

      // 5. INJECT: Move the processed content to the real header
      headerPlaceholder.innerHTML = tempDiv.innerHTML;
    })
    .catch((error) => console.error("Error loading header:", error));
});
