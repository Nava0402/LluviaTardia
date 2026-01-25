document.addEventListener('DOMContentLoaded', function () {
	const menuBtn = document.getElementById('menuBtn');
	const nav = document.getElementById('nav');
	const menuOverlay = document.getElementById('menu-overlay');
	const closeBtn = document.getElementById('closeBtn');
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
			// swap symbol
			menuBtn.textContent = open ? '✕' : '☰';
		}

		menuBtn.addEventListener('click', () => {
			setMenuState(!nav.classList.contains('open'));
		});

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

		// Manejar navegación en móvil - mostrar/ocultar secciones
		const navLinks = nav.querySelectorAll('a');
		navLinks.forEach(link => {
			link.addEventListener('click', function(e) {
				if (window.innerWidth <= MOBILE_BREAKPOINT) {
					e.preventDefault();
					
					// Obtener el id de la sección a mostrar
					const targetId = this.getAttribute('href').substring(1);
					const targetSection = document.getElementById(targetId);
					
					if (targetSection) {
						// Remover clase 'active' de todas las secciones
						document.querySelectorAll('main section').forEach(section => {
							section.classList.remove('active');
						});
						
						// Agregar clase 'active' a la sección objetivo
						targetSection.classList.add('active');
						
						// Scroll al inicio de la sección
						window.scrollTo(0, 0);
						
						// Cerrar menú
						setMenuState(false);
					}
				}
			});
		});

		window.addEventListener('resize', () => {
			if (window.innerWidth > MOBILE_BREAKPOINT && nav.classList.contains('open')) {
				setMenuState(false);
			}
		});
	}
});