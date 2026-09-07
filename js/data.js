// ============================================================
// DATOS DE LA CLÍNICA
// ------------------------------------------------------------
// 1. Este archivo guarda la información inicial del sitio.
// 2. Se copia a window.VET_DATA para que otras páginas la puedan leer.
// 3. Si alguien ya cambió datos en este navegador, más abajo
//    se reemplazan estas listas por las listas guardadas.
//
// FALTA: un servidor y una base de datos.
// Ahora los datos viven solo en este computador y en este navegador.
// Si abres el sitio en otro computador, verás los datos iniciales.
// ============================================================

window.VET_DATA = {
  // Información general de Veterinaria San Marcos.
  "clinic": {
    "nombre": "Veterinaria San Marcos",
    "ubicacion": "Rancagua, Región del Libertador General Bernardo O'Higgins",
    "fundacion": 2009,
    "veterinarios": 3,
    "tecnicos": 1,
    "recepcionistas": 1,
    "pacientesPromedioDia": 25,
    "inasistenciaPorcentaje": 20,
    "fichasPerdidasUltimos6Meses": 4,
    "especies": [
      "Perros",
      "Gatos",
      "Conejos",
      "Aves"
    ]
  },
  // Catálogo de servicios: código, categoría, especie, duración y precio.
  "services": [
    {
      "codigo": "SV001",
      "categoria": "Consultas",
      "nombre": "Consulta general",
      "especie": "Perro / Gato",
      "duracion": "30 min",
      "precio": 15000,
      "observaciones": ""
    },
    {
      "codigo": "SV002",
      "categoria": "Consultas",
      "nombre": "Consulta urgencia",
      "especie": "Perro / Gato",
      "duracion": "30 min",
      "precio": 25000,
      "observaciones": "Fuera de horario +$10.000"
    },
    {
      "codigo": "SV003",
      "categoria": "Consultas",
      "nombre": "Control postoperatorio",
      "especie": "Perro / Gato",
      "duracion": "20 min",
      "precio": 10000,
      "observaciones": ""
    },
    {
      "codigo": "SV004",
      "categoria": "Consultas",
      "nombre": "Consulta ave / conejo",
      "especie": "Ave / Conejo",
      "duracion": "30 min",
      "precio": 18000,
      "observaciones": ""
    },
    {
      "codigo": "SV005",
      "categoria": "Consultas",
      "nombre": "Segunda opinión médica",
      "especie": "Todas",
      "duracion": "40 min",
      "precio": 20000,
      "observaciones": "Requiere ficha previa"
    },
    {
      "codigo": "VA001",
      "categoria": "Vacunación",
      "nombre": "Vacuna antirrábica canina",
      "especie": "Perro",
      "duracion": "10 min",
      "precio": 12000,
      "observaciones": "Obligatoria por ley"
    },
    {
      "codigo": "VA002",
      "categoria": "Vacunación",
      "nombre": "Vacuna sextuple canina",
      "especie": "Perro",
      "duracion": "10 min",
      "precio": 18000,
      "observaciones": "Refuerzo anual"
    },
    {
      "codigo": "VA003",
      "categoria": "Vacunación",
      "nombre": "Vacuna bivalente felina",
      "especie": "Gato",
      "duracion": "10 min",
      "precio": 15000,
      "observaciones": "Refuerzo anual"
    },
    {
      "codigo": "VA004",
      "categoria": "Vacunación",
      "nombre": "Vacuna triple felina",
      "especie": "Gato",
      "duracion": "10 min",
      "precio": 17000,
      "observaciones": "Refuerzo anual"
    },
    {
      "codigo": "VA005",
      "categoria": "Vacunación",
      "nombre": "Vacuna Bordetella canina",
      "especie": "Perro",
      "duracion": "10 min",
      "precio": 14000,
      "observaciones": "Tos de las perreras"
    },
    {
      "codigo": "VA006",
      "categoria": "Vacunación",
      "nombre": "Vacuna antirrábica felina",
      "especie": "Gato",
      "duracion": "10 min",
      "precio": 12000,
      "observaciones": ""
    },
    {
      "codigo": "CI001",
      "categoria": "Cirugía",
      "nombre": "Esterilización hembra canina",
      "especie": "Perra",
      "duracion": "90 min",
      "precio": 80000,
      "observaciones": "Incluye anestesia y hospitalización 24h"
    },
    {
      "codigo": "CI002",
      "categoria": "Cirugía",
      "nombre": "Esterilización macho canino",
      "especie": "Perro",
      "duracion": "60 min",
      "precio": 60000,
      "observaciones": "Incluye anestesia"
    },
    {
      "codigo": "CI003",
      "categoria": "Cirugía",
      "nombre": "Esterilización hembra felina",
      "especie": "Gata",
      "duracion": "60 min",
      "precio": 65000,
      "observaciones": "Incluye anestesia y hospitalización 12h"
    },
    {
      "codigo": "CI004",
      "categoria": "Cirugía",
      "nombre": "Esterilización macho felino",
      "especie": "Gato",
      "duracion": "45 min",
      "precio": 50000,
      "observaciones": "Incluye anestesia"
    },
    {
      "codigo": "CI005",
      "categoria": "Cirugía",
      "nombre": "Extirpación de tumor cutáneo",
      "especie": "Perro / Gato",
      "duracion": "60 min",
      "precio": 120000,
      "observaciones": "Precio referencial; varía según tamaño"
    },
    {
      "codigo": "CI006",
      "categoria": "Cirugía",
      "nombre": "Cesárea de urgencia",
      "especie": "Perra / Gata",
      "duracion": "120 min",
      "precio": 180000,
      "observaciones": ""
    },
    {
      "codigo": "DE001",
      "categoria": "Desparasitación",
      "nombre": "Desparasitación interna pequeños (<10 kg)",
      "especie": "Perro",
      "duracion": "5 min",
      "precio": 8000,
      "observaciones": ""
    },
    {
      "codigo": "DE002",
      "categoria": "Desparasitación",
      "nombre": "Desparasitación interna medianos (10-25 kg)",
      "especie": "Perro",
      "duracion": "5 min",
      "precio": 9500,
      "observaciones": ""
    },
    {
      "codigo": "DE003",
      "categoria": "Desparasitación",
      "nombre": "Desparasitación interna grandes (>25 kg)",
      "especie": "Perro",
      "duracion": "5 min",
      "precio": 11000,
      "observaciones": ""
    },
    {
      "codigo": "DE004",
      "categoria": "Desparasitación",
      "nombre": "Desparasitación interna felina",
      "especie": "Gato",
      "duracion": "5 min",
      "precio": 8000,
      "observaciones": ""
    },
    {
      "codigo": "DE005",
      "categoria": "Desparasitación",
      "nombre": "Antiparasitario externo (pipeta)",
      "especie": "Perro / Gato",
      "duracion": "5 min",
      "precio": 7500,
      "observaciones": "Incluye aplicación"
    },
    {
      "codigo": "EX001",
      "categoria": "Exámenes",
      "nombre": "Hemograma completo",
      "especie": "Perro / Gato",
      "duracion": "30 min",
      "precio": 22000,
      "observaciones": "Resultado en 24-48 h"
    },
    {
      "codigo": "EX002",
      "categoria": "Exámenes",
      "nombre": "Perfil bioquímico completo",
      "especie": "Perro / Gato",
      "duracion": "30 min",
      "precio": 35000,
      "observaciones": "Resultado en 24-48 h"
    },
    {
      "codigo": "EX003",
      "categoria": "Exámenes",
      "nombre": "Radiografía (1 proyección)",
      "especie": "Perro / Gato",
      "duracion": "20 min",
      "precio": 28000,
      "observaciones": ""
    },
    {
      "codigo": "EX004",
      "categoria": "Exámenes",
      "nombre": "Ecografía abdominal",
      "especie": "Perro / Gato",
      "duracion": "30 min",
      "precio": 45000,
      "observaciones": ""
    },
    {
      "codigo": "EX005",
      "categoria": "Exámenes",
      "nombre": "Test de leishmaniasis",
      "especie": "Perro",
      "duracion": "20 min",
      "precio": 18000,
      "observaciones": ""
    },
    {
      "codigo": "OT001",
      "categoria": "Otros",
      "nombre": "Corte de uñas",
      "especie": "Perro / Gato",
      "duracion": "15 min",
      "precio": 5000,
      "observaciones": ""
    },
    {
      "codigo": "OT002",
      "categoria": "Otros",
      "nombre": "Limpieza dental",
      "especie": "Perro / Gato",
      "duracion": "45 min",
      "precio": 55000,
      "observaciones": "Requiere anestesia"
    },
    {
      "codigo": "OT003",
      "categoria": "Otros",
      "nombre": "Microchip identificación",
      "especie": "Perro / Gato",
      "duracion": "10 min",
      "precio": 15000,
      "observaciones": "Incluye registro"
    },
    {
      "codigo": "OT004",
      "categoria": "Otros",
      "nombre": "Hospitalización (por día)",
      "especie": "Perro / Gato",
      "duracion": "24 h",
      "precio": 30000,
      "observaciones": "Incluye monitoreo y alimentación básica"
    }
  ],
  // Inventario de medicamentos y vacunas.
  "stock": [
    {
      "codigo": "ME001",
      "categoria": "Antibióticos",
      "nombre": "Amoxibay 250mg",
      "principioActivo": "Amoxicilina",
      "presentacion": "Blíster 10 comp.",
      "especie": "Perro / Gato",
      "stock": 45,
      "precio": 4200
    },
    {
      "codigo": "ME002",
      "categoria": "Antibióticos",
      "nombre": "Enrox 50mg",
      "principioActivo": "Enrofloxacino",
      "presentacion": "Blíster 10 comp.",
      "especie": "Perro / Gato",
      "stock": 30,
      "precio": 6800
    },
    {
      "codigo": "ME003",
      "categoria": "Antibióticos",
      "nombre": "Metrobay 250mg",
      "principioActivo": "Metronidazol",
      "presentacion": "Blíster 10 comp.",
      "especie": "Perro / Gato",
      "stock": 28,
      "precio": 3900
    },
    {
      "codigo": "ME004",
      "categoria": "Antiparasitarios",
      "nombre": "Nexgard",
      "principioActivo": "Afoxolaner",
      "presentacion": "Masticable 1 unid.",
      "especie": "Perro",
      "stock": 60,
      "precio": 9500
    },
    {
      "codigo": "ME005",
      "categoria": "Antiparasitarios",
      "nombre": "Bravecto",
      "principioActivo": "Fluralaner",
      "presentacion": "Masticable 1 unid.",
      "especie": "Perro",
      "stock": 40,
      "precio": 18900
    },
    {
      "codigo": "ME006",
      "categoria": "Antiparasitarios",
      "nombre": "Revolution Plus",
      "principioActivo": "Selamectina+Sarolaner",
      "presentacion": "Pipeta 1 unid.",
      "especie": "Gato",
      "stock": 35,
      "precio": 14500
    },
    {
      "codigo": "ME007",
      "categoria": "Antiparasitarios",
      "nombre": "Drontal Plus",
      "principioActivo": "Praziquantel+Pamoato",
      "presentacion": "Comprimido 1 unid.",
      "especie": "Perro",
      "stock": 80,
      "precio": 3200
    },
    {
      "codigo": "ME008",
      "categoria": "Antiparasitarios",
      "nombre": "Milbemax Gato",
      "principioActivo": "Milbemicina+Praziq.",
      "presentacion": "Comprimido 2 unid.",
      "especie": "Gato",
      "stock": 50,
      "precio": 6800
    },
    {
      "codigo": "ME009",
      "categoria": "Antiinflamatorios",
      "nombre": "Meloxicam 1mg",
      "principioActivo": "Meloxicam",
      "presentacion": "Blíster 10 comp.",
      "especie": "Perro / Gato",
      "stock": 55,
      "precio": 4500
    },
    {
      "codigo": "ME010",
      "categoria": "Antiinflamatorios",
      "nombre": "Carprofen 50mg",
      "principioActivo": "Carprofeno",
      "presentacion": "Blíster 10 comp.",
      "especie": "Perro",
      "stock": 30,
      "precio": 9800
    },
    {
      "codigo": "ME011",
      "categoria": "Dermatología",
      "nombre": "Clorhexidina shampoo",
      "principioActivo": "Clorhexidina 2%",
      "presentacion": "Frasco 250ml",
      "especie": "Perro / Gato",
      "stock": 25,
      "precio": 8900
    },
    {
      "codigo": "ME012",
      "categoria": "Dermatología",
      "nombre": "Malaseb shampoo",
      "principioActivo": "Miconazol+Clorhex.",
      "presentacion": "Frasco 250ml",
      "especie": "Perro / Gato",
      "stock": 20,
      "precio": 12500
    },
    {
      "codigo": "ME013",
      "categoria": "Dermatología",
      "nombre": "Apoquel 16mg",
      "principioActivo": "Oclacitinib",
      "presentacion": "Blíster 10 comp.",
      "especie": "Perro",
      "stock": 18,
      "precio": 22000
    },
    {
      "codigo": "ME014",
      "categoria": "Digestivo",
      "nombre": "Probifor",
      "principioActivo": "Bacillus clausii",
      "presentacion": "Sobre 5ml x10",
      "especie": "Perro / Gato",
      "stock": 40,
      "precio": 5600
    },
    {
      "codigo": "ME015",
      "categoria": "Digestivo",
      "nombre": "Omeprazol 10mg vet",
      "principioActivo": "Omeprazol",
      "presentacion": "Blíster 10 comp.",
      "especie": "Perro / Gato",
      "stock": 35,
      "precio": 3800
    },
    {
      "codigo": "ME016",
      "categoria": "Cardíaco",
      "nombre": "Vetmedin 2.5mg",
      "principioActivo": "Pimobendan",
      "presentacion": "Blíster 10 comp.",
      "especie": "Perro",
      "stock": 15,
      "precio": 28000
    },
    {
      "codigo": "ME017",
      "categoria": "Analgésicos",
      "nombre": "Tramadol 50mg vet",
      "principioActivo": "Tramadol",
      "presentacion": "Blíster 10 comp.",
      "especie": "Perro",
      "stock": 22,
      "precio": 5200
    },
    {
      "codigo": "ME018",
      "categoria": "Vacunas",
      "nombre": "Nobivac DHPPi",
      "principioActivo": "Vacuna polivalente",
      "presentacion": "Vial 1 dosis",
      "especie": "Perro",
      "stock": 48,
      "precio": 8500
    },
    {
      "codigo": "ME019",
      "categoria": "Vacunas",
      "nombre": "Nobivac Rabies",
      "principioActivo": "Vacuna antirrábica",
      "presentacion": "Vial 1 dosis",
      "especie": "Perro / Gato",
      "stock": 60,
      "precio": 5800
    },
    {
      "codigo": "ME020",
      "categoria": "Vacunas",
      "nombre": "Felocell CVR",
      "principioActivo": "Vacuna triple felina",
      "presentacion": "Vial 1 dosis",
      "especie": "Gato",
      "stock": 36,
      "precio": 7200
    },
    {
      "codigo": "ME021",
      "categoria": "Suplementos",
      "nombre": "Omega vet 3-6-9",
      "principioActivo": "Ácidos grasos omega",
      "presentacion": "Frasco 100ml",
      "especie": "Perro / Gato",
      "stock": 30,
      "precio": 9900
    },
    {
      "codigo": "ME022",
      "categoria": "Suplementos",
      "nombre": "Condrovet forte",
      "principioActivo": "Condroitín+Glucos.",
      "presentacion": "Blíster 30 comp.",
      "especie": "Perro",
      "stock": 25,
      "precio": 14500
    }
  ],
  // Pacientes con sus datos básicos, historial clínico y vacunas.
  "patients": [
    {
      "id": "luna",
      "nombre": "Luna",
      "emoji": "🐶",
      "especie": "Perro",
      "raza": "Mestiza",
      "edad": "4 años",
      "sexo": "Hembra",
      "peso": "18,4 kg",
      "responsable": "Camila Rojas",
      "telefono": "9 1111 2233",
      "motivoActual": "Consulta general",
      "tecnico": "Diego Fuentes",
      "vacunas": [
        {
          "nombre": "Antirrábica",
          "fecha": "20/10/2025",
          "proxima": "20/10/2026",
          "estado": "Al día",
          "tipo": "ok"
        },
        {
          "nombre": "Séxtuple canina",
          "fecha": "18/02/2026",
          "proxima": "18/02/2027",
          "estado": "Al día",
          "tipo": "ok"
        }
      ],
      "historial": [
        {
          "fecha": "12/06/2026",
          "tipo": "Consulta general",
          "detalle": "Control preventivo. Paciente activo y sin observaciones relevantes."
        },
        {
          "fecha": "18/02/2026",
          "tipo": "Vacunación",
          "detalle": "Aplicación de vacuna polivalente canina."
        }
      ]
    },
    {
      "id": "milo",
      "nombre": "Milo",
      "emoji": "🐱",
      "especie": "Gato",
      "raza": "Doméstico de pelo corto",
      "edad": "2 años",
      "sexo": "Macho",
      "peso": "4,8 kg",
      "responsable": "Diego Soto",
      "telefono": "9 2222 3344",
      "motivoActual": "Vacunación",
      "tecnico": "",
      "vacunas": [
        {
          "nombre": "Antirrábica felina",
          "fecha": "14/01/2026",
          "proxima": "14/01/2027",
          "estado": "Al día",
          "tipo": "ok"
        },
        {
          "nombre": "Triple felina",
          "fecha": "06/09/2025",
          "proxima": "06/09/2026",
          "estado": "Corresponde hoy",
          "tipo": "warning"
        }
      ],
      "historial": [
        {
          "fecha": "01/08/2026",
          "tipo": "Control",
          "detalle": "Peso y apetito dentro de rango esperado."
        },
        {
          "fecha": "11/03/2026",
          "tipo": "Desparasitación",
          "detalle": "Desparasitación interna felina sin complicaciones."
        }
      ]
    },
    {
      "id": "kiwi",
      "nombre": "Kiwi",
      "emoji": "🐦",
      "especie": "Ave",
      "raza": "Periquito",
      "edad": "1 año",
      "sexo": "Sin registrar",
      "peso": "35 g",
      "responsable": "Valentina Pérez",
      "telefono": "9 3333 4455",
      "motivoActual": "Consulta ave / conejo",
      "tecnico": "",
      "vacunas": [
        {
          "nombre": "Vacunas registradas",
          "fecha": "—",
          "proxima": "—",
          "estado": "Sin registros",
          "tipo": "muted"
        }
      ],
      "historial": [
        {
          "fecha": "22/07/2026",
          "tipo": "Consulta ave",
          "detalle": "Revisión general y orientación de alimentación."
        }
      ]
    },
    {
      "id": "bruno",
      "nombre": "Bruno",
      "emoji": "🐶",
      "especie": "Perro",
      "raza": "Labrador",
      "edad": "6 años",
      "sexo": "Macho",
      "peso": "31,2 kg",
      "responsable": "Felipe Díaz",
      "telefono": "9 4444 5566",
      "motivoActual": "Vacuna antirrábica canina",
      "tecnico": "",
      "vacunas": [
        {
          "nombre": "Antirrábica",
          "fecha": "06/09/2025",
          "proxima": "06/09/2026",
          "estado": "Corresponde hoy",
          "tipo": "warning"
        },
        {
          "nombre": "Séxtuple canina",
          "fecha": "15/12/2025",
          "proxima": "15/12/2026",
          "estado": "Al día",
          "tipo": "ok"
        }
      ],
      "historial": [
        {
          "fecha": "10/05/2026",
          "tipo": "Consulta general",
          "detalle": "Control de peso y recomendaciones de actividad."
        }
      ]
    },
    {
      "id": "mila",
      "nombre": "Mila",
      "emoji": "🐱",
      "especie": "Gato",
      "raza": "Doméstico de pelo corto",
      "edad": "3 años",
      "sexo": "Hembra",
      "peso": "4,2 kg",
      "responsable": "Camila Rojas",
      "telefono": "9 1111 2233",
      "motivoActual": "Consulta general",
      "tecnico": "Diego Fuentes",
      "vacunas": [
        {
          "nombre": "Triple felina",
          "fecha": "15/03/2026",
          "proxima": "15/03/2027",
          "estado": "Al día",
          "tipo": "ok"
        },
        {
          "nombre": "Antirrábica felina",
          "fecha": "20/10/2025",
          "proxima": "20/10/2026",
          "estado": "Próxima",
          "tipo": "warning"
        }
      ],
      "historial": [
        {
          "fecha": "15/03/2026",
          "tipo": "Vacunación",
          "detalle": "Aplicación de vacuna triple felina."
        }
      ]
    }
  ],
  // Cada cita tiene fecha, hora, paciente, servicio y estado.
  // Así la misma cita se puede ver en admin, recepción, veterinario y cliente.
  "appointments": [
    {
      "id": "c1",
      "fecha": "06/09/2026",
      "hora": "09:00",
      "pacienteId": "luna",
      "servicio": "Consulta general",
      "estado": "Confirmada",
      "tipo": "ok"
    },
    {
      "id": "c2",
      "fecha": "06/09/2026",
      "hora": "10:30",
      "pacienteId": "milo",
      "servicio": "Vacuna triple felina",
      "estado": "Confirmada",
      "tipo": "ok"
    },
    {
      "id": "c3",
      "fecha": "06/09/2026",
      "hora": "12:00",
      "pacienteId": "kiwi",
      "servicio": "Consulta ave / conejo",
      "estado": "En espera",
      "tipo": "info"
    },
    {
      "id": "c4",
      "fecha": "06/09/2026",
      "hora": "15:30",
      "pacienteId": "bruno",
      "servicio": "Vacuna antirrábica canina",
      "estado": "Pendiente",
      "tipo": "warning"
    },
    {
      "id": "c5",
      "fecha": "10/09/2026",
      "hora": "16:30",
      "pacienteId": "mila",
      "servicio": "Consulta general",
      "estado": "Confirmada",
      "tipo": "ok"
    }
  ],
  // Esta lista se muestra en el panel del administrador.
  // El login de demostración NO revisa estos correos.
  "users": [
    {
      "id": "u0",
      "nombre": "Ana Contreras",
      "correo": "admin@sanmarcos.cl",
      "rol": "Administrador",
      "estado": "Activo"
    },
    {
      "id": "u1",
      "nombre": "Carolina Pérez",
      "correo": "recepcion@sanmarcos.cl",
      "rol": "Recepcionista",
      "estado": "Activo"
    },
    {
      "id": "u2",
      "nombre": "Dr. Martín Soto",
      "correo": "veterinario@sanmarcos.cl",
      "rol": "Veterinario",
      "estado": "Activo"
    },
    {
      "id": "u3",
      "nombre": "Dra. Paula Ríos",
      "correo": "paula@sanmarcos.cl",
      "rol": "Veterinario",
      "estado": "Activo"
    },
    {
      "id": "u4",
      "nombre": "Dr. Felipe Mora",
      "correo": "felipe@sanmarcos.cl",
      "rol": "Veterinario",
      "estado": "Activo"
    },
    {
      "id": "u5",
      "nombre": "Camila Rojas",
      "correo": "camila@correo.cl",
      "rol": "Dueño de mascota",
      "estado": "Activo"
    },
    {
      "id": "u6",
      "nombre": "Diego Fuentes",
      "correo": "tecnico@sanmarcos.cl",
      "rol": "Técnico veterinario",
      "estado": "Activo"
    }
  ]
};

