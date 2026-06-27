import React, { useState } from 'react';
import { TrendingUp, AlertCircle, RefreshCw, BarChart2, Calendar, MapPin } from 'lucide-react';

interface SKUForecast {
  sku: string;
  categoria: string;
  demandaBase: number;
  promocionBoost: number;
  estacionalidad: number; // multiplier
  forecastFinal: number;
  confianza: number; // percentage
}

const initialSKUs: SKUForecast[] = [
  { sku: 'Whip Topping Base 1kg', categoria: 'Cremas para Batir', demandaBase: 12500, promocionBoost: 5, estacionalidad: 1.15, forecastFinal: 14437, confianza: 94 },
  { sku: 'Bettercreme Vainilla 4kg', categoria: 'Cremas para Batir', demandaBase: 8400, promocionBoost: 0, estacionalidad: 1.05, forecastFinal: 8820, confianza: 91 },
  { sku: 'Tres Riches Jarabe 1kg', categoria: 'Tres Leches', demandaBase: 15200, promocionBoost: 10, estacionalidad: 1.25, forecastFinal: 20900, confianza: 96 },
  { sku: 'Versatié Crema Culinaria 1L', categoria: 'Cremas Culinarias', demandaBase: 6100, promocionBoost: 0, estacionalidad: 0.98, forecastFinal: 5978, confianza: 88 },
  { sku: 'Pan de Vainilla Base 8"', categoria: 'Bases de Pan', demandaBase: 11000, promocionBoost: 15, estacionalidad: 1.10, forecastFinal: 14025, confianza: 93 },
  { sku: 'On Top Crema Batida Topping', categoria: 'Toppings', demandaBase: 4300, promocionBoost: 0, estacionalidad: 1.05, forecastFinal: 4515, confianza: 89 },
];

