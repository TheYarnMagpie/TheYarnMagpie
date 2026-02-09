/* js/loadGallery.js */
// 1. Data Fetching and Card Rendering Logic

async function loadGallery() {
  const container = document.getElementById('gallery-container');
  if (!container) return;

  try {
    const response = await fetch('../data/gallery.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const galleryData = await response.json();
    container.innerHTML = ''; 

    galleryData.forEach(item => {
      const cardWrapper = document.createElement('div');
      cardWrapper.className = 'gallery-card-wrapper';
      
      const nestLabel = item.pillar || "Collector's Vault";

      cardWrapper.innerHTML = `
        <div class="gallery-item">
          <span class="nest-tag">${nestLabel}</span>
          <img src="${item.image}" alt="${item.title}" onerror="this.src='../assets/placeholder.jpg'">
          <div class="gallery-info">
            <h3>${item.title}</h3>
          </div>
        </div>
      `;
      
      const itemElement = cardWrapper.querySelector('.gallery-item');
      itemElement.addEventListener('click', (e) => {
        e.preventDefault();
        openGalleryDetail(item); 
      });

      container.appendChild(cardWrapper);
    });
  } catch (error) {
    console.error('Gallery Load Error:', error);
    container.innerHTML = `<p style="text-align:center; padding: 20px; color: var(--burnished-copper);">The Magpie encountered an error in the Gallery data.</p>`;
  }
}

// 2. Detail Modal Logic (Gallery Fix Architecture)
async function openGalleryDetail(item) {
  try {
    const templateRes = await fetch('../components/gallery-detail-card.html');
    const template = await templateRes.text();
    
    // 1. Clean up existing overlay to prevent ID conflicts
    const existing = document.getElementById('galleryDetailOverlay');
    if (existing) existing.remove();

    // 2. THE FIX: Inject into Body, not the container
    // This ensures it stays on top and ignores the parent's layout
    document.body.insertAdjacentHTML('beforeend', template);
    
    const overlay = document.getElementById('galleryDetailOverlay');
    
    // 3. Populate Data
    document.getElementById('galleryDetailTitle').textContent = item.title;
    document.getElementById('galleryDetailImage').src = item.image;
    document.getElementById('galleryDetailDescription').textContent = item.description;
    
    const pillarEl = document.getElementById('galleryDetailPillar');
    if (pillarEl) {
        pillarEl.textContent = item.pillar || "Collector's Vault";
    }

    const tagsUl = document.getElementById('galleryDetailTags');
    if (tagsUl && item.tags && Array.isArray(item.tags)) {
      tagsUl.innerHTML = '';
      item.tags.forEach(tag => {
        const li = document.createElement('li');
        li.textContent = tag;
        tagsUl.appendChild(li);
      });
    }

    // 4. Show the overlay
    setTimeout(() => overlay.classList.add('active'), 10);

  } catch (error) {
    console.error('Error opening gallery detail:', error);
  }
}


// 3. Global Closing Logic
document.addEventListener('click', function(e) {
  const overlay = document.getElementById('galleryDetailOverlay');
  if (!overlay) return;

  const isCloseBtn = e.target.id === 'closeGalleryDetailBtn' || e.target.closest('.close-detail');

  if (isCloseBtn || e.target === overlay) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  }
});

loadGallery();
