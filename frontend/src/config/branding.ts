export const brandingConfig = {
  empresa: {
    nombre: "IZZI",
    razonSocial: "Empresas Cablevisión, S.A.B. de C.V.",
    grupo: "Grupo Televisa",
    eslogan: "llévatela fácil, llévatela izzi · Puntos de Venta Inteligentes M2C",
    logo: "/assets/logosEmpresas/izziLogo.webp",
  },

  colores: {
    // ── Paleta oficial izzi (Multicolor dinámico) ──
    magenta:  "#E3067A",   // Fucsia/Magenta distintivo izzi
    naranja:  "#FF6C07",   // Naranja enérgico izzi
    celeste:  "#0090D0",   // Azul / Cyan izzi
    amarillo: "#FCD116",   // Amarillo izzi
    purpura:  "#53267E",   // Púrpura profundo izzi
    lima:     "#10B981",   // Verde estado / éxito
    ambar:    "#FF6C07",   // Naranja/Ámbar izzi

    // ── Roles de color en la UI ──
    primario:       "#E3067A",   // Magenta izzi → encabezados, CTAs
    primarioOscuro: "#BD0063",   // Magenta oscuro
    primarioClaro:  "#F94F9F",   // Magenta claro

    secundario:     "#0090D0",   // Cyan/Azul izzi → badges, enlaces
    acento:         "#FF6C07",   // Naranja izzi → acciones secundarias / highlights
    acentoOscuro:   "#D45200",   // Naranja oscuro

    peligro:     "#E3067A",   // Fucsia izzi para errores críticos
    advertencia: "#FF6C07",   // Naranja para advertencias
    exito:       "#10B981",   // Verde para éxitos / OK

    // ── Fondos (Blanco puro como requerido) ──
    fondoPrincipal:  "#FFFFFF",
    fondoSecundario: "#F8F9FA",
    fondoTerciario:  "#F1F3F5",
    fondoClaro:      "#FFFFFF",

    // ── Textos ──
    textoClaro:    "#1A1A1A",
    textoMedio:    "#4A4A4A",
    textoOscuro:   "#777777",
    textoEnOscuro: "#FFFFFF",

    // ── Bordes ──
    borde:      "#E2E8F0",
    bordeHover: "#E3067A",

    // ── Gradientes izzi ──
    gradientePrimario:   "linear-gradient(135deg, #E3067A 0%, #53267E 100%)",
    gradienteSecundario: "linear-gradient(90deg, #FF6C07 0%, #0090D0 33%, #E3067A 66%, #FCD116 100%)",
    gradienteAcento:     "linear-gradient(135deg, #FF6C07 0%, #FCD116 100%)",

    // ── Glass / Sombras ──
    fondoGlass:    "rgba(255, 255, 255, 0.95)",
    sombra:        "0 2px 8px rgba(0, 0, 0, 0.04)",
    sombraMedia:   "0 8px 20px rgba(227, 6, 122, 0.12)",
    sombraGrande:  "0 16px 32px rgba(227, 6, 122, 0.18)",
  },

  metricas: {
    hogaresPasados: "15M+",
    suscriptores: "6.2M",
    puntosVenta: 120,
    ciudades: 60,
    fibraOpticaKm: "140,000 km",
    arpuPromedio: "$520",
    empleados: 15000,
  },

  ia: {
    nombre: "MAYIA",
    modelo: "Gemini 3.5 Flash",
    habilitado: true,
    empresaCliente: "izzi Telecom (Grupo Televisa)",
  },

  // ── Temas por sección adaptados a la paleta izzi ──
  temas: {
    admin: {
      nombre: "Operación de Tiendas e Islas izzi",
      acento:       "#E3067A",   // Fucsia izzi
      acentoOscuro: "#BD0063",
      acentoSuave:  "#FDEAF2",
      sobreAcento:  "#FFFFFF",
    },
    cliente: {
      nombre: "Atención a Clientes Residencial",
      acento:       "#0090D0",   // Azul izzi
      acentoOscuro: "#0071A4",
      acentoSuave:  "#E6F4FB",
      sobreAcento:  "#FFFFFF",
    },
    compras: {
      nombre: "Ventas y Contratación",
      acento:       "#FF6C07",   // Naranja izzi
      acentoOscuro: "#CC5400",
      acentoSuave:  "#FFF0E6",
      sobreAcento:  "#FFFFFF",
    },
    flotillas: {
      nombre: "Infraestructura y Red izzi",
      acento:       "#53267E",   // Púrpura izzi
      acentoOscuro: "#3D1A5E",
      acentoSuave:  "#F4EEF9",
      sobreAcento:  "#FFFFFF",
    },
    tecnologia: {
      nombre: "Tecnología, CRM & Plataforma",
      acento:       "#0090D0",   // Azul izzi
      acentoOscuro: "#006C9C",
      acentoSuave:  "#E8F6FC",
      sobreAcento:  "#FFFFFF",
    },
  },
};

export type TemaIzzi = typeof brandingConfig.temas.admin;
export type TemaBesco = TemaIzzi;
export type BrandingConfig = typeof brandingConfig;