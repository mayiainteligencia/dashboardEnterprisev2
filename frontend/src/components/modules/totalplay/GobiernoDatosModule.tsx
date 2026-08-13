import React, { useEffect, useState } from 'react';
import { Database, Link, ArrowRight, ShieldCheck, TrendingDown, Users, DollarSign } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;

function useCountUp(target: number, duration = 1200, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, duration, delay]);
  return val;
}

interface FunnelStage {
  etapa: string;
  cantidad: string;
  conv: string;
  num: number;
  color: string;
  icon: React.FC<any>;
}

export const GobiernoDatosModule: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 200); }, []);

  const trafico    = useCountUp(14250, 1400, 200);
  const interaccion = useCountUp(4047,  1200, 350);
  const leads      = useCountUp(685,   1100, 500);
  const contratos  = useCountUp(312,   1000, 650);
  const activos    = useCountUp(293,    900, 800);

  const embudo: FunnelStage[] = [
    { etapa: 'Impresión Visual (Tráfico Frente a Isla)', cantidad: trafico.toLocaleString(), conv: '100%', num: 14250, color: '#732D67', icon: Users },
    { etapa: 'Interacción Consentida (Tótem / Display)', cantidad: interaccion.toLocaleString(), conv: '28.4%', num: 4047, color: '#A61C5C', icon: Link },
    { etapa: 'Lead Calificado (Consulta Cobertura FTTH)', cantidad: leads.toLocaleString(), conv: '4.8%', num: 685, color: '#D9933D', icon: ShieldCheck },
    { etapa: 'Contrato Firmado (CRM Sincronizado)', cantidad: contratos.toLocaleString(), conv: '2.19%', num: 312, color: '#BBBF41', icon: Database },
    { etapa: 'Instalación & Activación App Totalplay', cantidad: activos.toLocaleString(), conv: '2.05%', num: 293, color: '#5B8F20', icon: TrendingDown },
  ];

  const maxNum = embudo[0].num;

  const kpis = [
    { label: 'Conv. Lead→Instalación', valor: '42.8%', delta: '+6.2%', color: '#732D67' },
    { label: 'Leads Sincronizados CRM', valor: '100%', delta: 'OK', color: '#5B8F20' },
    { label: 'Costo Adquisición (CAC)', valor: '−18%', delta: 'Mejora', color: '#A61C5C' },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#FFFFFF', minHeight: '100%', borderRadius: '16px' }}>
      {/* Header */}
      <div className="animate-slide-up" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: colores.primario, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #732D6722, #732D6711)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid #732D6730'
          }}>
            <Database size={20} color="#732D67" />
          </div>
          Gobierno de Datos & Atribución CRM
        </h2>
        <p style={{ fontSize: '13px', color: colores.textoMedio, marginTop: '6px', lineHeight: 1.5 }}>
          Trazabilidad omnicanal segura y consentida desde el punto físico hasta la activación del servicio.
        </p>
      </div>

      {/* KPI strip */}
      <div className="animate-slide-up delay-1" style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '28px'
      }}>
        {kpis.map((k, i) => (
          <div key={i} style={{
            backgroundColor: `${k.color}08`, border: `1px solid ${k.color}25`,
            borderRadius: '14px', padding: '16px',
            display: 'flex', flexDirection: 'column', gap: '4px'
          }}>
            <div style={{ fontSize: '10px', fontWeight: '600', color: colores.textoMedio }}>{k.label}</div>
            <div style={{ fontSize: '22px', fontWeight: '900', color: k.color }}>{k.valor}</div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#5B8F20', backgroundColor: '#EEF6E7', padding: '2px 7px', borderRadius: '6px', alignSelf: 'flex-start' }}>
              {k.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Funnel visualization */}
      <div className="animate-slide-up delay-2" style={{
        backgroundColor: '#FFFFFF', border: `1px solid ${colores.borde}`,
        borderRadius: '16px', padding: '22px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
      }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', color: colores.primario, marginBottom: '20px', margin: '0 0 20px 0' }}>
          Embudo Comercial Omnicanal M2C
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {embudo.map((item, idx) => {
            const pct = Math.round((item.num / maxNum) * 100);
            const Icon = item.icon;
            return (
              <div key={idx} className={`animate-slide-up delay-${idx + 1}`}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '14px 16px', borderRadius: '12px',
                  backgroundColor: '#FAFAFA', border: `1px solid ${colores.borde}`,
                }}>
                  {/* Step number + icon */}
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                    backgroundColor: `${item.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px solid ${item.color}30`
                  }}>
                    <Icon size={16} color={item.color} />
                  </div>

                  {/* Funnel bar */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: '600', color: colores.textoClaro }}>{item.etapa}</span>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontSize: '16px', fontWeight: '900', color: item.color }}>{item.cantidad}</span>
                        <span style={{
                          fontSize: '11px', fontWeight: '800',
                          color: '#A61C5C', backgroundColor: '#FCE7F1',
                          padding: '2px 7px', borderRadius: '6px'
                        }}>{item.conv}</span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div style={{ height: '6px', backgroundColor: '#EEEEEE', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: '99px',
                        width: mounted ? `${pct}%` : '0%',
                        backgroundColor: item.color,
                        transition: `width 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 0.1}s`
                      }} />
                    </div>
                  </div>
                </div>

                {/* Arrow connector */}
                {idx < embudo.length - 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', color: colores.borde, margin: '2px 0' }}>
                    <ArrowRight size={16} color={`${embudo[idx + 1].color}80`} style={{ transform: 'rotate(90deg)' }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
