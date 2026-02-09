/* js/pillarFilter.js */

/**
 * Initializes the Pillar filtering logic.
 * @param {string} containerId - The ID of the grid/list container (e.g., 'gallery-container')
 * @param {string} cardClass - The class name of the individual cards (e.g., 'tool-card')
 */

async function initPillarFilters(containerId, cardClass) {
    const filterPlaceholder = document.getElementById('pillar-filter-placeholder');
    if (!filterPlaceholder) return;

    try {
        const res = await fetch('../components/nest-filter-bar.html');
        if (!res.ok) throw new Error("Filter component not found");
        const html = await res.text();
        filterPlaceholder.innerHTML = html;

        const buttons = document.querySelectorAll('.nest-filter-btn');
        const cards = document.getElementsByClassName(cardClass);

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedPillar = btn.getAttribute('data-pillar').toLowerCase();

                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                Array.from(cards).forEach(card => {
                    const tag = card.querySelector('.nest-tag, .blog-pillar-tag');
                    // Get text, lowercase it, and remove "The " for easier matching
                    const nestText = tag ? tag.textContent.trim().toLowerCase().replace('the ', '') : "";
                    const compareValue = selectedPillar.replace('the ', '');

                    if (selectedPillar === 'all' || nestText.includes(compareValue) || compareValue.includes(nestText)) {
                        card.style.display = ''; 
                        card.style.opacity = '1';
                    } else {
                        card.style.display = 'none';
                        card.style.opacity = '0';
                    }
                });
            });
        });
    } catch (err) {
        console.error("Pillar Filter Error:", err);
    }
}
