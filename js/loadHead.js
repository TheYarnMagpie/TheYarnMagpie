// js/loadHead.js

document.addEventListener("DOMContentLoaded", () => {
  const headerPlaceholder = document.getElementById("header-placeholder");
  const isPage = window.location.pathname.includes("/pages/");

  // Determine correct path to header component based on current location
  const headerPath = isPage ? "../components/header.html" : "components/header.html";

  fetch(headerPath)
    .then((response) => {
      if (!response.ok) throw new Error("Header not found");
      return response.text();
    })
    .then((html) => {
      // FIX: Modify paths in the text string BEFORE injecting into DOM.
      // This is crucial to prevent the browser from trying to load broken paths 
      // immediately upon injection (race condition).
      
      if (isPage) {
        // 1. Fix Images (src)
        // Regex logic: Find src attributes that do NOT start with http, https, /, or ..
        html = html.replace(
          /src="(?!(http|https|\/|\.\.))([^"]+)"/g, 
          'src="../$2"'
        );

        // 2. Fix Links (href) 
        // Regex logic: Same as above, but also ignore hash links (#)
        html = html.replace(
          /href="(?!(http|https|\/|\.\.|#))([^"]+)"/g, 
          'href="../$2"'
        );
      }

      // Inject the corrected HTML
      headerPlaceholder.innerHTML = html;
    })
    .catch((error) => console.error("Error loading header:", error));
});

