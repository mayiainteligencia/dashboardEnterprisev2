import React, { useState } from 'react';
import {
  BookOpen, Users, TrendingUp, Award, Clock, Play,
  Star, ChevronRight, Search, Filter, Zap, Calendar,
  BarChart3, CheckCircle, ArrowRight, Bookmark, Sparkles,
} from 'lucide-react';

const cursos = [
  { id: 'C001', nombre: 'Drug Discovery con IA', categoria: 'Descubrimiento', nivel: 'Avanzado', alumnos: 92, completados: 47, duracion: '40h', precio: 8900, rating: 4.9, instructor: 'Dr. Morales', tags: ['IA', 'Moléculas', 'Docking'], activo: true, inicio: 'Jul 15', progreso: 78 },
  { id: 'C002', nombre: 'Toxicoinformática Avanzada', categoria: 'Toxicología', nivel: 'Avanzado', alumnos: 64, completados: 29, duracion: '32h', precio: 7500, rating: 4.8, instructor: 'Dra. Ramírez', tags: ['ADMET', 'Toxicidad', 'in silico'], activo: true, inicio: 'Jul 22', progreso: 65 },
  { id: 'C003', nombre: 'Cumplimiento ICH & COFEPRIS', categoria: 'Regulatorio', nivel: 'Intermedio', alumnos: 48, completados: 31, duracion: '24h', precio: 5900, rating: 4.7, instructor: 'Lic. Vega', tags: ['ICH', 'COFEPRIS', 'Regulatorio'], activo: true, inicio: 'Ago 5', progreso: 52 },
  { id: 'C004', nombre: 'Quimioinformática Fundamental', categoria: 'Quimioinformática', nivel: 'Básico', alumnos: 156, completados: 98, duracion: '20h', precio: 3900, rating: 4.6, instructor: 'Dr. Castro', tags: ['QSAR', 'Descriptores', 'Python'], activo: true, inicio: 'Jul 10', progreso: 91 },
  { id: 'C005', nombre: 'Docking Molecular Práctico', categoria: 'Simulación', nivel: 'Intermedio', alumnos: 73, completados: 44, duracion: '28h', precio: 6500, rating: 4.8, instructor: 'Dra. López', tags: ['Docking', 'AutoDock', 'Glide'], activo: true, inicio: 'Jul 29', progreso: 60 },
  { id: 'C006', nombre: 'Patentes en Biotecnología', categoria: 'IP', nivel: 'Básico', alumnos: 38, completados: 12, duracion: '16h', precio: 4500, rating: 4.5, instructor: 'Lic. Torres', tags: ['Patentes', 'IP', 'Innovación'], activo: false, inicio: 'Ago 19', progreso: 31 },
];

const alumnos = [
  { nombre: 'Ana García M.', empresa: 'Laboratorios Mérida', curso: 'Drug Discovery con IA', progreso: 94, certificado: true },
  { nombre: 'Carlos Ruiz T.', empresa: 'Biotech MX', curso: 'Toxicoinformática Avanzada', progreso: 78, certificado: false },
  { nombre: 'Laura Sánchez', empresa: 'Farmacéutica del Norte', curso: 'ICH & COFEPRIS', progreso: 100, certificado: true },
  { nombre: 'Miguel Torres R.', empresa: 'UNAM - Lab Quím', curso: 'Quimioinformática', progreso: 62, certificado: false },
  { nombre: 'Patricia Luna', empresa: 'Cosméticos Innovar', curso: 'Docking Molecular', progreso: 88, certificado: false },
];

const categorias = ['Todos', 'Descubrimiento', 'Toxicología', 'Regulatorio', 'Quimioinformática', 'Simulación', 'IP'];

const nivelColor: Record<string, string> = {
  'Básico': '#10B981',
  'Intermedio': '#F59E0B',
  'Avanzado': '#EF4444',
};

