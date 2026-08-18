import React, { useState, useEffect } from 'react';
import { Cpu, Activity, BarChart3, ShieldCheck, Zap, TrendingDown, RefreshCw, Download, Play, X, Sliders, CheckCircle2 } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

const CLASES = [
  { clase: 'A', nombre: 'Preferente', desc: 'Riesgo óptimo, excelentes controles NFPA y estructurales.', color: '#3B82F6', count: 280, pct: 19 },
  { clase: 'B', nombre: 'Estándar', desc: 'Cumple normas estándar sin banderas críticas.', color: '#10B981', count: 565, pct: 39 },
  { clase: 'C', nombre: 'Con Recomendaciones', desc: 'Requiere mejoras de bajo CAPEX en 90 días.', color: '#F59E0B', count: 290, pct: 20 },
  { clase: 'D', nombre: 'Con Condiciones', desc: 'Deducibles incrementados o sublímites especiales.', color: '#F97316', count: 174, pct: 12 },
  { clase: 'E', nombre: 'Difícil Colocación', desc: 'Alta vulnerabilidad, requiere intervención urgente.', color: '#EF4444', count: 101, pct: 7 },
  { clase: 'F', nombre: 'Temporalmente Inaceptable', desc: 'Falla crítica de vida/seguridad. Sin cobertura.', color: '#7F1D1D', count: 40, pct: 3 },
];

const OEP_POINTS = [
  [0, 100], [20, 85], [50, 60], [100, 42], [200, 28], [250, 22], [500, 12], [1000, 5], [2000, 1],
];

export const MotorRiesgoEscenariosModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [animated, setAnimated] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRescoring, setIsRescoring] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [scoreGlobal, setScoreGlobal] = useState(46);

  const [scoreDims, setScoreDims] = useState([
    { dim: 'Geografía & NatCat', score: 68, color: '#EF4444' },
    { dim: 'Terreno & Geotecnia', score: 32, color: '#10B981' },
    { dim: 'Construcción & Estructura', score: 45, color: '#F59E0B' },
    { dim: 'Incendio & NFPA', score: 58, color: '#F97316' },
    { dim: 'Instalaciones Críticas', score: 38, color: '#10B981' },
    { dim: 'Ocupación & Operación', score: 29, color: '#10B981' },
    { dim: 'Continuidad BI', score: 52, color: '#F59E0B' },
    { dim: 'Valuación & Infraseguro', score: 41, color: '#F59E0B' },
  ]);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(t);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRunRescoring = () => {
    setIsRescoring(true);
    setTimeout(() => {
      setScoreGlobal(42);
      setScoreDims(prev => prev.map(d => ({ ...d, score: Math.max(20, d.score - 4) })));
      setIsRescoring(false);
      showToast('⚡ Re-scoring global completado: Score de cartera optimizado a 42/100 (-4 pts).');
    }, 1400);
  };

  const handleExportCurves = () => {
    showToast('📊 Curva OEP/AEP y tabla actuarial de pérdidas descargada en Excel (.xlsx).');
  };

  // Build SVG path for OEP curve
  const svgW = 400;
  const svgH = 200;
  const maxX = 2000;
  const maxY = 100;
  const toSvg = (x: number, y: number) => [
    (x / maxX) * svgW,
    svgH - (y / maxY) * svgH,
  ];
  const pathD = OEP_POINTS.map(([x, y], i) => {
    const [sx, sy] = toSvg(x, y);
    return (i === 0 ? 'M' : 'L') + sx.toFixed(1) + ' ' + sy.toFixed(1);
  }).join(' ');

  const markers = [
    { periodoY: 50,  label: '50y',  x: 200, y: 28 },
    { periodoY: 250, label: '250y', x: 500, y: 12 },
    { periodoY: 500, label: '500y', x: 1000, y: 5 },
  ];

  return (
    <div style={{ padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          padding: '14px 20px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          fontSize: '13px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 9999,
          animation: 'fadeSlideUp 0.3s ease both'
        }}>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px', animation: 'fadeSlideUp 0.4s ease both' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ padding: '6px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'inline-flex' }}>
              <Cpu size={24} color={colores.primario} />
            </span>
            Motor de Riesgo &amp; Escenarios (AAL &amp; Curvas Excedencia)
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
            Dashboard 13 · Curva OEP, AAL, clases de asegurabilidad A–F y desglose por dimensión
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleRunRescoring}
            disabled={isRescoring}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: `1px solid ${colores.primario}`,
              backgroundColor: '#EFF6FF',
              color: colores.primario,
              fontSize: '12px',
              fontWeight: '700',
              cursor: isRescoring ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RefreshCw size={14} style={{ animation: isRescoring ? 'spin 1s linear infinite' : 'none' }} />
            {isRescoring ? 'Re-calculando...' : 'Re-scoring Algorítmico'}
          </button>

          <button
            onClick={handleExportCurves}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: colores.primario,
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Download size={14} /> Exportar Curvas OEP
          </button>
        </div>
      </div>

      {/* KPI ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Score Global Cartera', value: `${scoreGlobal} / 100`, color: '#F59E0B', bg: '#FFFBEB', sub: 'Riesgo Moderado Global' },
          { label: 'AAL Promedio Cartera', value: '0.18%', color: colores.primario, bg: '#EFF6FF', sub: '$82.4M USD / año' },
          { label: 'PML Máximo (250y)', value: '$420M USD', color: '#EF4444', bg: '#FEF2F2', sub: 'Escenario Sismo CDMX' },
          { label: 'Clases Preferentes (A+B)', value: '58%', color: '#10B981', bg: '#ECFDF5', sub: '845 Inmuebles conformes' },
        ].map((k, i) => (
          <div key={i} style={{
            padding: '18px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            border: `1px solid ${colores.borde}`,
            borderTop: `3px solid ${k.color}`,
            boxShadow: '0 2px 6px rgba(15,23,42,0.04)',
            animation: `fadeSlideUp 0.4s ease ${i * 0.08}s both`,
          }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: colores.textoOscuro, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k.label}</span>
            <div style={{ fontSize: '24px', fontWeight: '800', color: colores.textoClaro, margin: '6px 0 2px' }}>{k.value}</div>
            <span style={{ fontSize: '11px', color: colores.textoOscuro }}>{k.sub}</span>
          </div>
        ))}
      </div>

      {/* MAIN 2-COL: CURVA OEP + CLASES A-F */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>

        {/* LEFT: CURVA OEP */}
        <div style={{
          padding: '24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: `1px solid ${colores.borde}`,
          boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
          animation: 'fadeSlideUp 0.4s ease 0.3s both',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
              Curva OEP (Occurrence Exceedance Probability)
            </h3>
            <span style={{ fontSize: '11px', fontWeight: '700', color: colores.primario, backgroundColor: '#EFF6FF', padding: '3px 10px', borderRadius: '12px' }}>
              Modelo NatCat Actuarial
            </span>
          </div>

          {/* SVG Container */}
          <div style={{ backgroundColor: '#F8FAFC', borderRadius: '12px', padding: '16px', border: `1px solid ${colores.borde}` }}>
            <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: '100%', height: '180px', overflow: 'visible' }}>
              <defs>
                <linearGradient id="oepGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[25, 50, 75].map(v => (
                <line key={v} x1="0" y1={(v / 100) * svgH} x2={svgW} y2={(v / 100) * svgH} stroke="#E2E8F0" strokeDasharray="4,4" />
              ))}

              {/* Area under curve */}
              <path
                d={`${pathD} L${svgW} ${svgH} L0 ${svgH} Z`}
                fill="url(#oepGrad)"
              />

              {/* Curve line */}
              <path
                d={pathD}
                fill="none"
                stroke={colores.primario}
                strokeWidth="2.5"
                strokeDasharray={animated ? 'none' : '1000'}
                strokeDashoffset={animated ? 0 : 1000}
                style={{ transition: 'stroke-dashoffset 1.5s ease 0.2s' }}
              />

              {/* Return period markers */}
              {markers.map((m, idx) => {
                const [mx, my] = toSvg(m.x, m.y);
                return (
                  <g key={idx}>
                    <line x1={mx} y1={my} x2={mx} y2={svgH} stroke="#EF4444" strokeWidth="1" strokeDasharray="3,3" />
                    <circle cx={mx} cy={my} r="4" fill="#EF4444" />
                    <text x={mx + 4} y={my - 6} fontSize="10" fontWeight="700" fill={colores.textoClaro}>{m.label}</text>
                  </g>
                );
              })}
            </svg>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: colores.textoOscuro, marginTop: '8px' }}>
              <span>Pérdida / Daño ($ USD)</span>
              <span>Período de Retorno (Años) &rarr; 2,000y</span>
            </div>
          </div>
        </div>

        {/* RIGHT: CLASES A-F */}
        <div style={{
          padding: '24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: `1px solid ${colores.borde}`,
          boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
          animation: 'fadeSlideUp 0.4s ease 0.35s both',
        }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
            Distribución por Clase de Asegurabilidad
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {CLASES.map((c, i) => (
              <div 
                key={c.clase} 
                onClick={() => {
                  const next = selectedClass === c.clase ? null : c.clase;
                  setSelectedClass(next);
                  showToast(next ? `Filtrando activos Clase ${c.clase} (${c.nombre}) - ${c.count} inmuebles` : 'Mostrando todas las clases');
                }}
                style={{ 
                  padding: '10px 12px', 
                  borderRadius: '10px', 
                  backgroundColor: selectedClass === c.clase ? '#EFF6FF' : '#F8FAFC', 
                  border: `1px solid ${selectedClass === c.clase ? colores.primario : colores.borde}`, 
                  borderLeft: `4px solid ${c.color}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#EFF6FF'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = selectedClass === c.clase ? '#EFF6FF' : '#F8FAFC'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ fontSize: '13px', color: c.color }}>Clase {c.clase}</strong>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: colores.textoClaro }}>· {c.nombre}</span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: colores.textoClaro }}>{c.count} activos ({c.pct}%)</span>
                </div>
                <div style={{ width: '100%', height: '4px', backgroundColor: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    width: animated ? `${c.pct * 2.5}%` : '0%',
                    height: '100%',
                    backgroundColor: c.color,
                    borderRadius: '2px',
                    transition: `width 0.8s ease ${0.4 + i * 0.05}s`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM: DESCOMPOSICIÓN DE SCORE */}
      <div style={{
        padding: '24px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: `1px solid ${colores.borde}`,
        boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
        animation: 'fadeSlideUp 0.4s ease 0.45s both',
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
          Descomposición Ponderada del Score por Dimensión
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {scoreDims.map((d, i) => (
            <div 
              key={i} 
              onClick={() => showToast(`🔍 Dimensión "${d.dim}": Score actual ${d.score}/100.`)}
              style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: `1px solid ${colores.borde}`, cursor: 'pointer', transition: 'all 0.15s ease' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#EFF6FF'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', color: colores.textoClaro, marginBottom: '6px' }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.dim}</span>
                <span style={{ color: d.color }}>{d.score}</span>
              </div>
              <div style={{ width: '100%', height: '4px', backgroundColor: '#E2E8F0', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: animated ? `${d.score}%` : '0%', height: '100%', backgroundColor: d.color, borderRadius: '2px', transition: `width 0.8s ease ${0.5 + i * 0.04}s` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
