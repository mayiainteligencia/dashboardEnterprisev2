export const brandingConfig = {
  empresa: {
    nombre: "FSPM",
    razonSocial: "Fire Safety & Protection Management, S.A. de C.V.",
    grupo: "FSPM Soluciones Contra Incendio",
    eslogan: "CRM Comercial, Licitaciones & Protección Contra Incendio",
    logo: "", // Usaremos iconos vectoriales temáticos genéricos
  },

  colores: {
    // ── Paleta oficial FSPM (Protección Contra Incendio, Seguridad Industrial y Gobierno) ──
    fuegoPrimario:   "#D32F2F",   // Rojo Carmín / Fuego Industrial
    fuegoOscuro:     "#9A0007",   // Rojo Oscuro / Alerta Crítica
    fuegoClaro:      "#FF6659",   // Rojo Suave / Resaltado
    
    azulMarino:      "#0F172A",   // Azul Marino Profundo (Corporativo / Gobierno)
    azulOperativo:   "#0284C7",   // Azul Operativo / SPCI
    azulSuave:       "#E0F2FE",   // Fondo Azul Claro
    
    ambarAlerta:     "#D97706",   // Ámbar Licitaciones / Plazos 3-10 días
    ambarSuave:      "#FEF3C7",   // Fondo Ámbar
    
    esmeraldaGanado: "#10B981",   // Verde Esmeralda / Negocios Ganados / OK
    esmeraldaSuave:  "#D1FAE5",   // Fondo Verde
    
    // ── Roles de color en la UI ──
    primario:       "#D32F2F",   // Rojo FSPM
    primarioOscuro: "#9A0007",
    primarioClaro:  "#FFCDD2",
    
    secundario:     "#0F172A",   // Azul Marino
    secundarioOscuro: "#020617",
    
    acento:         "#D97706",   // Ámbar / Licitaciones
    acentoOscuro:   "#B45309",
    
    peligro:        "#D32F2F",   // Rojo para seguimientos vencidos / <72h
    advertencia:    "#D97706",   // Ámbar
    exito:          "#10B981",   // Verde para ganados / checklist completo

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
    bordeHover: "#D32F2F",

    // ── Gradientes ──
    gradientePrimario:   "linear-gradient(135deg, #D32F2F 0%, #9A0007 100%)",
    gradienteSecundario: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
    gradienteAcento:     "linear-gradient(135deg, #D97706 0%, #F59E0B 100%)",
    gradienteExito:      "linear-gradient(135deg, #10B981 0%, #059669 100%)",

    // ── Glass / Sombras ──
    fondoGlass:    "rgba(255, 255, 255, 0.95)",
    sombra:        "0 2px 8px rgba(0, 0, 0, 0.05)",
    sombraMedia:   "0 8px 24px rgba(211, 47, 47, 0.10)",
    sombraGrande:  "0 16px 36px rgba(15, 23, 42, 0.12)",
  },

  metricas: {
    pipelineActivo: "$24.8M",
    oportunidadesActivas: 41,
    cotizacionesAbiertas: 23,
    licitacionesActivas: 8,
    seguimientosVencidos: 6,
    actividadesSemana: 17,
    ganadosMes: "$3.4M",
    perdidosMes: "$1.2M",
  },

  ia: {
    nombre: "MAYIA",
    modelo: "Gemini 2.5 Flash",
    habilitado: true,
    empresaCliente: "FSPM (Fire Safety & Protection Management)",
  },

  // ── Temas por módulo ──
  temas: {
    admin: {
      nombre: "Gestión Comercial & Licitaciones FSPM",
      acento:       "#D32F2F",   // Rojo FSPM
      acentoOscuro: "#9A0007",
      acentoSuave:  "#FEE2E2",
      sobreAcento:  "#FFFFFF",
    },
    cliente: {
      nombre: "Portal Clientes & Dependencias",
      acento:       "#0284C7",   // Azul
      acentoOscuro: "#0369A1",
      acentoSuave:  "#E0F2FE",
      sobreAcento:  "#FFFFFF",
    },
    licitaciones: {
      nombre: "Licitaciones & Procedimientos",
      acento:       "#D97706",   // Ámbar
      acentoOscuro: "#B45309",
      acentoSuave:  "#FEF3C7",
      sobreAcento:  "#FFFFFF",
    },
    operaciones: {
      nombre: "Sistemas Contra Incendio & SPCI",
      acento:       "#10B981",   // Verde
      acentoOscuro: "#059669",
      acentoSuave:  "#D1FAE5",
      sobreAcento:  "#FFFFFF",
    },
    documentos: {
      nombre: "Google Drive & Repositorio",
      acento:       "#0F172A",   // Marino
      acentoOscuro: "#020617",
      acentoSuave:  "#F1F5F9",
      sobreAcento:  "#FFFFFF",
    },
  },
};

export type TemaBesco = typeof brandingConfig.temas.admin;
export type TemaFspm = typeof brandingConfig.temas.admin;
export type BrandingConfig = typeof brandingConfig;