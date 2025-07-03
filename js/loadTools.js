

// Use a dynamic base path for assets depending on where the page is being served
const isSubpage = window.location.pathname.includes('/pages/');
const toolsJsonPath = isSubpage ? '../data/tools.json' : 'data/tools.json';
const detailCardPath = isSubpage ? '../components/tools-detail-card.html' : 'components/tools-detail-card.html';

// Load the detail card template (once) and add to body
// Only fetch tools data and attach events after overlay is loaded
fetch(detailCardPath)
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);
    // Now that overlay is loaded, load tools data
    fetch(toolsJsonPath)
      .then(r => {
        if (!r.ok) throw new Error(`Failed to load tools.json: ${r.status}`);
        return r.json();
      })
      .then(toolsData => {
        renderToolCards(toolsData);
        attachDetailButtons(toolsData);
      })
      .catch(err => {
        const toolsContainer = document.getElementById('tools-container');
        if (toolsContainer) {
          toolsContainer.innerHTML = `<p style="color:red">Failed to load tools: ${err.message}</p>`;
        }
        console.error('Tools load error:', err);
      });
  });

// Function to render tool cards dynamically from JSON data
function renderToolCards(toolsData) {
  const toolsContainer = document.getElementById('tools-container');
  if (!toolsContainer) return;
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

// Attach "See Details" button listeners after tool cards render
function attachDetailButtons(toolsData) {
  document.querySelectorAll('.see-details-btn').forEach((btn) => {
    const idx = btn.getAttribute('data-idx');
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent bubbling to overlay
      openToolsDetail(toolsData[idx]);
    });
  });
}

// Function to open the tools detail overlay with item data
function openToolsDetail(item) {
  const overlay = document.getElementById('toolsDetailOverlay');
  if (!overlay) { 
    console.log('Overlay not found!'); 
    return; 
  }

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

// Overlay close handler (close on X or when clicking the overlay background)
document.addEventListener('click', function(e) {
  const overlay = document.getElementById('toolsDetailOverlay');
  if (!overlay || !overlay.classList.contains('active')) return;
  if (
    e.target.id === 'toolsDetailOverlay' || // clicked overlay background
    e.target.id === 'closeToolsDetailBtn'   // clicked tools close button
  ) {
    overlay.classList.remove('active');
  }
});