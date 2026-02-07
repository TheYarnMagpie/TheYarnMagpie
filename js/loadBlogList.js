document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('blog-list-container');
    
    // Path check for subpages
    const isSubpage = window.location.pathname.includes('/pages/');
    const dataPath = isSubpage ? '../data/articles.json' : 'data/articles.json';

    fetch(dataPath)
        .then(response => response.json())
        .then(articles => {
            if (articles.length === 0) {
                container.innerHTML = "<p>New articles coming soon!</p>";
                return;
            }

            articles.forEach(article => {
                const card = document.createElement('a');
                card.className = 'blog-card';
                // This link targets our new reader page with the specific ID
                card.href = `blog-post.html?id=${article.id}`;
                card.target = "_blank"; // Opens in new tab

                card.innerHTML = `
                    <img src="${article.image}" alt="${article.title}" class="blog-card-image">
                    <div class="blog-card-content">
                        <span class="blog-pillar-tag">${article.pillar}</span>
                        <h3>${article.title}</h3>
                        <p>${article.summary}</p>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Error loading blog list:", err);
            container.innerHTML = "<p>Unable to load articles at this time.</p>";
        });
});
