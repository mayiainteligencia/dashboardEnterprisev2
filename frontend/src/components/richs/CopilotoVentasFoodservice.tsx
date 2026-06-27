import React, { useState } from 'react';
import { Sparkles, MessageSquare, AlertCircle, ShoppingBag, Check, ShieldAlert } from 'lucide-react';

interface ClientProfile {
  id: string;
  nombre: string;
  tipo: string;
  volumenEstimado: string;
  dolorPrincipal: string;
  skusRecomendados: string[];
  argumentoValor: string;
}

const clientProfiles: ClientProfile[] = [
  {
    id: '1',
    nombre: 'Pastelería Delicias Locales (Pyme)',
    tipo: 'Emprendedor / Negocio de Pastelería',
    volumenEstimado: '150-200 kg mensuales',
    dolorPrincipal: 'Merma alta por resecamiento en vitrina y burbujas de aire.',
    skusRecomendados: ['Bettercreme Vainilla 4kg', 'On Top Crema Batida', 'Pan de Vainilla Base 8"'],
    argumentoValor: 'Bettercreme no se agrieta ni reseca en vitrina hasta por 5 días, reduciendo la merma a cero. Además, su estabilidad a temperatura ambiente (hasta 30°C) elimina riesgos de derretido.'
  },
  {
    id: '2',
    nombre: 'Hotel Camino Real CDMX',
    tipo: 'Foodservice / Cuenta Corporativa',
    volumenEstimado: '800-1,200 kg mensuales',
    dolorPrincipal: 'Falta de consistencia y velocidad en montaje de banquetes masivos.',
    skusRecomendados: ['Versatié Crema Culinaria 1L', 'Whip Topping Base 1kg'],
    argumentoValor: 'Versatié rinde el doble que una crema animal convencional, soporta adición de cítricos y licores sin cortarse, y se monta en la mitad del tiempo, asegurando consistencia en banquetes de más de 500 personas.'
  },
  {
    id: '3',
    nombre: 'Panificadora El Rosario',
    tipo: 'Distribuidor / Panadería Grande',
    volumenEstimado: '3,000+ kg mensuales',
    dolorPrincipal: 'Dificultad para humectar pan con leche tradicional (absorción lenta, escurrimiento).',
    skusRecomendados: ['Tres Riches Jarabe Original', 'Base de Pan Chocolate 10"'],
    argumentoValor: 'Tres Riches es un jarabe de absorción inmediata (100% capilaridad). No se escurre ni encharca las charolas, logrando que el pastel conserve el peso de venta completo de principio a fin.'
  }
];

