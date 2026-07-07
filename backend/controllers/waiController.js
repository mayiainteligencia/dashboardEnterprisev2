import { procesarDocumento, sugerirConexiones, generarSintesisMesa } from '../services/waiAgentService.js';

// Base de datos provisional en memoria para simular permanencia
let documentosRecibidos = [
  { id: "doc-101", titulo: "Brechas de género en STEM México 2025.pdf", delegacion: "academia", mesa: "01", consentimiento: "sintesis", fecha: "2026-07-01", autor: "Dra. Sylvia Conde" },
  { id: "doc-102", titulo: "Reporte de Competitividad en la adopción empresarial.pdf", delegacion: "industria", mesa: "02", consentimiento: "declaratoria", fecha: "2026-07-03", autor: "NEORIS" },
  { id: "doc-103", titulo: "Gobernanza ética de IA en LATAM.pdf", delegacion: "gobierno", mesa: "03", consentimiento: "publico", fecha: "2026-07-04", autor: "Secretaría de Economía" },
];

let registrosSolicitados = [];

export async function getCommunityStats(req, res) {
  try {
    res.json({
      success: true,
      data: {
        miembros: 19000,
        paises: 150,
        capitulos: 150,
        voluntarios: 200,
        redExtendida: 150000,
        asistentesConfirmadas: 187,
        asistentesTarget: 250
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getDelegaciones(req, res) {
  try {
    res.json({
      success: true,
      data: [
        { id: "gobierno", nombre: "Gobierno", color: "#3B82F6", seats: 35, ocupados: 24, obj: "Política pública y regulación de IA" },
        { id: "academia", nombre: "Academia", color: "#8B5CF6", seats: 40, ocupados: 32, obj: "Investigación y transferencia tecnológica" },
        { id: "industria", nombre: "Industria", color: "#FFC000", seats: 50, ocupados: 42, obj: "Adopción y competitividad empresarial" },
        { id: "startups", nombre: "Startups / Venture", color: "#FF4081", seats: 35, ocupados: 29, obj: "Emprendimiento y capital de riesgo" },
        { id: "camaras", nombre: "Cámaras / Asociaciones", color: "#10B981", seats: 30, ocupados: 21, obj: "Gremios y organizaciones de industria" },
        { id: "talento", nombre: "Talento Emergente", color: "#F97316", seats: 40, ocupados: 33, obj: "Desarrolladoras y nuevo liderazgo" },
        { id: "sponsors", nombre: "Sponsors / Medios", color: "#94A3B8", seats: 20, ocupados: 6, obj: "Aliados estratégicos de financiamiento" }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getTermometro(req, res) {
  try {
    res.json({
      success: true,
      data: {
        indiceNacional: 67,
        liderazgoFemenino: 28,
        adopcionEmpresarial: 41,
        confianzaGobernanza: 54,
        conversacionIA: 78,
        egresadosIA: 3200,
        startupsActivas: 87
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getDocuments(req, res) {
  try {
    res.json({ success: true, data: documentosRecibidos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function submitDocument(req, res) {
  try {
    const { titulo, delegacion, mesa, consentimiento, texto } = req.body;
    if (!titulo) {
      return res.status(400).json({ success: false, error: "El título es requerido" });
    }

    const nuevoDoc = {
      id: `doc-${Date.now()}`,
      titulo,
      delegacion: delegacion || "general",
      mesa: mesa || "01",
      consentimiento: consentimiento || "sintesis",
      fecha: new Date().toISOString().split('T')[0],
      autor: "Usuario Asamblea"
    };

    documentosRecibidos.push(nuevoDoc);

    // Si tiene texto, lo procesamos con el servicio de IA WAI
    let analisisIA = null;
    if (texto) {
      analisisIA = await procesarDocumento(texto, mesa, delegacion);
    }

    res.json({
      success: true,
      data: nuevoDoc,
      analisis: analisisIA,
      folio: `WAI-2026-${Math.floor(1000 + Math.random() * 9000)}`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getDeclaratoriaStatus(req, res) {
  try {
    res.json({
      success: true,
      data: {
        version: "v0.1",
        estado: "borrador inicial",
        progreso: 45,
        fuentesAgregadas: documentosRecibidos.length + 1245,
        ultimaActualizacion: new Date(),
        puntosClave: [
          "Diseñar marcos éticos y de equidad en la Ley de IA mexicana.",
          "Fomentar fondos semilla liderados por mujeres.",
          "Establecer incentivos de adopción tecnológica en PYMES."
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getNetworkingMatches(req, res) {
  try {
    const perfilA = { nombre: "Usuario", cargo: "Líder de Proyecto", organizacion: "Empresa", intereses: "Gobernanza, IA Ética" };
    const perfilesEjemplo = [
      { nombre: "Dra. Sylvia Conde", cargo: "Investigadora Titular", organizacion: "UNAM", intereses: "NLP, IA Ética, Regulación" },
      { nombre: "Ing. Mariana Costa", cargo: "CTO", organizacion: "Bitso", intereses: "Fintech, Web3, Inversión" },
      { nombre: "Dra. Karen Villeda", cargo: "Co-fundadora", organizacion: "C Minds", intereses: "Gobernanza, Ética de IA" }
    ];

    const matches = await Promise.all(perfilesEjemplo.map(async (perfil) => {
      const matchDetails = await sugerirConexiones(perfilA, perfil);
      return {
        perfil,
        score: matchDetails.score,
        motivo: matchDetails.motivo
      };
    }));

    res.json({
      success: true,
      data: matches.sort((a, b) => b.score - a.score)
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getPodcasts(req, res) {
  try {
    res.json({
      success: true,
      data: [
        { ep: "EP. 12", titulo: "IA con propósito desde la academia", invitada: "Dra. Sylvia Conde", duracion: "24 min" },
        { ep: "EP. 11", titulo: "Liderazgo femenino en la industria tech", invitada: "Ing. Mariana Costa", duracion: "26 min" },
        { ep: "EP. 10", titulo: "Gobernanza y confianza en la era de la IA", invitada: "Dra. Karen Villeda", duracion: "28 min" }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function getMarketplace(req, res) {
  try {
    res.json({
      success: true,
      data: {
        retos: [
          { id: "r1", titulo: "Solución de IA para detección de fraude", entidad: "IBM México" },
          { id: "r2", titulo: "Modelo de procesamiento para lenguas indígenas", entidad: "Google Cloud México" }
        ],
        vacantes: [
          { id: "v1", titulo: "AI Specialist / Data Scientist", entidad: "NEORIS" },
          { id: "v2", titulo: "Líder de MLOps", entidad: "Bitso" }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export async function submitRegistro(req, res) {
  try {
    const { nombre, correo, organizacion, cargo, delegacion } = req.body;
    if (!nombre || !correo) {
      return res.status(400).json({ success: false, error: "Nombre y correo son requeridos" });
    }

    const folio = `WAI-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const nuevoRegistro = { folio, nombre, correo, organizacion, cargo, delegacion, fecha: new Date() };
    registrosSolicitados.push(nuevoRegistro);

    res.json({
      success: true,
      data: nuevoRegistro,
      folio
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
