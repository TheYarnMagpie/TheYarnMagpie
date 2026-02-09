// js/loadTools.js

async function loadTools() {
    const container = document.getElementById('tools-container');
    if (!container) return;

    // From /pages/tools.html, we must go UP one level to find /data/
    const jsonPath = '../data/tools.json';

    try {
        const response = await fetch(jsonPath);
        
        if (!response.ok) {
            throw new Error(`404: File not found at ${jsonPath}`);
        }

        const tools = await response.json();
        
        if (!tools || tools.length === 0) {
            container.innerHTML = "<p>The workshop is currently empty.</p>";
            return;
        }

        container.innerHTML = ''; 

        tools.forEach(tool => {
            const card = document.createElement('div');
            card.className = 'tool-card';
            card.innerHTML = `
                <div class="tool-icon">${tool.icon}</div>
                <h3>${tool.title}</h3>
                <p>${tool.description}</p>
                <button class="btn-open-tool" data-id="${tool.id}">Access Tool</button>
            `;
            container.appendChild(card);
        });

        // Gallery Fix Logic: Event Delegation
        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-open-tool')) {
                const toolId = e.target.getAttribute('data-id');
                const tool = tools.find(t => t.id === toolId);
                openToolDetail(tool);
            }
        });

    } catch (error) {
        console.error("Magpie Fetch Error:", error);
        container.innerHTML = `
            <div style="padding: 2rem; border: 2px dashed var(--tail-green); border-radius: 12px; text-align: center;">
                <p><strong>The Magpie is confused.</strong></p>
                <p>I looked in <code>${jsonPath}</code> but found nothing.</p>
                <p style="font-size: 0.8rem; color: #666;">Tip: Ensure the folder is named 'data' (lowercase) and is not inside 'pages'.</p>
            </div>`;
    }
}

async function openToolDetail(tool) {
    try {
        // Path to the component from the /pages/ directory
        const response = await fetch('../components/tools-detail-card.html');
        const template = await response.text();

        const existing = document.getElementById('toolsDetailOverlay');
        if (existing) existing.remove();

        // Architectural Consistency: Body Injection
        document.body.insertAdjacentHTML('beforeend', template);

        document.getElementById('toolsDetailTitle').textContent = tool.title;
        document.getElementById('toolsDetailIcon').textContent = tool.icon;
        document.getElementById('toolsDetailCategory').textContent = tool.category;
        document.getElementById('toolsDetailDescription').textContent = tool.longDescription;

        const overlay = document.getElementById('toolsDetailOverlay');
        setTimeout(() => overlay.classList.add('active'), 10);
    } catch (err) {
        console.error("Could not load detail component:", err);
    }
}

// Global Modal Closer
document.addEventListener('click', (e) => {
    const overlay = document.getElementById('toolsDetailOverlay');
    if (!overlay) return;
    if (e.target.id === 'closeToolsDetailBtn' || e.target === overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    }
});

loadTools();
