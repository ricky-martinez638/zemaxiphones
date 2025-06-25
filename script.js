let currentSlide = 0;
const slides = document.querySelectorAll(".slider-images img");
const dots = document.querySelectorAll(".dot");

// Mostrar la primera imagen al cargar
showSlide(currentSlide);

// Cambia de imagen cuando se hace clic en un punto
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showSlide(i);
  });
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    dots[i].classList.remove("active");
  });
  slides[index].classList.add("active");
  dots[index].classList.add("active");
  currentSlide = index;
}

let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const isMobile = window.innerWidth <= 768; // solo celulares y tablets

  if (!isMobile) return; // si no es celular, no hace nada

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    header.classList.add("oculto");
  } else {
    header.classList.remove("oculto");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('nav ul').classList.toggle('active');
});

// === SLIDER DE CLIENTES ===
let currentCliente = 0;
const clienteTrack = document.querySelector('.slider-clientes-track');
const clienteSlides = document.querySelectorAll('.slider-clientes-track img');
const clienteDots = document.querySelectorAll('.dot-cliente');
const prevBtn = document.querySelector('.cliente-btn.prev');
const nextBtn = document.querySelector('.cliente-btn.next');

function updateClienteSlider() {
  clienteTrack.style.transform = `translateX(-${currentCliente * 100}%)`;
  clienteDots.forEach(dot => dot.classList.remove('active'));
  clienteDots[currentCliente].classList.add('active');
}

prevBtn?.addEventListener('click', () => {
  currentCliente = (currentCliente - 1 + clienteSlides.length) % clienteSlides.length;
  updateClienteSlider();
});

nextBtn?.addEventListener('click', () => {
  currentCliente = (currentCliente + 1) % clienteSlides.length;
  updateClienteSlider();
});

clienteDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentCliente = index;
    updateClienteSlider();
  });
});

// Swipe para celulares
let startX = 0;

clienteTrack?.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

clienteTrack?.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    nextBtn?.click();
  } else if (endX - startX > 50) {
    prevBtn?.click();
  }
});
