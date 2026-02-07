document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    if (!postId) {
        document.getElementById('article-title').textContent = "No Article ID provided in URL.";
        return;
    }

    let attempts = 0;
    function checkLibrary() {
        if (typeof marked !== 'undefined') {
            console.log("Marked.js found!");
            fetchArticleData(postId);
        } else if (attempts < 50) { // Try for 5 seconds total
            attempts++;
            setTimeout(checkLibrary, 100);
        } else {
            document.getElementById('article-title').textContent = "Error: Markdown library failed to load.";
        }
    }

    checkLibrary();
});

function fetchArticleData(postId) {
    // Correctly locate articles.json from /pages/blog-post.html
    const dataPath = '../data/articles.json'; 

    fetch(dataPath)
        .then(res => {
            if (!res.ok) throw new Error("Could not load articles.json");
            return res.json();
        })
        .then(articles => {
            const article = articles.find(a => a.id === postId);
            if (article) {
                renderPost(article);
            } else {
                document.getElementById('article-title').textContent = "Article ID not found.";
            }
        })
        .catch(err => {
            console.error(err);
            document.getElementById('article-title').textContent = "Error loading metadata.";
        });
}

function renderPost(article) {
    document.getElementById('article-title').textContent = article.title;

    fetch(article.file)
        .then(res => {
            if (!res.ok) throw new Error("Could not find Markdown file at: " + article.file);
            return res.text();
        })
        .then(text => {
            // Render the markdown
            document.getElementById('article-body').innerHTML = marked.parse(text);
            // Run the CTA logic
            injectCTA(article.pillar);
        })
        .catch(err => {
            document.getElementById('article-body').innerHTML = `<p style="color:red">${err.message}</p>`;
        });
}

function injectCTA(pillar) {
    const container = document.getElementById('dynamic-cta-container');
    
    const ctas = {
        "The Collector's Vault": { text: "Shop the Collection", link: "gallery.html", class: "vault" },
        "The Maker's Studio": { text: "Get the Pattern", link: "tools.html", class: "studio" },
        "The Strategist's Loom": { text: "Download the Blueprint", link: "contact-form.html", class: "loom" }
    };

    // Fallback if pillar name doesn't match perfectly
    const choice = ctas[pillar] || { text: "Back to Blog", link: "blog.html", class: "" };
    
    // REPLACE your old container.innerHTML with this:
    container.innerHTML = `
        <div class="pillar-cta ${choice.class}">
            <h3>Inspired by ${pillar}?</h3>
            <a href="${choice.link}" class="bmc-button">${choice.text}</a>
        </div>
    `;
}
