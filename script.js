document.addEventListener('DOMContentLoaded', function () {
	const menuBtn = document.getElementById('menuBtn');
	const nav = document.getElementById('nav');
	const MOBILE_BREAKPOINT = 600;

	if (menuBtn && nav) {
		// ensure aria-expanded exists
		if (!menuBtn.hasAttribute('aria-expanded')) menuBtn.setAttribute('aria-expanded', 'false');

		menuBtn.addEventListener('click', () => {
			const open = nav.classList.toggle('open');
			menuBtn.classList.toggle('open', open);
			menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
		});

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && nav.classList.contains('open')) {
				nav.classList.remove('open');
				menuBtn.classList.remove('open');
				menuBtn.setAttribute('aria-expanded', 'false');
			}
		});

		window.addEventListener('resize', () => {
			if (window.innerWidth > MOBILE_BREAKPOINT && nav.classList.contains('open')) {
				nav.classList.remove('open');
				menuBtn.classList.remove('open');
				menuBtn.setAttribute('aria-expanded', 'false');
			}
		});
	}
});