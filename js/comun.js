// FUNCIONES COMUNES DE LOS PANELES
// Este archivo se carga en recepción, veterinario, técnico, cliente y admin.

const datos = window.VET_DATA;

// 1. Si el rol no coincide, volvemos al login.
const rolPagina = document.body.getAttribute("data-role");
const rolGuardado = sessionStorage.getItem("vetRole");
if (rolGuardado !== rolPagina) {
  window.location.href = "login.html";
}

// 2. Mostramos el correo de quien entró.
const correoSesion = sessionStorage.getItem("vetEmail");
const correoArriba = document.getElementById("session-email");
const correoLado = document.getElementById("sidebar-email");
if (correoArriba) {
  correoArriba.textContent = correoSesion;
}
if (correoLado) {
  correoLado.textContent = correoSesion;
}

// 3. El menú del lado cambia de sección.
function mostrarSeccion(nombre, titulo) {
  const secciones = document.getElementsByClassName("dashboard-section");
  for (let i = 0; i < secciones.length; i = i + 1) {
    if (secciones[i].getAttribute("data-section-panel") === nombre) {
      secciones[i].className = "dashboard-section active";
    } else {
      secciones[i].className = "dashboard-section";
    }
  }

  const botones = document.getElementsByClassName("side-link");
  for (let i = 0; i < botones.length; i = i + 1) {
    if (botones[i].getAttribute("data-section") === nombre) {
      botones[i].className = "side-link active";
    } else {
      botones[i].className = "side-link";
    }
  }

  const tituloPagina = document.getElementById("page-title");
  if (tituloPagina && titulo) {
    tituloPagina.textContent = titulo;
  }

  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.className = "sidebar";
  }
}

const botonesMenu = document.getElementsByClassName("side-link");
for (let i = 0; i < botonesMenu.length; i = i + 1) {
  botonesMenu[i].onclick = function () {
    mostrarSeccion(this.getAttribute("data-section"), this.getAttribute("data-title"));
  };
}

const botonesIr = document.getElementsByClassName("ir-seccion");
for (let i = 0; i < botonesIr.length; i = i + 1) {
  botonesIr[i].onclick = function () {
    mostrarSeccion(this.getAttribute("data-go-section"), this.getAttribute("data-title"));
  };
}

const botonMenuMovil = document.getElementById("sidebar-toggle");
if (botonMenuMovil) {
  botonMenuMovil.onclick = function () {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.className === "sidebar open") {
      sidebar.className = "sidebar";
    } else {
      sidebar.className = "sidebar open";
    }
  };
}

const botonSalir = document.getElementById("logout-btn");
if (botonSalir) {
  botonSalir.onclick = function () {
    sessionStorage.removeItem("vetEmail");
    sessionStorage.removeItem("vetRole");
    window.location.href = "login.html";
  };
}

function contarVacunas() {
  let total = 0;
  for (let i = 0; i < datos.services.length; i = i + 1) {
    if (datos.services[i].categoria === "Vacunación") {
      total = total + 1;
    }
  }
  return total;
}

function llenarSelectTecnicos(idDelSelect) {
  const select = document.getElementById(idDelSelect);
  if (!select) {
    return;
  }
  select.innerHTML = "<option value=''>Sin asignar</option>";
  for (let i = 0; i < datos.users.length; i = i + 1) {
    if (datos.users[i].rol === "Técnico veterinario") {
      select.innerHTML = select.innerHTML +
        "<option value='" + datos.users[i].nombre + "'>" + datos.users[i].nombre + "</option>";
    }
  }
}

function buscarPaciente(id) {
  for (let i = 0; i < datos.patients.length; i = i + 1) {
    if (datos.patients[i].id === id) {
      return datos.patients[i];
    }
  }
  return null;
}

function dinero(numero) {
  return "$" + Number(numero).toLocaleString("es-CL");
}

function fechaBonita(valor) {
  const partes = valor.split("-");
  if (partes.length === 3) {
    return partes[2] + "/" + partes[1] + "/" + partes[0];
  }
  return valor;
}

function avisar(texto) {
  const caja = document.getElementById("toast-container");
  if (!caja) {
    return;
  }
  const aviso = document.createElement("div");
  aviso.className = "toast";
  aviso.textContent = texto;
  caja.appendChild(aviso);
  setTimeout(function () {
    aviso.remove();
  }, 3000);
}
