export const brandingConfig = {
  empresa: {
    nombre: "Pharbiois",
    nombreCompleto: "Pharbiois BioPharma",
    eslogan: "AI Drug Discovery as a Service",
    logo: "/assets/pharbiois-logo.png",
    logoUrl: "https://static.wixstatic.com/media/91436c_2b3b8584926c4e8cb1cc7c4d4a5dc357~mv2.png",
    sitioWeb: "https://www.pharbiois.com",
    industria: "Biofarmacéutica & Descubrimiento de Fármacos",
    pais: "México",
  },

  colores: {
    // Paleta científica: Azul profundo + Teal biotech + Púrpura IA
    primario: "#0EA5E9",            // Azul cielo científico (acciones principales)
    primarioOscuro: "#0369A1",      // Azul profundo
    primarioClaro: "#38BDF8",       // Azul claro

    secundario: "#14B8A6",          // Verde teal biotech
    secundarioOscuro: "#0D9488",    // Verde teal oscuro
    secundarioClaro: "#5EEAD4",     // Verde teal claro

    acento: "#7C3AED",              // Púrpura IA/ML
    acentoClaro: "#A78BFA",         // Púrpura claro
    acentoOscuro: "#5B21B6",        // Púrpura oscuro

    // Semáforos
    peligro: "#EF4444",
    advertencia: "#F59E0B",
    exito: "#10B981",
    info: "#0EA5E9",

    // Fondos — Light mode científico
    fondoPrincipal: "#FFFFFF",      // Fondo blanco principal
    fondoSecundario: "#F8FAFC",     // Fondo sidebar gris muy sutil
    fondoTerciario: "#FFFFFF",      // Fondo cards
    fondoCuaternario: "#F1F5F9",    // Fondo cards hover
    fondoCard: "#FFFFFF",
    fondoClaro: "#E2E8F0",          // Elemento destacado

    // Texto
    textoClaro: "#0F172A",          // Texto principal oscuro
    textoMedio: "#475569",          // Texto secundario
    textoOscuro: "#94A3B8",         // Texto terciario/placeholder
    textoEnOscuro: "#FFFFFF",       // Texto claro sobre fondo oscuro (botones, badges)
    textoAcento: "#0284C7",         // Texto azul destacado

    // Bordes
    borde: "#E2E8F0",               // Borde sutil gris claro
    bordeActivo: "#0EA5E9",         // Borde activo
    bordeHover: "#14B8A6",

    // Gradientes científicos adaptados a fondo claro
    gradientePrimario: "linear-gradient(135deg, #0EA5E9 0%, #7C3AED 100%)",
    gradienteSecundario: "linear-gradient(135deg, #14B8A6 0%, #0EA5E9 100%)",
    gradienteAcento: "linear-gradient(135deg, #7C3AED 0%, #0EA5E9 100%)",
    gradienteFondo: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
    gradienteMolecula: "linear-gradient(135deg, #10B981 0%, #14B8A6 100%)",
    gradienteAlerta: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",

    // Glass effect claro
    fondoGlass: "rgba(255, 255, 255, 0.85)",
    fondoGlassClaro: "rgba(248, 250, 252, 0.9)",

    // Sombras más suaves y limpias
    sombra: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
    sombraMedia: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
    sombraGrande: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
    sombraAzul: "0 4px 20px -2px rgba(14, 165, 233, 0.1)",
    sombraTeal: "0 4px 20px -2px rgba(20, 184, 166, 0.1)",
  },

  metricas: {
    moleculasActivas: 47,
    proyectosID: 12,
    alumnosAcademia: 384,
    patentesActivas: 8,
    modulosDashboard: 6,
  },

  ia: {
    nombre: "MAYIA",
    nombreCompleto: "MAYIA Scientific",
    modelo: "Gemini Flash",
    habilitado: true,
    descripcion: "Asistente científico para Drug Discovery, análisis ADMET y cumplimiento regulatorio",
  },

  modulos: [
    { id: "dashboard", nombre: "Command Center", descripcion: "Vista ejecutiva general" },
    { id: "pipeline", nombre: "Drug Discovery Pipeline", descripcion: "Moléculas y proyectos I+D" },
    { id: "reportes", nombre: "Scientific Report Copilot", descripcion: "Generador de reportes" },
    { id: "academia", nombre: "Academia Inteligente", descripcion: "Cursos y diplomados científicos" },
    { id: "prospeccion", nombre: "Prospección Pharma", descripcion: "Leads B2B y pipeline comercial" },
    { id: "patentes", nombre: "Patent & IP Agent", descripcion: "Gestión de patentes e IP" },
    { id: "regulatorio", nombre: "Regulatory Intelligence", descripcion: "ICH, COFEPRIS, ADMET" },
  ],
};

export type BrandingConfig = typeof brandingConfig;