// js/loadGallery.js

// Function to render gallery cards dynamically from JSON data
function renderGalleryCards(galleryData) {
    const galleryContainer = document.getElementById('galleryContainer');
    galleryContainer.innerHTML = '';
    galleryData.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.innerHTML = `
          <img src="${item.image}" alt="${item.title}" class="gallery-card-image" />
          <div class="gallery-card-content">
            <h3>${item.title}</h3>
            <button class="see-details-btn" data-idx="${idx}">See Details</button>
          </div>
        `;
        galleryContainer.appendChild(card);
      });
    }

// Load the detail card template (once) and add to body
fetch('../components/gallery-detail-card.html')
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);
  });

// Function to open the gallery detail overlay with item data
function openGalleryDetail(item) {
  const overlay = document.getElementById('galleryDetailOverlay');
  if (!overlay) return;

  // Populate data
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
  fetch('../data/gallery.json')
    .then(res => res.json())
    .then(galleryData => {
      renderGalleryCards(galleryData);
      attachDetailButtons(galleryData);

      // Añade listeners a los botones de detalles
      document.querySelectorAll('.see-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const idx = this.getAttribute('data-idx');
          openGalleryDetail(galleryData[idx]);
        });
      });
    });


  
