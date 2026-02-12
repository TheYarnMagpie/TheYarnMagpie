// js/loadHead.js

document.addEventListener("DOMContentLoaded", () => {
  const headerPlaceholder = document.getElementById("header-placeholder");
  const isPage = window.location.pathname.includes("/pages/");

  // 1. Determine path to header file
  let headerFetchPath = isPage ? "../components/header.html" : "components/header.html";
  
  // 2. CACHE BUSTING: Add a timestamp to force the browser to get the fresh file
  // This prevents GitHub Pages from serving the old version of the header
  headerFetchPath += `?v=${Date.now()}`;

  fetch(headerFetchPath)
    .then((response) => {
      if (!response.ok) throw new Error("Header not found");
      return response.text();
    })
    .then((html) => {
      // 3. HARD OVERRIDE: Force the correct logo path
      // We ignore what's in the file and force the known-good path.
      // This bypasses any typos or stale cache in the HTML file itself.
      
      const correctLogoPath = isPage 
        ? "../images/tym-logo-color.png" 
        : "images/tym-logo-color.png"; // No './' for home, just standard 'images/'

      // Replace the existing logo source (whatever it is) with the correct one
      // Matches src="..." inside the logo-container or just generically
      html = html.replace(
        /src="[^"]*tym-logo[^"]*\.png"/g, 
        `src="${correctLogoPath}"`
      );

      // 4. General path fixes for other links (Navigation)
      if (isPage) {
        html = html.replace(
          /href="(?!(http|https|\/|\.\.|#))([^"]+)"/g, 
          'href="../$2"'
        );
      } else {
        // On Home, standard links usually work, but we ensure no ./ weirdness
        // Just leaving them as "pages/..." or "index.html" is safest for GH Pages root.
      }

      headerPlaceholder.innerHTML = html;
    })
    .catch((error) => console.error("Error loading header:", error));
});
