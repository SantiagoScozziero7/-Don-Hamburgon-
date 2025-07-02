document.addEventListener("DOMContentLoaded", () => {
  // --- Lógica de Validación de Formulario (ya existente, con pequeñas mejoras) ---
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const genero = document.getElementById("genero");
  const terminos = document.getElementById("terminos");

  const errNombre = document.getElementById("nombre-error");
  const errApellido = document.getElementById("apellido-error");
  const errEmail = document.getElementById("email-error");
  const errPassword = document.getElementById("password-error");
  const errGenero = document.getElementById("genero-error");
  const errTerminos = document.getElementById("terminos-error");

  const mostrarError = (element, mensaje) => {
    if (element) element.textContent = mensaje;
  };

  const ocultarError = (element) => {
    if (element) element.textContent = "";
  };

  const validateNombre = () => {
    if (!nombre) return true; // Si el elemento no existe, no validar
    const value = nombre.value.trim();
    if (value.length < 4) {
      mostrarError(errNombre, "Ingrese un nombre con más de 4 letras");
      return false;
    }
    ocultarError(errNombre);
    return true;
  };

  const validateApellido = () => {
    if (!apellido) return true;
    const value = apellido.value.trim();
    if (value.length < 4) {
      mostrarError(errApellido, "Ingrese un apellido con más de 4 letras");
      return false;
    }
    ocultarError(errApellido);
    return true;
  };

  const validateEmail = () => {
    if (!email) return true;
    const value = email.value.trim();
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || !expresionRegular.test(value)) {
      mostrarError(
        errEmail,
        "El email debe tener el formato nombre@dominio.com"
      );
      return false;
    }
    ocultarError(errEmail);
    return true;
  };

  const validatePassword = () => {
    if (!password) return true;
    const value = password.value.trim();
    if (value.length < 6) {
      mostrarError(
        errPassword,
        "La contraseña debe tener al menos 6 caracteres"
      );
      return false;
    }
    ocultarError(errPassword);
    return true;
  };

  const validateGenero = () => {
    if (!genero) return true;
    const value = genero.value;
    if (!value) {
      mostrarError(errGenero, "Seleccione un género");
      return false;
    }
    ocultarError(errGenero);
    return true;
  };

  const validateTerminos = () => {
    if (!terminos) return true;
    if (!terminos.checked) {
      mostrarError(errTerminos, "Debe aceptar los términos y condiciones");
      return false;
    }
    ocultarError(errTerminos);
    return true;
  };

  const registroForm = document.getElementById("registroForm");
  const successMessage = document.getElementById("success-message");

  if (registroForm) {
    // Solo si el formulario existe en la página actual
    registroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const isValid =
        validateNombre() &&
        validateApellido() &&
        validateEmail() &&
        validatePassword() &&
        validateGenero() &&
        validateTerminos();
      if (isValid) {
        if (successMessage) successMessage.textContent = "Registro exitoso";
        registroForm.reset();
      } else {
        if (successMessage) successMessage.textContent = "";
      }
    });
  }

  // --- Lógica del Carrito de Compras ---
  let carrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

  const productos = [
    {
      id: "hamburgon-clasico",
      nombre: "Hamburgon Clásico",
      precio: 8000,
      imagen: "/static/images/HamburgonClasico2.png",
    },
    {
      id: "hamburgon-cheddar",
      nombre: "Hamburgon con Cheddar",
      precio: 9500,
      imagen: "/static/images/HamburgonDobleConCheddar.png",
    },
    {
      id: "hamburgon-bbq",
      nombre: "Hamburgon BBQ",
      precio: 9500,
      imagen: "/static/images/HamburgonBBQ3.png",
    },
    {
      id: "hamburgon-vegano",
      nombre: "Hamburgon Vegano",
      precio: 10500,
      imagen: "/static/images/HamburgonVegano.png",
    },
    {
      id: "hamburgon-pollo",
      nombre: "Hamburgon de Pollo",
      precio: 10500,
      imagen: "/static/images/HamburgonPollo.png",
    },
    {
      id: "hamburgon-premium",
      nombre: "Hamburgon Premium",
      precio: 12000,
      imagen: "/static/images/HamburgonPremium.jpg",
    },
    {
      id: "sanguchon-vacio",
      nombre: "Sanguchon de Vacio",
      precio: 9000,
      imagen: "/static/images/SanguchonVacio.jpg",
    },
    {
      id: "sanguchon-bondiola",
      nombre: "Sanguchon de Bondiola",
      precio: 9000,
      imagen: "/static/images/SanguchonBondiola.jpg",
    },
    {
      id: "sanguchon-milanesa",
      nombre: "Sanguchon de Milanesa",
      precio: 7500,
      imagen: "/static/images/SanguchonMilanesa.jpg",
    },
  ];

  const botonesAgregar = document.querySelectorAll(".boton-agregar");
  const contenedorCarritoProductos =
    document.querySelector(".carrito-productos");
  const botonVaciar = document.querySelector(".carrito-acciones-vaciar");
  const contenedorTotal = document.getElementById("total");
  const numerito = document.querySelector(".numerito");
  const carritoVacioMensaje = document.querySelector(".carrito-vacio"); // Nuevo elemento para mensaje de carrito vacío
  const carritoAcciones = document.querySelector(".carrito-acciones"); // Contenedor de acciones del carrito

  function actualizarNumerito() {
    const nuevoNumerito = carrito.reduce(
      (acc, producto) => acc + producto.cantidad,
      0
    );
    if (numerito) {
      numerito.innerText = nuevoNumerito;
    }
  }

  function cargarProductosCarrito() {
    if (carrito.length === 0) {
      if (contenedorCarritoProductos)
        contenedorCarritoProductos.innerHTML = `<p class="carrito-vacio-mensaje">Tu carrito está vacío. ¡Agrega algunos productos!</p>`;
      if (carritoAcciones) carritoAcciones.classList.add("hidden"); // Ocultar acciones si el carrito está vacío
    } else {
      if (contenedorCarritoProductos) {
        contenedorCarritoProductos.innerHTML = ""; // Limpiar antes de renderizar
        carrito.forEach((producto) => {
          const div = document.createElement("div");
          div.classList.add("carrito-producto");
          div.innerHTML = `
                        <img class="carrito-producto-imagen" src="${
                          producto.imagen
                        }" alt="${producto.nombre}">
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
                            <p>$${producto.precio.toLocaleString("es-AR")}</p>
                        </div>
                        <div class="carrito-producto-subtotal">
                            <small>Subtotal</small>
                            <p>$${(
                              producto.precio * producto.cantidad
                            ).toLocaleString("es-AR")}</p>
                        </div>
                        <button class="carrito-producto-eliminar" id="${
                          producto.id
                        }"><i class="fa-solid fa-trash-can"></i></button>
                    `;
          contenedorCarritoProductos.append(div);
        });
      }
      if (carritoAcciones) carritoAcciones.classList.remove("hidden"); // Mostrar acciones si hay productos
    }
    actualizarTotal();
    actualizarBotonesEliminar();
    actualizarNumerito();
  }

  function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(
      (producto) => producto.id === idBoton
    );

    if (productoAgregado) {
      const productoEnCarrito = carrito.find(
        (producto) => producto.id === idBoton
      );

      if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
      } else {
        productoAgregado.cantidad = 1;
        carrito.push(productoAgregado);
      }
      localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
      actualizarNumerito();
      alert(`"${productoAgregado.nombre}" añadido al carrito.`); // Feedback al usuario
    }
  }

  function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    carrito = carrito.filter((producto) => producto.id !== idBoton);
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
    cargarProductosCarrito(); // Recargar el carrito para reflejar los cambios
  }

  function vaciarCarrito() {
    carrito = [];
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
    cargarProductosCarrito();
    alert("El carrito ha sido vaciado.");
  }

  function actualizarTotal() {
    if (contenedorTotal) {
      const totalCalculado = carrito.reduce(
        (acc, producto) => acc + producto.precio * producto.cantidad,
        0
      );
      contenedorTotal.innerText = `$${totalCalculado.toLocaleString("es-AR")}`;
    }
  }

  function actualizarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(
      ".carrito-producto-eliminar"
    );
    botonesEliminar.forEach((boton) => {
      boton.addEventListener("click", eliminarDelCarrito);
    });
  }

  // Event Listeners para botones de agregar al carrito (en páginas de menú)
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });

  // Event Listener para vaciar carrito (en página de carrito)
  if (botonVaciar) {
    botonVaciar.addEventListener("click", vaciarCarrito);
  }

  // Cargar carrito al inicio si estamos en la página del carrito
  if (window.location.pathname.includes("/carrito")) {
    cargarProductosCarrito();
  } else {
    actualizarNumerito();
  }

  //Validacion Inicio de sesión
  const loginForm = document.querySelector("form");
  const usernameInput = loginForm.querySelector("input[type='text']");
  const passwordInput = loginForm.querySelector("input[type='password']");
  const erroresDiv = loginForm.querySelector(".errores");

  loginForm.addEventListener("submit", function (e) {
    erroresDiv.innerHTML = ""; // Limpiar errores anteriores
    let errores = [];

    if (usernameInput.value.trim().length < 3) {
      errores.push("El nombre de usuario debe tener al menos 3 caracteres.");
    }

    if (passwordInput.value.trim().length < 6) {
      errores.push("La contraseña debe tener al menos 6 caracteres.");
    }

    if (errores.length > 0) {
      e.preventDefault(); // Detener el envío
      errores.forEach(function (error) {
        const p = document.createElement("p");
        p.textContent = error;
        erroresDiv.appendChild(p);
      });
    }
  });
});
