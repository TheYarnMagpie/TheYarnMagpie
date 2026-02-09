const galleryContainer = document.getElementById('gallery-container');
const detailCardPath = '../components/gallery-detail-card.html';

async function loadGallery() {
  try {
    const [galleryResponse, detailCardResponse] = await Promise.all([
      fetch('../data/gallery.json'), // Corrected: fetching gallery data
      fetch(detailCardPath)
    ]);

    if (!galleryResponse.ok) throw new Error('Failed to load gallery data');

    const galleryData = await galleryResponse.json();
    const detailCardText = await detailCardResponse.text();

    if (!document.getElementById('galleryDetailOverlay')) {
        document.body.insertAdjacentHTML('beforeend', detailCardText);
    }

    renderGalleryCards(galleryData);
  } catch (error) {
    console.error('Error loading gallery:', error);
  }
}


function renderGalleryCards(items) {
  if (!galleryContainer) return;
  galleryContainer.innerHTML = '';
  
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="gallery-card-info">
        <h3>${item.title}</h3>
        <button class="view-details-btn">See Details</button>
      </div>
    `;
    
    // Using addEventListener is safer than onclick for complex data
    card.querySelector('.view-details-btn').addEventListener('click', () => openGalleryDetail(item));
    galleryContainer.appendChild(card);
  });
}

function openGalleryDetail(item) {
  const overlay = document.getElementById('galleryDetailOverlay');
  if (!overlay) return;

  // 1. Set Image and Title
  document.getElementById('galleryDetailImage').src = item.image;
  document.getElementById('galleryDetailTitle').textContent = item.title;
  
  // 2. Restore Gallery-specific description (using 'description' instead of 'summary')
  document.getElementById('galleryDetailDescription').textContent = item.description || item.summary || "";

  // 3. Restore Tags (The horizontal list of features/materials)
  const tagsUl = document.getElementById('galleryDetailTags');
  if (tagsUl) {
      tagsUl.innerHTML = '';
      if (item.tags && Array.isArray(item.tags)) {
        item.tags.forEach(tag => {
          const li = document.createElement('li');
          li.textContent = tag;
          tagsUl.appendChild(li);
        });
      }
  }
  
  overlay.classList.add('active');
}


// 4. Closing Logic (Handles X button and clicking the dark background)
document.addEventListener('click', function(e) {
  const overlay = document.getElementById('galleryDetailOverlay');
  if (!overlay || !overlay.classList.contains('active')) return;

  const detailCard = overlay.querySelector('.gallery-detail-card');
  const isCloseBtn = e.target.id === 'closeGalleryDetailBtn' || e.target.classList.contains('close-detail');

  if (isCloseBtn || e.target === overlay) {
    overlay.classList.remove('active');
  }
});

loadGallery();
