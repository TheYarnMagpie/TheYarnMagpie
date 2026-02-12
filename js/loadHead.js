// js/loadHead.js

document.addEventListener("DOMContentLoaded", () => {
  const headerPlaceholder = document.getElementById("header-placeholder");
  const isPage = window.location.pathname.includes("/pages/");

  // 1. Fetch Header
  let headerFetchPath = isPage ? "../components/header.html" : "components/header.html";
  headerFetchPath += `?v=${Date.now()}`; // Cache busting

  fetch(headerFetchPath)
    .then((response) => {
      if (!response.ok) throw new Error("Header not found");
      return response.text();
    })
    .then((html) => {
      // --- PART A: Fix Images (Must be done as string to prevent 404s) ---
      if (isPage) {
        html = html.replace(
          /src="(?!(http|https|\/|\.\.))([^"]+)"/g, 
          'src="../$2"'
        );
      }

      // Add timestamp to logo to force refresh (Color logo fix)
      html = html.replace(
        /\.(png|jpg|jpeg)"/g, 
        `.$1?t=${Date.now()}"`
      );

      // Inject HTML into the page
      headerPlaceholder.innerHTML = html;

      // --- PART B: Fix Links (DOM Manipulation - Safer) ---
      // We only run this if we are in a sub-page
      if (isPage) {
        const navLinks = headerPlaceholder.querySelectorAll("a");
        
        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          
          // Safety Checks:
          // 1. Must exist
          // 2. Must not be an external link (http)
          // 3. Must not be an anchor link (#)
          // 4. Must not be an email link (mailto)
          // 5. Must not already be fixed (../)
          if (href && 
              !href.startsWith("http") && 
              !href.startsWith("//") && 
              !href.startsWith("#") && 
              !href.startsWith("mailto:") &&
              !href.startsWith("../")) {
            
            // Prepend "../" to the link
            link.setAttribute("href", "../" + href);
          }
        });
      }
    })
    .catch((error) => console.error("Error loading header:", error));
});
