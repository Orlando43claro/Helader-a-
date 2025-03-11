const carrito = [];
const carritoCount = document.getElementById('carrito-count');
const botonesAgregar = document.querySelectorAll('.agregar-carrito');
const carritoModal = document.getElementById('carrito-modal');
const carritoItems = document.getElementById('carrito-items');
const comprarWhatsapp = document.getElementById('comprar-whatsapp');
const cerrarModal = document.querySelector('.close');
const modalMensaje = document.createElement('div'); // Crear modal de mensaje
modalMensaje.classList.add('modal');
modalMensaje.innerHTML = `
    <div class="modal-content">
        <span class="close-mensaje">&times;</span>
        <p id="mensaje-texto"></p>
    </div>
`;
document.body.appendChild(modalMensaje);
const cerrarMensaje = modalMensaje.querySelector('.close-mensaje');

cerrarMensaje.addEventListener('click', () => {
    modalMensaje.style.display = 'none';
});

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
    return total; // Devolvemos el total
}

function mostrarCarrito() {
    carritoItems.innerHTML = '';
    if (carrito.length === 0) {
        carritoItems.innerHTML = '<li>El carrito está vacío.</li>'; // Mostrar mensaje de carrito vacío
        const totalElement = document.getElementById('total-carrito');
        if (totalElement) {
            totalElement.textContent = ''; // Limpiar el total si el carrito está vacío
        }
        return;
    }
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
    const total = actualizarTotalCarrito(); // Obtener el total

    if (!nombreCliente || !direccion || !telefono) {
        mostrarMensaje('Por favor, ingresa todos los campos.');
        return;
    }

    let mensaje = 'Pedido de Helados Delicias:\n';
    mensaje += `Nombre del Cliente: ${nombreCliente}\n`;
    carrito.forEach(producto => {
        mensaje += `- ${producto.nombre} - $${producto.precio}\n`;
    });
    mensaje += `\nTotal: $${total}\n`; // Agregar el total al mensaje
    mensaje += `\nDirección: ${direccion}\nTeléfono: ${telefono}`;

    const mensajeWhatsApp = encodeURIComponent(mensaje);
    window.location.href = `https://wa.me/+573155445183?text=${mensajeWhatsApp}`;

    // Vaciar el carrito después de realizar el pedido
    carrito.length = 0;
    actualizarCarrito();
});

function mostrarMensaje(mensaje) {
    document.getElementById('mensaje-texto').textContent = mensaje;
    modalMensaje.style.display = 'block';
}
