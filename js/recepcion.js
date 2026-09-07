// PANEL DE RECEPCIÓN
// Muestra citas, pacientes y servicios.
// También guarda un paciente nuevo y cambia el estado de una cita.

function mostrarCitas() {
  const tabla1 = document.getElementById("tabla-citas-resumen");
  const tabla2 = document.getElementById("tabla-citas");
  const buscador = document.getElementById("buscador-citas");
  const texto = buscador ? buscador.value.toLowerCase() : "";

  if (tabla1) {
    tabla1.innerHTML = "";
  }
  if (tabla2) {
    tabla2.innerHTML = "";
  }

  for (let i = 0; i < datos.appointments.length; i = i + 1) {
    const cita = datos.appointments[i];
    const paciente = buscarPaciente(cita.pacienteId);
    let nombre = "—";
    let dueno = "—";
    if (paciente) {
      nombre = paciente.nombre;
      dueno = paciente.responsable;
    }

    const fila = "<td>" + (cita.fecha || "—") + "</td>" +
      "<td>" + cita.hora + "</td>" +
      "<td>" + nombre + "</td>" +
      "<td>" + dueno + "</td>" +
      "<td>" + cita.servicio + "</td>" +
      "<td>" + cita.estado + "</td>";

    if (tabla1) {
      tabla1.innerHTML = tabla1.innerHTML + "<tr>" + fila + "</tr>";
    }

    const mezcla = (nombre + " " + dueno + " " + cita.servicio).toLowerCase();
    if (tabla2 && mezcla.indexOf(texto) !== -1) {
      tabla2.innerHTML = tabla2.innerHTML +
        "<tr>" + fila +
        "<td><button class='btn btn-soft btn-small' type='button' onclick=\"elegirCita('" + cita.id + "')\">Gestionar</button></td>" +
        "</tr>";
    }
  }
}

function elegirCita(id) {
  document.getElementById("appointment-select").value = id;
  mostrarSeccion("appointments", "Citas");
}

function llenarSelectCitas() {
  const select = document.getElementById("appointment-select");
  if (!select) {
    return;
  }
  select.innerHTML = "<option value=''>Selecciona una cita</option>";
  for (let i = 0; i < datos.appointments.length; i = i + 1) {
    const cita = datos.appointments[i];
    const paciente = buscarPaciente(cita.pacienteId);
    let nombre = "Paciente";
    if (paciente) {
      nombre = paciente.nombre;
    }
    select.innerHTML = select.innerHTML +
      "<option value='" + cita.id + "'>" + cita.fecha + " " + cita.hora + " · " + nombre + "</option>";
  }
}

function mostrarPacientes() {
  const tabla = document.getElementById("tabla-pacientes");
  const buscador = document.getElementById("buscador-pacientes");
  if (!tabla) {
    return;
  }
  const texto = buscador ? buscador.value.toLowerCase() : "";
  tabla.innerHTML = "";
  for (let i = 0; i < datos.patients.length; i = i + 1) {
    const p = datos.patients[i];
    const mezcla = (p.nombre + " " + p.especie + " " + p.responsable).toLowerCase();
    let tecnico = "Sin asignar";
    if (p.tecnico) {
      tecnico = p.tecnico;
    }
    if (mezcla.indexOf(texto) !== -1) {
      tabla.innerHTML = tabla.innerHTML +
        "<tr><td>" + p.nombre + "</td><td>" + p.especie + "</td><td>" + p.raza +
        "</td><td>" + p.edad + "</td><td>" + p.responsable + "</td><td>" + p.telefono +
        "</td><td>" + tecnico + "</td></tr>";
    }
  }
}

function llenarSelectAsignar() {
  const select = document.getElementById("asig-paciente");
  select.innerHTML = "<option value=''>Selecciona</option>";
  for (let i = 0; i < datos.patients.length; i = i + 1) {
    const p = datos.patients[i];
    let extra = "";
    if (p.tecnico) {
      extra = " · " + p.tecnico;
    }
    select.innerHTML = select.innerHTML +
      "<option value='" + p.id + "'>" + p.nombre + extra + "</option>";
  }
  llenarSelectTecnicos("asig-tecnico");
  llenarSelectTecnicos("new-tecnico");
}

function mostrarServicios() {
  const tabla = document.getElementById("tabla-servicios");
  const buscador = document.getElementById("buscador-servicios");
  const filtro = document.getElementById("filtro-servicios");
  if (!tabla) {
    return;
  }
  const texto = buscador ? buscador.value.toLowerCase() : "";
  const categoria = filtro ? filtro.value : "";
  tabla.innerHTML = "";
  for (let i = 0; i < datos.services.length; i = i + 1) {
    const s = datos.services[i];
    const mezcla = (s.codigo + " " + s.nombre + " " + s.categoria).toLowerCase();
    if (mezcla.indexOf(texto) !== -1 && (categoria === "" || s.categoria === categoria)) {
      tabla.innerHTML = tabla.innerHTML +
        "<tr><td>" + s.codigo + "</td><td>" + s.categoria + "</td><td>" + s.nombre +
        "</td><td>" + s.especie + "</td><td>" + s.duracion + "</td><td>" + dinero(s.precio) + "</td></tr>";
    }
  }
}

