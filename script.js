document.addEventListener('DOMContentLoaded', function () {
	const menuBtn = document.getElementById('menuBtn');
	const nav = document.getElementById('nav');
	const menuOverlay = document.getElementById('menu-overlay');
	const closeBtn = document.getElementById('closeBtn');
	const menuToggle = document.getElementById('menuToggle');
	const MOBILE_BREAKPOINT = 600;

	const anunciosMonthSelect = document.getElementById('anunciosMonthSelect');
	const anunciosMonthBlock = document.getElementById('anunciosMonthBlock');
	const anunciosMonthTitle = document.getElementById('anunciosMonthTitle');
	const anunciosEmptyMessage = document.getElementById('anunciosEmptyMessage');
	const anunciosMonthGalleryBtn = anunciosMonthBlock?.querySelector('.eventos-collage');

	// Agrega aquí cada mes cuando tengan anuncios cargados en modalGalleries (más abajo en este archivo).
	const monthAnuncios = {
		julio: { title: 'Anuncios de Julio', gallery: 'anuncios' }
	};

	anunciosMonthSelect?.addEventListener('change', () => {
        const month = anunciosMonthSelect.value;

        if (!month) {
            anunciosMonthBlock.hidden = true;
            return;
        }

        const data = monthAnuncios[month];
        const monthLabel = anunciosMonthSelect.options[anunciosMonthSelect.selectedIndex].text;

        anunciosMonthBlock.hidden = false;

        if (data) {
            anunciosMonthTitle.textContent = data.title;
            anunciosMonthGalleryBtn.dataset.gallery = data.gallery;
            anunciosMonthGalleryBtn.hidden = false;
            anunciosEmptyMessage.hidden = true;
        } else {
            anunciosMonthTitle.textContent = `Anuncios de ${monthLabel}`;
            anunciosMonthGalleryBtn.hidden = true;
            anunciosEmptyMessage.hidden = false;
        }
    });

	if (menuBtn && nav) {
		if (!menuBtn.hasAttribute('aria-expanded')) menuBtn.setAttribute('aria-expanded', 'false');

		const header = document.querySelector('.site-header');

		function setMenuState(open){
			nav.classList.toggle('open', open);
			menuBtn.classList.toggle('open', open);
			menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
			header.classList.toggle('menu-open', open);
			document.body.classList.toggle('menu-open', open);
			menuOverlay.classList.toggle('open', open);

			if (menuToggle) {
				menuToggle.classList.toggle('is-hidden', open);
			}

			if (closeBtn) {
				closeBtn.classList.toggle('is-visible', open);
			}

			// keep hamburger visible text when toggle is shown
			menuBtn.textContent = '☰';
		}

		if (menuToggle) {
			menuToggle.addEventListener('click', () => {
				setMenuState(!nav.classList.contains('open'));
			});
		} else {
			menuBtn.addEventListener('click', () => {
				setMenuState(!nav.classList.contains('open'));
			});
		}

		if (closeBtn) {
			closeBtn.addEventListener('click', () => {
				setMenuState(false);
			});
		}

		menuOverlay.addEventListener('click', () => {
			setMenuState(false);
		});

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && nav.classList.contains('open')) {
				setMenuState(false);
			}
		});

		window.addEventListener('resize', () => {
			if (window.innerWidth > MOBILE_BREAKPOINT && nav.classList.contains('open')) {
				setMenuState(false);
			}
		});

	}

	const eventosSlider = document.getElementById('eventosSlider');
	const eventosSliderFrame = document.getElementById('eventosSliderFrame');
	const eventosSliderImg = document.getElementById('eventosSliderImg');
	const eventosSliderTitle = document.getElementById('eventosSliderTitle');
	const eventosSliderDots = document.getElementById('eventosSliderDots');
	const eventosPrev = document.getElementById('eventosPrev');
	const eventosNext = document.getElementById('eventosNext');

	if (eventosSlider && eventosSliderFrame && eventosSliderImg && eventosSliderTitle && eventosSliderDots) {
		const eventosSlides = [
			{ src: 'img/BryanC1.jpg', title: 'Bryan Caro "Transformación"' },
			{ src: 'img/BryanC2.jpg', title: 'Bryan Caro "Transformación"' },
			{ src: 'img/BryanC3.jpg', title: 'Bryan Caro "Transformación"' },
			{ src: 'img/BryanC4.jpg', title: 'Bryan Caro "Transformación"' },
			{ src: 'img/BryanC5.jpg', title: 'Bryan Caro "Transformación"' }
		];

		eventosSlides.forEach((slide) => {
			const preloadedImage = new Image();
			preloadedImage.src = slide.src;
		});

		let currentIndex = 0;
		const dotButtons = [];
		const AUTOPLAY_DELAY = 4500;
		let autoplayTimer = null;

		eventosSlides.forEach((slide, index) => {
			const dot = document.createElement('span');
			dot.className = 'eventos-slider-dot';
			eventosSliderDots.appendChild(dot);
			dotButtons.push(dot);
		});

eventosSliderFrame.style.cursor = 'pointer';
eventosSliderFrame.addEventListener('click', (event) => {
    if (event.target.closest('.eventos-slider-dots')) return;
    if (!eventosModal || !eventosModalImg) return;

    const eventosModalCaption = document.getElementById('eventosModalCaption');
    const slides = eventosSlides.map((slide) => slide.src);
    let localIndex = currentIndex;

    function renderLocalDots() {
        eventosModalDots.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'eventos-modal-dot' + (i === localIndex ? ' active' : '');
            eventosModalDots.appendChild(dot);
        });
    }

    function renderLocalSlide() {
        eventosModalImg.src = slides[localIndex];
        if (eventosModalCaption) {
            eventosModalCaption.textContent = eventosSlides[localIndex].title;
        }
        renderLocalDots();
    }

    function localNext() {
        localIndex = (localIndex + 1) % slides.length;
        renderLocalSlide();
    }

    function localPrev() {
        localIndex = (localIndex - 1 + slides.length) % slides.length;
        renderLocalSlide();
    }

    function localClose() {
        eventosModal.classList.remove('open');
        eventosModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('menu-open');
        eventosModalClose?.removeEventListener('click', localClose);
        document.removeEventListener('keydown', localKeydown);
        eventosModal.removeEventListener('touchstart', onTouchStart);
        eventosModal.removeEventListener('touchmove', onTouchMove);
        eventosModal.removeEventListener('touchend', onTouchEnd);
    }

    function localKeydown(e) {
        if (e.key === 'ArrowRight') localNext();
        if (e.key === 'ArrowLeft') localPrev();
        if (e.key === 'Escape') localClose();
    }

    let touchStartX = 0;
    let touchStartY = 0;
    let touchTracking = false;
    const SWIPE_THRESHOLD = 40;

    function onTouchStart(e) {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchTracking = true;
    }

    function onTouchMove(e) {
        if (!touchTracking) return;
        const touch = e.touches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            e.preventDefault();
        }
    }

    function onTouchEnd(e) {
        if (!touchTracking) return;
        touchTracking = false;
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;
        if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < 0) {
                localNext();
            } else {
                localPrev();
            }
        }
    }

    eventosModal.addEventListener('touchstart', onTouchStart, { passive: true });
    eventosModal.addEventListener('touchmove', onTouchMove, { passive: false });
    eventosModal.addEventListener('touchend', onTouchEnd, { passive: true });

    renderLocalSlide();
    eventosModal.classList.add('open');
    eventosModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');

    eventosModalClose?.addEventListener('click', localClose);
    document.addEventListener('keydown', localKeydown);

    eventosModal.addEventListener('click', function onOutsideClick(event) {
        if (event.target === eventosModal) {
            localClose();
            eventosModal.removeEventListener('click', onOutsideClick);
        }
    });
});

		function renderSlide() {
			const activeSlide = eventosSlides[currentIndex];
			eventosSliderImg.src = activeSlide.src;
			eventosSliderTitle.textContent = activeSlide.title;
			eventosSliderFrame.classList.toggle('is-clean-slide', currentIndex !== 0);
			dotButtons.forEach((dot, index) => {
				dot.classList.toggle('active', index === currentIndex);
			});
		}

		function changeSlide(nextIndex) {
			if (nextIndex === currentIndex) return;
			currentIndex = nextIndex;
			renderSlide();
		}

		function goToNext() {
			const nextIndex = (currentIndex + 1) % eventosSlides.length;
			changeSlide(nextIndex);
		}

		function goToPrev() {
			const prevIndex = (currentIndex - 1 + eventosSlides.length) % eventosSlides.length;
			changeSlide(prevIndex);
		}

		function startAutoplay() {
			if (autoplayTimer) clearInterval(autoplayTimer);
			autoplayTimer = setInterval(goToNext, AUTOPLAY_DELAY);
		}

		function stopAutoplay() {
			if (!autoplayTimer) return;
			clearInterval(autoplayTimer);
			autoplayTimer = null;
		}

		eventosNext?.addEventListener('click', goToNext);
		eventosPrev?.addEventListener('click', goToPrev);

		document.addEventListener('keydown', (event) => {
			if (event.key === 'ArrowRight') goToNext();
			if (event.key === 'ArrowLeft') goToPrev();
		});

		renderSlide();
	}

	const eventosCollageBtns = document.querySelectorAll('.eventos-collage[data-gallery]');
	const eventosModal = document.getElementById('eventosModal');
	const eventosModalImg = document.getElementById('eventosModalImg');
	const eventosModalDots = document.getElementById('eventosModalDots');
	const eventosModalPrev = document.getElementById('eventosModalPrev');
	const eventosModalNext = document.getElementById('eventosModalNext');
	const eventosModalClose = document.getElementById('eventosModalClose');
	// Carrusel de arrastre + escala dinámica para "Sobre nosotros"
