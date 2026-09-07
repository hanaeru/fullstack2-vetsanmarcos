// PANEL DEL VETERINARIO
// Muestra citas, pacientes, ficha e inventario.
// La atención nueva se agrega al historial del paciente.

function mostrarCitasVet() {
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
    const fila =
      "<td>" + (cita.fecha || "—") + "</td>" +
      "<td>" + cita.hora + "</td>" +
      "<td>" + nombre + "</td>" +
      "<td>" + dueno + "</td>" +
      "<td>" + cita.servicio + "</td>" +
      "<td>" + cita.estado + "</td>" +
      "<td><button class='btn btn-soft btn-small' type='button' onclick=\"abrirFicha('" + cita.pacienteId + "')\">Ver ficha</button></td>";

    if (tabla1) {
      tabla1.innerHTML = tabla1.innerHTML + "<tr>" + fila + "</tr>";
    }
    const mezcla = (nombre + " " + cita.servicio).toLowerCase();
    if (tabla2 && mezcla.indexOf(texto) !== -1) {
      tabla2.innerHTML = tabla2.innerHTML + "<tr>" + fila + "</tr>";
    }
  }
}

function mostrarPacientesVet() {
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
    if (mezcla.indexOf(texto) !== -1) {
      let tecnico = "Sin asignar";
      if (p.tecnico) {
        tecnico = p.tecnico;
      }
      tabla.innerHTML = tabla.innerHTML +
        "<tr><td>" + p.emoji + " " + p.nombre + "</td><td>" + p.especie + "</td><td>" + p.raza +
        "</td><td>" + p.edad + "</td><td>" + p.responsable + "</td><td>" + tecnico +
        "</td><td><button class='btn btn-soft btn-small' type='button' onclick=\"abrirFicha('" + p.id + "')\">Ver ficha</button></td></tr>";
    }
  }
}

function llenarSelectAsignar() {
  const select = document.getElementById("asig-paciente");
  if (!select) {
    return;
  }
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
}

function llenarSelectPacientes() {
  const select1 = document.getElementById("patient-selector");
  const select2 = document.getElementById("clinical-patient");
  let opciones = "<option value=''>Selecciona una mascota</option>";
  for (let i = 0; i < datos.patients.length; i = i + 1) {
    opciones = opciones + "<option value='" + datos.patients[i].id + "'>" +
      datos.patients[i].nombre + " · " + datos.patients[i].especie + "</option>";
  }
  if (select1) {
    select1.innerHTML = opciones;
  }
  if (select2) {
    select2.innerHTML = opciones;
  }
}

function abrirFicha(id) {
  const paciente = buscarPaciente(id);
  const vacio = document.getElementById("patient-empty");
  const contenido = document.getElementById("patient-record-content");
  if (!paciente) {
    return;
  }

  document.getElementById("patient-selector").value = paciente.id;
  document.getElementById("selected-patient-label").textContent = paciente.nombre;
  document.getElementById("patient-avatar").textContent = paciente.emoji;
  document.getElementById("patient-name").textContent = paciente.nombre;
  document.getElementById("patient-main-data").textContent = paciente.especie + " · " + paciente.raza + " · " + paciente.edad;
  document.getElementById("patient-owner").textContent = paciente.responsable;
  document.getElementById("patient-sex").textContent = paciente.sexo;
  document.getElementById("patient-weight").textContent = paciente.peso;
  document.getElementById("patient-reason").textContent = paciente.motivoActual;
  document.getElementById("patient-phone").textContent = paciente.telefono;
  document.getElementById("patient-id").textContent = paciente.id;

  const historial = document.getElementById("patient-history");
  historial.innerHTML = "";
  for (let i = 0; i < paciente.historial.length; i = i + 1) {
    historial.innerHTML = historial.innerHTML +
      "<div class='timeline-item'><strong>" + paciente.historial[i].fecha + " · " +
      paciente.historial[i].tipo + "</strong><p>" + paciente.historial[i].detalle + "</p></div>";
  }

  const vacunas = document.getElementById("patient-vaccines");
  vacunas.innerHTML = "";
  for (let i = 0; i < paciente.vacunas.length; i = i + 1) {
    vacunas.innerHTML = vacunas.innerHTML +
      "<div class='vaccine-row'><strong>" + paciente.vacunas[i].nombre + "</strong><span>" +
      paciente.vacunas[i].fecha + "</span><span>" + paciente.vacunas[i].proxima +
      "</span><span class='status'>" + paciente.vacunas[i].estado + "</span></div>";
  }

  vacio.hidden = true;
  contenido.hidden = false;
  mostrarSeccion("record", "Ficha clínica");
}

