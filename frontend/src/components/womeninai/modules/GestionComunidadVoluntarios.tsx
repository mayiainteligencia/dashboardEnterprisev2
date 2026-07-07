import React, { useState } from 'react';
import { 
  Users, UserCheck, Search, Filter, Bot, Award, Globe, 
  MapPin, Brain, Sparkles, TrendingUp, Check, X
} from 'lucide-react';
import { WAI_BRAND_CONFIG } from '../../../config/branding';

interface Member {
  id: number;
  nombre: string;
  rol: string;
  habilidades: string[];
  interes: string;
  ubicacion: string;
  compromiso: number; // 0-100
  activo: boolean;
}

const INITIAL_MEMBERS: Member[] = [
  { id: 1, nombre: "Gabriela Moreno", rol: "Desarrolladora Senior IA", habilidades: ["Python", "TensorFlow", "NLP"], interes: "Ética en IA", ubicacion: "CDMX, México", compromiso: 88, activo: true },
  { id: 2, nombre: "Elena Rostova", rol: "Científica de Datos", habilidades: ["PyTorch", "Computer Vision", "Python"], interes: "Mentoría", ubicacion: "Guadalajara, Jal.", compromiso: 92, activo: true },
  { id: 3, nombre: "Sofía Martínez", rol: "Estudiante Lic. Computación", habilidades: ["SQL", "Data Scraping", "R"], interes: "Hackathons", ubicacion: "Monterrey, NL", compromiso: 75, activo: false },
  { id: 4, nombre: "Ing. Beatriz Paredes", rol: "Tech Lead AI", habilidades: ["LLMs", "LangChain", "Cloud AI"], interes: "Networking", ubicacion: "Querétaro, Qro.", compromiso: 95, activo: true },
  { id: 5, nombre: "Dra. Lucía Fernández", rol: "Investigadora", habilidades: ["Deep Learning", "Generative AI", "LaTeX"], interes: "Publicaciones", ubicacion: "Puebla, Pue.", compromiso: 82, activo: true },
];

const AI_RECOMMENDATIONS = [
  { id: 1, voluntario: "Elena Rostova", habilidad: "Computer Vision", interes: "Mentoría", rolSugerido: "Mentora Técnica de Proyecto", matchScore: 97 },
  { id: 2, voluntario: "Ing. Beatriz Paredes", habilidad: "Cloud AI / LLMs", interes: "Networking", rolSugerido: "Coordinadora de Mesa Plenaria", matchScore: 94 },
  { id: 3, voluntario: "Gabriela Moreno", habilidad: "Python & NLP", interes: "Ética en IA", rolSugerido: "Relatora Mesa de Confianza", matchScore: 89 },
];

