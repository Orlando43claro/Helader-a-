// Mover el carrusel automáticamente cada 3 segundos
const carousel = document.querySelector('.carousel-container');
let scrollAmount = 0;

setInterval(() => {
  scrollAmount += 300; // Desplazarse 300px
  if (scrollAmount >= carousel.scrollWidth) {
    scrollAmount = 0; // Reinicia al inicio
  }
  carousel.scrollTo({
    left: scrollAmount,
    behavior: 'smooth'
  });
}, 3000);