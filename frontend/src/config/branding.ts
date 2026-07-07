export const brandingConfig = {
  empresa: {
    nombre: "Movilidad Inteligente CDMX",
    nombreCompleto: "Movilidad Inteligente CDMX",
    eslogan: "Tu guía de transporte en la capital",
    logo: "/metro-logo.svg",
    logoUrl: "/metro-logo.svg",
    sitioWeb: "https://www.metro.cdmx.gob.mx",
    industria: "Transporte Público & Movilidad Urbana",
    pais: "México",
  },

  colores: {
    // Paleta de colores Metro CDMX
    primario: "#D40000",            // Rojo Metro CDMX
    primarioOscuro: "#990000",      // Rojo oscuro
    primarioClaro: "#FF3333",       // Rojo claro

    secundario: "#003DA5",          // Azul Metrobús
    secundarioOscuro: "#002666",    // Azul oscuro
    secundarioClaro: "#3366CC",     // Azul claro

    acento: "#F5A623",              // Dorado Metro L3
    acentoClaro: "#FFC04D",         // Dorado claro
    acentoOscuro: "#B37100",        // Dorado oscuro

    // Semáforos
    peligro: "#D40000",
    advertencia: "#F5A623",
    exito: "#00843D",
    info: "#003DA5",

    // Fondos — Dark mode como default
    fondoPrincipal: "#0D0D0D",      // Fondo principal negro/gris muy oscuro
    fondoSecundario: "#1A1A2E",     // Fondo tarjetas/sidebar
    fondoTerciario: "#161625",      // Fondo cards
    fondoCuaternario: "#252538",    // Fondo cards hover
    fondoCard: "#1A1A2E",
    fondoClaro: "#2A2A3E",          // Elemento destacado

    // Texto
    textoClaro: "#FFFFFF",          // Texto principal claro
    textoMedio: "#A0AEC0",          // Texto secundario
    textoOscuro: "#4A5568",         // Texto terciario/placeholder
    textoEnOscuro: "#FFFFFF",       // Texto claro sobre fondo oscuro
    textoAcento: "#D40000",         // Texto rojo destacado

    // Bordes
    borde: "#2A2A3E",               // Borde sutil gris oscuro
    bordeActivo: "#D40000",         // Borde activo
    bordeHover: "#003DA5",

    // Gradientes CDMX
    gradientePrimario: "linear-gradient(135deg, #D40000 0%, #003DA5 100%)",
    gradienteSecundario: "linear-gradient(135deg, #00843D 0%, #D40000 100%)",
    gradienteAcento: "linear-gradient(135deg, #F5A623 0%, #D40000 100%)",
    gradienteFondo: "linear-gradient(135deg, #0D0D0D 0%, #1A1A2E 100%)",
    gradienteMolecula: "linear-gradient(135deg, #00843D 0%, #F5A623 100%)",
    gradienteAlerta: "linear-gradient(135deg, #F5A623 0%, #D40000 100%)",

    // Glass effect oscuro
    fondoGlass: "rgba(26, 26, 46, 0.85)",
    fondoGlassClaro: "rgba(22, 22, 37, 0.9)",

    // Sombras
    sombra: "0 1px 3px 0 rgba(0, 0, 0, 0.2)",
    sombraMedia: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
    sombraGrande: "0 10px 15px -3px rgba(0, 0, 0, 0.4)",
    sombraAzul: "0 4px 20px -2px rgba(0, 61, 165, 0.2)",
    sombraTeal: "0 4px 20px -2px rgba(0, 132, 61, 0.2)",
  },

  metricas: {
    estacionesClave: 36,
    lineasActivas: 12,
    operadoresCDMX: 7,
  },

  ia: {
    nombre: "Movilidad AI",
    nombreCompleto: "Asistente de Movilidad CDMX",
    modelo: "Gemini Flash",
    habilitado: true,
    descripcion: "Asistente inteligente de rutas, combinación de líneas y tarifas para la Ciudad de México.",
  },

  modulos: [
    { id: "home", nombre: "Planificador de Rutas", descripcion: "Planificador puerta a puerta" },
    { id: "estado", nombre: "Estado del Servicio", descripcion: "Alertas y avance de trenes en vivo" },
    { id: "salidas", nombre: "Próximas Salidas", descripcion: "Horarios en tiempo real" },
    { id: "tarifas", nombre: "Tarifas y Pago", descripcion: "Costos y Tarjeta MI" },
    { id: "operadores", nombre: "Directorio Operadores", descripcion: "Horarios y contacto oficial" },
    { id: "accesible", nombre: "Viaje Accesible", descripcion: "Discapacidad y guías de viaje" },
    { id: "turismo", nombre: "Salidas y Turismo", descripcion: "Destinos y eventos masivos" },
  ],
};

export type BrandingConfig = typeof brandingConfig;