export const GestionComunidadVoluntarios: React.FC = () => {
  const theme = WAI_BRAND_CONFIG.theme;
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("Todas");
  const [newRoleInput, setNewRoleInput] = useState<{ [key: number]: string }>({});
  const [acceptedRecs, setAcceptedRecs] = useState<number[]>([]);

  const handleAcceptRec = (id: number) => {
    setAcceptedRecs([...acceptedRecs, id]);
  };

  const allSkills = ["Todas", "Python", "TensorFlow", "NLP", "PyTorch", "Computer Vision", "SQL", "LLMs", "LangChain"];

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.nombre.toLowerCase().includes(search.toLowerCase()) || 
                          m.rol.toLowerCase().includes(search.toLowerCase()) ||
                          m.ubicacion.toLowerCase().includes(search.toLowerCase());
    const matchesSkill = selectedSkill === "Todas" || m.habilidades.includes(selectedSkill);
    return matchesSearch && matchesSkill;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: theme.cardBgGlass, border: `1.5px solid ${theme.border}`, borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(31, 73, 125, 0.2)', border: `1px solid ${theme.primary}`, display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
            <Users size={20} color={theme.secondary} />
          </div>
          <div>
            <span style={{ fontSize: '11px', color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '1px' }}>Total de Miembros</span>
            <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#FFFFFF', margin: '4px 0 0' }}>1,482</h3>
          </div>
        </div>

        <div style={{ backgroundColor: theme.cardBgGlass, border: `1.5px solid ${theme.border}`, borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255, 64, 129, 0.1)', border: `1px solid ${theme.accent}`, display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
            <UserCheck size={20} color={theme.accent} />
          </div>
          <div>
            <span style={{ fontSize: '11px', color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '1px' }}>Voluntarios Activos</span>
            <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#FFFFFF', margin: '4px 0 0' }}>324</h3>
          </div>
        </div>

        <div style={{ backgroundColor: theme.cardBgGlass, border: `1.5px solid ${theme.border}`, borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: `1px solid #10B981`, display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
            <TrendingUp size={20} color="#10B981" />
          </div>
          <div>
            <span style={{ fontSize: '11px', color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '1px' }}>Tasa de Compromiso</span>
            <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#FFFFFF', margin: '4px 0 0' }}>86.4%</h3>
          </div>
        </div>
      </div>

      {/* AI MATCHMAKING RECOMMENDATIONS */}
      <div 
        style={{ 
          backgroundColor: theme.cardBgGlass, 
          border: `1.5px solid ${theme.border}`, 
          borderRadius: '20px', 
          padding: '24px',
          boxShadow: `0 10px 30px rgba(2, 11, 28, 0.4)`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Bot size={22} color={theme.secondary} />
          <h3 style={{ fontSize: '18px', fontWeight: '850', color: '#FFFFFF', margin: 0 }}>Recomendación Inteligente de Voluntarios (AI Match)</h3>
        </div>
        <p style={{ fontSize: '12px', color: theme.textSecondary, margin: '0 0 20px 0', lineHeight: 1.5 }}>
          Nuestro motor IA evalúa perfiles, habilidades y nivel de participación para sugerir el emparejamiento perfecto para roles estratégicos en el Summit y mesas técnicas de Declaratoria.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {AI_RECOMMENDATIONS.map((rec) => {
            const isAccepted = acceptedRecs.includes(rec.id);
            return (
              <div 
                key={rec.id}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: isAccepted ? `1.5px solid #10B981` : `1.5px solid ${theme.border}`,
                  borderRadius: '12px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  position: 'relative'
                }}
              >
                {/* Match Score Badge */}
                <span 
                  style={{
                    position: 'absolute', top: '14px', right: '14px',
                    fontSize: '11px', fontWeight: '800', color: theme.secondary,
                    backgroundColor: 'rgba(255, 192, 0, 0.1)', border: `1px solid ${theme.secondary}`,
                    borderRadius: '8px', padding: '3px 8px'
                  }}
                >
                  {rec.matchScore}% Match AI
                </span>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF' }}>{rec.voluntario}</span>
                  <span style={{ fontSize: '11px', color: theme.textSecondary, marginTop: '2px' }}>{rec.habilidad}</span>
                </div>

                <div style={{ borderTop: `1px solid rgba(255,255,255,0.05)`, paddingTop: '10px' }}>
                  <span style={{ fontSize: '9px', color: theme.textMuted, textTransform: 'uppercase', display: 'block' }}>Rol Propuesto por IA</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: theme.accent, marginTop: '2px', display: 'block' }}>{rec.rolSugerido}</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '10px' }}>
                  {isAccepted ? (
                    <button 
                      disabled
                      style={{
                        backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: '1px solid #10B981',
                        borderRadius: '8px', padding: '8px 12px', fontSize: '11px', fontWeight: 'bold', width: '100%'
                      }}
                    >
                      Asignación Aceptada ✓
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => handleAcceptRec(rec.id)}
                        style={{
                          backgroundColor: theme.secondary, color: '#020B1C', border: 'none',
                          borderRadius: '8px', padding: '8px 12px', fontSize: '11px', fontWeight: 'bold',
                          cursor: 'pointer', flex: 1
                        }}
                      >
                        Aceptar
                      </button>
                      <button 
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.03)', color: '#FFFFFF', border: `1px solid ${theme.border}`,
                          borderRadius: '8px', padding: '8px 12px', fontSize: '11px', fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Rechazar
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FILTER & MEMBERS TABLE */}
      <div 
        style={{ 
          backgroundColor: theme.cardBgGlass, 
          border: `1.5px solid ${theme.border}`, 
          borderRadius: '20px', 
          padding: '24px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>Listado de la Comunidad</h3>
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {/* Buscador */}
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '12px', top: '12px', color: theme.textMuted }} />
              <input 
                type="text" 
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar miembro..."
                style={{
                  backgroundColor: '#020B1C', border: `1px solid ${theme.border}`,
                  borderRadius: '10px', padding: '8px 12px 8px 32px', color: '#FFFFFF',
                  fontSize: '12px', width: '200px', outline: 'none'
                }}
              />
            </div>

            {/* Selector de habilidades */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={14} color={theme.textMuted} />
              <select
                value={selectedSkill}
                onChange={e => setSelectedSkill(e.target.value)}
                style={{
                  backgroundColor: '#020B1C', border: `1px solid ${theme.border}`,
                  borderRadius: '10px', padding: '8px 12px', color: '#FFFFFF',
                  fontSize: '12px', outline: 'none', cursor: 'pointer'
                }}
              >
                {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
                {["Miembro", "Rol / Cargo", "Habilidades", "Interés Core", "Ubicación", "Compromiso", "Estado"].map((h) => (
                  <th key={h} style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((m) => (
                <tr 
                  key={m.id}
                  style={{ borderBottom: `1px solid rgba(255,255,255,0.03)`, transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.01)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '16px', fontSize: '13px', fontWeight: '700', color: '#FFFFFF' }}>{m.nombre}</td>
                  <td style={{ padding: '16px', fontSize: '12px', color: theme.textSecondary }}>{m.rol}</td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {m.habilidades.map(h => (
                        <span key={h} style={{ fontSize: '10px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: `1px solid rgba(255,255,255,0.08)`, borderRadius: '4px', padding: '2px 6px', color: theme.textSecondary }}>{h}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '12px', color: theme.secondary, fontWeight: '500' }}>{m.interes}</td>
                  <td style={{ padding: '16px', fontSize: '12px', color: theme.textSecondary }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} color={theme.textMuted} />
                      <span>{m.ubicacion}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, width: '60px', height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${m.compromiso}%`, height: '100%', backgroundColor: m.compromiso > 90 ? '#10B981' : theme.secondary, borderRadius: '3px' }} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: '#FFFFFF' }}>{m.compromiso}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span 
                      style={{
                        fontSize: '9px', fontWeight: '700', textTransform: 'uppercase',
                        borderRadius: '20px', padding: '3px 8px',
                        backgroundColor: m.activo ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                        color: m.activo ? '#10B981' : theme.textMuted,
                        border: m.activo ? '1px solid #10B981' : '1px solid rgba(255,255,255,0.1)'
                      }}
                    >
                      {m.activo ? "Voluntario" : "Miembro"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
