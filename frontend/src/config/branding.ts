export const brandingConfig = {
  empresa: {
    nombre: "BESCO",
    eslogan: "Facility Services · Piso Técnico",
    logo: "/assets/logosNativos/besco.png",
  },

  colores: {
    // Paleta neutral (sin rojo). Los acentos de color viven en `temas` (verde cliente / ámbar admin).
    primario: "#374151",           // Slate neutro (chrome genérico)
    primarioOscuro: "#1F2937",     // Slate oscuro
    primarioClaro: "#6B7280",      // Slate claro

    secundario: "#F4F4F4",         // Gris claro para fondos secundarios
    acento: "#374151",             // Slate neutro
    acentoOscuro: "#1F2937",       // Slate oscuro

    peligro: "#EA580C",            // Naranja (severidad crítica, sin rojo)
    advertencia: "#F59E0B",
    exito: "#10B981",
    
    // Fondos - muy limpios, blancos y grises
    fondoPrincipal: "#FFFFFF",     // Blanco puro
    fondoSecundario: "#FAFAFA",    // Gris casi blanco (ultra limpio)
    fondoTerciario: "#F0F0F0",     // Gris claro para tarjetas o elementos inactivos
    fondoClaro: "#FFFFFF",         
    
    // Textos
    textoClaro: "#000000",         // Negro absoluto para alto contraste
    textoMedio: "#555555",         // Gris medio para texto secundario
    textoOscuro: "#888888",        // Gris claro para notas o placeholders
    textoEnOscuro: "#FFFFFF",      // Blanco puro sobre fondos negros o rojos
    
    // Bordes
    borde: "#E5E5E5",              // Gris muy sutil para bordes
    bordeHover: "#9CA3AF",         // Borde gris al hacer hover

    // Gradientes neutros
    gradientePrimario: "linear-gradient(135deg, #374151 0%, #1F2937 100%)",
    gradienteSecundario: "linear-gradient(135deg, #F9F9F9 0%, #F0F0F0 100%)",
    gradienteAcento: "linear-gradient(135deg, #4B5563 0%, #374151 100%)",
    
    // Glass effect
    fondoGlass: "rgba(255, 255, 255, 0.8)", // Clean glass
    
    // Sombras (más sutiles y elegantes)
    sombra: "0 2px 8px rgba(0, 0, 0, 0.04)",
    sombraMedia: "0 8px 16px rgba(0, 0, 0, 0.06)",
    sombraGrande: "0 16px 32px rgba(0, 0, 0, 0.08)",
  },
  
  metricas: {
    empleados: 568,
    departamentos: 9,
    tareasCompletadas: 13,
    progreso: 70,
  },
  
  ia: {
    nombre: "MAYIA",
    modelo: "Gemini 3.5 Flash",
    habilitado: true,
  },

  // Acentos por modo (toda decisión de color vive aquí)
  temas: {
    admin: {
      nombre: "Operación interna",
      acento: "#F59E0B",        // amarillo
      acentoOscuro: "#B45309",
      acentoSuave: "#FEF3C7",
      sobreAcento: "#1F2937",   // texto sobre amarillo (contraste AA)
    },
    cliente: {
      nombre: "Edificios inteligentes",
      acento: "#10B981",        // verde
      acentoOscuro: "#047857",
      acentoSuave: "#D1FAE5",
      sobreAcento: "#FFFFFF",
    },
  },
};

export type TemaBesco = typeof brandingConfig.temas.admin;

export type BrandingConfig = typeof brandingConfig;