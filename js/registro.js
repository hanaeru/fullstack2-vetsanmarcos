// REGISTRO DE EJEMPLO
// Solo valida el formulario. No crea un usuario real porque no hay backend.

const formulario = document.getElementById("registro-form");
const mensaje = document.getElementById("registro-message");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("email").value.trim();
    const clave = document.getElementById("password").value;
    const repetirClave = document.getElementById("password2").value;

    if (nombre === "" || correo === "" || clave === "" || repetirClave === "") {
        mensaje.textContent = "Completa todos los campos.";
        mensaje.className = "form-message error-message";
        return;
    }

    if (correo.includes("@") === false || correo.includes(".") === false) {
        mensaje.textContent = "Escribe un correo válido.";
        mensaje.className = "form-message error-message";
        return;
    }

    if (clave.length < 6) {
        mensaje.textContent = "La contraseña debe tener al menos 6 caracteres.";
        mensaje.className = "form-message error-message";
        return;
    }

    if (clave !== repetirClave) {
        mensaje.textContent = "Las contraseñas no coinciden.";
        mensaje.className = "form-message error-message";
        return;
    }

    mensaje.textContent = "Registro correcto. Ahora puedes iniciar sesión.";
    mensaje.className = "form-message success";
    formulario.reset();
});
