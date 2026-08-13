export const brandingConfig = {
  empresa: {
    nombre: "TOTALPLAY",
    razonSocial: "Total Play Telecomunicaciones, S.A.P.I. de C.V.",
    grupo: "Grupo Salinas",
    eslogan: "Transformación Inteligente M2C · Puntos de Venta",
    logo: "/assets/logosNativos/TotalPlay.png",
  },

  colores: {
    // ── Paleta oficial Totalplay (5 colores de igual relevancia) ──
    magenta:  "#A61C5C",   // Rosa/Magenta fuerte
    purpura:  "#732D67",   // Púrpura oscuro
    celeste:  "#73B1BF",   // Azul-turquesa (NUEVO)
    lima:     "#BBBF41",   // Olivo/Lima
    ambar:    "#D9933D",   // Ámbar/Naranja

    // ── Roles de color en la UI ──
    // El primario principal cambia a turquesa para reducir dominancia morada
    primario:       "#73B1BF",   // Turquesa Totalplay → encabezados, nav activa
    primarioOscuro: "#4E848F",   // Turquesa oscuro
    primarioClaro:  "#A3D0D9",   // Turquesa claro

    secundario:     "#A61C5C",   // Magenta → badges, CTA, alertas
    acento:         "#D9933D",   // Ámbar → acciones secundarias / highlights
    acentoOscuro:   "#A36618",   // Ámbar oscuro

    peligro:     "#A61C5C",   // Magenta para errores críticos
    advertencia: "#D9933D",   // Ámbar para advertencias
    exito:       "#BBBF41",   // Lima para éxitos / OK

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
    bordeHover: "#73B1BF",   // Turquesa en hover

    // ── Gradientes ──
    gradientePrimario:   "linear-gradient(135deg, #73B1BF 0%, #4E848F 100%)",
    gradienteSecundario: "linear-gradient(135deg, #A61C5C 0%, #732D67 100%)",
    gradienteAcento:     "linear-gradient(135deg, #D9933D 0%, #BBBF41 100%)",

    // ── Glass / Sombras ──
    fondoGlass:    "rgba(255, 255, 255, 0.95)",
    sombra:        "0 2px 8px rgba(0, 0, 0, 0.04)",
    sombraMedia:   "0 8px 20px rgba(115, 177, 191, 0.12)",
    sombraGrande:  "0 16px 32px rgba(115, 177, 191, 0.18)",
  },

  metricas: {
    hogaresPasados: "19M+",
    suscriptores: "5.5M",
    puntosVenta: 112,
    ciudades: 87,
    fibraOpticaKm: "164,000 km",
    arpuPromedio: "$588",
    empleados: 5500,
  },

  ia: {
    nombre: "MAYIA",
    modelo: "Gemini 3.5 Flash",
    habilitado: true,
    empresaCliente: "Totalplay Telecomunicaciones",
  },

  // ── Temas por sección distribuidos entre los 5 colores ──
  temas: {
    admin: {
      nombre: "Operación de Tiendas e Islas",
      acento:       "#73B1BF",   // Turquesa
      acentoOscuro: "#4E848F",
      acentoSuave:  "#EAF5F7",
      sobreAcento:  "#FFFFFF",
    },
    cliente: {
      nombre: "Atención al Cliente Residencial",
      acento:       "#BBBF41",   // Lima
      acentoOscuro: "#8B8F26",
      acentoSuave:  "#F7F8E2",
      sobreAcento:  "#1A1A1A",
    },
    compras: {
      nombre: "Ventas y Contratación",
      acento:       "#A61C5C",   // Magenta
      acentoOscuro: "#751240",
      acentoSuave:  "#FCE7F1",
      sobreAcento:  "#FFFFFF",
    },
    flotillas: {
      nombre: "Infraestructura y Cobertura",
      acento:       "#D9933D",   // Ámbar
      acentoOscuro: "#A36618",
      acentoSuave:  "#FDF4E7",
      sobreAcento:  "#FFFFFF",
    },
    tecnologia: {
      nombre: "Tecnología y Datos",
      acento:       "#732D67",   // Púrpura
      acentoOscuro: "#4A1B43",
      acentoSuave:  "#F5E8F3",
      sobreAcento:  "#FFFFFF",
    },
  },
};

export type TemaBesco = typeof brandingConfig.temas.admin;
export type TemaTotalplay = typeof brandingConfig.temas.admin;
export type BrandingConfig = typeof brandingConfig;