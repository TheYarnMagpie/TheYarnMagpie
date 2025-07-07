// Use a dynamic base path for assets depending on where the page is being served
const isSubpage = window.location.pathname.includes('/pages/');
const toolsJsonPath = isSubpage ? '../data/tools.json' : 'data/tools.json';
const detailCardPath = isSubpage ? '../components/tools-detail-card.html' : 'components/tools-detail-card.html';

// Load the overlay once, then load data and render cards
fetch(detailCardPath)
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);
    fetch(toolsJsonPath)
      .then(r => r.json())
      .then(toolsData => {
        renderToolCards(toolsData);
        attachDetailButtons(toolsData);
      });
  });

function renderToolCards(toolsData) {
  const toolsContainer = document.getElementById('tools-container');
  toolsContainer.innerHTML = '';
  toolsData.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'tools-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="tools-card-image" />
      <div class="card-content">
        <h3>${item.title}</h3>
        <button class="see-details-btn" data-idx="${idx}">See Details</button>
      </div>
    `;
    toolsContainer.appendChild(card);
  });
}

function attachDetailButtons(toolsData) {
  document.querySelectorAll('.see-details-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = btn.getAttribute('data-idx');
      openToolsDetail(toolsData[idx]);
    });
  });
}

function openToolsDetail(item) {
  const overlay = document.getElementById('toolsDetailOverlay');
  if (!overlay) return;
  document.getElementById('toolsDetailImage').src = item.image;
  document.getElementById('toolsDetailImage').alt = item.title;
  document.getElementById('toolsDetailTitle').textContent = item.title;
  document.getElementById('toolsDetailDescription').textContent = item.description || '';
  const tagsUl = document.getElementById('toolsDetailTags');
  tagsUl.innerHTML = '';
  if (item.tags && Array.isArray(item.tags)) {
    item.tags.forEach(tag => {
      const li = document.createElement('li');
      li.textContent = tag;
      tagsUl.appendChild(li);
    });
  }
  overlay.classList.add('active');
}

document.addEventListener('click', function(e) {
  const overlay = document.getElementById('toolsDetailOverlay');
  if (!overlay || !overlay.classList.contains('active')) return;
  if (
    e.target.id === 'toolsDetailOverlay' ||
    e.target.id === 'closeToolsDetailBtn'
  ) {
    overlay.classList.remove('active');
  }
});