import React, { useState } from 'react';
import { Accessibility, Bike, Heart, AlertTriangle, ShieldCheck, UserCheck, HelpCircle, Eye } from 'lucide-react';

interface ElevatorAlert {
  estacion: string;
  linea: string;
  color: string;
  estado: string;
  regreso: string;
}

const ELEVATOR_ALERTS: ElevatorAlert[] = [
  { estacion: 'Chabacano', linea: 'L9', color: '#6B2E8C', estado: 'Mantenimiento preventivo de motor', regreso: 'Retoma 08 Julio' },
  { estacion: 'Balderas', linea: 'L3', color: '#007D63', estado: 'Falla mecánica temporal en andén norte', regreso: 'Retoma 09 Julio' },
  { estacion: 'Indios Verdes', linea: 'L3', color: '#007D63', estado: 'Sustitución de cableado de cabina', regreso: 'Retoma 12 Julio' }
];

export const ViajeAccesible: React.FC = () => {
  const [activeProfile, setActiveProfile] = useState<'movilidad' | 'adulto' | 'bici' | 'mascota'>('movilidad');

  const renderProfileContent = () => {
    switch (activeProfile) {
      case 'movilidad':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', animation: 'fadeInUp 0.3s ease' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#fff', margin: 0 }}>Guía para Movilidad Reducida o Discapacidad</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', color: '#A0AEC0' }}>
              <div style={{ background: '#121212', padding: '12px', borderLeft: '3px solid var(--color-metro-primary)', borderRadius: '8px' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Elevadores y Salvaescaleras</strong>
                El acceso a elevadores se realiza de forma libre con tu Tarjeta de Gratuidad o solicitando el apoyo de los oficiales en torniquetes.
              </div>
              <div style={{ background: '#121212', padding: '12px', borderLeft: '3px solid var(--color-metro-blue)', borderRadius: '8px' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Vagón Exclusivo</strong>
                Los primeros 3 vagones de cada tren en la red de Metro están reservados permanentemente para mujeres, niños y personas con discapacidad.
              </div>
              <div style={{ background: '#121212', padding: '12px', borderLeft: '3px solid var(--color-metro-green)', borderRadius: '8px' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Guías Podotáctiles y Apoyo Visual</strong>
                Usa las franjas amarillas texturizadas del piso para guiarte en los andenes. Contamos con placas en Braille junto a los teléfonos de auxilio.
              </div>
            </div>
          </div>
        );
      case 'adulto':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', animation: 'fadeInUp 0.3s ease' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#fff', margin: 0 }}>Guía para Adultos Mayores (60+)</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', color: '#A0AEC0' }}>
              <div style={{ background: '#121212', padding: '12px', borderLeft: '3px solid var(--color-metro-gold)', borderRadius: '8px' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Acceso Gratuito con INAPAM</strong>
                Presenta tu credencial INAPAM vigente en las puertas de cortesía (junto a torniquetes) para ingresar sin costo a toda la red.
              </div>
              <div style={{ background: '#121212', padding: '12px', borderLeft: '3px solid var(--color-metro-primary)', borderRadius: '8px' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Asientos Reservados</strong>
                Los asientos de color gris o identificados con el icono de adulto mayor son de uso prioritario. Por favor solicítalo si lo requieres.
              </div>
              <div style={{ background: '#121212', padding: '12px', borderLeft: '3px solid var(--color-metro-orange)', borderRadius: '8px' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Horas Pico Recomendadas</strong>
                Para tu mayor comodidad y seguridad, sugerimos planificar tus traslados fuera de las horas pico (07:00-09:30 y 18:00-20:30).
              </div>
            </div>
          </div>
        );
      case 'bici':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', animation: 'fadeInUp 0.3s ease' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#fff', margin: 0 }}>Guía para Viajar con Bicicleta (BiciRed)</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', color: '#A0AEC0' }}>
              <div style={{ background: '#121212', padding: '12px', borderLeft: '3px solid var(--color-metro-green)', borderRadius: '8px' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Horarios del Programa BiciRed</strong>
                - <strong>Lunes a Sábado:</strong> Permitido de 22:00 hrs a cierre de servicio.
                <br />- <strong>Domingos y Festivos:</strong> Acceso libre todo el día en Metro, Metrobús y Trolebús.
              </div>
              <div style={{ background: '#121212', padding: '12px', borderLeft: '3px solid var(--color-metro-primary)', borderRadius: '8px' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Lineamientos de Ingreso</strong>
                Utiliza las escaleras fijas para descender con tu bici (nunca escaleras mecánicas). En el andén, colócate al inicio o final del tren.
              </div>
              <div style={{ background: '#121212', padding: '12px', borderLeft: '3px solid var(--color-metro-blue)', borderRadius: '8px' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Bicis Plegables</strong>
                Las bicicletas plegables completamente cerradas y dentro de su funda pueden ingresar en cualquier horario y sistema.
              </div>
            </div>
          </div>
        );
      case 'mascota':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', animation: 'fadeInUp 0.3s ease' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#fff', margin: 0 }}>Guía para Viajar con Mascotas</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', color: '#A0AEC0' }}>
              <div style={{ background: '#121212', padding: '12px', borderLeft: '3px solid var(--color-metro-primary)', borderRadius: '8px' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Perros de Asistencia o Guía</strong>
                Tienen acceso 100% libre y autorizado en toda la red en cualquier horario. Deben portar su chaleco o arnés de identificación.
              </div>
              <div style={{ background: '#121212', padding: '12px', borderLeft: '3px solid var(--color-metro-orange)', borderRadius: '8px' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Mascotas de Compañía</strong>
                Se permite el acceso únicamente si viajan dentro de una **transportadora rígida y cerrada** de tamaño pequeño o mediano, limpia y segura.
              </div>
              <div style={{ background: '#121212', padding: '12px', borderLeft: '3px solid var(--color-metro-gold)', borderRadius: '8px' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Prohibición de Mascotas Sueltas</strong>
                Por seguridad de todos los usuarios y del propio animal, queda estrictamente prohibido llevar mascotas con correa fuera de su transportadora.
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)', gap: '20px', height: 'calc(100vh - 120px)', overflowY: 'auto' }} className="no-scrollbar">
      
      {/* LEFT COLUMN: GUIDES & SELECTOR */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* INTERACTIVE SELECTOR */}
        <div style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '16px', padding: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', fontFamily: 'Outfit, sans-serif', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Accessibility size={18} color="var(--color-metro-primary)" />
            Movilidad Inclusiva y Guías de Viaje
          </h2>
          
          {/* Profile Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '20px' }}>
            {[
              { id: 'movilidad', label: 'Movilidad', icon: Accessibility, color: 'var(--color-metro-primary)' },
              { id: 'adulto', label: 'Adulto 60+', icon: UserCheck, color: 'var(--color-metro-gold)' },
              { id: 'bici', label: 'Bicicleta', icon: Bike, color: 'var(--color-metro-green)' },
              { id: 'mascota', label: 'Mascota', icon: Heart, color: 'var(--color-metro-orange)' }
            ].map(p => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveProfile(p.id as any)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                    padding: '12px 6px', borderRadius: '12px', cursor: 'pointer',
                    background: activeProfile === p.id ? `${p.color}15` : '#121212',
                    border: `1px solid ${activeProfile === p.id ? p.color : '#2A2A3E'}`,
                    color: activeProfile === p.id ? '#fff' : '#A0AEC0',
                    transition: 'all 0.2s'
                  }}
                >
                  <Icon size={20} color={activeProfile === p.id ? p.color : '#717187'} />
                  <span style={{ fontSize: '11px', fontWeight: '700' }}>{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Content */}
          <div style={{ background: '#121212', border: '1px solid #2A2A3E', borderRadius: '12px', padding: '16px' }}>
            {renderProfileContent()}
          </div>
        </div>

        {/* GRATUIDADES SECTION */}
        <div style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Outfit, sans-serif', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <UserCheck size={16} color="var(--color-metro-green)" />
            Criterios de Acceso Gratuito
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#A0AEC0' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2A2A3E', textAlign: 'left' }}>
                  <th style={{ padding: '8px', color: '#fff' }}>Beneficiario</th>
                  <th style={{ padding: '8px', color: '#fff' }}>Requisito de Entrada</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { b: 'Adultos Mayores (60+)', r: 'Presentar credencial del INAPAM o INE' },
                  { b: 'Personas con Discapacidad', r: 'Tarjeta de Gratuidad emitida por el DIF' },
                  { b: 'Niños menores de 5 años', r: 'Ingreso libre acompañados de un adulto' },
                  { b: 'Estudiantes autorizados', r: 'Pase escolar oficial vigente con credencial' }
                ].map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: idx < 3 ? '1px solid #2A2A3E' : 'none' }}>
                    <td style={{ padding: '10px 8px', fontWeight: '600', color: '#fff' }}>{item.b}</td>
                    <td style={{ padding: '10px 8px' }}>{item.r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: ELEVATOR WARNINGS & TIPS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* ELEVATOR OUTAGE ALERTS */}
        <div style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Outfit, sans-serif', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <AlertTriangle size={16} color="var(--color-metro-primary)" />
            Alertas de Elevadores Fuera de Servicio
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ELEVATOR_ALERTS.map((alert, idx) => (
              <div key={idx} style={{
                background: '#121212', border: '1px solid #2A2A3E', borderRadius: '12px', padding: '12px',
                display: 'flex', flexDirection: 'column', gap: '6px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ background: alert.color, color: '#fff', fontSize: '9px', fontWeight: '800', padding: '2px 6px', borderRadius: '4px' }}>{alert.linea}</span>
                    <strong style={{ fontSize: '12px', color: '#fff' }}>{alert.estacion}</strong>
                  </div>
                  <span style={{ fontSize: '9px', background: 'rgba(212,0,0,0.12)', color: 'var(--color-metro-primary)', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>INACTIVO</span>
                </div>
                <div style={{ fontSize: '11px', color: '#A0AEC0' }}>{alert.estado}</div>
                <div style={{ fontSize: '9.5px', color: '#4A5568' }}>Estimado: {alert.regreso}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SECURITY & SAFETY TIPS */}
        <div style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '16px', padding: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Outfit, sans-serif', margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <HelpCircle size={16} color="var(--color-metro-blue)" />
            Consejos de Seguridad
          </h3>
          <ul style={{ fontSize: '12px', color: '#A0AEC0', paddingLeft: '16px', lineHeight: 1.6, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>Mantén tus pertenencias al frente en zonas de andenes.</li>
            <li>No rebases la línea amarilla de seguridad en el andén de espera.</li>
            <li>En horas pico, respeta la separación de vagones exclusivos para mujeres y niños.</li>
            <li>Ubica los botones de paro de emergencia en escaleras eléctricas y andenes.</li>
          </ul>
        </div>
      </div>

    </div>
  );
};
