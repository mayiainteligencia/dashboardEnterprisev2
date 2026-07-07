import React, { useState } from 'react';
import { WAI_BRAND_CONFIG } from '../../../config/branding';
import { MessagesSquare, FileText, Send, CheckCircle2, User, BookOpen, Clock, AlertTriangle } from 'lucide-react';

interface Mesa {
  num: string;
  tema: string;
  desc: string;
  pregunta: string;
  relatora: string;
  moderadora: string;
  docs: string[];
  color: string;
  cupo: number;
  asistentes: number;
}

const MESAS_DATA: Mesa[] = [
  {
    num: "01",
    tema: "Talento y Formación",
    desc: "¿Cómo acelerar la formación y visibilización de más mujeres liderando en IA en México?",
    pregunta: "¿Qué debe pasar para que más mujeres lideren en IA en México?",
    relatora: "Brenda Carballo Perez",
    moderadora: "Susan Verdiguel",
    docs: ["Brechas de género en STEM México 2025.pdf", "Educacion IA en LATAM.pdf"],
    color: "#D4AF37",
    cupo: 40,
    asistentes: 32
  },
  {
    num: "02",
    tema: "IA y Competitividad",
    desc: "¿Cómo asegurar la adopción real de la IA en los sectores productivos con retorno económico?",
    pregunta: "¿Cómo llevar la IA a la adopción real con impacto económico?",
    relatora: "Mtra. Diana Rosas",
    moderadora: "Dra. Amanda Carballo-Pérez",
    docs: ["Productividad de IA en Manufactura.pdf", "Reporte NEORIS Competitividad.pdf"],
    color: "#8B5CF6",
    cupo: 50,
    asistentes: 42
  },
  {
    num: "03",
    tema: "Gobernanza y Confianza",
    desc: "¿Qué marcos éticos y regulatorios hacen viable una IA transparente, útil y libre de sesgos?",
    pregunta: "¿Qué marcos hacen viable una IA ética, útil y transparente?",
    relatora: "Dra. Sylvia Conde",
    moderadora: "Dra. Karen Villeda",
    docs: ["Gobernanza de IA Latinoamerica.pdf", "Lineamientos de Etica en IA WAI.pdf"],
    color: "#FF4081",
    cupo: 35,
    asistentes: 31
  },
  {
    num: "04",
    tema: "Investigación y Transferencia",
    desc: "¿Cómo conectar de forma efectiva los laboratorios académicos con las necesidades corporativas?",
    pregunta: "¿Cómo conectar de forma efectiva la academia y la empresa?",
    relatora: "Dra. Verónica Viniegra",
    moderadora: "Dra. Sylvia Conde",
    docs: ["Patentes de IA en Mexico.pdf", "Transferencia de Tecnologia de UNAM.pdf"],
    color: "#10B981",
    cupo: 40,
    asistentes: 28
  },
  {
    num: "05",
    tema: "Emprendimiento y Capital",
    desc: "¿Qué herramientas, redes y capital necesitan las fundadoras de IA para escalar regionalmente?",
    pregunta: "¿Qué necesitan las fundadoras de IA para escalar y recibir inversión?",
    relatora: "Ing. Mariana Costa",
    moderadora: "Ivete Sánchez Bravo",
    docs: ["VC funding for Women LATAM.pdf", "Ecosistema de Startups de IA.pdf"],
    color: "#3B82F6",
    cupo: 35,
    asistentes: 29
  },
  {
    num: "06",
    tema: "Liderazgo y Representación",
    desc: "¿Cómo visibilizar y promover a las mujeres que ya están construyendo y operando la IA del país?",
    pregunta: "¿Cómo visibilizar a las mujeres que ya construyen la IA del país?",
    relatora: "Samantha Delfín-Azuara",
    moderadora: "Mtra. Alejandra Lagunes",
    docs: ["Directorio de Liderazgo Femenino IA.pdf", "Estadisticas WAI Mexico.pdf"],
    color: "#EF4444",
    cupo: 40,
    asistentes: 33
  }
];

