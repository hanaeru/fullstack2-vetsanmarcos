// PANEL DEL ADMINISTRADOR
// Aquí se crean y editan citas, pacientes, usuarios, servicios e inventario.

function refrescarNumeros() {
  document.getElementById("admin-count-appointments").textContent = datos.appointments.length;
  document.getElementById("admin-count-patients").textContent = datos.patients.length;
  document.getElementById("admin-count-users").textContent = datos.users.length;
  document.getElementById("admin-count-stock").textContent = datos.stock.length;

  const bajo = document.getElementById("admin-low-stock");
  bajo.innerHTML = "";
  for (let i = 0; i < datos.stock.length; i = i + 1) {
    if (datos.stock[i].stock <= 20) {
      bajo.innerHTML = bajo.innerHTML +
        "<div class='quick-item'><span>" + datos.stock[i].nombre +
        "</span><strong class='status status-warning'>" + datos.stock[i].stock + "</strong></div>";
    }
  }

  const reporte = document.getElementById("admin-report-list");
  let confirmadas = 0;
  for (let i = 0; i < datos.appointments.length; i = i + 1) {
    if (datos.appointments[i].estado === "Confirmada") {
      confirmadas = confirmadas + 1;
    }
  }
  reporte.innerHTML =
    "<div class='quick-item'><span>Citas</span><strong>" + datos.appointments.length + "</strong></div>" +
    "<div class='quick-item'><span>Confirmadas</span><strong>" + confirmadas + "</strong></div>" +
    "<div class='quick-item'><span>Pacientes</span><strong>" + datos.patients.length + "</strong></div>" +
    "<div class='quick-item'><span>Usuarios</span><strong>" + datos.users.length + "</strong></div>" +
    "<div class='quick-item'><span>Servicios</span><strong>" + datos.services.length + "</strong></div>" +
    "<div class='quick-item'><span>Productos</span><strong>" + datos.stock.length + "</strong></div>";
}

function llenarSelectsCita() {
  const pacientes = document.getElementById("admin-appointment-patient");
  const servicios = document.getElementById("admin-appointment-service");
  pacientes.innerHTML = "<option value=''>Selecciona</option>";
  servicios.innerHTML = "<option value=''>Selecciona</option>";
  for (let i = 0; i < datos.patients.length; i = i + 1) {
    pacientes.innerHTML = pacientes.innerHTML +
      "<option value='" + datos.patients[i].id + "'>" + datos.patients[i].nombre + "</option>";
  }
  for (let i = 0; i < datos.services.length; i = i + 1) {
    servicios.innerHTML = servicios.innerHTML +
      "<option value='" + datos.services[i].nombre + "'>" + datos.services[i].nombre + "</option>";
  }
}

function mostrarCitasAdmin() {
  const tabla = document.getElementById("admin-appointments-table");
  const texto = document.getElementById("admin-appointment-search").value.toLowerCase();
  tabla.innerHTML = "";
  for (let i = 0; i < datos.appointments.length; i = i + 1) {
    const cita = datos.appointments[i];
    const paciente = buscarPaciente(cita.pacienteId);
    let nombre = "Paciente";
    let dueno = "—";
    if (paciente) {
      nombre = paciente.nombre;
      dueno = paciente.responsable;
    }
    const mezcla = (nombre + " " + dueno + " " + cita.servicio).toLowerCase();
    if (mezcla.indexOf(texto) !== -1) {
      tabla.innerHTML = tabla.innerHTML +
        "<tr><td>" + (cita.fecha || "—") + "</td><td>" + cita.hora + "</td><td>" + nombre +
        "</td><td>" + dueno + "</td><td>" + cita.servicio + "</td><td>" + cita.estado +
        "</td><td><button class='btn btn-soft btn-small' type='button' onclick=\"editarCita('" + cita.id + "')\">Editar</button></td></tr>";
    }
  }
}

