// PANEL DEL TÉCNICO
// Flujo: cita asignada → ficha → anotar apoyo.
// No diagnostica.
// FALTA: un servidor que asigne pacientes de verdad.

function pacientesAsignados() {
  const lista = [];
  for (let i = 0; i < datos.patients.length; i = i + 1) {
    const p = datos.patients[i];
    if (p.tecnico === "Diego Fuentes" || p.id === "luna" || p.id === "mila") {
      lista.push(p);
    }
  }
  return lista;
}

function estaAsignado(id) {
  const lista = pacientesAsignados();
  for (let i = 0; i < lista.length; i = i + 1) {
    if (lista[i].id === id) {
      return true;
    }
  }
  return false;
}

function mostrarCitasTec() {
  const tabla1 = document.getElementById("tabla-citas-resumen");
  const tabla2 = document.getElementById("tabla-citas");
  const buscador = document.getElementById("buscador-citas");
  const texto = buscador ? buscador.value.toLowerCase() : "";
  const asignados = pacientesAsignados();

  if (tabla1) {
    tabla1.innerHTML = "";
  }
  if (tabla2) {
    tabla2.innerHTML = "";
  }

  let cuantas = 0;
  for (let i = 0; i < datos.appointments.length; i = i + 1) {
    const cita = datos.appointments[i];
    if (estaAsignado(cita.pacienteId) === false) {
      continue;
    }
    cuantas = cuantas + 1;
    const paciente = buscarPaciente(cita.pacienteId);
    let nombre = "—";
    let dueno = "—";
    if (paciente) {
      nombre = paciente.nombre;
      dueno = paciente.responsable;
    }
    const boton =
      "<td><button class='btn btn-soft btn-small' type='button' onclick=\"abrirFichaTec('" +
      cita.pacienteId + "')\">Abrir ficha</button></td>";

    if (tabla1) {
      tabla1.innerHTML = tabla1.innerHTML +
        "<tr><td>" + (cita.fecha || "—") + "</td><td>" + cita.hora +
        "</td><td>" + nombre + "</td><td>" + cita.servicio +
        "</td><td>" + cita.estado + "</td>" + boton + "</tr>";
    }

    const mezcla = (nombre + " " + cita.servicio).toLowerCase();
    if (tabla2 && mezcla.indexOf(texto) !== -1) {
      tabla2.innerHTML = tabla2.innerHTML +
        "<tr><td>" + (cita.fecha || "—") + "</td><td>" + cita.hora +
        "</td><td>" + nombre + "</td><td>" + dueno +
        "</td><td>" + cita.servicio + "</td><td>" + cita.estado + "</td>" +
        boton + "</tr>";
    }
  }
  document.getElementById("n-citas").textContent = cuantas;
  document.getElementById("n-pacientes").textContent = asignados.length;
}

function mostrarPacientesTec() {
  const tabla = document.getElementById("tabla-pacientes");
  const buscador = document.getElementById("buscador-pacientes");
  if (!tabla) {
    return;
  }
  const texto = buscador ? buscador.value.toLowerCase() : "";
  const lista = pacientesAsignados();
  tabla.innerHTML = "";
  for (let i = 0; i < lista.length; i = i + 1) {
    const p = lista[i];
    const mezcla = (p.nombre + " " + p.especie + " " + p.responsable).toLowerCase();
    if (mezcla.indexOf(texto) !== -1) {
      tabla.innerHTML = tabla.innerHTML +
        "<tr><td>" + p.emoji + " " + p.nombre + "</td><td>" + p.especie +
        "</td><td>" + p.raza + "</td><td>" + p.edad +
        "</td><td>" + p.responsable +
        "</td><td><button class='btn btn-soft btn-small' type='button' onclick=\"abrirFichaTec('" +
        p.id + "')\">Abrir ficha</button></td></tr>";
    }
  }
}

function abrirFichaTec(id) {
  if (estaAsignado(id) === false) {
    avisar("Ese paciente no está asignado a este técnico.");
    return;
  }
  const paciente = buscarPaciente(id);
  const vacio = document.getElementById("patient-empty");
  const contenido = document.getElementById("patient-record-content");
  if (!paciente) {
    return;
  }

  document.getElementById("apoyo-paciente").value = paciente.id;
  document.getElementById("patient-avatar").textContent = paciente.emoji;
  document.getElementById("patient-name").textContent = paciente.nombre;
  document.getElementById("patient-main-data").textContent =
    paciente.especie + " · " + paciente.raza + " · " + paciente.edad;
  document.getElementById("patient-owner").textContent = paciente.responsable;
  document.getElementById("patient-sex").textContent = paciente.sexo;
  document.getElementById("patient-weight").textContent = paciente.peso;
  document.getElementById("patient-reason").textContent = paciente.motivoActual;
  document.getElementById("patient-phone").textContent = paciente.telefono;
  document.getElementById("patient-tecnico").textContent = paciente.tecnico;

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
  mostrarSeccion("record", "Ficha y apoyo");
}

function mostrarStockTec() {
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
        "</td><td>" + p.principioActivo + "</td><td>" + p.especie +
        "</td><td>" + p.stock + "</td></tr>";
    }
  }
}

document.getElementById("n-tecnicos").textContent = datos.clinic.tecnicos;
document.getElementById("n-stock").textContent = datos.stock.length;

mostrarCitasTec();
mostrarPacientesTec();
mostrarStockTec();

const filtroStock = document.getElementById("filtro-stock");
const vistas = {};
for (let i = 0; i < datos.stock.length; i = i + 1) {
  const categoria = datos.stock[i].categoria;
  if (!vistas[categoria]) {
    vistas[categoria] = true;
    filtroStock.innerHTML = filtroStock.innerHTML +
      "<option value='" + categoria + "'>" + categoria + "</option>";
  }
}

document.getElementById("buscador-citas").oninput = mostrarCitasTec;
document.getElementById("buscador-pacientes").oninput = mostrarPacientesTec;
document.getElementById("buscador-stock").oninput = mostrarStockTec;
document.getElementById("filtro-stock").onchange = mostrarStockTec;

document.getElementById("apoyo-form").onsubmit = function (evento) {
  evento.preventDefault();
  const id = document.getElementById("apoyo-paciente").value;
  const fecha = document.getElementById("apoyo-fecha").value;
  const tipo = document.getElementById("apoyo-tipo").value;
  const detalle = document.getElementById("apoyo-detalle").value;
  if (estaAsignado(id) === false) {
    this.getElementsByClassName("form-message")[0].textContent =
      "Abre primero la ficha de un paciente asignado.";
    this.getElementsByClassName("form-message")[0].className = "form-message error-message";
    return;
  }
  const paciente = buscarPaciente(id);
  if (!paciente || fecha === "" || tipo === "" || detalle === "") {
    this.reportValidity();
    return;
  }
  paciente.historial.unshift({
    fecha: fechaBonita(fecha),
    tipo: "Apoyo técnico · " + tipo,
    detalle: detalle
  });
  saveClinicList("patients");
  this.reset();
  document.getElementById("apoyo-paciente").value = paciente.id;
  abrirFichaTec(paciente.id);
  avisar("Apoyo guardado en la ficha.");
  this.getElementsByClassName("form-message")[0].textContent =
    "Apoyo guardado. El médico lo ve en el historial.";
  this.getElementsByClassName("form-message")[0].className = "form-message success";
};
