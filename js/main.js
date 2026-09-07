// FORMULARIO DE CONTACTO
// Este archivo solo revisa los datos y guarda la consulta en el navegador.
// No existe un servidor, por eso no se envía un correo real.

const formulario = document.getElementById("contact-form");
const mensaje = document.getElementById("contact-message-result");

formulario.addEventListener("submit", function (evento) {
    // Evita que la página se recargue al enviar el formulario.
    evento.preventDefault();

    // Guardamos en variables lo que escribió la persona.
    const nombre = document.getElementById("contact-name").value.trim();
    const correo = document.getElementById("contact-email").value.trim();
    const telefono = document.getElementById("contact-phone").value.trim();
    const motivo = document.getElementById("contact-subject").value;
    const texto = document.getElementById("contact-message").value.trim();

    // Revisamos que los campos importantes tengan información.
    if (nombre === "" || correo === "" || motivo === "" || texto === "") {
        mensaje.textContent = "Completa los campos obligatorios.";
        mensaje.className = "form-message error-message";
        return;
    }

    // Revisión muy simple del correo.
    if (correo.includes("@") === false || correo.includes(".") === false) {
        mensaje.textContent = "Escribe un correo válido.";
        mensaje.className = "form-message error-message";
        return;
    }

    // Recuperamos las consultas anteriores si existen.
    let consultas = [];
    const guardadas = localStorage.getItem("vet_contact_messages");

    if (guardadas !== null) {
        consultas = JSON.parse(guardadas);
    }

    // Agregamos la nueva consulta a la lista.
    consultas.push({
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        motivo: motivo,
        mensaje: texto
    });

    // Guardamos la lista completa en el navegador.
    localStorage.setItem("vet_contact_messages", JSON.stringify(consultas));

    mensaje.textContent = "Consulta registrada correctamente.";
    mensaje.className = "form-message success";
    formulario.reset();
});