const aboutGallery = document.getElementById('aboutGallery');

if (aboutGallery) {
    const items = aboutGallery.querySelectorAll('.about-gallery-item');

    // Calcula la posición de cada tarjeta UNA sola vez (no cambia al hacer scroll)
let itemCenters = [];

function cacheItemPositions() {
    itemCenters = Array.from(items).map((item) => item.offsetLeft + item.offsetWidth / 2);
}

aboutGallery.addEventListener('scroll', requestUpdateScale);
window.addEventListener('load', () => {
    cacheItemPositions();
    updateScale();
});
window.addEventListener('resize', cacheItemPositions); // recalcula si cambia el tamaño de pantalla
cacheItemPositions();
updateScale();

function updateScale() {
    const containerWidth = aboutGallery.clientWidth;
    const galleryCenter = aboutGallery.scrollLeft + containerWidth / 2;

    items.forEach((item, i) => {
        const itemCenter = itemCenters[i];
        const distance = Math.abs(galleryCenter - itemCenter);
        const maxDistance = containerWidth / 2;
        const proximity = Math.max(0, 1 - distance / maxDistance);

        const scale = 0.82 + proximity * 0.18;
        item.style.transform = `scale(${scale.toFixed(3)})`;
        item.classList.toggle('is-active', proximity > 0.85);
    });
}

let scaleScheduled = false;
function requestUpdateScale() {
    if (scaleScheduled) return;
    scaleScheduled = true;
    requestAnimationFrame(() => {
        updateScale();
        scaleScheduled = false;
    });
}

    // Arrastre con mouse (desktop)
    let isDown = false;
    let startX;
    let scrollLeft;

    aboutGallery.addEventListener('mousedown', (e) => {
        isDown = true;
        aboutGallery.classList.add('is-dragging');
        startX = e.pageX - aboutGallery.offsetLeft;
        scrollLeft = aboutGallery.scrollLeft;
    });

    aboutGallery.addEventListener('mouseleave', () => {
        isDown = false;
        aboutGallery.classList.remove('is-dragging');
    });

    aboutGallery.addEventListener('mouseup', () => {
        isDown = false;
        aboutGallery.classList.remove('is-dragging');
    });

    aboutGallery.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - aboutGallery.offsetLeft;
    const walk = (x - startX) * 1.5;
    aboutGallery.scrollLeft = scrollLeft - walk;
    requestUpdateScale(); // antes: updateScale()
});

	aboutGallery.addEventListener('scroll', requestUpdateScale); // antes: updateScale
	window.addEventListener('load', updateScale);
	updateScale();

    // Actualiza también con scroll táctil (celular) y con la rueda del mouse
    aboutGallery.addEventListener('scroll', updateScale);

    // Estado inicial al cargar la página
    window.addEventListener('load', updateScale);
    updateScale();
}
	if (eventosCollageBtns.length && eventosModal && eventosModalImg && eventosModalDots) {
		const modalGalleries = {
			bryanc: [
				'img/BryanC1.jpg',
				'img/BryanC2.jpg',
				'img/BryanC3.jpg',
				'img/BryanC4.jpg',
				'img/BryanC5.jpg'
			],
			prim: [
				'img/Prim1.jpg',
				'img/Prim2.jpg',
				'img/Prim3.jpg',
				'img/Prim4.jpg',
				'img/Prim5.jpg'
			],
			carlosg: [
				'img/CarlosG1.jpg',
				'img/CarlosG2.jpg',
				'img/CarlosG3.jpg',
				'img/CarlosG4.jpg',
				'img/CarlosG5.jpg'
			],
			anuncios: [
        		'img/anuncios3.jpg',
        		'img/anuncios2.jpg',
        		'img/anuncios.jpg'
    		]
		};

		Object.values(modalGalleries).flat().forEach((src) => {
			const preloadedImage = new Image();
			preloadedImage.src = src;
		});

		let modalSlides = modalGalleries.bryanc;
		let modalIndex = 0;
		const modalDotItems = [];

		function rebuildDots() {
			eventosModalDots.innerHTML = '';
			modalDotItems.length = 0;
			modalSlides.forEach(() => {
				const dot = document.createElement('span');
				dot.className = 'eventos-modal-dot';
				eventosModalDots.appendChild(dot);
				modalDotItems.push(dot);
			});
		}

		function renderModalSlide() {
			eventosModalImg.src = modalSlides[modalIndex];
			modalDotItems.forEach((dot, index) => {
				dot.classList.toggle('active', index === modalIndex);
			});
		}

		function openModal(galleryKey, index) {
			modalSlides = modalGalleries[galleryKey] || modalGalleries.bryanc;
			modalIndex = index;
			rebuildDots();
			renderModalSlide();
			eventosModal.classList.add('open');
			eventosModal.setAttribute('aria-hidden', 'false');
			document.body.classList.add('menu-open');
		}

		function closeModal() {
			eventosModal.classList.remove('open');
			eventosModal.setAttribute('aria-hidden', 'true');
			document.body.classList.remove('menu-open');
		}

		function modalNext() {
			modalIndex = (modalIndex + 1) % modalSlides.length;
			renderModalSlide();
		}

		function modalPrev() {
			modalIndex = (modalIndex - 1 + modalSlides.length) % modalSlides.length;
			renderModalSlide();
		}
		let modalTouchStartX = 0;
		let modalTouchStartY = 0;
		let modalTouchTracking = false;
		const MODAL_SWIPE_THRESHOLD = 40;

		eventosModal.addEventListener('touchstart', (event) => {
			const touch = event.touches[0];
			modalTouchStartX = touch.clientX;
			modalTouchStartY = touch.clientY;
			modalTouchTracking = true;
		}, { passive: true });

		eventosModal.addEventListener('touchmove', (event) => {
			if (!modalTouchTracking) return;
			const touch = event.touches[0];
			const deltaX = touch.clientX - modalTouchStartX;
			const deltaY = touch.clientY - modalTouchStartY;

			if (Math.abs(deltaX) > Math.abs(deltaY)) {
				event.preventDefault();
			}
		}, { passive: false });

		eventosModal.addEventListener('touchend', (event) => {
			if (!modalTouchTracking) return;
			modalTouchTracking = false;
			const touch = event.changedTouches[0];
			const deltaX = touch.clientX - modalTouchStartX;
			const deltaY = touch.clientY - modalTouchStartY;

			if (Math.abs(deltaX) > MODAL_SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
				if (deltaX < 0) {
					modalNext();
				} else {
					modalPrev();
				}
			}
		}, { passive: true });

		eventosModal.addEventListener('touchcancel', () => {
			modalTouchTracking = false;
		}, { passive: true });

		eventosCollageBtns.forEach((button) => {
			button.addEventListener('click', () => openModal(button.dataset.gallery, 0));
		});
		eventosModalNext?.addEventListener('click', modalNext);
		eventosModalPrev?.addEventListener('click', modalPrev);
		eventosModalClose?.addEventListener('click', closeModal);

		eventosModal.addEventListener('click', (event) => {
			if (event.target === eventosModal) {
				closeModal();
			}
		});

		document.addEventListener('keydown', (event) => {
			if (!eventosModal.classList.contains('open')) return;
			if (event.key === 'ArrowRight') modalNext();
			if (event.key === 'ArrowLeft') modalPrev();
			if (event.key === 'Escape') closeModal();
		});
	}
});