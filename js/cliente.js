// PANEL DEL CLIENTE
// En esta demostración siempre se muestran las mascotas de Camila Rojas.
// FALTA: un servidor que busque las mascotas según el correo.

function mascotasDeCamila() {
  const lista = [];
  for (let i = 0; i < datos.patients.length; i = i + 1) {
    if (datos.patients[i].responsable === "Camila Rojas") {
      lista.push(datos.patients[i]);
    }
  }
  return lista;
}

function citasDeCamila() {
  const mascotas = mascotasDeCamila();
  const lista = [];
  for (let i = 0; i < datos.appointments.length; i = i + 1) {
    for (let j = 0; j < mascotas.length; j = j + 1) {
      if (datos.appointments[i].pacienteId === mascotas[j].id) {
        lista.push(datos.appointments[i]);
      }
    }
  }
  return lista;
}

function mostrarCliente() {
  const mascotas = mascotasDeCamila();
  const citas = citasDeCamila();

  document.getElementById("n-mascotas").textContent = mascotas.length;
  document.getElementById("n-citas").textContent = citas.length;
  document.getElementById("n-servicios").textContent = datos.services.length;
  document.getElementById("n-vacunas").textContent = contarVacunas();

  if (mascotas.length > 0) {
    document.getElementById("client-home-pet-emoji").textContent = mascotas[0].emoji;
    document.getElementById("client-home-pet-name").textContent = mascotas[0].nombre;
    document.getElementById("client-home-pet-data").textContent =
      mascotas[0].especie + " · " + mascotas[0].raza + " · " + mascotas[0].edad;
  }

  const proxima = document.getElementById("client-next-appointment");
  proxima.innerHTML = "";
  let ultima = null;
  for (let i = 0; i < citas.length; i = i + 1) {
    if (citas[i].estado !== "Cancelada") {
      ultima = citas[i];
    }
  }
  if (ultima) {
    const paciente = buscarPaciente(ultima.pacienteId);
    document.getElementById("client-next-status").textContent = ultima.estado;
    proxima.innerHTML =
      "<div class='quick-item'><span>Mascota</span><strong>" + (paciente ? paciente.nombre : "—") + "</strong></div>" +
      "<div class='quick-item'><span>Fecha</span><strong>" + ultima.fecha + "</strong></div>" +
      "<div class='quick-item'><span>Hora</span><strong>" + ultima.hora + "</strong></div>" +
      "<div class='quick-item'><span>Servicio</span><strong>" + ultima.servicio + "</strong></div>";
  }

  const grilla = document.getElementById("client-pets-grid");
  grilla.innerHTML = "";
  for (let i = 0; i < mascotas.length; i = i + 1) {
    const p = mascotas[i];
    grilla.innerHTML = grilla.innerHTML +
      "<article class='panel'><div class='patient-summary'><div class='patient-avatar'>" + p.emoji +
      "</div><div><p class='eyebrow'>Mascota</p><h2>" + p.nombre + "</h2><p class='muted'>" +
      p.especie + " · " + p.raza + " · " + p.edad + "</p></div></div></article>";
  }

  const tablaCitas = document.getElementById("client-appointments-table");
  tablaCitas.innerHTML = "";
  for (let i = 0; i < citas.length; i = i + 1) {
    const paciente = buscarPaciente(citas[i].pacienteId);
    tablaCitas.innerHTML = tablaCitas.innerHTML +
      "<tr><td>" + (paciente ? paciente.nombre : "—") + "</td><td>" + citas[i].fecha +
      "</td><td>" + citas[i].hora + "</td><td>" + citas[i].servicio +
      "</td><td>" + citas[i].estado + "</td></tr>";
  }

  const vacunas = document.getElementById("client-vaccines");
  vacunas.innerHTML = "";
  for (let i = 0; i < mascotas.length; i = i + 1) {
    vacunas.innerHTML = vacunas.innerHTML + "<h3>" + mascotas[i].nombre + "</h3>";
    for (let j = 0; j < mascotas[i].vacunas.length; j = j + 1) {
      const v = mascotas[i].vacunas[j];
      vacunas.innerHTML = vacunas.innerHTML +
        "<div class='vaccine-row'><strong>" + v.nombre + "</strong><span>" + v.fecha +
        "</span><span>" + v.proxima + "</span><span class='status'>" + v.estado + "</span></div>";
    }
  }

  const selectMascota = document.getElementById("client-pet");
  selectMascota.innerHTML = "<option value=''>Selecciona</option>";
  for (let i = 0; i < mascotas.length; i = i + 1) {
    selectMascota.innerHTML = selectMascota.innerHTML +
      "<option value='" + mascotas[i].id + "'>" + mascotas[i].nombre + "</option>";
  }

  const selectServicio = document.getElementById("client-service");
  selectServicio.innerHTML = "<option value=''>Selecciona</option>";
  for (let i = 0; i < datos.services.length; i = i + 1) {
    selectServicio.innerHTML = selectServicio.innerHTML +
      "<option value='" + datos.services[i].nombre + "'>" + datos.services[i].nombre + "</option>";
  }
}