export const MesasAsamblea: React.FC = () => {
  const theme = WAI_BRAND_CONFIG.theme;
  const [selectedMesa, setSelectedMesa] = useState<Mesa | null>(null);
  const [notaRelatora, setNotaRelatora] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [acuerdosList, setAcuerdosList] = useState<string[]>([
    "Establecer una beca nacional WAI para investigadoras en IA.",
    "Crear un Sandbox de pruebas regulatorias éticas con la Secretaría de Economía.",
  ]);

  const handleSendNota = () => {
    if (!notaRelatora.trim()) return;
    setAcuerdosList(prev => [...prev, notaRelatora]);
    setNotaRelatora("");
    setSuccessMsg("Propuesta de relatoría registrada e integrada a la base de conocimiento IA.");
    setTimeout(() => setSuccessMsg(""), 5000);
  };

  const cardStyle = (m: Mesa) => ({
    backgroundColor: theme.cardBgGlass,
    border: `1.5px solid ${theme.border}`,
    borderTop: `4px solid ${m.color}`,
    borderRadius: '16px',
    padding: '20px',
    boxShadow: theme.shadowCard,
    cursor: 'pointer',
    transition: 'all 0.2s',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#FFFFFF', margin: '0 0 8px 0' }}>Mesas de la Asamblea</h1>
        <p style={{ color: theme.textSecondary, fontSize: '14px', margin: 0 }}>
          Seis espacios temáticos de deliberación. Haz clic en cualquiera de las mesas para ver los detalles, moderadoras y aportar notas de relatoría directo al motor de IA.
        </p>
      </div>

      {/* Grid of Mesas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {MESAS_DATA.map((m) => (
          <div 
            key={m.num} 
            style={cardStyle(m)}
            onClick={() => {
              setSelectedMesa(m);
              setSuccessMsg("");
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = m.color}
            onMouseLeave={e => e.currentTarget.style.borderColor = theme.border}
          >
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: m.color, textTransform: 'uppercase', letterSpacing: '1px' }}>Mesa {m.num}</span>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF', margin: '4px 0 8px 0' }}>{m.tema}</h4>
            <p style={{ color: theme.textSecondary, fontSize: '13px', margin: '0 0 16px 0', lineHeight: 1.5 }}>{m.desc}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: theme.textMuted, borderTop: `1px solid ${theme.borderSubtle}`, paddingTop: '10px' }}>
              <span>Moderadora: <strong>{m.moderadora}</strong></span>
              <span style={{ color: m.color, fontWeight: '700' }}>{m.asistentes}/{m.cupo} Asistentes</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Relatoria Panel when a Mesa is selected */}
      {selectedMesa && (
        <div style={{
          backgroundColor: theme.cardBgGlass,
          border: `1.5px solid ${selectedMesa.color}`,
          borderRadius: '20px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: `0 12px 48px rgba(0,0,0,0.5)`,
          position: 'relative',
        }}>
          {/* Top colored line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: selectedMesa.color }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: selectedMesa.color, textTransform: 'uppercase', letterSpacing: '1px' }}>Detalles de la Mesa {selectedMesa.num}</span>
              <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#FFFFFF', margin: '4px 0 0 0' }}>{selectedMesa.tema}</h2>
            </div>
            <button 
              onClick={() => setSelectedMesa(null)}
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '6px 12px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '700',
              }}
            >
              Cerrar Detalles
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Left Col: Info & Docs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pregunta Detonadora</span>
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF', margin: '4px 0 0 0', lineHeight: 1.4 }}>{selectedMesa.pregunta}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '9px', color: theme.textMuted }}>MODERADORA</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <User size={12} color={selectedMesa.color} />
                    <span style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: '600' }}>{selectedMesa.moderadora}</span>
                  </div>
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>
                  <span style={{ fontSize: '9px', color: theme.textMuted }}>RELATORA</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <User size={12} color={selectedMesa.color} />
                    <span style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: '600' }}>{selectedMesa.relatora}</span>
                  </div>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>Documentos Base</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedMesa.docs.map((doc, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '8px', border: `1px solid ${theme.borderSubtle}` }}>
                      <FileText size={14} color={selectedMesa.color} />
                      <span style={{ fontSize: '12px', color: '#FFFFFF' }}>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Captura Relatoria */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessagesSquare size={16} color={selectedMesa.color} />
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>Captura de Acuerdos / Relatoría</h4>
              </div>

              <textarea 
                value={notaRelatora}
                onChange={e => setNotaRelatora(e.target.value)}
                placeholder="Escribe aquí un acuerdo, disenso o propuesta clave de la mesa..."
                style={{
                  width: '100%',
                  height: '110px',
                  backgroundColor: '#020B1C',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '12px',
                  padding: '12px',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  resize: 'none',
                  outline: 'none',
                }}
              />

              <button 
                onClick={handleSendNota}
                style={{
                  backgroundColor: selectedMesa.color,
                  color: '#020B1C',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 20px',
                  fontWeight: '700',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  alignSelf: 'flex-end',
                }}
              >
                <Send size={13} />
                Enviar a la IA de WAI
              </button>

              {successMsg && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: theme.teal, fontSize: '11px', fontWeight: '600' }}>
                  <CheckCircle2 size={14} />
                  <span>{successMsg}</span>
                </div>
              )}
            </div>
          </div>

          {/* Acuerdos Generados */}
          <div style={{ borderTop: `1px solid ${theme.borderSubtle}`, paddingTop: '16px', marginTop: '8px' }}>
            <span style={{ fontSize: '10px', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>Acuerdos de esta mesa procesados por IA WAI</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {acuerdosList.map((acuerdo, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'start', gap: '8px', backgroundColor: 'rgba(0,0,0,0.15)', padding: '10px 14px', borderRadius: '8px', borderLeft: `3px solid ${theme.teal}` }}>
                  <CheckCircle2 size={14} color={theme.teal} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '12.5px', color: '#E2E8F0', lineHeight: 1.4 }}>{acuerdo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