export const RichDemandSensing: React.FC = () => {
  const [region, setRegion] = useState('Centro');
  const [promoBoost, setPromoBoost] = useState(10);
  const [skus, setSkus] = useState<SKUForecast[]>(initialSKUs);
  const [recalculando, setRecalculando] = useState(false);

  const handleRecalculate = () => {
    setRecalculando(true);
    setTimeout(() => {
      // Apply some calculation changes based on region and promoBoost
      const factorRegion = region === 'Centro' ? 1.05 : region === 'Norte' ? 1.02 : region === 'Occidente' ? 0.97 : 0.93;
      const updated = initialSKUs.map(sku => {
        const base = Math.round(sku.demandaBase * factorRegion);
        const boostVal = promoBoost / 100;
        const forecast = Math.round(base * sku.estacionalidad * (1 + boostVal));
        return {
          ...sku,
          demandaBase: base,
          promocionBoost: promoBoost,
          forecastFinal: forecast,
          confianza: Math.min(99, Math.round(sku.confianza + (promoBoost > 15 ? -2 : 1)))
        };
      });
      setSkus(updated);
      setRecalculando(false);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Module Header — Limpio e institucional, estilo Honda */}
      <div style={{
        background: '#FAFAFA',
        border: '1px solid var(--border)',
        borderRadius: '12px', padding: '20px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <TrendingUp size={18} color="#D31245" />
            <span style={{ fontSize: '11px', color: '#D31245', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Rich Demand Intelligence — Localizado México
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
            Demand Sensing & Regional Forecast
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Predicción inteligente de demanda basada en estacionalidad de repostería, festividades y promociones locales.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ padding: '8px 14px', background: '#FFF', border: '1px solid var(--border)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600' }}>PRECISIÓN PROMEDIO</div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#10B981' }}>93.2%</div>
          </div>
          <div style={{ padding: '8px 14px', background: '#FFF', border: '1px solid var(--border)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600' }}>SKUS ANALIZADOS</div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#1E40AF' }}>148</div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '20px'
      }}>
        
        {/* Left Side: Parameters */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
            Parámetros del Simulador
          </h3>
          
          {/* Region */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Región de Análisis</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['Centro', 'Norte', 'Occidente', 'Sureste'].map(r => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '10px',
                    border: '1px solid',
                    borderColor: region === r ? '#D31245' : 'var(--border)',
                    background: region === r ? 'rgba(211,18,69,0.06)' : '#FFF',
                    color: region === r ? '#D31245' : 'var(--text-secondary)',
                    fontWeight: region === r ? '700' : '500',
                    fontSize: '12px',
                    transition: 'all 0.2s'
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Promotion Boost Slider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Impulso Promocional</label>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#D31245' }}>+{promoBoost}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={promoBoost}
              onChange={e => setPromoBoost(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: '#D31245',
                cursor: 'pointer'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
              <span>Sin Impulso</span>
              <span>Medio (+15%)</span>
              <span>Agresivo (+30%)</span>
            </div>
          </div>

          {/* Recalculate Button */}
          <button
            onClick={handleRecalculate}
            disabled={recalculando}
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '12px',
              borderRadius: '12px',
              fontWeight: '700',
              marginTop: '10px',
              background: '#D31245',
              borderColor: '#D31245',
            }}
          >
            {recalculando ? (
              <>
                <RefreshCw size={15} className="animate-spin" style={{ marginRight: '8px' }} />
                Procesando Demand Sensing...
              </>
            ) : (
              <>
                <RefreshCw size={15} style={{ marginRight: '8px' }} />
                Recalcular Pronósticos
              </>
            )}
          </button>
        </div>

        {/* Right Side: Charts & Table */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
              Pronósticos de SKU — Región {region} (Julio 2026)
            </h3>
            <span style={{ fontSize: '11px', color: '#1E40AF', fontWeight: '700', background: 'rgba(30,64,175,0.1)', padding: '3px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={12} />
              Próximo Mes Proyectado
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '10px 8px', fontWeight: '600' }}>SKU</th>
                  <th style={{ padding: '10px 8px', fontWeight: '600' }}>Categoría</th>
                  <th style={{ padding: '10px 8px', fontWeight: '600', textAlign: 'right' }}>Dda. Base (Cajas)</th>
                  <th style={{ padding: '10px 8px', fontWeight: '600', textAlign: 'right' }}>Estacionalidad</th>
                  <th style={{ padding: '10px 8px', fontWeight: '600', textAlign: 'right' }}>Forecast Final</th>
                  <th style={{ padding: '10px 8px', fontWeight: '600', textAlign: 'center' }}>Confianza IA</th>
                </tr>
              </thead>
              <tbody>
                {skus.map((sku, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #F1F5F9', fontSize: '13px', transition: 'all 0.15s' }}>
                    <td style={{ padding: '12px 8px', fontWeight: '700', color: 'var(--text-primary)' }}>{sku.sku}</td>
                    <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{sku.categoria}</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: '600' }}>{sku.demandaBase.toLocaleString()}</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', color: '#D31245', fontWeight: '600' }}>x{sku.estacionalidad.toFixed(2)}</td>
                    <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: '800', color: '#1E40AF' }}>{sku.forecastFinal.toLocaleString()}</td>
                    <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '700',
                        backgroundColor: sku.confianza >= 92 ? '#D1FAE5' : '#FEF3C7',
                        color: sku.confianza >= 92 ? '#065F46' : '#92400E'
                      }}>
                        {sku.confianza}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Alert widget */}
          <div style={{
            display: 'flex',
            gap: '12px',
            background: 'rgba(245,158,11,0.06)',
            border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: '14px',
            padding: '14px',
            marginTop: '8px'
          }}>
            <AlertCircle size={18} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#92400E' }}>Advertencia de Abastecimiento en Tres Leches</div>
              <div style={{ fontSize: '11px', color: '#B45309', marginTop: '2px' }}>
                La estacionalidad de Tres Riches (Doble Llenado/Jarabe) sube por temporada de graduaciones escolares en la Región {region}. Se sugiere alinear con Planta Ocoyoacac para evitar quiebres de stock.
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};
