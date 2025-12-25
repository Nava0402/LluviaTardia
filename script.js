document.addEventListener('DOMContentLoaded',function(){
	// menú móvil
	const menuBtn = document.getElementById('menuBtn');
	const nav = document.getElementById('nav');
	if(menuBtn){
		menuBtn.addEventListener('click',()=>{
			if(nav.style.display === 'flex'){
				nav.style.display = 'none';
			} else {
				nav.style.display = 'flex';
				nav.style.flexDirection = 'column';
				nav.style.gap = '12px';
			}
		});
	}});