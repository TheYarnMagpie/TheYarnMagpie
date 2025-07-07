// Use a dynamic base path for assets depending on where the page is being served
const isSubpage = window.location.pathname.includes('/pages/');
const galleryJsonPath = isSubpage ? '../data/gallery.json' : 'data/gallery.json';
const detailCardPath = isSubpage ? '../components/gallery-detail-card.html' : 'components/gallery-detail-card.html';

// Load the overlay HTML ONCE, then load data and render cards
fetch(detailCardPath)
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);
    // Now that the overlay is present, fetch data and render cards
    fetch(galleryJsonPath)
      .then(r => r.json())
      .then(galleryData => {
        renderGalleryCards(galleryData);
        attachDetailButtons(galleryData);
      });
  });

// Render gallery cards inside the gallery-container
function renderGalleryCards(galleryData) {
  const galleryContainer = document.getElementById('gallery-container');
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

// Attach event listeners to each "See Details" button
function attachDetailButtons(galleryData) {
  document.querySelectorAll('.see-details-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = btn.getAttribute('data-idx');
      openGalleryDetail(galleryData[idx]);
    });
  });
}

// Populate and show the overlay
function openGalleryDetail(item) {
  const overlay = document.getElementById('galleryDetailOverlay');
  if (!overlay) return;
  document.getElementById('galleryDetailImage').src = item.image;
  document.getElementById('galleryDetailImage').alt = item.title;
  document.getElementById('galleryDetailTitle').textContent = item.title;
  document.getElementById('galleryDetailDescription').textContent = item.description || '';
  const tagsUl = document.getElementById('galleryDetailTags');
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
    e.target.id === 'galleryDetailOverlay' ||
    e.target.id === 'closeGalleryDetailBtn'
  ) {
    overlay.classList.remove('active');
  }
});