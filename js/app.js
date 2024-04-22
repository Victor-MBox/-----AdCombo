const burger = document.querySelector('.header__burger'),
	sidebar = document.querySelector('.sidebar')

burger.addEventListener('click', () => {
    sidebar.classList.add(active)
})