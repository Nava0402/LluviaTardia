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

		closeBtn.addEventListener('click', () => {
			setMenuState(false);
		});

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
});