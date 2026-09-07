// INICIO DE SESIÓN DE EJEMPLO
// Como no hay backend, cualquier correo y contraseña válidos pueden entrar.

const formulario = document.getElementById("login-form");
const mensaje = document.getElementById("login-message");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const correo = document.getElementById("email").value.trim();
    const clave = document.getElementById("password").value.trim();
    const rol = document.getElementById("role").value;

    // Primero revisamos que no falte ningún dato.
    if (correo === "" || clave === "" || rol === "") {
        mensaje.textContent = "Completa todos los campos.";
        mensaje.className = "form-message error-message";
        return;
    }

    // Revisión básica del correo.
    if (correo.includes("@") === false || correo.includes(".") === false) {
        mensaje.textContent = "Escribe un correo válido.";
        mensaje.className = "form-message error-message";
        return;
    }

    // La contraseña debe tener al menos 6 caracteres.
    if (clave.length < 6) {
        mensaje.textContent = "La contraseña debe tener al menos 6 caracteres.";
        mensaje.className = "form-message error-message";
        return;
    }

    // Guardamos el rol y correo solo mientras la pestaña esté abierta.
    sessionStorage.setItem("vetEmail", correo);
    sessionStorage.setItem("vetRole", rol);

    // Según el rol se abre una página diferente.
    if (rol === "admin") {
        window.location.href = "admin.html";
    } else if (rol === "recepcion") {
        window.location.href = "recepcion.html";
    } else if (rol === "veterinario") {
        window.location.href = "veterinario.html";
    } else if (rol === "tecnico") {
        window.location.href = "tecnico.html";
    } else {
        window.location.href = "cliente.html";
    }
});
