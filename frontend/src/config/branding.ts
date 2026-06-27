export const brandingConfig = {
  empresa: {
    nombre: "Rich's México",
    nombreCompleto: "Productos Rich S.A. de C.V.",
    eslogan: "Infinite possibilities, predictive intelligence B2B",
    logo: "/assets/logo-richs.png",
    logoUrl: "https://www.richs.com.mx/wp-content/uploads/2019/11/logo-richs.png",
    sitioWeb: "https://www.richs.com.mx",
    industria: "Alimentos y Soluciones para Pastelería, Foodservice y Distribuidores",
    pais: "México",
  },

  colores: {
    // Paleta de Rich's: Frambuesa vibrante (#D31245) + Azul corporativo (#1E40AF)
    primario: "#D31245",            // Frambuesa Rich's
    primarioOscuro: "#A30E33",      // Frambuesa oscuro
    primarioClaro: "#F53D68",       // Frambuesa claro

    secundario: "#1E40AF",          // Azul corporativo
    secundarioOscuro: "#1E3A8A",    // Azul corporativo oscuro
    secundarioClaro: "#3B82F6",     // Azul corporativo claro

    acento: "#EA580C",              // Naranja de impulso/acción
    acentoClaro: "#F97316",         // Naranja claro
    acentoOscuro: "#C2410C",        // Naranja oscuro

    // Semáforos
    peligro: "#EF4444",
    advertencia: "#F59E0B",
    exito: "#10B981",
    info: "#3B82F6",

    // Fondos — Light mode corporativo
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
    textoAcento: "#D31245",         // Texto frambuesa destacado

    // Bordes
    borde: "#E2E8F0",               // Borde sutil gris claro
    bordeActivo: "#D31245",         // Borde activo
    bordeHover: "#1E40AF",

    // Gradientes corporativos
    gradientePrimario: "linear-gradient(135deg, #1E40AF 0%, #D31245 100%)",
    gradienteSecundario: "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)",
    gradienteAcento: "linear-gradient(135deg, #EA580C 0%, #D31245 100%)",
    gradienteFondo: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
    gradienteMolecula: "linear-gradient(135deg, #10B981 0%, #1E40AF 100%)",
    gradienteAlerta: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",

    // Glass effect claro
    fondoGlass: "rgba(255, 255, 255, 0.85)",
    fondoGlassClaro: "rgba(248, 250, 252, 0.9)",

    // Sombras
    sombra: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
    sombraMedia: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
    sombraGrande: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
    sombraAzul: "0 4px 20px -2px rgba(30, 64, 175, 0.1)",
    sombraTeal: "0 4px 20px -2px rgba(211, 18, 69, 0.1)",
  },

  metricas: {
    skuForecasted: 148,
    distribuidoresActivos: 34,
    usuariosCapacitados: 285,
    clientesFoodservice: 512,
    modulosDashboard: 7,
  },

  ia: {
    nombre: "MAYIA",
    nombreCompleto: "MAYIA Food Intelligence",
    modelo: "Gemini Flash B2B",
    habilitado: true,
    descripcion: "Asistente inteligente para pronósticos de demanda, recetas culinarias y copilotaje comercial",
  },

  modulos: [
    { id: "dashboard", nombre: "Command Center", descripcion: "Vista ejecutiva general" },
    { id: "demanda", nombre: "Demand Intelligence", descripcion: "Forecast regional de SKU y estacionalidad" },
    { id: "copilot-chef", nombre: "Chef Copilot", descripcion: "Recetario, rendimientos y solución técnica" },
    { id: "academia", nombre: "Academia Rich", descripcion: "Adopción de IA y capacitación en ventas" },
    { id: "ventas-b2b", nombre: "Ventas Foodservice", descripcion: "Copiloto comercial y simulador de clientes" },
    { id: "distribuidores", nombre: "Distribuidor 360 AI", descripcion: "Control geográfico, frecuencia y surtido" },
    { id: "ecommerce-mkt", nombre: "E-commerce & Mkt Intel", descripcion: "Precios de competencia, expansión y canal online" },
  ],
};

export type BrandingConfig = typeof brandingConfig;