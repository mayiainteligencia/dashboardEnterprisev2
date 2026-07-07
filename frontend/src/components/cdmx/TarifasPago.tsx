import React, { useState, useEffect } from 'react';
import { CreditCard, Calculator, Coins, Check, HelpCircle, ChevronDown, ChevronUp, QrCode } from 'lucide-react';

interface FAQItem {
  pregunta: string;
  respuesta: string;
}

const FAQS: FAQItem[] = [
  { pregunta: '¿Dónde puedo comprar y recargar la Tarjeta MI?', respuesta: 'Puedes comprarla en las taquillas del Metro y en las máquinas expendedoras ubicadas en las estaciones del Metrobús, Cablebús y Tren Ligero. El costo del plástico es de $15.00 MXN. Puedes recargarla en taquillas, máquinas y desde tu celular con NFC a través de la App CDMX o Mercado Pago.' },
  { pregunta: '¿Qué transportes aceptan la Tarjeta de Movilidad Integrada?', respuesta: 'Es aceptada en el Metro, Metrobús, Cablebús, Trolebús, Tren Ligero, Ecobici y los autobuses de RTP habilitados con validador electrónico.' },
  { pregunta: '¿Cuál es el saldo máximo que puedo cargar en la tarjeta?', respuesta: 'El saldo máximo acumulable en la tarjeta es de $500.00 MXN. Las recargas tienen una vigencia de 300 días naturales.' },
  { pregunta: '¿Los transbordos entre sistemas son gratuitos?', respuesta: 'El transbordo entre líneas del Metro es completamente gratuito. Sin embargo, al pasar de un sistema a otro (ej. de Metro a Metrobús), se cobra la tarifa correspondiente del nuevo transporte, excepto en ciertas correspondencias específicas autorizadas de la red integrada.' },
  { pregunta: '¿Quiénes tienen acceso gratuito al sistema de transporte CDMX?', respuesta: 'Adultos mayores de 60 años con credencial INAPAM, personas con discapacidad con credencial nacional o del DIF, niños menores de 5 años acompañados de un adulto, y jóvenes con pase estudiantil autorizado por el gobierno.' }
];

