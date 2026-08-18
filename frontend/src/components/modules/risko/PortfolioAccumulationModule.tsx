import React, { useState, useEffect } from 'react';
import { Map, ShieldAlert, BarChart3, Building2, TrendingDown, Zap, AlertTriangle, Play, Loader, Download, X, Eye } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

const HEATMAP_ZONES = [
  { nombre: 'CDMX Cuauhtémoc',    intensidad: 1.00, expo: '$1.45B USD', activos: 182, pga: '0.42g' },
  { nombre: 'CDMX Benito Juárez', intensidad: 0.88, expo: '$1.12B USD', activos: 145, pga: '0.38g' },
  { nombre: 'Edo Méx Cuautitlán', intensidad: 0.76, expo: '$890M USD',  activos: 110, pga: '0.31g' },
  { nombre: 'Monterrey Centro',   intensidad: 0.72, expo: '$620M USD',  activos: 95,  pga: '0.12g' },
  { nombre: 'Guadalajara Zapopan',intensidad: 0.65, expo: '$480M USD',  activos: 78,  pga: '0.28g' },
  { nombre: 'CDMX Miguel Hidalgo',intensidad: 0.60, expo: '$410M USD',  activos: 64,  pga: '0.34g' },
  { nombre: 'Querétaro Centro',   intensidad: 0.54, expo: '$380M USD',  activos: 58,  pga: '0.18g' },
  { nombre: 'Puebla Centro',      intensidad: 0.49, expo: '$350M USD',  activos: 52,  pga: '0.25g' },
  { nombre: 'Apodaca NL',         intensidad: 0.44, expo: '$330M USD',  activos: 49,  pga: '0.10g' },
  { nombre: 'Cancún Zona Hotelera',intensidad:0.38, expo: '$320M USD',  activos: 44,  pga: '0.08g' },
  { nombre: 'Tijuana Centro',     intensidad: 0.33, expo: '$290M USD',  activos: 39,  pga: '0.35g' },
  { nombre: 'León Guanajuato',    intensidad: 0.30, expo: '$270M USD',  activos: 36,  pga: '0.15g' },
  { nombre: 'Toluca Centro',      intensidad: 0.27, expo: '$240M USD',  activos: 32,  pga: '0.29g' },
  { nombre: 'San Luis Potosí',    intensidad: 0.22, expo: '$210M USD',  activos: 28,  pga: '0.14g' },
  { nombre: 'Chihuahua Centro',   intensidad: 0.20, expo: '$190M USD',  activos: 25,  pga: '0.11g' },
  { nombre: 'Mérida Norte',       intensidad: 0.18, expo: '$170M USD',  activos: 23,  pga: '0.05g' },
  { nombre: 'Hermosillo',         intensidad: 0.15, expo: '$150M USD',  activos: 20,  pga: '0.16g' },
  { nombre: 'Culiacán',           intensidad: 0.13, expo: '$130M USD',  activos: 17,  pga: '0.19g' },
  { nombre: 'Morelia Centro',     intensidad: 0.12, expo: '$120M USD',  activos: 15,  pga: '0.27g' },
  { nombre: 'Veracruz Puerto',    intensidad: 0.10, expo: '$110M USD',  activos: 14,  pga: '0.22g' },
  { nombre: 'Mazatlán',           intensidad: 0.09, expo: '$95M USD',   activos: 12,  pga: '0.17g' },
  { nombre: 'Aguascalientes',     intensidad: 0.08, expo: '$85M USD',   activos: 10,  pga: '0.13g' },
  { nombre: 'Saltillo Centro',    intensidad: 0.07, expo: '$75M USD',   activos: 9,   pga: '0.10g' },
  { nombre: 'Tuxtla Gutiérrez',   intensidad: 0.06, expo: '$65M USD',   activos: 8,   pga: '0.36g' },
  { nombre: 'Oaxaca Centro',      intensidad: 0.04, expo: '$50M USD',   activos: 6,   pga: '0.40g' },
];

const TOP5 = [
  { zona: 'CDMX - Cuauhtémoc', exposicion: '$1.45B', pct: 100, color: '#7F0000' },
  { zona: 'Edo Méx - Cuautitlán', exposicion: '$890M', pct: 61, color: '#CC0000' },
  { zona: 'Monterrey - Centro', exposicion: '$620M', pct: 43, color: '#E53935' },
  { zona: 'Guadalajara - Zapopan', exposicion: '$480M', pct: 33, color: '#F26D6D' },
  { zona: 'Cancún - Z. Hotelera', exposicion: '$320M', pct: 22, color: '#FBC4C4' },
];

const SCENARIOS = [
  { nombre: 'Sismo Mw 6.8', perdida: '$180M USD', utilizacion: 43, color: '#F59E0B' },
  { nombre: 'Sismo Mw 7.2', perdida: '$340M USD', utilizacion: 81, color: '#EF4444' },
  { nombre: 'Huracán Cat4', perdida: '$245M USD', utilizacion: 58, color: '#8B5CF6' },
];

