import React, { useState, useEffect } from 'react';
import { DollarSign, ShieldAlert, BarChart2, PieChart, FileText, ArrowDown, CheckCircle2, AlertCircle, Download, RefreshCw, X, Sliders, Check } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const ValuacionPolizasModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [loaded, setLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [sumaAsegurada, setSumaAsegurada] = useState<number>(95);
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [vrn] = useState<number>(125);

  const gap = vrn - sumaAsegurada;
  const gapPct = Math.round((gap / vrn) * 100);
  const coveredPct = Math.min(100, Math.round((sumaAsegurada / vrn) * 63.5));
  const dedPct = 12.5;
  const uncovPct = Math.max(0, 100 - coveredPct - dedPct);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveAdjustment = (newSum: number) => {
    setSumaAsegurada(newSum);
    setAdjustModalOpen(false);
    showToast(`✅ Suma asegurada ajustada a $${newSum}M USD. Brecha de infraseguro actualizada.`);
  };

  const kpis = [
    { label: 'Valor Reposición VRN', value: `$${vrn}.0M USD`, icon: DollarSign, color: colores.primario, bg: '#EFF6FF', trend: 'Avalúo SOFOVAL 2026' },
    { label: 'Suma Asegurada Declarada', value: `$${sumaAsegurada}.0M USD`, icon: ShieldAlert, color: gap <= 0 ? '#10B981' : '#F59E0B', bg: gap <= 0 ? '#ECFDF5' : '#FFFBEB', trend: gap <= 0 ? '100% Cobertura' : 'Póliza AXA Seguros' },
    { label: 'Brecha de Infraseguro', value: gap <= 0 ? '$0.0M (Cubierto)' : `-$${gap}.0M USD`, icon: BarChart2, color: gap <= 0 ? '#10B981' : '#EF4444', bg: gap <= 0 ? '#ECFDF5' : '#FEF2F2', trend: gap <= 0 ? 'Sin riesgo de prorrateo' : `-${gapPct}% Brecha de Cobertura` },
    { label: 'Indemnización Neta Est.', value: `$${(sumaAsegurada * 0.177).toFixed(1)}M USD`, icon: PieChart, color: '#10B981', bg: '#ECFDF5', trend: 'Escenario Sismo PML' }
  ];

  const waterfallSteps = [
    { label: 'Pérdida Bruta Estimada', val: 40.0, displayVal: '$40.0M', color: '#64748B', isTotal: true },
    { label: '(-) Deducible Sismo (5%)', val: -4.75, displayVal: '-$4.75M', color: '#EF4444', isTotal: false },
    { label: '(-) Coaseguro (10%)', val: -3.52, displayVal: '-$3.52M', color: '#F97316', isTotal: false },
    { label: '(-) Sublímite / Infraseguro', val: -(gap > 0 ? 14.83 : 4.0), displayVal: gap > 0 ? '-$14.83M' : '-$4.0M', color: '#F59E0B', isTotal: false },
    { label: '(=) Indemnización Neta', val: gap <= 0 ? 27.7 : 16.9, displayVal: gap <= 0 ? '$27.7M' : '$16.9M', color: '#10B981', isTotal: true },
    { label: '(=) Pérdida Asumida/Retenida', val: gap <= 0 ? 12.3 : 23.1, displayVal: gap <= 0 ? '$12.3M' : '$23.1M', color: colores.primario, isTotal: true }
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

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px', animation: 'fadeSlideUp 0.4s ease both' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ padding: '6px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'inline-flex' }}>
              <DollarSign size={24} color={colores.primario} />
            </span>
            Valuación, Pólizas &amp; Waterfall de Indemnización
          </h1>
          <p style={{ margin: '4px 0 0', color: colores.textoOscuro, fontSize: '13px' }}>
            Dashboard 12 · Costo de reposición a nuevo, desglose de deducibles, sublímites y cascada de recuperación
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setAdjustModalOpen(true)}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: `1px solid ${colores.primario}`,
              backgroundColor: '#EFF6FF',
              color: colores.primario,
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sliders size={14} /> Ajustar Suma Asegurada
          </button>

          <button
            onClick={() => showToast('📄 Reporte de Valuación & Auditoría de Póliza AXA descargado en PDF.')}
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
            <Download size={14} /> Descargar Reporte
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} style={{ 
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              padding: '18px 20px',
              boxShadow: '0 2px 6px rgba(15,23,42,0.04)',
              border: `1px solid ${colores.borde}`,
              borderTop: `3px solid ${kpi.color}`,
              animation: `fadeSlideUp 0.4s ease ${idx * 0.08}s both`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', color: colores.textoOscuro, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{kpi.label}</span>
                <div style={{ backgroundColor: kpi.bg, padding: '8px', borderRadius: '8px' }}>
                  <Icon size={16} color={kpi.color} />
                </div>
              </div>
              <div style={{ fontSize: '22px', fontWeight: '800', marginBottom: '4px', color: colores.textoClaro }}>{kpi.value}</div>
              <div style={{ fontSize: '11px', color: colores.textoOscuro, fontWeight: '600' }}>
                {kpi.trend}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
        {/* Left: Waterfall List & Visualization */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)', border: `1px solid ${colores.borde}`, animation: 'fadeSlideUp 0.4s ease 0.3s both' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', margin: '0 0 18px', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart2 size={18} color={colores.primario} /> Visualizador Cascada (Waterfall) de Indemnización
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {waterfallSteps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: '#F8FAFC',
                  borderLeft: `5px solid ${step.color}`,
                  border: `1px solid ${colores.borde}`,
                  borderLeftWidth: '5px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  animation: `fadeSlideUp 0.3s ease ${0.35 + idx * 0.05}s both`,
                }}
              >
                <span style={{ fontWeight: '700', fontSize: '13px', color: colores.textoClaro }}>{step.label}</span>
                <span style={{ fontWeight: '800', fontSize: '15px', color: step.color }}>{step.displayVal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Coverage Donut */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(15,23,42,0.04)', border: `1px solid ${colores.borde}`, animation: 'fadeSlideUp 0.4s ease 0.35s both' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', margin: '0 0 16px', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PieChart size={18} color={colores.primario} /> Distribución Efectiva de Cobertura
          </h3>
          
          <div style={{ position: 'relative', height: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg width="150" height="150" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="65" fill="none" stroke="#F1F5F9" strokeWidth="16" />
              
              {/* No Cubierto */}
              <circle cx="80" cy="80" r="65" fill="none" stroke="#EF4444" strokeWidth="16"
                strokeDasharray="408.4" strokeDashoffset={loaded ? 408.4 - (408.4 * (uncovPct / 100)) : 408.4}
                style={{ transition: 'stroke-dashoffset 1s ease-out 0.3s', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} />
              
              {/* Deducible 12.5% */}
              <circle cx="80" cy="80" r="65" fill="none" stroke="#F59E0B" strokeWidth="16"
                strokeDasharray="408.4" strokeDashoffset={loaded ? 408.4 - (408.4 * 0.125) : 408.4}
                style={{ transition: 'stroke-dashoffset 1s ease-out 0.6s', transform: `rotate(${-90 + 360 * (uncovPct / 100)}deg)`, transformOrigin: '50% 50%' }} />

              {/* Cubierto */}
              <circle cx="80" cy="80" r="65" fill="none" stroke="#10B981" strokeWidth="16"
                strokeDasharray="408.4" strokeDashoffset={loaded ? 408.4 - (408.4 * (coveredPct / 100)) : 408.4}
                style={{ transition: 'stroke-dashoffset 1s ease-out 0.9s', transform: `rotate(${-90 + 360 * ((uncovPct + dedPct) / 100)}deg)`, transformOrigin: '50% 50%' }} />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: '800', color: colores.textoClaro }}>{coveredPct}%</div>
              <div style={{ fontSize: '10px', color: colores.textoOscuro, fontWeight: '700' }}>Cobertura Real</div>
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: colores.textoClaro, fontWeight: '600' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '2px' }} />
                Indemnización Neta Cubierta
              </span>
              <b style={{ color: '#10B981' }}>{coveredPct}%</b>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: colores.textoClaro, fontWeight: '600' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#F59E0B', borderRadius: '2px' }} />
                Deducibles &amp; Coaseguros
              </span>
              <b style={{ color: '#F59E0B' }}>12.5%</b>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: colores.textoClaro, fontWeight: '600' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: '#EF4444', borderRadius: '2px' }} />
                No Cubierto (Infraseguro)
              </span>
              <b style={{ color: '#EF4444' }}>{uncovPct}%</b>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Policy Details */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', animation: 'fadeSlideUp 0.4s ease 0.45s both' }}>
        {[
          { title: 'Suma Asegurada Contratada', val: `$${sumaAsegurada}.0M USD`, clause: 'Cláusula 4.1.2 — Límite máximo por evento declarado en póliza AXA Seguros.' },
          { title: 'Deducible Sismo / NatCat', val: '5% sobre Suma', clause: 'Cláusula 6.3 — Deducible aplicable sobre el 100% de la suma asegurada por ubicación.' },
          { title: 'Sublímite Interrupción BI', val: '$15.0M USD', clause: 'Endoso 2 — Período de indemnización limitado a 12 meses de pérdida de utilidad bruta.' }
        ].map((card, idx) => (
          <div key={idx} style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', padding: '18px', boxShadow: '0 2px 6px rgba(15,23,42,0.04)', border: `1px solid ${colores.borde}`, borderLeft: `4px solid ${colores.primario}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <FileText size={16} color={colores.primario} />
              <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '800', color: colores.textoClaro }}>{card.title}</h4>
            </div>
            <div style={{ fontSize: '20px', fontWeight: '800', marginBottom: '6px', color: colores.textoClaro }}>{card.val}</div>
            <p style={{ margin: 0, fontSize: '11px', color: colores.textoOscuro, lineHeight: '1.4' }}>{card.clause}</p>
          </div>
        ))}
      </div>

      {/* MODAL AJUSTAR SUMA ASEGURADA */}
      {adjustModalOpen && (
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
            padding: '28px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: `1px solid ${colores.borde}`,
            animation: 'fadeSlideUp 0.3s ease both'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colores.textoClaro }}>
                Ajustar Suma Asegurada en Póliza
              </h3>
              <button
                onClick={() => setAdjustModalOpen(false)}
                style={{ background: 'none', border: 'none', color: colores.textoOscuro, cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: colores.textoOscuro, marginBottom: '8px' }}>
                Valor de Reposición Base (VRN): <strong>${vrn}.0M USD</strong>
              </label>
              <div style={{ fontSize: '28px', fontWeight: '800', color: colores.primario, marginBottom: '8px' }}>
                ${sumaAsegurada}.0M USD
              </div>
              <input
                type="range"
                min="50"
                max="150"
                value={sumaAsegurada}
                onChange={e => setSumaAsegurada(Number(e.target.value))}
                style={{ width: '100%', accentColor: colores.primario }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: colores.textoOscuro, marginTop: '4px' }}>
                <span>$50M USD</span>
                <span>$125M (VRN Óptimo)</span>
                <span>$150M USD</span>
              </div>
            </div>

            <div style={{ padding: '14px', backgroundColor: gap <= 0 ? '#ECFDF5' : '#FEF2F2', borderRadius: '12px', border: `1px solid ${gap <= 0 ? '#A7F3D0' : '#FECACA'}`, marginBottom: '20px', fontSize: '12px', color: colores.textoClaro }}>
              {gap <= 0 ? (
                <span>🎉 <strong>100% Cobertura:</strong> Sin brecha de infraseguro ni penalización por regla proporcional.</span>
              ) : (
                <span>⚠️ <strong>Brecha de Infraseguro:</strong> -$${gap}.0M USD ({gapPct}% sin cobertura en caso de pérdida total).</span>
              )}
            </div>

            <button
              onClick={() => handleSaveAdjustment(sumaAsegurada)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: colores.primario,
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Aplicar Ajuste a Endoso de Póliza
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