export const CopilotoVentasFoodservice: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<ClientProfile>(clientProfiles[0]);
  const [objection, setObjection] = useState('precio');
  const [salesPitch, setSalesPitch] = useState(
    'Entiendo su preocupación por el costo inicial de la Bettercreme. Sin embargo, al comparar con Puratos/Dawn, la Bettercreme rinde hasta un 30% más en volumen batido (overrun de 3.2x), lo que significa que cubre más pasteles por tazón. Al sumar el ahorro por merma en vitrina (no se agrieta), el costo neto por porción resulta ser un 12% menor.'
  );

  const handleObjectionChange = (o: string) => {
    setObjection(o);
    let resp = '';
    if (o === 'precio') {
      resp = 'Entiendo su preocupación por el costo inicial de la Bettercreme. Sin embargo, al comparar con Puratos/Dawn, la Bettercreme rinde hasta un 30% más en volumen batido (overrun de 3.2x), lo que significa que cubre más pasteles por tazón. Al sumar el ahorro por merma en vitrina (no se agrieta), el costo neto por porción resulta ser un 12% menor.';
    } else if (o === 'estabilidad') {
      resp = 'Nuestra crema Whip Topping Base y Bettercreme son líderes en tolerancia climática. Bettercreme en particular resiste hasta 30°C a temperatura ambiente sin perder volumen ni colapsar. Haremos una prueba técnica en su cocina hoy mismo para que certifique cómo mantiene los picos de decoración sin escurrir.';
    } else if (o === 'aprendizaje') {
      resp = 'Para facilitar la transición de su personal, Productos Rich México cuenta con un equipo de Chefs Técnicos que impartirán una capacitación presencial sin costo adicional en su taller. Además, le brindamos acceso a la "Academia Rich + MAYIA" donde sus pasteleros obtendrán micro-certificaciones rápidas mediante videos prácticos.';
    }
    setSalesPitch(resp);
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
            <Sparkles size={18} color="#10B981" />
            <span style={{ fontSize: '11px', color: '#10B981', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Copiloto de Ventas Foodservice B2B — Pitch & Objeciones
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '750', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
            B2B Commercial Copilot & Objection Simulator
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Prepara visitas de ventas efectivas simulando las necesidades del cliente y obteniendo argumentos técnicos contra la competencia.
          </p>
        </div>
        <div style={{ padding: '8px 14px', background: '#FFF', border: '1px solid var(--border)', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600' }}>PITCH EFFECTIVENESS</div>
          <div style={{ fontSize: '16px', fontWeight: '750', color: '#10B981' }}>+24% en Cierre</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* CLIENT PROFILE BOX */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
            Perfiles de Prospectos HORECA & Panaderías
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {clientProfiles.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedClient(p)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid',
                  borderColor: selectedClient.id === p.id ? '#10B981' : 'var(--border)',
                  background: selectedClient.id === p.id ? 'rgba(16,185,129,0.03)' : '#FFF',
                  transition: 'all 0.15s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{p.nombre}</span>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)' }}>{p.tipo}</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Volumen: {p.volumenEstimado}
                </div>
              </button>
            ))}
          </div>

          {/* Value proposition details */}
          <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '16px', border: '1px solid var(--border)', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>DOLOR IDENTIFICADO:</div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>{selectedClient.dolorPrincipal}</div>
            </div>

            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>PRODUCTOS PROPUESTOS:</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                {selectedClient.skusRecomendados.map((sku, i) => (
                  <span key={i} style={{ fontSize: '11px', fontWeight: '700', color: '#1E40AF', padding: '2px 8px', background: 'rgba(30,64,175,0.06)', borderRadius: '6px', border: '1px solid rgba(30,64,175,0.1)' }}>
                    {sku}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={12} color="#10B981" /> PROPUESTA DE VALOR IA:
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                {selectedClient.argumentoValor}
              </p>
            </div>
          </div>
        </div>

        {/* OBJECTION SIMULATOR */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={18} color="#D31245" />
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
              Simulador de Objeciones del Cliente
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Seleccione la objeción del comprador:</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { id: 'precio', label: 'El precio es muy alto comparado con Dawn o Puratos' },
                { id: 'estabilidad', label: 'Temo que la crema se derrita o se caiga en vitrina' },
                { id: 'aprendizaje', label: 'A mis decoradores les da miedo cambiar de marca y no saber batirla' },
              ].map(o => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => handleObjectionChange(o.id)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: objection === o.id ? '#D31245' : 'var(--border)',
                    background: objection === o.id ? 'rgba(211,18,69,0.03)' : '#FFF',
                    fontSize: '12px',
                    fontWeight: objection === o.id ? '700' : '500',
                    color: objection === o.id ? '#D31245' : 'var(--text-secondary)'
                  }}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(30,64,175,0.02) 0%, rgba(16,185,129,0.02) 100%)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '16px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '8px' }}>
              <span style={{
                background: '#10B981',
                color: '#FFF',
                fontSize: '9px',
                fontWeight: '800',
                padding: '2px 6px',
                borderRadius: '4px'
              }}>ARGUMENTO COMERCIAL SUGERIDO</span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Basado en rendimiento técnico</span>
            </div>
            
            <p style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              lineHeight: 1.5
            }}>
              {salesPitch}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