function abrirEditor(id) {
  const editores = document.getElementsByClassName("admin-editor");
  for (let i = 0; i < editores.length; i = i + 1) {
    editores[i].hidden = true;
  }
  document.getElementById(id).hidden = false;
}

function cerrarEditores() {
  const editores = document.getElementsByClassName("admin-editor");
  for (let i = 0; i < editores.length; i = i + 1) {
    editores[i].hidden = true;
  }
}

function editarCita(id) {
  llenarSelectsCita();
  for (let i = 0; i < datos.appointments.length; i = i + 1) {
    if (datos.appointments[i].id === id) {
      const cita = datos.appointments[i];
      document.getElementById("admin-appointment-form-title").textContent = "Editar cita";
      document.getElementById("admin-appointment-id").value = cita.id;
      const partes = (cita.fecha || "").split("/");
      if (partes.length === 3) {
        document.getElementById("admin-appointment-date").value = partes[2] + "-" + partes[1] + "-" + partes[0];
      }
      document.getElementById("admin-appointment-time").value = cita.hora;
      document.getElementById("admin-appointment-patient").value = cita.pacienteId;
      document.getElementById("admin-appointment-service").value = cita.servicio;
      document.getElementById("admin-appointment-status").value = cita.estado;
      abrirEditor("admin-appointment-editor");
    }
  }
}

function mostrarPacientesAdmin() {
  const tabla = document.getElementById("admin-patients-table");
  const texto = document.getElementById("admin-patient-search").value.toLowerCase();
  tabla.innerHTML = "";
  for (let i = 0; i < datos.patients.length; i = i + 1) {
    const p = datos.patients[i];
    const mezcla = (p.nombre + " " + p.responsable).toLowerCase();
    if (mezcla.indexOf(texto) !== -1) {
      tabla.innerHTML = tabla.innerHTML +
        "<tr><td>" + p.nombre + "</td><td>" + p.especie + "</td><td>" + p.responsable +
        "</td><td>" + p.telefono + "</td><td>" + (p.tecnico || "Sin asignar") +
        "</td><td><button class='btn btn-soft btn-small' type='button' onclick=\"editarPaciente('" + p.id + "')\">Editar</button> " +
        "<button class='btn btn-soft btn-small' type='button' onclick=\"abrirFichaAdmin('" + p.id + "')\">Ficha</button></td></tr>";
    }
  }
}

function editarPaciente(id) {
  const p = buscarPaciente(id);
  if (!p) {
    return;
  }
  document.getElementById("admin-patient-form-title").textContent = "Editar paciente";
  document.getElementById("admin-patient-id").value = p.id;
  document.getElementById("admin-patient-name").value = p.nombre;
  document.getElementById("admin-patient-species").value = p.especie;
  document.getElementById("admin-patient-breed").value = p.raza;
  document.getElementById("admin-patient-age").value = p.edad;
  document.getElementById("admin-patient-sex").value = p.sexo;
  document.getElementById("admin-patient-weight").value = p.peso;
  document.getElementById("admin-patient-owner").value = p.responsable;
  document.getElementById("admin-patient-phone").value = p.telefono;
  document.getElementById("admin-patient-reason").value = p.motivoActual;
  llenarSelectTecnicos("admin-patient-tecnico");
  document.getElementById("admin-patient-tecnico").value = p.tecnico || "";
  abrirEditor("admin-patient-editor");
}

function llenarSelectFicha() {
  const select = document.getElementById("admin-record-patient");
  select.innerHTML = "<option value=''>Selecciona un paciente</option>";
  for (let i = 0; i < datos.patients.length; i = i + 1) {
    select.innerHTML = select.innerHTML +
      "<option value='" + datos.patients[i].id + "'>" + datos.patients[i].nombre + "</option>";
  }
}

function abrirFichaAdmin(id) {
  mostrarSeccion("records", "Fichas clínicas");
  llenarSelectFicha();
  document.getElementById("admin-record-patient").value = id;
  mostrarFichaAdmin(id);
}

