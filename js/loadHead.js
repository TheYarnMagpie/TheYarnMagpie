// js/loadHead.js

document.addEventListener("DOMContentLoaded", () => {
  const headerPlaceholder = document.getElementById("header-placeholder");
  const isPage = window.location.pathname.includes("/pages/");

  // Determine correct path to header component
  const headerPath = isPage ? "../components/header.html" : "components/header.html";

  fetch(headerPath)
    .then((response) => {
      if (!response.ok) throw new Error("Header not found");
      return response.text();
    })
    .then((html) => {
      // FIX: Apply path corrections for BOTH Home and Sub-pages
      
      if (isPage) {
        // --- SUB-PAGES (pages/...) ---
        // Prepend "../" to go back to root
        html = html.replace(
          /src="(?!(http|https|\/|\.\.))([^"]+)"/g, 
          'src="../$2"'
        );
        html = html.replace(
          /href="(?!(http|https|\/|\.\.|#))([^"]+)"/g, 
          'href="../$2"'
        );
      } else {
        // --- HOME PAGE (root) ---
        // Prepend "./" to force explicit current-directory lookup.
        // This helps bypass cache and resolves ambiguity on some servers.
        html = html.replace(
          /src="(?!(http|https|\/|\.\.))([^"]+)"/g, 
          'src="./$2"'
        );
        html = html.replace(
          /href="(?!(http|https|\/|\.\.|#))([^"]+)"/g, 
          'href="./$2"'
        );
      }

      headerPlaceholder.innerHTML = html;
    })
    .catch((error) => console.error("Error loading header:", error));
});
