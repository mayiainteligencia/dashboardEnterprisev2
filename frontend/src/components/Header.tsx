import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Calendar,
  Menu,
  AlertTriangle,
  CheckCircle,
  X,
  Building2,
  ShieldCheck,
  BrainCircuit,
  Activity
} from 'lucide-react';
import { brandingConfig } from '../config/branding';
import { AsistenteBuscador } from './AsistenteBuscador';

export type Modo = 'admin' | 'cliente';
export interface Notif {
  id: number;
  titulo: string;
  texto: string;
  tiempo: string;
  severidad: 'critico' | 'warning' | 'ok';
  leida?: boolean;
}

const colorSeveridad = {
  critico: '#EF4444',
  warning: '#F59E0B',
  ok: '#10B981'
};

const defaultNotifs: Notif[] = [
  { id: 1, titulo: 'Alerta Sísmica Mw 6.8', texto: 'Evaluación rápida activada en 42 inmuebles.', tiempo: '10 min', severidad: 'critico', leida: false },
  { id: 2, titulo: 'Inspección NFPA Aprobada', texto: 'Parque Industrial Apodaca actualizó dictamen.', tiempo: '25 min', severidad: 'ok', leida: false },
  { id: 3, titulo: 'Infraseguro Detectado', texto: 'Torre Reforma 222 requiere actualización de VRN.', tiempo: '1 hora', severidad: 'warning', leida: false },
];

interface HeaderProps {
  title: string;
  onMenu?: () => void;
  modo?: Modo;
  onCliente?: () => void;
  onAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onMenu, modo = 'admin' }) => {
  const { colores, empresa } = brandingConfig;
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false);
  const [notificaciones, setNotificaciones] = useState<Notif[]>(defaultNotifs);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fecha = new Date();
  const opciones: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  };
  const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setNotificacionesAbiertas(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notificacionesNoLeidas = notificaciones.filter(n => !n.leida).length;

  const getIconoPorSeveridad = (s: Notif['severidad']) =>
    s === 'ok'
      ? <CheckCircle size={18} color={colorSeveridad.ok} />
      : <AlertTriangle size={18} color={colorSeveridad[s]} />;

  const marcarComoLeida = (id: number) => {
    setNotificaciones(notificaciones.map(n => 
      n.id === id ? { ...n, leida: true } : n
    ));
  };

  const marcarTodasComoLeidas = () => {
    setNotificaciones(notificaciones.map(n => ({ ...n, leida: true })));
  };

  return (
    <header 
      style={{ 
        height: '76px',
        backgroundColor: '#FFFFFF',
        borderBottom: `1px solid ${colores.borde}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        gap: '16px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 4px rgba(15, 23, 42, 0.05)'
      }}
    >
      {/* IZQUIERDA - Menú Hamburguesa en móvil y Branding RISKO AI */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {onMenu && (
          <button 
            onClick={onMenu}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: colores.fondoTerciario,
              color: colores.textoClaro,
              cursor: 'pointer',
            }}
          >
            <Menu size={20} />
          </button>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: colores.gradientePrimario,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 4px 10px rgba(37, 99, 235, 0.25)'
            }}
          >
            <Building2 size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: '800', color: colores.textoClaro, letterSpacing: '-0.02em' }}>
                RISKO AI
              </span>
              <span style={{ 
                fontSize: '11px', 
                fontWeight: '700', 
                backgroundColor: '#EFF6FF', 
                color: colores.primario, 
                padding: '2px 8px', 
                borderRadius: '999px',
                border: '1px solid #BFDBFE'
              }}>
                v1.0 Real Estate
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '11px', color: colores.textoOscuro, fontWeight: '500' }}>
              Riesgo Inmobiliario & Copiloto Agéntico
            </p>
          </div>
        </div>
      </div>

      {/* CENTRO - Buscador / Asistente RAG */}
      <div style={{ flex: 1, maxWidth: '520px', margin: '0 16px' }}>
        <AsistenteBuscador modo={modo} />
      </div>

      {/* DERECHA - Fecha, Estado del Motor & Notificaciones */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Badge Motor IA Activo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          borderRadius: '20px',
          backgroundColor: '#ECFDF5',
          border: '1px solid #A7F3D0',
          color: '#047857',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          <BrainCircuit size={16} />
          <span>Motor Agéntico 16/16 Activo</span>
        </div>

        {/* Fecha */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          borderRadius: '8px',
          backgroundColor: colores.fondoTerciario,
          color: colores.textoMedio,
          fontSize: '13px',
          fontWeight: '500'
        }}>
          <Calendar size={15} />
          <span>{fechaFormateada}</span>
        </div>

        {/* Notificaciones */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button 
            onClick={() => setNotificacionesAbiertas(!notificacionesAbiertas)}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: `1px solid ${colores.borde}`,
              backgroundColor: '#FFFFFF',
              color: colores.textoClaro,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Bell size={18} />
            {notificacionesNoLeidas > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: colores.critico,
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {notificacionesNoLeidas}
              </span>
            )}
          </button>

          {/* Modal de Notificaciones */}
          {notificacionesAbiertas && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '48px',
              width: '360px',
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.15)',
              border: `1px solid ${colores.borde}`,
              padding: '16px',
              zIndex: 200,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: '700', fontSize: '14px', color: colores.textoClaro }}>
                  Alertas & Alertas NatCat ({notificacionesNoLeidas})
                </span>
                <button 
                  onClick={marcarTodasComoLeidas}
                  style={{ border: 'none', background: 'none', color: colores.primario, fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Marcar leídas
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notificaciones.map(n => (
                  <div 
                    key={n.id}
                    onClick={() => marcarComoLeida(n.id)}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      backgroundColor: n.leida ? '#F8FAFC' : '#EFF6FF',
                      borderLeft: `4px solid ${colorSeveridad[n.severidad]}`,
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      {getIconoPorSeveridad(n.severidad)}
                      <span style={{ fontWeight: '600', fontSize: '13px', color: colores.textoClaro }}>{n.titulo}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '12px', color: colores.textoMedio }}>{n.texto}</p>
                    <span style={{ fontSize: '10px', color: colores.textoOscuro }}>{n.tiempo}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
