export const brandingConfig = {
  empresa: {
    nombre: "RISKO AI",
    razonSocial: "RISKO AI Platform S.A.P.I. de C.V.",
    grupo: "Gestión & Medición del Riesgo Inmobiliario",
    eslogan: "Plataforma Agéntica de Inteligencia para Gestión y Medición del Riesgo Inmobiliario",
    logo: "", // Usaremos icono genérico de lucide-react por especificación
  },

  colores: {
    // ── Paleta Oficial RISKO AI (Estética Corporativa Limpia sobre Fondo Blanco) ──
    primario:       "#2563EB",   // Azul Cobalto / IA Accent
    primarioOscuro: "#1E40AF",   // Azul Marino Profundo
    primarioClaro:  "#EFF6FF",   // Azul Hielo Suave

    secundario:     "#4F46E5",   // Indigo agéntico
    acento:         "#0EA5E9",   // Cyan geoespacial
    acentoOscuro:   "#0369A1",

    // Indicadores Normativos de Riesgo Inmobiliario
    critico:        "#EF4444",   // Rojo (Riesgo Crítico 81-100 / Clase F)
    alto:           "#F97316",   // Naranja (Riesgo Alto 61-80 / Clase E)
    moderado:       "#F59E0B",   // Ámbar (Riesgo Moderado 41-60 / Clase C-D)
    bajo:           "#10B981",   // Verde Esmeralda (Riesgo Bajo 0-40 / Clase B)
    preferente:     "#3B82F6",   // Azul (Clase A Preferente)

    peligro:        "#EF4444",
    advertencia:    "#F59E0B",
    exito:          "#10B981",

    // ── Fondos (Blanco puro como requerido) ──
    fondoPrincipal:  "#FFFFFF",
    fondoSecundario: "#F8FAFC",
    fondoTerciario:  "#F1F5F9",
    fondoClaro:      "#FFFFFF",

    // ── Textos ──
    textoClaro:    "#0F172A",   // Slate 900
    textoMedio:    "#334155",   // Slate 700
    textoOscuro:   "#64748B",   // Slate 500
    textoEnOscuro: "#FFFFFF",

    // ── Bordes y Separadores ──
    borde:      "#E2E8F0",
    bordeHover: "#2563EB",

    // ── Gradientes Elegantes ──
    gradientePrimario:   "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
    gradienteSecundario: "linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)",
    gradienteAcento:     "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)",

    // ── Sombras y Glassmorphism Suave ──
    fondoGlass:    "rgba(255, 255, 255, 0.96)",
    sombra:        "0 1px 3px rgba(15, 23, 42, 0.08)",
    sombraMedia:   "0 4px 14px rgba(37, 99, 235, 0.10)",
    sombraGrande:  "0 12px 28px rgba(15, 23, 42, 0.12)",
  },

  metricas: {
    inmueblesEvaluados: 1450,
    sumaAseguradaTotal: "$45.8B USD",
    aalPromedio: "0.18%",
    pmlMaximo: "$420M USD",
    inspeccionesEmitidas: 842,
    hallazgosMitigados: "94.2%",
    agentesActivos: 16,
  },

  ia: {
    nombre: "RISKO Copilot",
    modelo: "Gemini 3.5 Pro (Risk Engine)",
    habilitado: true,
    empresaCliente: "RISKO AI Real Estate Risk Platform",
  },

  temas: {
    admin: {
      nombre: "Command Center Ejecutivo",
      acento:       "#2563EB",
      acentoOscuro: "#1E40AF",
      acentoSuave:  "#EFF6FF",
      sobreAcento:  "#FFFFFF",
    },
    cliente: {
      nombre: "Expediente Digital & GeoRisk",
      acento:       "#0EA5E9",
      acentoOscuro: "#0369A1",
      acentoSuave:  "#F0F9FF",
      sobreAcento:  "#FFFFFF",
    },
    compras: {
      nombre: "Ingeniería de Riesgo & Inspección",
      acento:       "#F59E0B",
      acentoOscuro: "#D97706",
      acentoSuave:  "#FFFBEB",
      sobreAcento:  "#FFFFFF",
    },
    flotillas: {
      nombre: "Valuación & Coberturas",
      acento:       "#10B981",
      acentoOscuro: "#047857",
      acentoSuave:  "#ECFDF5",
      sobreAcento:  "#FFFFFF",
    },
    tecnologia: {
      nombre: "Motor de Riesgo & Agentes IA",
      acento:       "#4F46E5",
      acentoOscuro: "#3730A3",
      acentoSuave:  "#EEF2FF",
      sobreAcento:  "#FFFFFF",
    },
  },
};

export type TemaRisko = typeof brandingConfig.temas.admin;
export type BrandingConfig = typeof brandingConfig;