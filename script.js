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

// 🛒 Funcionalidad del carrito

const carrito = [];

const botonesAgregar = document.querySelectorAll(".agregar-carrito");
const contador = document.getElementById("carrito-contador");
const listaCarrito = document.getElementById("carrito-lista");
const panel = document.getElementById("carrito-panel");
const botonPedido = document.getElementById("hacer-pedido");

// Mostrar/Ocultar panel
const iconoCarrito = document.getElementById("carrito-icono");
if (iconoCarrito) {
  iconoCarrito.addEventListener("click", () => {
    panel.classList.toggle("active");
    renderizarCarrito();
  });
}

// Agregar productos
botonesAgregar.forEach((boton) => {
  boton.addEventListener("click", () => {
    const nombre = boton.dataset.nombre;
    mostrarMensajeAgregado();
    carrito.push(nombre);
    actualizarContador();
    renderizarCarrito();
  });
});

// Actualizar número del carrito
function actualizarContador() {
  contador.textContent = carrito.length;
}

// Mostrar productos en el panel
function renderizarCarrito() {
  listaCarrito.innerHTML = "";

  carrito.forEach((producto, index) => {
    const li = document.createElement("li");
    li.textContent = producto;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.classList.add("btn-eliminar");
    btnEliminar.onclick = () => {
      carrito.splice(index, 1);
      actualizarContador();
      renderizarCarrito();
    };

    li.appendChild(btnEliminar);
    listaCarrito.appendChild(li);
  });

  botonPedido.disabled = carrito.length === 0;
}

// Enviar pedido por WhatsApp
botonPedido.addEventListener("click", () => {
  if (carrito.length === 0) return;

  const mensaje = `¡Hola Zemax! Me gustaría realizar el siguiente pedido:\n\n` +
    carrito.map((producto) => `- ${producto}`).join("\n") +
    "\n\nQuedo atento a su respuesta. ¡Gracias!";

  const url = `https://wa.me/5491122708465?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
});

document.getElementById("cerrar-panel").addEventListener("click", () => {
  document.getElementById("carrito-panel").classList.remove("active");
});

function mostrarMensajeAgregado() {
  const mensaje = document.getElementById("mensaje-agregado");
  mensaje.classList.add("mostrar");
  setTimeout(() => {
    mensaje.classList.remove("mostrar");
  }, 2500);
}

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('nav ul').classList.remove('active');
  });
});

// Cerrar menú si clickeas fuera del menú (solo en móvil)
document.addEventListener('click', (e) => {
  const menu = document.querySelector('nav ul');
  const toggle = document.querySelector('.menu-toggle');

  if (!menu.contains(e.target) && !toggle.contains(e.target)) {
    menu.classList.remove('active');
  }
});


