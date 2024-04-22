'use strict'

/* Открытие меню по клику на Бургер */
const burger = document.querySelector('.header__burger'),
	sidebar = document.querySelector('.sidebar')

// ф-я открытие меню
function openSidebar() {
	sidebar.classList.add('sidebar_active')
}

// ф-я закрытия меню
function closeSidebar() {
	sidebar.classList.remove('sidebar_active')
	burger.classList.remove('header__burger_active')
}

// событие клика
burger.addEventListener('click', () => {
	sidebar.classList.toggle('sidebar_active')
	burger.classList.toggle('header__burger_active')
})

// клик по "esc"
document.addEventListener('keydown', event => {
	if (event.code.toLowerCase() === 'escape') {
		closeSidebar()
	}
})

/* SLIDER SWIPER */
function initSwiper() {
	// Проверяем, не инициализирован ли уже слайдер
	if (window.swiperInstance) {
		// Удаляем слайдер, если он был инициализирован
		window.swiperInstance.destroy(true, true)
		window.swiperInstance = null
	}

	// Получаем ширину окна
	const screenWidth =
		window.innerWidth ||
		document.documentElement.clientWidth ||
		document.body.clientWidth

	// Инициализируем слайдер, только если ширина экрана меньше 1024 пикселей
	if (screenWidth < 1024) {
		window.swiperInstance = new Swiper('.swiper', {
			loop: true,
			pagination: {
				el: '.swiper-pagination',
			},
			breakpoints: {
				480: {
					slidesPerView: 2,
				},
				767: {
					slidesPerView: 3,
				},
			},
		})
	}
}

// Инициализируем слайдер при загрузке страницы
document.addEventListener('DOMContentLoaded', initSwiper)

// Переинициализируем слайдер при изменении размеров окна
window.addEventListener('resize', initSwiper)

/* Таймер обратного отсчета */
document.addEventListener('DOMContentLoaded', event => {
	const timerElement = document.querySelector('.sale-box__timer')
	let timeLeft = 30 * 60 // 30 минут в секундах

	function updateTimer() {
		let minutes = parseInt(timeLeft / 60, 10)
		let seconds = parseInt(timeLeft % 60, 10)

		minutes = minutes < 10 ? '0' + minutes : minutes
		seconds = seconds < 10 ? '0' + seconds : seconds

		timerElement.textContent = `00:${minutes}:${seconds}`
		timeLeft-- // уменьшаем время на 1 секунду

		if (timeLeft < 0) {
			// если время вышло
			timeLeft = 30 * 60 // сбрасываем таймер на 30 минут
		}
	}

	// Обновляем таймер каждую секунду
	updateTimer() // запускаем таймер сразу
	setInterval(updateTimer, 1000)
})

// ПАРАЛЛАКС
let decors = document.querySelectorAll('.page__decor')

// Определяем положение курсора мыши относительно ширины и высоты окна браузера.
document.onmousemove = e => {
	let x = e.clientX / window.innerWidth
	let y = e.clientY / window.innerHeight

	// Применяем трансформацию, чтобы переместить элемент в зависимости от положения курсора.
	// Множитель 70 увеличивает эффект перемещения, делая его более заметным.
	decors.forEach(decor => {
		decor.style.transform = `translate(-${x * 70}px, -${y * 70}px)`
	})
}
