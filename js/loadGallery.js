// Use a dynamic base path for assets depending on where the page is being served
const isSubpage = window.location.pathname.includes('/pages/');
const galleryJsonPath = isSubpage ? '../data/gallery.json' : 'data/gallery.json';
const detailCardPath = isSubpage ? '../components/gallery-detail-card.html' : 'components/gallery-detail-card.html';

// Function to render gallery cards dynamically from JSON data
function renderGalleryCards(galleryData) {
    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) return;
    galleryContainer.innerHTML = '';
    galleryData.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.innerHTML = `
          <img src="${item.image}" alt="${item.title}" class="gallery-card-image" />
          <div class="card-content">
            <h3>${item.title}</h3>
            <button class="see-details-btn" data-idx="${idx}">See Details</button>
          </div>
        `;
        galleryContainer.appendChild(card);
      });
    }

// Load the detail card template (once) and add to body
fetch(detailCardPath)
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);
  });

// Function to open the gallery detail overlay with item data
function openGalleryDetail(item) {
  const overlay = document.getElementById('galleryDetailOverlay');
  if (!overlay) return;

  document.getElementById('detailImage').src = item.image;
  document.getElementById('detailImage').alt = item.title;
  document.getElementById('detailTitle').textContent = item.title;
  document.getElementById('detailDescription').textContent = item.description || '';
  const tagsUl = document.getElementById('detailTags');
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
  const overlay = document.getElementById('galleryDetailOverlay');
  if (!overlay || !overlay.classList.contains('active')) return;
  if (
    e.target.id === 'galleryDetailOverlay' || // clicked overlay background
    e.target.id === 'closeDetailBtn'          // clicked close button
  ) {
    overlay.classList.remove('active');
  }
});

// Attach "See Details" button listeners after gallery renders
function attachDetailButtons(galleryData) {
  document.querySelectorAll('.see-details-btn').forEach((btn) => {
    const idx = btn.getAttribute('data-idx');
    btn.addEventListener('click', () => openGalleryDetail(galleryData[idx]));
  });
}

// Fetch gallery data and render cards
fetch(galleryJsonPath)
  .then(r => {
    if (!r.ok) throw new Error(`Failed to load gallery.json: ${r.status}`);
    return r.json();
  })
  .then(galleryData => {
    renderGalleryCards(galleryData);
    attachDetailButtons(galleryData);
  })
  .catch(err => {
    const galleryContainer = document.getElementById('gallery-container');
    if (galleryContainer) {
      galleryContainer.innerHTML = `<p style="color:red">Failed to load gallery: ${err.message}</p>`;
    }
    console.error('Gallery load error:', err);
  });