export const AcademiaInteligente: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todos');
  const [tab, setTab] = useState<'cursos'|'alumnos'|'analitica'>('cursos');
  
  // States interactivos
  const [listaCursos, setListaCursos] = useState(cursos);
  const [listaAlumnos, setListaAlumnos] = useState(alumnos);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const recomendarCursoIA = () => {
    const recomendados = [
      'Drug Discovery con IA (Morales)',
      'Toxicoinformática Avanzada (Ramírez)',
      'Cumplimiento ICH & COFEPRIS (Vega)'
    ];
    const cursoRec = recomendados[Math.floor(Math.random() * recomendados.length)];
    showToast(`MAYIA recomienda: "${cursoRec}" por su alta relevancia con tus proyectos actuales.`);
  };

  const inscribirseCurso = (c: typeof cursos[0]) => {
    showToast(`¡Inscripción exitosa al curso: ${c.nombre}!`);
    setListaCursos(prev => prev.map(item => item.id === c.id ? { ...item, alumnos: item.alumnos + 1 } : item));
  };

  const simularAvance = (idx: number) => {
    setListaAlumnos(prev => prev.map((alumno, i) => {
      if (i === idx) {
        const nuevoProgreso = Math.min(alumno.progreso + 10, 100);
        showToast(`Progreso de ${alumno.nombre} incrementado a ${nuevoProgreso}%.`);
        return {
          ...alumno,
          progreso: nuevoProgreso,
          certificado: nuevoProgreso === 100 ? true : alumno.certificado
        };
      }
      return alumno;
    }));
  };

  const cursosFiltrados = listaCursos.filter(c => {
    const matchSearch = c.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const matchCat = categoria === 'Todos' || c.categoria === categoria;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '13px', background: 'linear-gradient(135deg, #14B8A6, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(20,184,166,0.3)' }}>
            <BookOpen size={20} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: 0 }}>Academia Inteligente</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>AI Learning Copilot · Cursos y diplomados científicos</p>
          </div>
        </div>
        <button className="btn-teal" onClick={recomendarCursoIA}><Zap size={14}/> Recomendar cursos con IA</button>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
        {[
          { label: 'Alumnos activos', val: '384', icon: Users, color: '#14B8A6', sub: '+28 este mes' },
          { label: 'Cursos activos', val: '18', icon: BookOpen, color: '#0EA5E9', sub: '3 próximos' },
          { label: 'Certificados emitidos', val: '247', icon: Award, color: '#7C3AED', sub: '+12 este mes' },
          { label: 'Ingresos academia', val: '$284K', icon: TrendingUp, color: '#10B981', sub: 'MXN este mes' },
        ].map(k => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="metric-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${k.color}22`, border: `1px solid ${k.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={k.color} />
                </div>
              </div>
              <div style={{ fontSize: '26px', fontWeight: '800', color: k.color, fontFamily: 'Outfit, sans-serif', lineHeight: 1 }}>{k.val}</div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginTop: '4px' }}>{k.label}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{k.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', background: '#F1F5F9', borderRadius: '12px', padding: '4px', width: 'fit-content' }}>
        {([['cursos', 'Catálogo de Cursos'], ['alumnos', 'Alumnos'], ['analitica', 'Analítica']] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              padding: '8px 18px', borderRadius: '9px', fontSize: '13px', fontWeight: '600',
              background: tab === id ? 'rgba(20,184,166,0.2)' : 'transparent',
              border: tab === id ? '1px solid rgba(20,184,166,0.4)' : '1px solid transparent',
              color: tab === id ? '#14B8A6' : '#64748B',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >{label}</button>
        ))}
      </div>

      {tab === 'cursos' && (
        <>
          {/* Search + filters */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
              <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar cursos…" style={{ width: '100%', padding: '10px 12px 10px 36px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '13px', outline: 'none' }} />
            </div>
            {categorias.map(c => (
              <button key={c} onClick={() => setCategoria(c)} style={{ padding: '8px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '600', background: categoria === c ? 'rgba(20,184,166,0.1)' : '#F1F5F9', border: `1px solid ${categoria === c ? 'rgba(20,184,166,0.25)' : 'var(--border)'}`, color: categoria === c ? '#14B8A6' : '#64748B', cursor: 'pointer', transition: 'all 0.2s' }}>{c}</button>
            ))}
          </div>

          {/* Courses grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {cursosFiltrados.map(curso => (
              <div key={curso.id} onClick={() => inscribirseCurso(curso)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', transition: 'all 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(20,184,166,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
              >
                {/* Gradient top */}
                <div style={{ height: '4px', background: curso.activo ? 'linear-gradient(90deg, #14B8A6, #0EA5E9)' : '#334155' }} />
                <div style={{ padding: '16px' }}>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '8px', background: 'rgba(20,184,166,0.1)', color: '#14B8A6', fontSize: '10px', fontWeight: '700', border: '1px solid rgba(20,184,166,0.25)' }}>
                      {curso.categoria}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: nivelColor[curso.nivel] }}>● {curso.nivel}</span>
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px', lineHeight: 1.3, fontFamily: 'Outfit, sans-serif' }}>{curso.nombre}</h3>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px' }}>{curso.instructor}</div>
                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                    {curso.tags.map(t => (
                      <span key={t} style={{ padding: '2px 8px', borderRadius: '6px', background: '#F1F5F9', color: 'var(--text-secondary)', fontSize: '10px', fontWeight: '600' }}>{t}</span>
                    ))}
                  </div>
                  {/* Progress */}
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Progreso general</span>
                      <span style={{ fontSize: '11px', color: '#14B8A6', fontWeight: '700' }}>{curso.progreso}%</span>
                    </div>
                    <div style={{ height: '4px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${curso.progreso}%`, background: 'linear-gradient(90deg, #14B8A6, #0EA5E9)', borderRadius: '999px' }} />
                    </div>
                  </div>
                  {/* Footer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}><Users size={11}/>{curso.alumnos}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={11}/>{curso.duracion}</span>
                      <span style={{ fontSize: '11px', color: '#F59E0B', display: 'flex', alignItems: 'center', gap: '3px' }}><Star size={11}/>{curso.rating}</span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-primary)' }}>${curso.precio.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'alumnos' && (
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '18px', overflow: 'hidden' }}>
          <table className="pharb-table">
            <thead><tr><th>Alumno</th><th>Empresa</th><th>Curso activo</th><th>Progreso</th><th>Certificado</th><th>Acciones</th></tr></thead>
            <tbody>
              {listaAlumnos.map((a, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #14B8A6, #0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#fff', flexShrink: 0 }}>
                        {a.nombre.charAt(0)}
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{a.nombre}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{a.empresa}</td>
                  <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{a.curso}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, height: '5px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden', minWidth: '80px' }}>
                        <div style={{ height: '100%', width: `${a.progreso}%`, background: a.progreso >= 80 ? '#10B981' : '#14B8A6', borderRadius: '999px' }} />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)' }}>{a.progreso}%</span>
                    </div>
                  </td>
                  <td>
                    {a.certificado ? <CheckCircle size={16} color="#10B981"/> : <span style={{ fontSize: '11px', color: '#64748B' }}>Pendiente</span>}
                  </td>
                  <td>
                    <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => simularAvance(i)}>Simular Avance</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'analitica' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', alignItems: 'start' }}>
          
          {/* Lado izquierdo: KPIs de Analítica */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {[
              { label: 'Categoría más popular', val: 'Drug Discovery con IA', sub: '92 alumnos activos', color: '#7C3AED' },
              { label: 'Mejor rating', val: 'Drug Discovery con IA', sub: '4.9 ★ · 47 completados', color: '#10B981' },
              { label: 'Tasa de finalización', val: '61%', sub: 'Promedio general de cursos', color: '#0EA5E9' },
              { label: 'Ticket promedio', val: '$6,200', sub: 'MXN por alumno', color: '#F59E0B' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '18px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{s.label}</div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: s.color, fontFamily: 'Outfit, sans-serif' }}>{s.val}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Lado derecho: Gráfico SVG de Crecimiento de Alumnos */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>Inscripciones Mensuales (2025)</div>
            
            {/* Gráfico de línea curved SVG */}
            <svg width="100%" height="160" viewBox="0 0 200 100" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Guías horizontales */}
              <line x1="20" y1="20" x2="190" y2="20" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="20" y1="50" x2="190" y2="50" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="20" y1="80" x2="190" y2="80" stroke="#E2E8F0" strokeWidth="1" />

              {/* Ejes y Etiquetas Y */}
              <text x="14" y="22" fontSize="6" fill="#94A3B8" textAnchor="end">150</text>
              <text x="14" y="52" fontSize="6" fill="#94A3B8" textAnchor="end">75</text>
              <text x="14" y="82" fontSize="6" fill="#94A3B8" textAnchor="end">0</text>

              {/* Área del Gráfico con Gradiente */}
              <path d="M 20 80 Q 54 65 88 45 T 156 30 Q 173 25 190 20 L 190 80 L 20 80 Z" fill="url(#areaGrad)" />
              
              {/* Línea del Gráfico */}
              <path d="M 20 80 Q 54 65 88 45 T 156 30 Q 173 25 190 20" fill="none" stroke="#14B8A6" strokeWidth="2.5" strokeLinecap="round" />

              {/* Puntos / Nodos */}
              <circle cx="20" cy="80" r="3" fill="#14B8A6" stroke="white" strokeWidth="1" />
              <circle cx="54" cy="65" r="3" fill="#14B8A6" stroke="white" strokeWidth="1" />
              <circle cx="88" cy="45" r="3" fill="#14B8A6" stroke="white" strokeWidth="1" />
              <circle cx="122" cy="50" r="3" fill="#14B8A6" stroke="white" strokeWidth="1" />
              <circle cx="156" cy="30" r="3" fill="#14B8A6" stroke="white" strokeWidth="1" />
              <circle cx="190" cy="20" r="3" fill="#14B8A6" stroke="white" strokeWidth="1" />

              {/* Etiquetas Eje X */}
              <text x="20" y="93" fontSize="6" fill="#94A3B8" textAnchor="middle">Ene</text>
              <text x="54" y="93" fontSize="6" fill="#94A3B8" textAnchor="middle">Feb</text>
              <text x="88" y="93" fontSize="6" fill="#94A3B8" textAnchor="middle">Mar</text>
              <text x="122" y="93" fontSize="6" fill="#94A3B8" textAnchor="middle">Abr</text>
              <text x="156" y="93" fontSize="6" fill="#94A3B8" textAnchor="middle">May</text>
              <text x="190" y="93" fontSize="6" fill="#94A3B8" textAnchor="middle">Jun</text>
            </svg>
            <div style={{ fontSize: '10px', color: '#14B8A6', fontWeight: '700', textAlign: 'center', marginTop: '10px' }}>
              Tendencia semestral: +45% de crecimiento en usuarios corporativos
            </div>
          </div>
        </div>
      )}
      
      {toast && (
        <div style={{
          position: 'fixed', bottom: '20px', right: '20px',
          background: '#0F172A', color: '#fff',
          padding: '12px 20px', borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          display: 'flex', alignItems: 'center', gap: '8px',
          zIndex: 9999, fontSize: '13px', fontWeight: '600',
          border: '1px solid rgba(255,255,255,0.1)',
        }}>
          <Sparkles size={16} color="#10B981" style={{ animation: 'pulse 1s infinite' }} />
          {toast}
        </div>
      )}
    </div>
  );
};