function mostrarFichaAdmin(id) {
  const paciente = buscarPaciente(id);
  const caja = document.getElementById("admin-record-content");
  if (!paciente) {
    caja.hidden = true;
    return;
  }
  caja.hidden = false;
  document.getElementById("admin-record-title").textContent = paciente.nombre + " · " + paciente.responsable;
  const historial = document.getElementById("admin-history-list");
  historial.innerHTML = "";
  for (let i = 0; i < paciente.historial.length; i = i + 1) {
    historial.innerHTML = historial.innerHTML +
      "<div class='timeline-item'><strong>" + paciente.historial[i].fecha + " · " +
      paciente.historial[i].tipo + "</strong><p>" + paciente.historial[i].detalle + "</p></div>";
  }
  const vacunas = document.getElementById("admin-vaccine-list");
  vacunas.innerHTML = "";
  for (let i = 0; i < paciente.vacunas.length; i = i + 1) {
    vacunas.innerHTML = vacunas.innerHTML +
      "<div class='vaccine-row'><strong>" + paciente.vacunas[i].nombre + "</strong><span>" +
      paciente.vacunas[i].fecha + "</span><span>" + paciente.vacunas[i].proxima +
      "</span><span class='status'>" + paciente.vacunas[i].estado + "</span></div>";
  }
}

function mostrarUsuarios() {
  const tabla = document.getElementById("admin-users-table");
  const texto = document.getElementById("admin-user-search").value.toLowerCase();
  tabla.innerHTML = "";
  for (let i = 0; i < datos.users.length; i = i + 1) {
    const u = datos.users[i];
    const mezcla = (u.nombre + " " + u.correo + " " + u.rol).toLowerCase();
    if (mezcla.indexOf(texto) !== -1) {
      tabla.innerHTML = tabla.innerHTML +
        "<tr><td>" + u.nombre + "</td><td>" + u.correo + "</td><td>" + u.rol +
        "</td><td>" + u.estado +
        "</td><td><button class='btn btn-soft btn-small' type='button' onclick=\"editarUsuario('" + u.id + "')\">Editar</button></td></tr>";
    }
  }
}

function editarUsuario(id) {
  for (let i = 0; i < datos.users.length; i = i + 1) {
    if (datos.users[i].id === id) {
      document.getElementById("admin-user-form-title").textContent = "Editar usuario";
      document.getElementById("admin-user-id").value = datos.users[i].id;
      document.getElementById("admin-user-name").value = datos.users[i].nombre;
      document.getElementById("admin-user-email").value = datos.users[i].correo;
      document.getElementById("admin-user-role").value = datos.users[i].rol;
      document.getElementById("admin-user-status").value = datos.users[i].estado;
      abrirEditor("admin-user-editor");
    }
  }
}

function mostrarServiciosAdmin() {
  const tabla = document.getElementById("admin-services-table");
  const texto = document.getElementById("admin-service-search").value.toLowerCase();
  tabla.innerHTML = "";
  for (let i = 0; i < datos.services.length; i = i + 1) {
    const s = datos.services[i];
    const mezcla = (s.codigo + " " + s.nombre).toLowerCase();
    if (mezcla.indexOf(texto) !== -1) {
      tabla.innerHTML = tabla.innerHTML +
        "<tr><td>" + s.codigo + "</td><td>" + s.categoria + "</td><td>" + s.nombre +
        "</td><td>" + s.especie + "</td><td>" + s.duracion + "</td><td>" + dinero(s.precio) +
        "</td><td><button class='btn btn-soft btn-small' type='button' onclick=\"editarServicio('" + s.codigo + "')\">Editar</button></td></tr>";
    }
  }
}

