export const brandingConfig = {
  empresa: {
    nombre: "Gas Station Inteligente",
    razonSocial: "Estación de Servicio Inteligente 4.0 S.A. de C.V.",
    grupo: "Red Gas Station Inteligente",
    eslogan: "Telemetría IoT, Precios Dinámicos & Automatización IA",
    logo: "", // Usaremos iconos vectoriales temáticos genéricos (Fuel)
  },

  colores: {
    // ── Paleta oficial Gas Station Inteligente ──
    combustibleVerde: "#059669",  // Verde Magna / Sostenibilidad
    combustibleRojo:  "#DC2626",  // Rojo Premium / Alto Octanaje
    combustibleNegro: "#1E293B",  // Diésel Automotriz / Marino
    combustibleAzul:  "#0284C7",  // GNR / Gas Natural / IoT
    
    azulMarino:      "#0F172A",   // Fondo corporativo y paneles
    cianNeon:        "#06B6D4",   // Acento tecnológico / Telemetría
    ambarAlerta:     "#D97706",   // Alertas y niveles bajos
    esmeraldaExito:  "#10B981",   // Estado óptimo y despacho
    
    // ── Roles de color en la UI ──
    primario:       "#059669",   // Verde Estación Inteligente
    primarioOscuro: "#065F46",
    primarioClaro:  "#A7F3D0",
    
    secundario:     "#0F172A",   // Azul Pizarra Profundo
    secundarioOscuro: "#020617",
    
    acento:         "#0284C7",   // Azul / Telemetría
    acentoOscuro:   "#0369A1",
    
    peligro:        "#DC2626",   // Rojo / Microfugas / Lista negra
    advertencia:    "#D97706",   // Ámbar / Stock crítico
    exito:          "#10B981",   // Verde / Transacción OK

    // ── Fondos (Limpio y profesional) ──
    fondoPrincipal:  "#FFFFFF",
    fondoSecundario: "#F8FAFC",
    fondoTerciario:  "#F1F5F9",
    fondoClaro:      "#FFFFFF",

    // ── Textos ──
    textoClaro:    "#0F172A",
    textoMedio:    "#475569",
    textoOscuro:   "#94A3B8",
    textoEnOscuro: "#FFFFFF",

    // ── Bordes ──
    borde:      "#E2E8F0",
    bordeHover: "#059669",

    // ── Gradientes ──
    gradientePrimario:   "linear-gradient(135deg, #059669 0%, #065F46 100%)",
    gradienteSecundario: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
    gradienteAcento:     "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
    gradienteExito:      "linear-gradient(135deg, #10B981 0%, #059669 100%)",

    // ── Sombras ──
    fondoGlass:    "rgba(255, 255, 255, 0.95)",
    sombra:        "0 2px 8px rgba(0, 0, 0, 0.05)",
    sombraMedia:   "0 8px 24px rgba(5, 150, 105, 0.10)",
    sombraGrande:  "0 16px 36px rgba(15, 23, 42, 0.12)",
  },

  metricas: {
    volumenDespachadoHoy: "48,250 L",
    ventasTotalesDia: "$1,124,500 MXN",
    bombasOperativas: "8 / 8",
    capacidadTotalTanques: "160,000 L",
    vehiculosAtendidos: "1,240",
    eficienciaSolar: "94.2%",
    tiempoPromedioEspera: "2.4 min",
    margenPromedioLitro: "$2.85 MXN",
    oportunidadesActivas: 41,
    pipelineActivo: "$24.8M",
  },

  ia: {
    nombre: "MAYIA",
    modelo: "Gemini 2.5 Flash",
    habilitado: true,
    empresaCliente: "Gas Station Inteligente",
  },

  // ── Temas por módulo ──
  temas: {
    admin: {
      nombre: "Dashboard General · Gas Station Inteligente",
      acento:       "#059669",   // Verde Estación
      acentoOscuro: "#065F46",
      acentoSuave:  "#D1FAE5",
      sobreAcento:  "#FFFFFF",
    },
    cliente: {
      nombre: "Portal Flotas B2B & Clientes",
      acento:       "#0284C7",   // Azul Flotas
      acentoOscuro: "#0369A1",
      acentoSuave:  "#E0F2FE",
      sobreAcento:  "#FFFFFF",
    },
    tanques: {
      nombre: "Módulo 1: Tanques & Telemetría IoT",
      acento:       "#0284C7",   // Azul Hidrocarburos
      acentoOscuro: "#0369A1",
      acentoSuave:  "#E0F2FE",
      sobreAcento:  "#FFFFFF",
    },
    precios: {
      nombre: "Módulo 2: Precios Dinámicos & IA",
      acento:       "#D97706",   // Ámbar Comercial
      acentoOscuro: "#B45309",
      acentoSuave:  "#FEF3C7",
      sobreAcento:  "#FFFFFF",
    },
    seguridad: {
      nombre: "Módulo 3: Seguridad VMS & ALPR",
      acento:       "#DC2626",   // Rojo Seguridad
      acentoOscuro: "#991B1B",
      acentoSuave:  "#FEE2E2",
      sobreAcento:  "#FFFFFF",
    },
    suministro: {
      nombre: "Módulo 4: Cadena de Suministro Odoo",
      acento:       "#7C3AED",   // Morado ERP / Retail
      acentoOscuro: "#5B21B6",
      acentoSuave:  "#EDE9FE",
      sobreAcento:  "#FFFFFF",
    },
    flotas: {
      nombre: "Módulo 5: Flotas B2B & Telemática",
      acento:       "#0F172A",   // Azul Marino Corporativo
      acentoOscuro: "#020617",
      acentoSuave:  "#F1F5F9",
      sobreAcento:  "#FFFFFF",
    },
    fidelizacion: {
      nombre: "Módulo 6: Fidelización & Pagos Digitales",
      acento:       "#EC4899",   // Rosa / Experiencia
      acentoOscuro: "#BE185D",
      acentoSuave:  "#FCE7F3",
      sobreAcento:  "#FFFFFF",
    },
    energia: {
      nombre: "Módulo 7: Hub de Energía & EV",
      acento:       "#10B981",   // Verde Solar
      acentoOscuro: "#047857",
      acentoSuave:  "#D1FAE5",
      sobreAcento:  "#FFFFFF",
    },
    mantenimiento: {
      nombre: "Módulo 8: Mantenimiento & Gemelos 3D",
      acento:       "#2563EB",   // Azul SDI / Tecnología
      acentoOscuro: "#1D4ED8",
      acentoSuave:  "#DBEAFE",
      sobreAcento:  "#FFFFFF",
    },
  },
};

export type TemaBesco = typeof brandingConfig.temas.admin;
export type TemaGasStation = typeof brandingConfig.temas.admin;
export type BrandingConfig = typeof brandingConfig;