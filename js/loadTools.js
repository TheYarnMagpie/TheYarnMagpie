/* js/loadTools.js - Full File Replacement */

async function loadTools() {
  const container = document.getElementById('tools-container');
  if (!container) return;

  try {
    const response = await fetch('../data/tools.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const toolsData = await response.json();
    container.innerHTML = '';

    toolsData.forEach(tool => {
      const card = document.createElement('div');
      card.className = 'tool-card';
      const nestLabel = tool.pillar || "Maker's Studio";

      card.innerHTML = `
      <span class="nest-tag">${nestLabel}</span>
      <div class="tool-icon">${tool.icon || '🛠️'}</div>
      <h3>${tool.title}</h3>
      <p>${tool.description}</p>
      `;

      card.addEventListener('click', (e) => {
        e.preventDefault();
        openToolDetail(tool);
      });
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Tools Load Error:', error);
  }
}

async function openToolDetail(tool) {
  try {
    // 1. Fetch the singular file
    const res = await fetch('../components/tool-detail-card.html');
    if (!res.ok) throw new Error("Template not found");
    const template = await res.text();

    const existing = document.getElementById('toolDetailOverlay');
    if (existing) existing.remove();

    // 2. Inject into body
    document.body.insertAdjacentHTML('beforeend', template);
    const overlay = document.getElementById('toolDetailOverlay');

    // 3. Populate with extra safety checks
    const safeSetText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text || "";
    };

    safeSetText('toolDetailTitle', tool.title);
    safeSetText('toolDetailDescription', tool.description);
    safeSetText('toolDetailPillar', tool.pillar);
    safeSetText('toolDetailLongDescription', tool.longDescription);

    // 4. Show
    setTimeout(() => overlay.classList.add('active'), 10);
  } catch (error) {
    console.error('Error opening tool detail:', error);
  }
}

// Global Close
document.addEventListener('click', (e) => {
  const overlay = document.getElementById('toolDetailOverlay');
  if (!overlay) return;
  const isClose = e.target.id === 'closeToolDetailBtn' || e.target.closest('.close-detail') || e.target === overlay;
  if (isClose) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  }
});

loadTools();