function editarServicio(codigo) {
  for (let i = 0; i < datos.services.length; i = i + 1) {
    if (datos.services[i].codigo === codigo) {
      const s = datos.services[i];
      document.getElementById("admin-service-form-title").textContent = "Editar servicio";
      document.getElementById("admin-service-original-code").value = s.codigo;
      document.getElementById("admin-service-code").value = s.codigo;
      document.getElementById("admin-service-category").value = s.categoria;
      document.getElementById("admin-service-name").value = s.nombre;
      document.getElementById("admin-service-species").value = s.especie;
      document.getElementById("admin-service-duration").value = s.duracion;
      document.getElementById("admin-service-price").value = s.precio;
      document.getElementById("admin-service-notes").value = s.observaciones || "";
      abrirEditor("admin-service-editor");
    }
  }
}

function mostrarStockAdmin() {
  const tabla = document.getElementById("admin-stock-table");
  const texto = document.getElementById("admin-stock-search").value.toLowerCase();
  tabla.innerHTML = "";
  for (let i = 0; i < datos.stock.length; i = i + 1) {
    const p = datos.stock[i];
    const mezcla = (p.codigo + " " + p.nombre).toLowerCase();
    if (mezcla.indexOf(texto) !== -1) {
      tabla.innerHTML = tabla.innerHTML +
        "<tr><td>" + p.codigo + "</td><td>" + p.categoria + "</td><td>" + p.nombre +
        "</td><td>" + p.principioActivo + "</td><td>" + p.presentacion +
        "</td><td>" + p.stock + "</td><td>" + dinero(p.precio) +
        "</td><td><button class='btn btn-soft btn-small' type='button' onclick=\"editarStock('" + p.codigo + "')\">Editar</button></td></tr>";
    }
  }
}

function editarStock(codigo) {
  for (let i = 0; i < datos.stock.length; i = i + 1) {
    if (datos.stock[i].codigo === codigo) {
      const p = datos.stock[i];
      document.getElementById("admin-stock-form-title").textContent = "Editar producto";
      document.getElementById("admin-stock-original-code").value = p.codigo;
      document.getElementById("admin-stock-code").value = p.codigo;
      document.getElementById("admin-stock-category").value = p.categoria;
      document.getElementById("admin-stock-name").value = p.nombre;
      document.getElementById("admin-stock-active").value = p.principioActivo;
      document.getElementById("admin-stock-presentation").value = p.presentacion;
      document.getElementById("admin-stock-species").value = p.especie;
      document.getElementById("admin-stock-quantity").value = p.stock;
      document.getElementById("admin-stock-price").value = p.precio;
      abrirEditor("admin-stock-editor");
    }
  }
}

refrescarNumeros();
llenarSelectsCita();
llenarSelectFicha();
llenarSelectTecnicos("admin-patient-tecnico");
mostrarCitasAdmin();
mostrarPacientesAdmin();
mostrarUsuarios();
mostrarServiciosAdmin();
mostrarStockAdmin();

document.getElementById("admin-appointment-search").oninput = mostrarCitasAdmin;
document.getElementById("admin-patient-search").oninput = mostrarPacientesAdmin;
document.getElementById("admin-user-search").oninput = mostrarUsuarios;
document.getElementById("admin-service-search").oninput = mostrarServiciosAdmin;
document.getElementById("admin-stock-search").oninput = mostrarStockAdmin;

const cerrar = document.getElementsByClassName("admin-close-editor");
for (let i = 0; i < cerrar.length; i = i + 1) {
  cerrar[i].onclick = cerrarEditores;
}

document.getElementById("admin-new-appointment").onclick = function () {
  llenarSelectsCita();
  document.getElementById("admin-appointment-form-title").textContent = "Nueva cita";
  document.getElementById("admin-appointment-form").reset();
  document.getElementById("admin-appointment-id").value = "";
  abrirEditor("admin-appointment-editor");
};

