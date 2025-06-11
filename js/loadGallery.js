
// Function to render gallery cards dynamically from JSON data
function renderGalleryCards(galleryData) {
    const galleryContainer = document.getElementById('gallery-container);
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
fetch('/components/gallery-detail-card.html')
>>>>>>> b868225a9c61c5e58123f37d17163d9e333db151
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);
  });

// Función para renderizar las cards de la galería
function renderGalleryCards(galleryData) {
  const galleryContainer = document.getElementById('gallery-container');
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

  // Añadir listeners a los botones "See Details"
  document.querySelectorAll('.see-details-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = this.getAttribute('data-idx');
      openGalleryDetail(galleryData[idx]);
    });
  });
}

// Función para abrir el details-card con los datos del ítem
function openGalleryDetail(item) {
  const overlay = document.getElementById('galleryDetailOverlay');
  if (!overlay) return;

  // Rellenar los datos
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

// Listener para cerrar el details-card
document.addEventListener('click', function(e) {
  const overlay = document.getElementById('galleryDetailOverlay');
  if (!overlay) return;
  // Cerrar si se hace clic en el botón de cerrar
  if (e.target.id === 'closeDetailBtn') {
    overlay.classList.remove('active');
  }
  // Cerrar si se hace clic fuera de la tarjeta
  if (e.target === overlay) {
    overlay.classList.remove('active');
  }
});

// Cargar los datos y renderizar la galería al cargar la página
fetch('../data/gallery.json')
  .then(res => res.json())
  .then(galleryData => {
    renderGalleryCards(galleryData);
  })
  .catch(err => {
    console.error('Error cargando la galería:', err);
  });