export const TarifasPago: React.FC = () => {
  // Calculator state
  const [viajesPorDia, setViajesPorDia] = useState(2);
  const [diasPorMes, setDiasPorMes] = useState(22);
  const [showQRModal, setShowQRModal] = useState(false);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const [barsAnimated, setBarsAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBarsAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  const totalViajesMensuales = viajesPorDia * diasPorMes;
  const costoMetro = totalViajesMensuales * 5;
  const costoTaxi = totalViajesMensuales * 75; // Average taxi ride in CDMX
  const costoUber = totalViajesMensuales * 140; // Average Uber ride in CDMX
  const costoAuto = (totalViajesMensuales * 25) + 2200; // Gasoline + maintenance/insurance/parking fraction

  const ahorroUberMensual = costoUber - costoMetro;
  const ahorroUberAnual = ahorroUberMensual * 12;

  const maxCosto = Math.max(costoUber, costoAuto, costoTaxi, costoMetro);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '20px', height: 'calc(100vh - 120px)' }} className="scrollbar-thin">
      {/* LEFT COLUMN: TARIFAS & TARJETA MI */}
      <div className="no-scrollbar" style={{ overflowY: 'auto', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* TARIFAS BANNER */}
        <div style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Outfit, sans-serif', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Coins size={16} color="var(--color-metro-primary)" />
            Tarifas Oficiales Vigentes
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
            {[
              { sistema: 'Metro CDMX', precio: '$5.00', color: '#D40000', desc: 'Tarifa única general' },
              { sistema: 'Metrobús', precio: '$6.00', color: '#003DA5', desc: 'Tarifa general' },
              { sistema: 'Cablebús', precio: '$7.00', color: '#00843D', desc: 'Teleférico aéreo' },
              { sistema: 'Trolebús', precio: '$4.00', color: '#6929C4', desc: 'Transporte eléctrico' },
              { sistema: 'Bus RTP', precio: '$2.50', color: '#E87722', desc: 'Ruta convencional' }
            ].map((t, idx) => (
              <div key={idx} style={{
                background: '#121212', border: '1px solid #2A2A3E', borderRadius: '12px', padding: '12px',
                borderLeft: `3px solid ${t.color}`, display: 'flex', flexDirection: 'column', gap: '4px'
              }}>
                <span style={{ fontSize: '11px', color: '#A0AEC0', fontWeight: '600' }}>{t.sistema}</span>
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#fff', fontFamily: 'Outfit, sans-serif' }}>{t.precio}</span>
                <span style={{ fontSize: '9px', color: '#4A5568' }}>{t.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TARJETA MOVILIDAD INTEGRADA */}
        <div style={{
          background: 'linear-gradient(135deg, #1C1C28 0%, #11111E 100%)',
          border: '1px solid #2A2A3E', borderRadius: '16px', padding: '20px',
          position: 'relative', overflow: 'hidden'
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Outfit, sans-serif', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <CreditCard size={16} color="var(--color-metro-gold)" />
            Tarjeta de Movilidad Integrada (MI)
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontSize: '12.5px', color: '#A0AEC0', lineHeight: 1.5, margin: 0 }}>
                El plástico unificado de transporte en CDMX. Con él puedes viajar de manera fluida sin comprar boletos individuales.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  'Acceso rápido sin taquillas ni filas',
                  'Recargas digitales vía NFC y celular',
                  'Válido en 7 sistemas de transporte'
                ].map((b, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: '#fff' }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'rgba(0,132,61,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={10} color="#00843D" />
                    </div>
                    {b}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '4px' }}>
                <span style={{ fontSize: '12px', color: '#4A5568' }}>Costo: <strong style={{ color: '#fff' }}>$15.00 MXN</strong> (plástico)</span>
                <button 
                  onClick={() => setShowQRModal(true)}
                  style={{
                    background: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.3)',
                    borderRadius: '8px', padding: '6px 12px', fontSize: '11px', color: 'var(--color-metro-gold)',
                    fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,166,35,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,166,35,0.15)'}
                >
                  <QrCode size={12} />
                  Recargar en Línea
                </button>
              </div>
            </div>

            {/* TARJETA MI MOCK GRAPHIC */}
            <div style={{
              background: 'linear-gradient(135deg, #1C1C28 0%, #1A0D22 100%)',
              border: '1px solid #3A2A4E', borderRadius: '12px', height: '110px',
              padding: '12px', position: 'relative', overflow: 'hidden',
              boxShadow: '0 8px 20px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }}>
              {/* CDMX background graphics */}
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #D40000 0%, #003DA5 100%)', opacity: 0.15, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-30px', left: '-10px', width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(135deg, #00843D 0%, #F5A623 100%)', opacity: 0.1, pointerEvents: 'none' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1 }}>
                <span style={{ fontSize: '9px', fontWeight: '800', color: '#fff', letterSpacing: '0.1em' }}>MOVILIDAD INTEGRADA</span>
                <div style={{ width: '16px', height: '16px', borderRadius: '3px', background: '#fff', opacity: 0.8 }} />
              </div>
              
              <div style={{ display: 'flex', gap: '3px', zIndex: 1 }}>
                {['#D40000', '#003DA5', '#00843D', '#F5A623', '#6929C4', '#E87722'].map((c, i) => (
                  <div key={i} style={{ width: '12px', height: '12px', borderRadius: '3px', background: c }} />
                ))}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 1 }}>
                <span style={{ fontSize: '7px', color: '#A0AEC0', fontFamily: 'monospace' }}>CARD NO: MI-4829-0129</span>
                <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--color-metro-gold)' }}>CDMX</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQS */}
        <div style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Outfit, sans-serif', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <HelpCircle size={16} color="var(--color-metro-blue)" />
            Preguntas Frecuentes
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {FAQS.map((faq, idx) => (
              <div key={idx} style={{ borderBottom: idx < FAQS.length - 1 ? '1px solid #2A2A3E' : 'none', paddingBottom: idx < FAQS.length - 1 ? '8px' : '0' }}>
                <button
                  onClick={() => setOpenFAQIndex(openFAQIndex === idx ? null : idx)}
                  style={{
                    width: '100%', background: 'none', border: 'none', textAlign: 'left',
                    color: '#fff', fontSize: '12px', fontWeight: '600', padding: '6px 0',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer'
                  }}
                >
                  <span>{faq.pregunta}</span>
                  {openFAQIndex === idx ? <ChevronUp size={14} color="#A0AEC0" /> : <ChevronDown size={14} color="#A0AEC0" />}
                </button>
                {openFAQIndex === idx && (
                  <p style={{ fontSize: '11.5px', color: '#A0AEC0', lineHeight: 1.5, margin: '6px 0 4px', paddingLeft: '4px', animation: 'fadeInUp 0.2s ease' }}>
                    {faq.respuesta}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: CALCULATOR & COMPARISON */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* CALCULATION PANEL */}
        <div style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Outfit, sans-serif', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Calculator size={16} color="var(--color-metro-primary)" />
            Calculadora de Ahorro Mensual
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span style={{ color: '#A0AEC0' }}>Viajes ida y vuelta por día:</span>
                <strong style={{ color: '#fff' }}>{viajesPorDia} viajes</strong>
              </div>
              <input type="range" min={1} max={10} value={viajesPorDia}
                onChange={e => setViajesPorDia(+e.target.value)}
                style={{ width: '100%', accentColor: 'var(--color-metro-primary)', cursor: 'pointer' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span style={{ color: '#A0AEC0' }}>Días hábiles de viaje al mes:</span>
                <strong style={{ color: '#fff' }}>{diasPorMes} días</strong>
              </div>
              <input type="range" min={10} max={30} value={diasPorMes}
                onChange={e => setDiasPorMes(+e.target.value)}
                style={{ width: '100%', accentColor: 'var(--color-metro-primary)', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* savings display */}
          <div style={{
            background: 'rgba(0,132,61,0.06)', border: '1px solid rgba(0,132,61,0.25)',
            borderRadius: '12px', padding: '16px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px'
          }}>
            <span style={{ fontSize: '11px', color: '#A0AEC0', fontWeight: '600' }}>AHORRO ESTIMADO EN METRO VS UBER</span>
            <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-metro-green)', fontFamily: 'Outfit, sans-serif' }}>
              ${ahorroUberMensual.toLocaleString('es-MX', { maximumFractionDigits: 0 })} MXN <span style={{ fontSize: '13px', fontWeight: '600' }}>/ mes</span>
            </div>
            <span style={{ fontSize: '11px', color: '#00843D', fontWeight: '600' }}>
              Equivale a ${ahorroUberAnual.toLocaleString('es-MX', { maximumFractionDigits: 0 })} MXN al año
            </span>
          </div>

          {/* Cost breakdown table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '10px', color: '#4A5568', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Comparativa de Gastos Mensuales</span>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'STC Metro ($5.00 / viaje)', costo: costoMetro, color: '#D40000' },
                { label: 'Auto Propio (Gasolina + Fijo)', costo: costoAuto, color: '#E87722' },
                { label: 'Taxi de la Calle (Promedio)', costo: costoTaxi, color: '#F5A623' },
                { label: 'Servicio Privado (Uber/Didi)', costo: costoUber, color: '#003DA5' }
              ].map((c, idx) => {
                const percentage = Math.min(100, Math.max(8, (c.costo / maxCosto) * 100));
                return (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                      <span style={{ color: '#fff', fontWeight: '600' }}>{c.label}</span>
                      <strong style={{ color: idx === 0 ? 'var(--color-metro-green)' : '#fff' }}>${c.costo.toLocaleString('es-MX', { maximumFractionDigits: 0 })} MXN</strong>
                    </div>
                    <div style={{ height: '6px', background: '#121212', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', background: c.color, borderRadius: '3px',
                        width: barsAnimated ? `${percentage}%` : '0%',
                        transition: 'width 0.8s cubic-bezier(0.34, 1.2, 0.64, 1)'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* QR MODAL / TOOLTIP */}
      {showQRModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 3000,
          background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} onClick={() => setShowQRModal(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '20px',
            padding: '24px', width: '320px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px'
          }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#fff', margin: 0, fontFamily: 'Outfit, sans-serif' }}>
              Recarga tu Tarjeta MI en Línea
            </h4>
            <p style={{ fontSize: '11px', color: '#A0AEC0', margin: 0, lineHeight: 1.4 }}>
              Escanea este código con tu celular para abrir el portal oficial de recarga de la App CDMX.
            </p>
            
            {/* Simulated QR Code via CSS grid */}
            <div style={{
              width: '160px', height: '160px', background: '#fff', margin: '10px auto',
              padding: '10px', borderRadius: '12px', display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '1px'
            }}>
              {Array.from({ length: 100 }).map((_, i) => {
                const isBlack = (i % 3 === 0 || i % 7 === 0 || i < 10 || i % 10 === 0 || i > 90 || (i > 30 && i < 40 && i % 2 === 0));
                return (
                  <div key={i} style={{ background: isBlack ? '#111' : '#fff' }} />
                );
              })}
            </div>

            <div style={{ fontSize: '10px', color: '#4A5568' }}>
              Válido solo en portales oficiales de la CDMX.
            </div>

            <button 
              onClick={() => setShowQRModal(false)}
              style={{
                width: '100%', padding: '10px', borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--color-metro-primary) 0%, #D40000 100%)',
                color: '#fff', border: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer'
              }}
            >
              Cerrar Ventana
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