// ============================================================
// GUARDAR Y LEER LISTAS EN ESTE NAVEGADOR
// ------------------------------------------------------------
// FALTA: un servidor que reciba y entregue estos datos.
// localStorage guarda texto. Por eso usamos JSON.stringify para
// convertir la lista en texto, y JSON.parse para volver a lista.
// ============================================================

function loadClinicList(listName) {
  const texto = localStorage.getItem("vet_data_" + listName);
  if (!texto) {
    return;
  }
  try {
    window.VET_DATA[listName] = JSON.parse(texto);
  } catch (error) {
    // Si el texto guardado está mal, se dejan los datos iniciales.
  }
}

function saveClinicList(listName) {
  const list = window.VET_DATA[listName];
  localStorage.setItem("vet_data_" + listName, JSON.stringify(list));
}

loadClinicList("services");
loadClinicList("stock");
loadClinicList("patients");
loadClinicList("appointments");
loadClinicList("users");

// Si los pacientes se guardaron antes de existir el campo tecnico,
// Luna y Mila quedan asignadas a Diego Fuentes.
let hayQueGuardarPacientes = false;
for (let i = 0; i < window.VET_DATA.patients.length; i = i + 1) {
  const p = window.VET_DATA.patients[i];
  if (p.id === "luna" || p.id === "mila") {
    if (p.tecnico !== "Diego Fuentes") {
      p.tecnico = "Diego Fuentes";
      hayQueGuardarPacientes = true;
    }
  }
}
if (hayQueGuardarPacientes === true) {
  saveClinicList("patients");
}
