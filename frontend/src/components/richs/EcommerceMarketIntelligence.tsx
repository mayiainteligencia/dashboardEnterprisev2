import React, { useState } from 'react';
import { ShoppingBag, TrendingUp, DollarSign, AlertCircle, Award, Compass, RefreshCw } from 'lucide-react';

interface CompetitorPrice {
  productoRich: string;
  precioRich: number;
  competidorDawn: number;
  competidorPuratos: number;
  margenSugerido: number; // percentage
}

const initialPrices: CompetitorPrice[] = [
  { productoRich: 'Bettercreme Vainilla 4kg', precioRich: 380, competidorDawn: 395, competidorPuratos: 375, margenSugerido: 15 },
  { productoRich: 'Tres Riches Original 1kg', precioRich: 74, competidorDawn: 78, competidorPuratos: 72, margenSugerido: 12 },
  { productoRich: 'Whip Topping Base 1kg', precioRich: 92, competidorDawn: 96, competidorPuratos: 90, margenSugerido: 18 },
  { productoRich: 'Versatié Crema Culinaria 1L', precioRich: 110, competidorDawn: 115, competidorPuratos: 108, margenSugerido: 20 },
];

export const EcommerceMarketIntelligence: React.FC = () => {
  const [prices, setPrices] = useState<CompetitorPrice[]>(initialPrices);
  const [markupOffset, setMarkupOffset] = useState(0); // simulation adjust
  const [recalculando, setRecalculando] = useState(false);

  const handleSimulate = () => {
    setRecalculando(true);
    setTimeout(() => {
      const updated = initialPrices.map(p => ({
        ...p,
        precioRich: Math.round(p.precioRich * (1 + markupOffset / 100)),
        margenSugerido: p.margenSugerido + markupOffset
      }));
      setPrices(updated);
      setRecalculando(false);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Module Header — Limpio e institucional */}
      <div style={{
        background: '#FAFAFA',
        border: '1px solid var(--border)',
        borderRadius: '12px', padding: '20px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <ShoppingBag size={18} color="#EF4444" />
            <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              E-commerce & Market Intelligence — Estrategia de Crecimiento México
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '750', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
            Precios Competitivos y Expansión E-commerce
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Analiza precios de la competencia (Dawn y Puratos) en tiempo real, gestiona márgenes recomendados y proyecta la viabilidad de expansión logística de la tienda en línea.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ padding: '8px 14px', background: '#FFF', border: '1px solid var(--border)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600' }}>TICKET DE E-COMMERCE</div>
            <div style={{ fontSize: '16px', fontWeight: '750', color: '#EF4444' }}>$2,450 MXN</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        
        {/* COMPETITOR PRICING & RECOMMENDATION */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
            Comparador de Precios y Recomendador de Margen (MXN)
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '10px 8px', fontWeight: '600' }}>Producto Rich</th>
                  <th style={{ padding: '10px 8px', fontWeight: '600', textAlign: 'right' }}>Precio Rich</th>
                  <th style={{ padding: '10px 8px', fontWeight: '600', textAlign: 'right' }}>Dawn Foods</th>
                  <th style={{ padding: '10px 8px', fontWeight: '600', textAlign: 'right' }}>Puratos Mex</th>
                  <th style={{ padding: '10px 8px', fontWeight: '600', textAlign: 'center' }}>Margen AI</th>
                </tr>
              </thead>
              <tbody>
                {prices.map((p, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '13px' }}>
                    <td style={{ padding: '12px 8px', fontWeight: '700', color: 'var(--text-primary)' }}>{p.productoRich}</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: '800', color: '#EF4444' }}>${p.precioRich}</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', color: 'var(--text-secondary)' }}>${p.competidorDawn}</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', color: 'var(--text-secondary)' }}>${p.competidorPuratos}</td>
                    <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '700',
                        backgroundColor: p.precioRich < p.competidorDawn ? '#D1FAE5' : '#FEE2E2',
                        color: p.precioRich < p.competidorDawn ? '#065F46' : '#991B1B'
                      }}>
                        {p.margenSugerido}% Margen
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing simulator controls */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)' }}>Simular Ajuste General de Precios:</label>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#EF4444' }}>{markupOffset >= 0 ? `+${markupOffset}` : markupOffset}%</span>
            </div>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <input
                type="range"
                min="-10"
                max="10"
                value={markupOffset}
                onChange={e => setMarkupOffset(Number(e.target.value))}
                style={{ flex: 1, accentColor: '#EF4444', cursor: 'pointer' }}
              />
              <button
                onClick={handleSimulate}
                disabled={recalculando}
                className="btn-primary"
                style={{
                  background: '#EF4444',
                  borderColor: '#EF4444',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <RefreshCw size={12} className={recalculando ? 'animate-spin' : ''} /> Simular
              </button>
            </div>
          </div>
        </div>

        {/* CDMX E-COMMERCE EXPANSION MAP */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass size={18} color="#1E40AF" />
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
              Proyección de Cobertura E-commerce (Área Metropolitana)
            </h3>
          </div>

          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            Actualmente la tienda en línea de Rich's tiene cobertura exclusiva en CDMX y Área Metropolitana. Evaluamos la demanda y factibilidad de entrega en nuevas zonas prioritarias:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { zona: 'Naucalpan / Tlalnepantla', factibilidad: 'Alta', demanda: 'Fuerte', accion: 'Expandir Julio 2026', col: '#10B981' },
              { zona: 'Toluca Ocoyoacac (Cerca Planta)', factibilidad: 'Alta', demanda: 'Medio', accion: 'Planificar Sept 2026', col: '#1E40AF' },
              { zona: 'Puebla Poniente (Corredor)', factibilidad: 'Media', demanda: 'Fuerte', accion: 'Evaluación de Logística', col: '#F59E0B' },
              { zona: 'Querétaro Centro', factibilidad: 'Baja', demanda: 'Media', accion: 'Uso de Distribuidor Físico', col: '#EF4444' },
            ].map((z, i) => (
              <div key={i} style={{ padding: '12px', background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{z.zona}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Factibilidad: <strong>{z.factibilidad}</strong> | Demanda: <strong>{z.demanda}</strong>
                  </div>
                </div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: z.col, padding: '4px 8px', borderRadius: '6px', background: '#FFF', border: `1px solid ${z.col}33` }}>
                  {z.accion}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(59,130,246,0.04)',
            border: '1px solid rgba(59,130,246,0.15)',
            borderRadius: '12px',
            padding: '12px',
            fontSize: '11px',
            color: '#1E3A8A',
            display: 'flex',
            gap: '8px'
          }}>
            <AlertCircle size={14} color="#3B82F6" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>
              <strong>Sugerencia IA:</strong> La vecindad industrial de Toluca Ocoyoacac muestra alta rentabilidad de reparto por cercanía con nuestra planta de producción. Se recomienda iniciar pruebas piloto de e-commerce.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
