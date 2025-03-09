// --------------------
// Funciones del Carrito
// --------------------

// Función para añadir un producto al carrito
function addToCart(name, price) {
  // Recuperamos el carrito actual desde Local Storage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Añadimos el nuevo producto al carrito
  cart.push({ name, price });

  // Guardamos el carrito actualizado en Local Storage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Alertamos al usuario
  alert(`${name} ha sido añadido al carrito.`);
}

// Función para actualizar el contador del carrito en tiempo real
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('carrito-count').innerText = cart.length;
}

// Inicializa el contador del carrito al cargar la página
document.addEventListener('DOMContentLoaded', updateCartCount);

// --------------------
// Funciones del Carrusel
// --------------------

// Seleccionamos el contenedor del carrusel
const carousel = document.querySelector('.carousel-container');
let scrollPosition = 0; // Posición inicial del scroll
const scrollStep = 300; // Cantidad de píxeles para desplazarse cada vez
const scrollInterval = 3000; // Intervalo de tiempo entre desplazamientos

// Función para desplazar automáticamente el carrusel
function autoScrollCarousel() {
  scrollPosition += scrollStep;
  if (scrollPosition >= carousel.scrollWidth) {
    scrollPosition = 0; // Reinicia el scroll al principio
  }
  carousel.scrollTo({
    left: scrollPosition,
    behavior: 'smooth',
  });
}

// Activa el desplazamiento automático del carrusel
setInterval(autoScrollCarousel, scrollInterval);

// Función para desplazar el carrusel manualmente
function scrollCarousel(direction) {
  if (direction === 'prev') {
    scrollPosition -= scrollStep;
    if (scrollPosition < 0) {
      scrollPosition = carousel.scrollWidth - carousel.offsetWidth; // Va al final
    }
  } else if (direction === 'next') {
    scrollPosition += scrollStep;
    if (scrollPosition >= carousel.scrollWidth) {
      scrollPosition = 0; // Reinicia al principio
    }
  }
  carousel.scrollTo({
    left: scrollPosition,
    behavior: 'smooth',
  });
}

// --------------------
// Eventos de Botones del Carrusel
// --------------------

// Botón de retroceso
document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
  scrollCarousel('prev');
});

// Botón de avance
document.querySelector('.carousel-btn.next').addEventListener('click', () => {
  scrollCarousel('next');
});
