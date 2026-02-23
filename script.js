document.addEventListener('DOMContentLoaded', function () {
	const menuBtn = document.getElementById('menuBtn');
	const nav = document.getElementById('nav');
	const menuOverlay = document.getElementById('menu-overlay');
	const closeBtn = document.getElementById('closeBtn');
	const menuToggle = document.getElementById('menuToggle');
	const MOBILE_BREAKPOINT = 600;

	if (menuBtn && nav) {
		// ensure aria-expanded exists
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
		eventosSlider.addEventListener('mouseenter', stopAutoplay);
		eventosSlider.addEventListener('mouseleave', startAutoplay);
		eventosSlider.addEventListener('focusin', stopAutoplay);
		eventosSlider.addEventListener('focusout', startAutoplay);

		document.addEventListener('keydown', (event) => {
			if (event.key === 'ArrowRight') goToNext();
			if (event.key === 'ArrowLeft') goToPrev();
		});

		renderSlide();
		startAutoplay();
	}

	const eventosCollageBtn = document.getElementById('eventosCollageBtn');
	const eventosModal = document.getElementById('eventosModal');
	const eventosModalImg = document.getElementById('eventosModalImg');
	const eventosModalDots = document.getElementById('eventosModalDots');
	const eventosModalPrev = document.getElementById('eventosModalPrev');
	const eventosModalNext = document.getElementById('eventosModalNext');
	const eventosModalClose = document.getElementById('eventosModalClose');

	if (eventosCollageBtn && eventosModal && eventosModalImg && eventosModalDots) {
		const modalSlides = [
			'img/BryanC1.jpg',
			'img/BryanC2.jpg',
			'img/BryanC3.jpg',
			'img/BryanC4.jpg',
			'img/BryanC5.jpg'
		];

		modalSlides.forEach((src) => {
			const preloadedImage = new Image();
			preloadedImage.src = src;
		});

		let modalIndex = 0;
		const modalDotItems = [];

		modalSlides.forEach(() => {
			const dot = document.createElement('span');
			dot.className = 'eventos-modal-dot';
			eventosModalDots.appendChild(dot);
			modalDotItems.push(dot);
		});

		function renderModalSlide() {
			eventosModalImg.src = modalSlides[modalIndex];
			modalDotItems.forEach((dot, index) => {
				dot.classList.toggle('active', index === modalIndex);
			});
		}

		function openModal(index) {
			modalIndex = index;
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

		eventosCollageBtn.addEventListener('click', () => openModal(0));
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