document.getElementById("admin-appointment-form").onsubmit = function (evento) {
  evento.preventDefault();
  const id = document.getElementById("admin-appointment-id").value;
  const cita = {
    id: id || "c" + Date.now(),
    fecha: fechaBonita(document.getElementById("admin-appointment-date").value),
    hora: document.getElementById("admin-appointment-time").value,
    pacienteId: document.getElementById("admin-appointment-patient").value,
    servicio: document.getElementById("admin-appointment-service").value,
    estado: document.getElementById("admin-appointment-status").value
  };
  let indice = -1;
  for (let i = 0; i < datos.appointments.length; i = i + 1) {
    if (datos.appointments[i].id === id) {
      indice = i;
    }
  }
  if (indice >= 0) {
    datos.appointments[indice] = cita;
  } else {
    datos.appointments.push(cita);
  }
  saveClinicList("appointments");
  mostrarCitasAdmin();
  refrescarNumeros();
  cerrarEditores();
};

document.getElementById("admin-new-patient").onclick = function () {
  document.getElementById("admin-patient-form-title").textContent = "Nuevo paciente";
  document.getElementById("admin-patient-form").reset();
  document.getElementById("admin-patient-id").value = "";
  llenarSelectTecnicos("admin-patient-tecnico");
  abrirEditor("admin-patient-editor");
};

document.getElementById("admin-patient-form").onsubmit = function (evento) {
  evento.preventDefault();
  const id = document.getElementById("admin-patient-id").value;
  const anterior = buscarPaciente(id);
  const especie = document.getElementById("admin-patient-species").value;
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
  const paciente = {
    id: id || "p" + Date.now(),
    nombre: document.getElementById("admin-patient-name").value,
    emoji: emoji,
    especie: especie,
    raza: document.getElementById("admin-patient-breed").value,
    edad: document.getElementById("admin-patient-age").value,
    sexo: document.getElementById("admin-patient-sex").value,
    peso: document.getElementById("admin-patient-weight").value,
    responsable: document.getElementById("admin-patient-owner").value,
    telefono: document.getElementById("admin-patient-phone").value,
    motivoActual: document.getElementById("admin-patient-reason").value,
    tecnico: document.getElementById("admin-patient-tecnico").value,
    vacunas: anterior ? anterior.vacunas : [],
    historial: anterior ? anterior.historial : []
  };
  let indice = -1;
  for (let i = 0; i < datos.patients.length; i = i + 1) {
    if (datos.patients[i].id === id) {
      indice = i;
    }
  }
  if (indice >= 0) {
    datos.patients[indice] = paciente;
  } else {
    datos.patients.push(paciente);
  }
  saveClinicList("patients");
  mostrarPacientesAdmin();
  llenarSelectsCita();
  llenarSelectFicha();
  refrescarNumeros();
  cerrarEditores();
};

document.getElementById("admin-record-patient").onchange = function () {
  mostrarFichaAdmin(this.value);
};

document.getElementById("admin-history-form").onsubmit = function (evento) {
  evento.preventDefault();
  const paciente = buscarPaciente(document.getElementById("admin-record-patient").value);
  if (!paciente) {
    return;
  }
  paciente.historial.unshift({
    fecha: fechaBonita(document.getElementById("admin-history-date").value),
    tipo: document.getElementById("admin-history-type").value,
    detalle: document.getElementById("admin-history-detail").value
  });
  saveClinicList("patients");
  this.reset();
  mostrarFichaAdmin(paciente.id);
};

document.getElementById("admin-vaccine-form").onsubmit = function (evento) {
  evento.preventDefault();
  const paciente = buscarPaciente(document.getElementById("admin-record-patient").value);
  if (!paciente) {
    return;
  }
  paciente.vacunas.push({
    nombre: document.getElementById("admin-vaccine-name").value,
    fecha: fechaBonita(document.getElementById("admin-vaccine-date").value),
    proxima: fechaBonita(document.getElementById("admin-vaccine-next").value),
    estado: document.getElementById("admin-vaccine-status").value
  });
  saveClinicList("patients");
  this.reset();
  mostrarFichaAdmin(paciente.id);
};

document.getElementById("admin-new-user").onclick = function () {
  document.getElementById("admin-user-form-title").textContent = "Crear usuario";
  document.getElementById("admin-user-form").reset();
  document.getElementById("admin-user-id").value = "";
  abrirEditor("admin-user-editor");
};

