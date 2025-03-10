const carrito = [];
const carritoCount = document.getElementById('carrito-count');
const botonesAgregar = document.querySelectorAll('.agregar-carrito');
const carritoModal = document.getElementById('carrito-modal');
const carritoItems = document.getElementById('carrito-items');
const comprarWhatsapp = document.getElementById('comprar-whatsapp');
const cerrarModal = document.querySelector('.close');

botonesAgregar.forEach(boton => {
    boton.addEventListener('click', (event) => {
        const producto = event.target.closest('.producto');
        if (producto) {
            const nombre = producto.dataset.name;
            const precio = parseInt(producto.dataset.price);

            carrito.push({ nombre, precio });
            actualizarCarrito();
        }
    });
});

function actualizarCarrito() {
    carritoCount.textContent = carrito.length;
    mostrarCarrito();
}

function actualizarTotalCarrito() {
    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio;
    });
    const totalElement = document.getElementById('total-carrito');
    if (!totalElement) {
        const totalElement = document.createElement('p');
        totalElement.id = 'total-carrito';
        carritoModal.querySelector('ul').insertAdjacentElement('afterend', totalElement);
    }
    totalElement.textContent = `Total: $${total}`;
}

function mostrarCarrito() {
    carritoItems.innerHTML = '';
    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        carritoItems.appendChild(li);
    });
    actualizarTotalCarrito();
}

document.querySelector('.carrito').addEventListener('click', () => {
    carritoModal.style.display = 'block';
    mostrarCarrito();
});

cerrarModal.addEventListener('click', () => {
    carritoModal.style.display = 'none';
});

comprarWhatsapp.addEventListener('click', () => {
    const nombreCliente = document.getElementById('nombre-cliente').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;

    if (!nombreCliente || !direccion || !telefono) {
        alert('Por favor, ingresa el nombre, la dirección y el teléfono.');
        return;
    }

    let mensaje = 'Pedido de Helados Delicias:\n';
    mensaje += `Nombre del Cliente: ${nombreCliente}\n`;
    carrito.forEach(producto => {
        mensaje += `- ${producto.nombre} - $${producto.precio}\n`;
    });
    mensaje += `\nDirección: ${direccion}\nTeléfono: ${telefono}`;

    const mensajeWhatsApp = encodeURIComponent(mensaje);
    window.location.href = `https://wa.me/+573155445183?text=${mensajeWhatsApp}`;
});
