fetch('../data/gallery.json')
    .then(response => response.json())
    .then(items => {
        const container = document.getElementById('gallery-container');
        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" />
                <h3>${item.title}</h3>
                <a href="#" class="see-details-link">See Details</a>
                <div class="sub-card">
                    <button class="close-sub-card" title="Cerrar">&times;</button>
                    <h4>Detalles del ítem</h4>
                    <p>${item.details}</p>
                </div>
            `;
            container.appendChild(galleryItem);
        });

        // Lógica para mostrar/ocultar la sub-card
        document.querySelectorAll('.gallery-item').forEach(function(item) {
            const link = item.querySelector('.see-details-link');
            const subCard = item.querySelector('.sub-card');
            const closeBtn = item.querySelector('.close-sub-card');

            link.addEventListener('click', function(e) {
                e.preventDefault();
                subCard.style.display = 'block';
                item.classList.add('show-details');
            });

            closeBtn.addEventListener('click', function() {
                subCard.style.display = 'none';
                item.classList.remove('show-details');
            });

            document.addEventListener('click', function(e) {
                if (subCard.style.display === 'block' && !item.contains(e.target)) {
                    subCard.style.display = 'none';
                    item.classList.remove('show-details');
                }
            });
        });
    });