function mostrarServiciosCliente() {
  const tabla = document.getElementById("tabla-servicios");
  const buscador = document.getElementById("buscador-servicios");
  const filtro = document.getElementById("filtro-servicios");
  const texto = buscador.value.toLowerCase();
  const categoria = filtro.value;
  tabla.innerHTML = "";
  for (let i = 0; i < datos.services.length; i = i + 1) {
    const s = datos.services[i];
    const mezcla = (s.nombre + " " + s.categoria).toLowerCase();
    if (mezcla.indexOf(texto) !== -1 && (categoria === "" || s.categoria === categoria)) {
      tabla.innerHTML = tabla.innerHTML +
        "<tr><td>" + s.categoria + "</td><td>" + s.nombre + "</td><td>" + s.especie +
        "</td><td>" + s.duracion + "</td><td>" + dinero(s.precio) + "</td></tr>";
    }
  }
}

mostrarCliente();
mostrarServiciosCliente();

const filtro = document.getElementById("filtro-servicios");
const vistas = {};
for (let i = 0; i < datos.services.length; i = i + 1) {
  const categoria = datos.services[i].categoria;
  if (!vistas[categoria]) {
    vistas[categoria] = true;
    filtro.innerHTML = filtro.innerHTML + "<option value='" + categoria + "'>" + categoria + "</option>";
  }
}

document.getElementById("buscador-servicios").oninput = mostrarServiciosCliente;
document.getElementById("filtro-servicios").onchange = mostrarServiciosCliente;

document.getElementById("client-appointment-form").onsubmit = function (evento) {
  evento.preventDefault();
  const errorMascota = document.getElementById("client-pet-error");
  const errorServicio = document.getElementById("client-service-error");
  const errorFecha = document.getElementById("client-date-error");
  errorMascota.textContent = "";
  errorServicio.textContent = "";
  errorFecha.textContent = "";
  const mascota = document.getElementById("client-pet").value;
  const servicio = document.getElementById("client-service").value;
  const fecha = document.getElementById("client-date").value;
  let listo = true;
  if (mascota === "") {
    errorMascota.textContent = "Elige una mascota.";
    listo = false;
  }
  if (servicio === "") {
    errorServicio.textContent = "Elige un servicio.";
    listo = false;
  }
  if (fecha === "") {
    errorFecha.textContent = "Elige una fecha.";
    listo = false;
  }
  if (listo === false) {
    this.getElementsByClassName("form-message")[0].textContent = "Revisa los datos.";
    this.getElementsByClassName("form-message")[0].className = "form-message error-message";
    return;
  }
  datos.appointments.push({
    id: "c" + Date.now(),
    fecha: fechaBonita(fecha),
    hora: "09:00",
    pacienteId: mascota,
    servicio: servicio,
    estado: "Pendiente"
  });
  saveClinicList("appointments");
  mostrarCliente();
  this.reset();
  avisar("Cita solicitada.");
  this.getElementsByClassName("form-message")[0].textContent = "Cita solicitada. Queda pendiente.";
  this.getElementsByClassName("form-message")[0].className = "form-message success";
};