function mostrarStock() {
  const tabla = document.getElementById("tabla-stock");
  const buscador = document.getElementById("buscador-stock");
  const filtro = document.getElementById("filtro-stock");
  if (!tabla) {
    return;
  }
  const texto = buscador ? buscador.value.toLowerCase() : "";
  const categoria = filtro ? filtro.value : "";
  tabla.innerHTML = "";
  for (let i = 0; i < datos.stock.length; i = i + 1) {
    const p = datos.stock[i];
    const mezcla = (p.codigo + " " + p.nombre + " " + p.principioActivo).toLowerCase();
    if (mezcla.indexOf(texto) !== -1 && (categoria === "" || p.categoria === categoria)) {
      tabla.innerHTML = tabla.innerHTML +
        "<tr><td>" + p.codigo + "</td><td>" + p.nombre + "</td><td>" + p.categoria +
        "</td><td>" + p.principioActivo + "</td><td>" + p.especie + "</td><td>" + p.stock + "</td></tr>";
    }
  }
}

document.getElementById("n-citas").textContent = datos.appointments.length;
document.getElementById("n-pacientes").textContent = datos.patients.length;
document.getElementById("n-veterinarios").textContent = datos.clinic.veterinarios;
document.getElementById("n-stock").textContent = datos.stock.length;
document.getElementById("n-promedio").textContent = datos.clinic.pacientesPromedioDia;
document.getElementById("n-servicios").textContent = datos.services.length;
document.getElementById("n-vacunas").textContent = contarVacunas();

llenarSelectPacientes();
llenarSelectAsignar();
mostrarCitasVet();
mostrarPacientesVet();
mostrarStock();

const listaRapida = document.getElementById("lista-servicios-rapidos");
if (listaRapida) {
  for (let i = 0; i < 6 && i < datos.services.length; i = i + 1) {
    listaRapida.innerHTML = listaRapida.innerHTML +
      "<div class='quick-item'><span>" + datos.services[i].nombre + "</span><strong>" +
      dinero(datos.services[i].precio) + "</strong></div>";
  }
}

const selectMedicina = document.getElementById("clinical-medicine");
if (selectMedicina) {
  for (let i = 0; i < datos.stock.length; i = i + 1) {
    selectMedicina.innerHTML = selectMedicina.innerHTML +
      "<option value='" + datos.stock[i].nombre + "'>" + datos.stock[i].nombre + "</option>";
  }
}

const filtroStock = document.getElementById("filtro-stock");
if (filtroStock) {
  const vistas = {};
  for (let i = 0; i < datos.stock.length; i = i + 1) {
    const categoria = datos.stock[i].categoria;
    if (!vistas[categoria]) {
      vistas[categoria] = true;
      filtroStock.innerHTML = filtroStock.innerHTML + "<option value='" + categoria + "'>" + categoria + "</option>";
    }
  }
}

document.getElementById("buscador-citas").oninput = mostrarCitasVet;
document.getElementById("buscador-pacientes").oninput = mostrarPacientesVet;
document.getElementById("buscador-stock").oninput = mostrarStock;
document.getElementById("filtro-stock").onchange = mostrarStock;
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
  mostrarPacientesVet();
  avisar("Técnico asignado.");
  this.getElementsByClassName("form-message")[0].textContent = "Técnico asignado. El técnico lo ve en su panel.";
  this.getElementsByClassName("form-message")[0].className = "form-message success";
};

document.getElementById("patient-selector").onchange = function () {
  if (this.value !== "") {
    abrirFicha(this.value);
  }
};

document.getElementById("clinical-form").onsubmit = function (evento) {
  evento.preventDefault();
  const id = document.getElementById("clinical-patient").value;
  const paciente = buscarPaciente(id);
  if (!paciente) {
    this.reportValidity();
    return;
  }
  let detalle = "Síntomas: " + document.getElementById("clinical-symptoms").value +
    ". Diagnóstico: " + document.getElementById("clinical-diagnosis").value +
    ". Tratamiento: " + document.getElementById("clinical-treatment").value + ".";
  const medicina = document.getElementById("clinical-medicine").value;
  if (medicina !== "") {
    detalle = detalle + " Medicamento: " + medicina + ".";
  }
  paciente.historial.unshift({
    fecha: fechaBonita(document.getElementById("clinical-date").value),
    tipo: "Atención clínica",
    detalle: detalle
  });
  saveClinicList("patients");
  abrirFicha(paciente.id);
  this.reset();
  avisar("Atención guardada en la ficha.");
  this.getElementsByClassName("form-message")[0].textContent = "Atención guardada en la ficha.";
  this.getElementsByClassName("form-message")[0].className = "form-message success";
};