const getHeatColor = (t: number): string => {
  if (t > 0.8) return '#7F0000';
  if (t > 0.6) return '#CC0000';
  if (t > 0.4) return '#E53935';
  if (t > 0.2) return '#F26D6D';
  if (t > 0.08) return '#FBC4C4';
  return '#F8FAFC';
};

export const PortfolioAccumulationModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [animated, setAnimated] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [runningScenario, setRunningScenario] = useState<number | null>(null);
  const [selectedZoneModal, setSelectedZoneModal] = useState<any | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 150);
    return () => clearTimeout(t);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRunSim = (index: number, name: string) => {
    setRunningScenario(index);
    setTimeout(() => {
      setRunningScenario(null);
      showToast(`🎯 Simulación de Stress Test "${name}" finalizada. Pérdidas y fondo de retención recalculados.`);
    }, 1500);
  };

  const handleExportReport = () => {
    showToast('📊 Reporte de Acumulación Geográfica y Stress Testing descargado en Excel (.xlsx).');
  };

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
              <Map size={24} color={colores.primario} />
            </span>
            Portfolio &amp; Accumulation GIS · Stress Testing
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
            Dashboard 15 · Concentración geográfica, acumulación CRESTA, PML por zona y simulación de eventos catastróficos
          </p>
        </div>
        
        <button
          onClick={handleExportReport}
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
          <Download size={14} /> Exportar Acumulación
        </button>
      </div>

      {/* KPI ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' }}>
        {[
          { label: 'Total Activos en Cartera', value: '1,450', color: colores.primario, bg: '#EFF6FF' },
          { label: 'Valor Total Expuesto', value: '$45.8B USD', color: '#10B981', bg: '#ECFDF5' },
          { label: 'Zona Mayor Concentración', value: 'CDMX Cuauhtémoc', color: '#7F0000', bg: '#FEF2F2' },
          { label: 'PML Stress Mw 7.2', value: '$340M USD', color: '#EF4444', bg: '#FEF2F2' },
          { label: 'Utilización Fondo Cat.', value: '81%', color: '#F59E0B', bg: '#FFFBEB' },
        ].map((k, i) => (
          <div key={i} style={{
            padding: '16px 18px',
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            border: `1px solid ${colores.borde}`,
            borderTop: `3px solid ${k.color}`,
            boxShadow: '0 2px 6px rgba(15,23,42,0.04)',
            animation: `fadeSlideUp 0.4s ease ${i * 0.07}s both`,
          }}>
            <span style={{ fontSize: '10px', fontWeight: '700', color: colores.textoOscuro, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k.label}</span>
            <div style={{ fontSize: '18px', fontWeight: '800', color: colores.textoClaro, margin: '4px 0 0' }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* MAIN 2-COL: HEATMAP 5x5 + TOP 5 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', alignItems: 'start' }}>

        {/* LEFT: GRID HEATMAP */}
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
              Heatmap de Concentración de Capital (5×5 Grid)
            </h3>
            <span style={{ fontSize: '11px', color: colores.textoOscuro, fontWeight: '600' }}>
              Click en celda para ver detalle
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '14px' }}>
            {HEATMAP_ZONES.map((zone, idx) => {
              const bg = getHeatColor(zone.intensidad);
              const isDark = zone.intensidad > 0.4;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedZoneModal(zone)}
                  title={`${zone.nombre}: ${zone.expo} (${zone.activos} activos)`}
                  style={{
                    height: '52px',
                    borderRadius: '8px',
                    backgroundColor: bg,
                    border: `1px solid ${colores.borde}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px',
                    cursor: 'pointer',
                    opacity: animated ? 1 : 0,
                    transition: 'all 0.2s ease ' + (idx * 0.02) + 's',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                >
                  <span style={{ fontSize: '9px', fontWeight: '800', color: isDark ? '#FFFFFF' : colores.textoClaro, textAlign: 'center', lineHeight: 1.1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>
                    {zone.nombre.split(' ')[0]}
                  </span>
                  <span style={{ fontSize: '9px', color: isDark ? 'rgba(255,255,255,0.85)' : colores.textoOscuro, fontWeight: '700' }}>
                    {(zone.intensidad * 100).toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: colores.textoOscuro }}>
            <span>Baja concentración (&lt;10%)</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['#F8FAFC', '#FBC4C4', '#F26D6D', '#E53935', '#CC0000', '#7F0000'].map((c, i) => (
                <div key={i} style={{ width: '16px', height: '8px', backgroundColor: c, borderRadius: '2px', border: `1px solid ${colores.borde}` }} />
              ))}
            </div>
            <span>Máxima acumulación (&gt;80%)</span>
          </div>
        </div>

        {/* RIGHT: TOP 5 ZONAS */}
        <div style={{
          padding: '24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: `1px solid ${colores.borde}`,
          boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
          animation: 'fadeSlideUp 0.4s ease 0.35s both',
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
            Top 5 Zonas con Mayor Exposición
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {TOP5.map((t, i) => (
              <div 
                key={i} 
                onClick={() => showToast(`📍 Zona seleccionada: ${t.zona} (Exposición: ${t.exposicion})`)}
                style={{ padding: '8px 10px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: `1px solid ${colores.borde}`, cursor: 'pointer', transition: 'all 0.15s ease' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#EFF6FF'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <strong style={{ color: colores.textoClaro }}>{t.zona}</strong>
                  <span style={{ fontWeight: '800', color: t.color }}>{t.exposicion}</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: animated ? t.pct + '%' : '0%',
                    backgroundColor: t.color,
                    borderRadius: '3px',
                    transition: 'width 0.8s ease ' + (0.3 + i * 0.08) + 's',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM: STRESS TEST SCENARIOS */}
      <div style={{
        padding: '24px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: `1px solid ${colores.borde}`,
        boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
        animation: 'fadeSlideUp 0.4s ease 0.45s both',
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
          Escenarios de Stress Testing &amp; Fondo de Retención
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {SCENARIOS.map((sc, i) => (
            <div key={i} style={{
              padding: '18px',
              borderRadius: '14px',
              backgroundColor: '#F8FAFC',
              border: `1px solid ${colores.borde}`,
              borderTop: '3px solid ' + sc.color,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              animation: 'fadeSlideUp 0.3s ease ' + (0.5 + i * 0.08) + 's both',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '14px', color: colores.textoClaro }}>{sc.nombre}</strong>
                <span style={{ fontSize: '11px', fontWeight: '800', color: sc.color }}>PML: {sc.perdida}</span>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: colores.textoOscuro, marginBottom: '4px' }}>
                  <span>Utilización Fondo Catastrófico</span>
                  <strong>{sc.utilizacion}%</strong>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: animated ? sc.utilizacion + '%' : '0%',
                    backgroundColor: sc.color,
                    borderRadius: '3px',
                    transition: 'width 0.8s ease ' + (0.6 + i * 0.1) + 's',
                  }} />
                </div>
              </div>
              <button
                onClick={() => handleRunSim(i, sc.nombre)}
                disabled={runningScenario === i}
                style={{
                  padding: '9px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: sc.color,
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: runningScenario === i ? 'wait' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  marginTop: 'auto',
                }}
              >
                {runningScenario === i ? (
                  <>
                    <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} />
                    <span>Simulando modelo...</span>
                  </>
                ) : (
                  <>
                    <Play size={14} />
                    <span>Ejecutar Simulación</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DETALLE DE ZONA */}
      {selectedZoneModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px',
          animation: 'fadeIn 0.2s ease both'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            maxWidth: '460px',
            width: '100%',
            padding: '26px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: `1px solid ${colores.borde}`,
            animation: 'fadeSlideUp 0.3s ease both'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: colores.primario, backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '6px' }}>
                  Microzona CRESTA
                </span>
                <h3 style={{ margin: '4px 0 0', fontSize: '18px', fontWeight: '800', color: colores.textoClaro }}>
                  {selectedZoneModal.nombre}
                </h3>
              </div>
              <button
                onClick={() => setSelectedZoneModal(null)}
                style={{ background: 'none', border: 'none', color: colores.textoOscuro, cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '18px' }}>
              <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: `1px solid ${colores.borde}` }}>
                <span style={{ fontSize: '11px', color: colores.textoOscuro, display: 'block' }}>Valor Expuesto Total</span>
                <span style={{ fontSize: '18px', fontWeight: '800', color: colores.textoClaro }}>
                  {selectedZoneModal.expo}
                </span>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: `1px solid ${colores.borde}` }}>
                <span style={{ fontSize: '11px', color: colores.textoOscuro, display: 'block' }}>Activos Asegurados</span>
                <span style={{ fontSize: '18px', fontWeight: '800', color: colores.primario }}>
                  {selectedZoneModal.activos} Inmuebles
                </span>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: `1px solid ${colores.borde}` }}>
                <span style={{ fontSize: '11px', color: colores.textoOscuro, display: 'block' }}>PGA Espectral Máximo</span>
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#EF4444' }}>
                  {selectedZoneModal.pga}
                </span>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: `1px solid ${colores.borde}` }}>
                <span style={{ fontSize: '11px', color: colores.textoOscuro, display: 'block' }}>Índice de Acumulación</span>
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#F59E0B' }}>
                  {(selectedZoneModal.intensidad * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                showToast(`📄 Ficha técnica CRESTA exportada para ${selectedZoneModal.nombre}.`);
                setSelectedZoneModal(null);
              }}
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: colores.primario,
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Exportar Ficha Zonal PDF
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
