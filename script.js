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
});
