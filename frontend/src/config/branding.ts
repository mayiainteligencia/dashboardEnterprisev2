// WAI México Intelligence Platform — Configuración de Marca y Tema
// Documento de referencia: lineamiento_plataforma_wai_mexico_ia.pdf

export const WAI_BRAND_CONFIG = {
  clientName: "Women in AI",
  clientNameFull: "Women in AI México 2026",
  slogan: "Empoderando, Conectando y Elevando a Mujeres en IA para un Futuro Inclusivo.",
  frase: "La plataforma donde México escribe con IA la agenda del futuro.",
  evento: {
    nombre: "Primera Asamblea Nacional WAI México 2026",
    fecha: "Septiembre 24, 2026",
    fechaISO: "2026-09-24T09:00:00-06:00",
    lugar: "Ciudad de México",
    aforo: 250,
    formato: "Asamblea nacional de alto nivel · Medio día de trabajo",
  },
  organizacion: {
    fundacion: "2016",
    fundadoras: ["Dr. Hanan Salam", "Caroline Lair", "Moojan Asghari"],
    lugarFundacion: "París, Francia",
    tipo: "Nonprofit global do-tank",
    mision: "Empoderar a mujeres y minorías para convertirse en expertas, innovadoras y líderes en IA y datos, mientras se fomenta el uso ético y responsable de la inteligencia artificial.",
    vision: "Shape inclusive AI for our common future",
    liderazgoMexico: ["Susan Verdiguel (Ambassador)", "Ivete Sánchez Bravo", "Samantha Delfín-Azuara"],
  },
  estadisticas: {
    miembrosGlobales: "19,000+",
    paises: "150+",
    capitulos: "150+",
    voluntarios: "~200",
    redExtendida: "150,000+",
    mujeresEnIA: "28%",
    mujeresRolesSenior: "<15%",
  },
  logo: "/logos/wai-logo.svg",
  theme: {
    // Paleta según Sección 11.1 del lineamiento
    primary: "#1F497D",       // Azul corporativo WAI
    secondary: "#D4AF37",     // Amarillo/Dorado WAI — energía de inteligencia
    accent: "#FF4081",        // Rosa Vibrante — IA interactiva
    teal: "#10B981",          // Verde/Teal — datos vivos
    purple: "#8B5CF6",        // Púrpura — innovación
    // Fondos — cabina de control premium (Sección 2, Sección 11)
    background: "#020B1C",    // Azul marino ultra oscuro
    bgSurface: "#050E1F",     // Superficie ligeramente más clara
    cardBg: "#0A192F",        // Fondo de tarjetas
    cardBgGlass: "rgba(10, 25, 47, 0.7)", // Glassmorphism oscuro
    // Bordes
    border: "rgba(212, 175, 55, 0.15)",
    borderHover: "rgba(212, 175, 55, 0.4)",
    borderSubtle: "rgba(255, 255, 255, 0.05)",
    // Gradientes
    gradient: "linear-gradient(135deg, #1F497D 0%, #D4AF37 100%)",
    gradientDark: "linear-gradient(135deg, #020B1C 0%, #0A192F 100%)",
    gradientHero: "linear-gradient(135deg, rgba(31, 73, 125, 0.5) 0%, rgba(2, 11, 28, 0.95) 100%)",
    // Textos
    textPrimary: "#FFFFFF",
    textSecondary: "#94A3B8",
    textMuted: "#64748B",
    textGold: "#D4AF37",
    textAccent: "#FF4081",
    // Efectos
    glow: "rgba(212, 175, 55, 0.15)",
    glowStrong: "rgba(212, 175, 55, 0.3)",
    glowAccent: "rgba(255, 64, 129, 0.15)",
    shadow: "0 20px 60px rgba(2, 11, 28, 0.7)",
    shadowCard: "0 8px 32px rgba(2, 11, 28, 0.5)",
  },
  // Navegación — 15 módulos del lineamiento (Sección 6)
  sidebar: {
    groups: [
      {
        label: "PLATAFORMA PRINCIPAL",
        items: [
          { id: "dashboard", label: "Centro de Encuentro WAI", icon: "Users", desc: "Networking e Información" },
          { id: "asamblea", label: "La Asamblea", icon: "Globe", desc: "El Summit WAI México" },
          { id: "registro", label: "Registro & Invitación", icon: "UserPlus", desc: "Flujo curado" },
          { id: "delegaciones", label: "Delegaciones", icon: "Building2", desc: "7 sectores activos" },
          { id: "agenda", label: "Agenda Viva", icon: "Calendar", desc: "Sep 24, 2026" },
        ]
      },
      {
        label: "MESAS & DECLARATORIA",
        items: [
          { id: "mesas", label: "Mesas de Asamblea", icon: "MessagesSquare", desc: "6 mesas temáticas" },
          { id: "ia-wai", label: "IA de WAI", icon: "Bot", desc: "Motor de documentos" },
          { id: "declaratoria", label: "Declaratoria 2026", icon: "FileText", desc: "Versionada con IA" },
        ]
      },
      {
        label: "COMUNIDAD & RED",
        items: [
          { id: "networking", label: "Networking Inteligente", icon: "Network", desc: "Conexiones por afinidad" },
          { id: "podcast", label: "Podcast & Media Hub", icon: "Mic", desc: "Voces del ecosistema" },
          { id: "community", label: "Comunidad & Voluntarios", icon: "Users", desc: "Perfiles & AI Match" },
        ]
      },
      {
        label: "OBSERVATORIO",
        items: [
          { id: "termometro", label: "Termómetro IA México", icon: "TrendingUp", desc: "7 indicadores nac." },
          { id: "directorio", label: "Directorio / Radar", icon: "MapPin", desc: "Ecosistema de IA" },
          { id: "marketplace", label: "Marketplace", icon: "Briefcase", desc: "Retos & Oportunidades" },
          { id: "metrics", label: "Métricas de Impacto", icon: "BarChart3", desc: "Programas WAI" },
        ]
      },
      {
        label: "INSTITUCIONAL",
        items: [
          { id: "sponsors", label: "Sponsors & Partners", icon: "Award", desc: "Aliados estratégicos" },
          { id: "trust", label: "Trust Center", icon: "ShieldCheck", desc: "Privacidad & Ética IA" },
        ]
      }
    ]
  },
  // Delegaciones del Summit (Sección 6.4)
  delegaciones: [
    { id: "gobierno", nombre: "Gobierno", color: "#3B82F6", desc: "Política pública y regulación de IA", seats: 35 },
    { id: "academia", nombre: "Academia", color: "#8B5CF6", desc: "Investigación y transferencia de conocimiento", seats: 40 },
    { id: "industria", nombre: "Industria", color: "#FFC000", desc: "Adopción y competitividad empresarial", seats: 50 },
    { id: "startups", nombre: "Startups / Venture", color: "#FF4081", desc: "Emprendimiento y capital de riesgo", seats: 35 },
    { id: "camaras", nombre: "Cámaras / Asociaciones", color: "#10B981", desc: "Gremios y organizaciones sectoriales", seats: 30 },
    { id: "talento", nombre: "Talento Emergente", color: "#F97316", desc: "Desarrolladoras, estudiantes y nuevo liderazgo", seats: 40 },
    { id: "sponsors", nombre: "Sponsors / Medios", color: "#94A3B8", desc: "Patrocinadores y aliados de comunicación", seats: 20 },
  ],
  // Sponsors reales (womeninai.co)
  sponsors: [
    { nombre: "NEORIS", tipo: "Marca Protagonista", nivel: "platinum" },
    { nombre: "Sun Life", tipo: "Premium Sponsor", nivel: "gold" },
    { nombre: "Deloitte", tipo: "Venue Partner", nivel: "gold" },
    { nombre: "Capgemini", tipo: "Socio Corporativo", nivel: "silver" },
    { nombre: "Google Cloud", tipo: "Cloud Partner", nivel: "silver" },
    { nombre: "Qualcomm AI", tipo: "Research Partner", nivel: "silver" },
    { nombre: "Microsoft", tipo: "Technology Partner", nivel: "bronze" },
    { nombre: "AWS", tipo: "Cloud Partner", nivel: "bronze" },
  ],
  // Programas oficiales WAI globales
  programas: [
    { id: "waicamp", nombre: "WAICamp", desc: "Bootcamps educativos con experiencia práctica en IA" },
    { id: "waimentor", nombre: "WaiMentor", desc: "Mentoría 1-a-1 con profesionales senior de IA (3 meses)" },
    { id: "waisummit", nombre: "WaiSummit", desc: "Cumbres globales y regionales de IA femenina" },
    { id: "waiawards", nombre: "WaiAwards", desc: "Premios regionales y globales a líderes en IA" },
    { id: "wai2go", nombre: "Wai2GO", desc: "Programa educativo STEM para mujeres jóvenes" },
    { id: "wailearn", nombre: "WaiLEARN", desc: "Masterclasses y talleres para todos los niveles" },
    { id: "waidatathon", nombre: "WaiDatathon", desc: "Hackathons para resolver problemas reales con IA" },
  ],
  // Agentes de IA (Sección 9 del lineamiento)
  agentesIA: [
    { id: "orquestador", nombre: "Agente Orquestador WAI", rol: "Coordina módulos y contexto del usuario" },
    { id: "curador", nombre: "Agente Curador de Convocatoria", rol: "Evalúa perfiles y segmenta delegaciones" },
    { id: "perfil", nombre: "Agente de Perfil Inteligente", rol: "Construye bios y detecta intereses" },
    { id: "networking", nombre: "Agente de Networking", rol: "Sugiere conexiones por afinidad" },
    { id: "relatora", nombre: "Agente Relatora", rol: "Resume mesas y genera posicionamientos" },
    { id: "declaratoria", nombre: "Agente Declaratoria", rol: "Integra documentos y genera borradores" },
    { id: "podcast", nombre: "Agente Podcast-to-Insights", rol: "Transcribe y genera contenido editorial" },
    { id: "termometro", nombre: "Agente Termómetro IA", rol: "Detecta tendencias nacionales" },
    { id: "sponsor", nombre: "Agente Sponsor Intelligence", rol: "Reportes agregados anonimizados" },
    { id: "trust", nombre: "Agente Trust & Safety", rol: "Moderación y cumplimiento de consentimiento" },
  ],
};

export type WaiBrandConfig = typeof WAI_BRAND_CONFIG;

export const brandingConfig = {
  colores: {
    primario: WAI_BRAND_CONFIG.theme.primary,
    secundario: WAI_BRAND_CONFIG.theme.secondary,
    acento: WAI_BRAND_CONFIG.theme.accent,
    borde: WAI_BRAND_CONFIG.theme.border,
    fondoSecundario: WAI_BRAND_CONFIG.theme.bgSurface,
    textoOscuro: "#64748B",
    textoClaro: "#FFFFFF",
    textoMedio: "#94A3B8",
  }
};