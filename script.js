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

	const eventosCollageBtn = document.getElementById('eventosCollageBtn');
	const eventosSlider = document.getElementById('eventosSlider');
	const eventosSliderImg = document.getElementById('eventosSliderImg');
	const eventosSliderCaption = document.getElementById('eventosSliderCaption');
	const eventosSliderClose = document.getElementById('eventosSliderClose');
	const eventosPrev = document.getElementById('eventosPrev');
	const eventosNext = document.getElementById('eventosNext');

	if (eventosCollageBtn && eventosSlider && eventosSliderImg && eventosSliderCaption) {
		const eventosImages = [
			'img/BryanC1.jpg',
			'img/BryanC2.jpg',
			'img/BryanC3.jpg',
			'img/BryanC4.jpg',
			'img/BryanC5.jpg'
		];

		let currentIndex = 0;

		function renderSlide() {
			eventosSliderImg.src = eventosImages[currentIndex];
			eventosSliderCaption.textContent = `${currentIndex + 1} / ${eventosImages.length}`;
		}

		function openSlider(index) {
			currentIndex = index;
			renderSlide();
			eventosSlider.classList.add('open');
			eventosSlider.setAttribute('aria-hidden', 'false');
			document.body.classList.add('menu-open');
		}

		function closeSlider() {
			eventosSlider.classList.remove('open');
			eventosSlider.setAttribute('aria-hidden', 'true');
			document.body.classList.remove('menu-open');
		}

		function goToNext() {
			currentIndex = (currentIndex + 1) % eventosImages.length;
			renderSlide();
		}

		function goToPrev() {
			currentIndex = (currentIndex - 1 + eventosImages.length) % eventosImages.length;
			renderSlide();
		}

		eventosCollageBtn.addEventListener('click', () => openSlider(0));
		eventosNext?.addEventListener('click', goToNext);
		eventosPrev?.addEventListener('click', goToPrev);
		eventosSliderClose?.addEventListener('click', closeSlider);

		eventosSlider.addEventListener('click', (event) => {
			if (event.target === eventosSlider) {
				closeSlider();
			}
		});

		document.addEventListener('keydown', (event) => {
			if (!eventosSlider.classList.contains('open')) return;
			if (event.key === 'ArrowRight') goToNext();
			if (event.key === 'ArrowLeft') goToPrev();
			if (event.key === 'Escape') closeSlider();
		});
	}
});