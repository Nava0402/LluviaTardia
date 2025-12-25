document.addEventListener('DOMContentLoaded', function () {
	// menú móvil (clase + ARIA)
	const menuBtn = document.getElementById('menuBtn');
	const nav = document.getElementById('nav');
	const MOBILE_BREAKPOINT = 600;

	if (menuBtn && nav) {
		// ensure attributes
		if (!menuBtn.hasAttribute('aria-expanded')) menuBtn.setAttribute('aria-expanded', 'false');
		if (!menuBtn.hasAttribute('aria-controls')) menuBtn.setAttribute('aria-controls', 'nav');

		menuBtn.addEventListener('click', () => {
			const isOpen = nav.classList.toggle('open');
			menuBtn.setAttribute('aria-expanded', String(isOpen));
			menuBtn.classList.toggle('open', isOpen);

			// swap icon and update label
			const icon = menuBtn.querySelector('i');
			if (icon) {
				if (isOpen) {
					icon.classList.remove('fa-bars');
					icon.classList.add('fa-xmark');
					menuBtn.setAttribute('aria-label', 'Cerrar menú');
				} else {
					icon.classList.remove('fa-xmark');
					icon.classList.add('fa-bars');
					menuBtn.setAttribute('aria-label', 'Abrir menú');
				}
			}
		});

		// close on Escape key
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && nav.classList.contains('open')) {
				nav.classList.remove('open');
				menuBtn.setAttribute('aria-expanded', 'false');
				menuBtn.classList.remove('open');
				const icon = menuBtn.querySelector('i');
				if (icon) {
					icon.classList.remove('fa-xmark');
					icon.classList.add('fa-bars');
					menuBtn.setAttribute('aria-label', 'Abrir menú');
				}
			}
		});

		// function: reduce logo font-size until it fits in one line (min size enforced)
		function adjustLogoFont() {
			const logo = document.querySelector('.logo');
			if (!logo) return;
			const docStyles = getComputedStyle(document.documentElement);
			const maxPx = parseFloat(docStyles.getPropertyValue('--logo-max-size')) || parseFloat(getComputedStyle(logo).fontSize);
			const minPx = parseFloat(docStyles.getPropertyValue('--logo-min-size')) || 12;
			// start from the max size
			logo.style.fontSize = maxPx + 'px';
			// if it overflows, reduce until it fits or we reach min
			while (logo.scrollWidth > logo.clientWidth && parseFloat(logo.style.fontSize) > minPx) {
				logo.style.fontSize = (parseFloat(logo.style.fontSize) - 1) + 'px';
			}
		}

		// initial adjustment and on resize (debounced)
		adjustLogoFont();
		let resizeTimeout;
		window.addEventListener('resize', () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				adjustLogoFont();
				if (window.innerWidth > MOBILE_BREAKPOINT && nav.classList.contains('open')) {
					nav.classList.remove('open');
					menuBtn.setAttribute('aria-expanded', 'false');
					menuBtn.classList.remove('open');
					const icon = menuBtn.querySelector('i');
					if (icon) {
						icon.classList.remove('fa-xmark');
						icon.classList.add('fa-bars');
						menuBtn.setAttribute('aria-label', 'Abrir menú');
					}
				}
			}, 120);
		});
	}
});