/* js/loadBlogList.js */
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('blog-list-container');
    if (!container) return;

    const isSubpage = window.location.pathname.includes('/pages/');
    const dataPath = isSubpage ? '../data/articles.json' : 'data/articles.json';

    fetch(dataPath)
        .then(response => response.json())
        .then(articles => {
            if (articles.length === 0) {
                container.innerHTML = "<p>New articles coming soon!</p>";
                return;
            }

            container.innerHTML = ''; // Clear container

            articles.forEach(article => {
                const card = document.createElement('a');
                card.className = 'blog-card';
                card.href = `blog-post.html?id=${article.id}`;
                card.target = "_blank"; 

                // We use the 'pillar' field for the Nest Tag
                const nestLabel = article.pillar || "The Maker's Studio";

                card.innerHTML = `
                    <img src="${article.image}" alt="${article.title}" class="blog-card-image">
                    <div class="blog-card-content">
                        <span class="blog-pillar-tag">${nestLabel}</span>
                        <h3>${article.title}</h3>
                        <p>${article.summary}</p>
                    </div>
                `;
                container.appendChild(card);
            });
            
            // --- PILLAR FILTER INTEGRATION START ---
            // This runs after all 'blog-card' elements are appended to the DOM
            if (typeof initPillarFilters === 'function') {
                initPillarFilters('blog-list-container', 'blog-card');
            }
            // --- PILLAR FILTER INTEGRATION END ---
            
        })
        .catch(err => {
            console.error("Error loading blog list:", err);
            container.innerHTML = "<p>Unable to load articles at this time.</p>";
        });
});