function llenarFiltroServicios() {
  const filtro = document.getElementById("filtro-servicios");
  if (!filtro) {
    return;
  }
  const vistas = {};
  for (let i = 0; i < datos.services.length; i = i + 1) {
    const categoria = datos.services[i].categoria;
    if (!vistas[categoria]) {
      vistas[categoria] = true;
      filtro.innerHTML = filtro.innerHTML + "<option value='" + categoria + "'>" + categoria + "</option>";
    }
  }
}

document.getElementById("n-citas").textContent = datos.appointments.length;
document.getElementById("n-promedio").textContent = datos.clinic.pacientesPromedioDia;
document.getElementById("n-servicios").textContent = datos.services.length;
document.getElementById("n-inasistencia").textContent = datos.clinic.inasistenciaPorcentaje;

llenarFiltroServicios();
llenarSelectCitas();
llenarSelectAsignar();
mostrarCitas();
mostrarPacientes();
mostrarServicios();

document.getElementById("buscador-citas").oninput = mostrarCitas;
document.getElementById("buscador-pacientes").oninput = mostrarPacientes;
document.getElementById("buscador-servicios").oninput = mostrarServicios;
document.getElementById("filtro-servicios").onchange = mostrarServicios;

document.getElementById("asig-form").onsubmit = function (evento) {
  evento.preventDefault();
  const id = document.getElementById("asig-paciente").value;
  const tecnico = document.getElementById("asig-tecnico").value;
  const paciente = buscarPaciente(id);
  if (!paciente) {
    this.reportValidity();
    return;
  }
  paciente.tecnico = tecnico;
  saveClinicList("patients");
  llenarSelectAsignar();
  mostrarPacientes();
  avisar("Técnico asignado.");
  this.getElementsByClassName("form-message")[0].textContent = "Técnico asignado. El técnico lo ve en su panel.";
  this.getElementsByClassName("form-message")[0].className = "form-message success";
};

document.getElementById("appointment-form").onsubmit = function (evento) {
  evento.preventDefault();
  const id = document.getElementById("appointment-select").value;
  const accion = document.getElementById("appointment-action").value;
  const hora = document.getElementById("appointment-new-time").value;
  if (id === "" || accion === "") {
    this.reportValidity();
    return;
  }
  for (let i = 0; i < datos.appointments.length; i = i + 1) {
    if (datos.appointments[i].id === id) {
      datos.appointments[i].estado = accion;
      if (hora !== "") {
        datos.appointments[i].hora = hora;
      }
    }
  }
  saveClinicList("appointments");
  llenarSelectCitas();
  mostrarCitas();
  avisar("Cita actualizada.");
  this.getElementsByClassName("form-message")[0].textContent = "Cita actualizada.";
  this.getElementsByClassName("form-message")[0].className = "form-message success";
};

document.getElementById("new-patient-form").onsubmit = function (evento) {
  evento.preventDefault();
  const nombre = document.getElementById("new-pet-name").value;
  const dueno = document.getElementById("new-owner").value;
  const especie = document.getElementById("new-species").value;
  const raza = document.getElementById("new-breed").value;
  const edad = document.getElementById("new-age").value;
  const telefono = document.getElementById("new-phone").value;
  if (nombre === "" || dueno === "" || especie === "" || raza === "" || edad === "" || telefono === "") {
    this.reportValidity();
    return;
  }
  let emoji = "🐶";
  if (especie === "Gato") {
    emoji = "🐱";
  }
  if (especie === "Ave") {
    emoji = "🐦";
  }
  if (especie === "Conejo") {
    emoji = "🐰";
  }
  datos.patients.push({
    id: "p" + Date.now(),
    nombre: nombre,
    emoji: emoji,
    especie: especie,
    raza: raza,
    edad: edad,
    sexo: "Sin registrar",
    peso: "Sin registrar",
    responsable: dueno,
    telefono: telefono,
    motivoActual: "Ingreso en recepción",
    tecnico: document.getElementById("new-tecnico").value,
    vacunas: [],
    historial: []
  });
  saveClinicList("patients");
  llenarSelectAsignar();
  mostrarPacientes();
  avisar("Paciente guardado.");
  this.reset();
  this.getElementsByClassName("form-message")[0].textContent = "Paciente guardado. Se ve en los otros paneles.";
  this.getElementsByClassName("form-message")[0].className = "form-message success";
};
