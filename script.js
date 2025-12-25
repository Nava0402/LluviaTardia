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

		// reset state on resize (if switching to desktop)
		window.addEventListener('resize', () => {
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
		});
	}
});