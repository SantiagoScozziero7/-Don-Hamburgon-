document.addEventListener("DOMContentLoaded", ()=>{
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const email = document.getElementById("email");
    const password = document.getElementById("password")
    const genero = document.getElementById("genero");
    const terminos = document.getElementById("terminos");


    const errNombre = document.getElementById("nombre-error");
    const errApellido = document.getElementById("apellido-error");
    const errEmail = document.getElementById("email-error");
    const errPassword = document.getElementById("password-error");
    const errGenero = document.getElementById("genero-error");
    const errTerminos = document.getElementById("terminos-error");


    const mostrarError = (element,mensaje)=>{
        element.textContent = mensaje;
    }

    const ocultarError = (element) =>{
        element.textContent = "";
    }

    const validateNombre = ()=>{
        const value = nombre.value.trim();

        if(value.length < 4){
            mostrarError(errNombre, "Ingrese un nombre con mas de 4 letras");
            return false;
        }
        ocultarError(errNombre);
        return true;
    }

    const validateApellido = ()=>{
        const value = apellido.value.trim();

        if(value.length < 4){
            mostrarError(errApellido, "Ingrese un apellido con mas de 4 letras");
            return false;
        }
        ocultarError(errApellido);
        return true;
    }

    const validateEmail = () => {
        const value = email.value.trim()
        const expresionRegular = /^[^\s@]+@[^\s@]+.[^\s@]+$/

        if (!value || !expresionRegular.test(value)) {

            mostrarError(errEmail, "El email debe tener el siguiente formato nombre@dominio.com")

            return false
        }

        ocultarError(errEmail)
        return true

    }

        const validatePassword = () => {
        const value = password.value.trim();
        if (value.length < 6) {
            mostrarError(errPassword, "La contraseña debe tener al menos 6 caracteres");
            return false;
        }
        ocultarError(errPassword);
        return true;
    }

    const validateGenero = () => {
        const value = genero.value;
        if (!value) {
            mostrarError(errGenero, "Seleccione un género");
            return false;
        }
        ocultarError(errGenero);
        return true;
    }

    const validateTerminos = () => {
        if (!terminos.checked) {
            mostrarError(errTerminos, "Debe aceptar los términos y condiciones");
            return false;
        }
        ocultarError(errTerminos);
        return true;
    }

    const form = document.getElementById("registroForm");
    const successMessage = document.getElementById("success-message");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const isValid = validateNombre() && validateApellido() && validateEmail() && validatePassword() && validateGenero() && validateTerminos();
        if (isValid) {
            successMessage.textContent = "Registro exitoso";
            form.reset();
        } else {
            successMessage.textContent = "";
        }
    });

    
let carrito = [];
const productos = [
    {
        id: 1,
        nombre: "Hamburguesa 01",
        precio: 1000,
        imagen: "images/HamburgonPremium3.avif"
    },
    {
        id: 2,
        nombre: "Hamburguesa 02",
        precio: 1000,
        imagen: "images/HamburgonBBQ.jpeg"
    }
];

// Elementos del DOM
const contenedorCarrito = document.querySelector('.carrito-productos');
const contenedorTotal = document.querySelector('#total');
const btnVaciar = document.querySelector('.carrito-acciones-vaciar');
const btnComprar = document.querySelector('.carrito-acciones-comprar');
const mensajeVacio = document.querySelector('.carrito-vacio');
const contadorCarrito = document.querySelector('.numerito');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();
    renderizarCarrito();
});

btnVaciar.addEventListener('click', vaciarCarrito);
btnComprar.addEventListener('click', comprarCarrito);

// Funciones principales
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function renderizarCarrito() {
    // Limpiar el carrito antes de renderizar
    contenedorCarrito.innerHTML = '';

    if (carrito.length === 0) {
        mensajeVacio.style.display = 'block';
        contenedorTotal.textContent = '$0';
        contadorCarrito.textContent = '0';
        return;
    }

    mensajeVacio.style.display = 'none';

    carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('carrito-producto');
        div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
            <div class="carrito-producto-nombre">
                <small>Título</small>
                <h3>${producto.nombre}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" data-id="${producto.id}">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        contenedorCarrito.appendChild(div);
    });

    // Agregar event listeners a los botones de eliminar
    document.querySelectorAll('.carrito-producto-eliminar').forEach(btn => {
        btn.addEventListener('click', eliminarProducto);
    });

    actualizarTotal();
    actualizarContador();
}

function actualizarTotal() {
    const total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    contenedorTotal.textContent = `$${total}`;
}

function actualizarContador() {
    const totalItems = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    contadorCarrito.textContent = totalItems;
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const productoEnCarrito = carrito.find(p => p.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }

    guardarCarrito();
    renderizarCarrito();
}

function eliminarProducto(e) {
    const id = Number(e.currentTarget.dataset.id);
    carrito = carrito.filter(producto => producto.id !== id);
    guardarCarrito();
    renderizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    renderizarCarrito();
}

function comprarCarrito() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    // Aquí iría la lógica para procesar la compra
    alert('¡Compra realizada con éxito!');
    vaciarCarrito();
}

// Función para agregar productos desde otra página (ejemplo)
function agregarProductoDesdeOtraPagina(id) {
    agregarAlCarrito(id);
    renderizarCarrito();
}

});