document.getElementById("admin-user-form").onsubmit = function (evento) {
  evento.preventDefault();
  const id = document.getElementById("admin-user-id").value;
  const usuario = {
    id: id || "u" + Date.now(),
    nombre: document.getElementById("admin-user-name").value,
    correo: document.getElementById("admin-user-email").value,
    rol: document.getElementById("admin-user-role").value,
    estado: document.getElementById("admin-user-status").value
  };
  let indice = -1;
  for (let i = 0; i < datos.users.length; i = i + 1) {
    if (datos.users[i].id === id) {
      indice = i;
    }
  }
  if (indice >= 0) {
    datos.users[indice] = usuario;
  } else {
    datos.users.push(usuario);
  }
  saveClinicList("users");
  mostrarUsuarios();
  refrescarNumeros();
  cerrarEditores();
};

document.getElementById("admin-new-service").onclick = function () {
  document.getElementById("admin-service-form-title").textContent = "Nuevo servicio";
  document.getElementById("admin-service-form").reset();
  document.getElementById("admin-service-original-code").value = "";
  abrirEditor("admin-service-editor");
};

document.getElementById("admin-service-form").onsubmit = function (evento) {
  evento.preventDefault();
  const original = document.getElementById("admin-service-original-code").value;
  const servicio = {
    codigo: document.getElementById("admin-service-code").value,
    categoria: document.getElementById("admin-service-category").value,
    nombre: document.getElementById("admin-service-name").value,
    especie: document.getElementById("admin-service-species").value,
    duracion: document.getElementById("admin-service-duration").value,
    precio: Number(document.getElementById("admin-service-price").value),
    observaciones: document.getElementById("admin-service-notes").value
  };
  let indice = -1;
  for (let i = 0; i < datos.services.length; i = i + 1) {
    if (datos.services[i].codigo === original) {
      indice = i;
    }
  }
  if (indice >= 0) {
    datos.services[indice] = servicio;
  } else {
    datos.services.push(servicio);
  }
  saveClinicList("services");
  mostrarServiciosAdmin();
  llenarSelectsCita();
  refrescarNumeros();
  cerrarEditores();
};

document.getElementById("admin-new-stock").onclick = function () {
  document.getElementById("admin-stock-form-title").textContent = "Nuevo producto";
  document.getElementById("admin-stock-form").reset();
  document.getElementById("admin-stock-original-code").value = "";
  abrirEditor("admin-stock-editor");
};

document.getElementById("admin-stock-form").onsubmit = function (evento) {
  evento.preventDefault();
  const original = document.getElementById("admin-stock-original-code").value;
  const producto = {
    codigo: document.getElementById("admin-stock-code").value,
    categoria: document.getElementById("admin-stock-category").value,
    nombre: document.getElementById("admin-stock-name").value,
    principioActivo: document.getElementById("admin-stock-active").value,
    presentacion: document.getElementById("admin-stock-presentation").value,
    especie: document.getElementById("admin-stock-species").value,
    stock: Number(document.getElementById("admin-stock-quantity").value),
    precio: Number(document.getElementById("admin-stock-price").value)
  };
  let indice = -1;
  for (let i = 0; i < datos.stock.length; i = i + 1) {
    if (datos.stock[i].codigo === original) {
      indice = i;
    }
  }
  if (indice >= 0) {
    datos.stock[indice] = producto;
  } else {
    datos.stock.push(producto);
  }
  saveClinicList("stock");
  mostrarStockAdmin();
  refrescarNumeros();
  cerrarEditores();
};

document.getElementById("report-form").onsubmit = function (evento) {
  evento.preventDefault();
  const periodo = document.getElementById("report-period");
  const texto = periodo.options[periodo.selectedIndex].textContent;
  const mensaje = document.getElementById("report-message");
  mensaje.textContent = "Resumen de " + texto.toLowerCase() + ": " +
    datos.appointments.length + " citas y " + datos.patients.length + " pacientes.";
  mensaje.className = "form-message success";
};
