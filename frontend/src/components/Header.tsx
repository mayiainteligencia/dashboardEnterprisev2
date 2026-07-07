import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Menu,
  X,
  AlertTriangle,
  CheckCircle,
  Info,
  Search,
  Train,
  Clock,
  Compass,
} from 'lucide-react';
import { brandingConfig } from '../config/branding';
import { AsistenteBuscador } from './AsistenteBuscador';

interface HeaderProps {
  title: string;
  onMenu?: () => void;
}

interface Notification {
  id: number;
  tipo: 'alerta' | 'exito' | 'info' | 'urgente';
  titulo: string;
  mensaje: string;
  tiempo: string;
  leida: boolean;
}

const notificacionesCDMX: Notification[] = [
  {
    id: 1,
    tipo: 'urgente',
    titulo: 'Alerta L3: Retraso de Trenes',
    mensaje: 'Afluencia crítica de usuarios en Indios Verdes y Deportivo 18 de Marzo. Avance lento.',
    tiempo: 'Hace 8 min',
    leida: false,
  },
  {
    id: 2,
    tipo: 'alerta',
    titulo: 'Metrobús L1: Manifestación',
    mensaje: 'Cortes a la circulación en Av. Insurgentes a la altura de El Ángel. Circuitos activos.',
    tiempo: 'Hace 32 min',
    leida: false,
  },
  {
    id: 3,
    tipo: 'exito',
    titulo: 'Cablebús L2: Operación Normal',
    mensaje: 'Se reanuda el servicio regular tras concluir revisión preventiva en torre 14.',
    tiempo: 'Hace 2 horas',
    leida: true,
  },
  {
    id: 4,
    tipo: 'info',
    titulo: 'Programa BiciRed Activo',
    mensaje: 'Este domingo recuerda que puedes ingresar con tu bicicleta al metro todo el día.',
    tiempo: 'Hace 4 horas',
    leida: true,
  },
];

export const Header: React.FC<HeaderProps> = ({ title, onMenu }) => {
  const { colores, ia } = brandingConfig;
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false);
  const [notificaciones, setNotificaciones] = useState<Notification[]>(notificacionesCDMX);
  const [buscadorAbierto, setBuscadorAbierto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Reloj CDMX en vivo
  const [time, setTime] = useState('');
  useEffect(() => {
    const updateClock = () => {
      setTime(new Date().toLocaleTimeString('es-MX', { 
        timeZone: 'America/Mexico_City',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }));
    };
    updateClock();
    const t = setInterval(updateClock, 1000);
    return () => clearInterval(t);
  }, []);

  const fecha = new Date();
  const opcionesFecha: Intl.DateTimeFormatOptions = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  };
  const fechaFormateada = fecha.toLocaleDateString('es-MX', opcionesFecha);

  const sinLeer = notificaciones.filter((n) => !n.leida).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setNotificacionesAbiertas(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const iconoNotificacion = (tipo: Notification['tipo']) => {
    switch (tipo) {
      case 'urgente': return <AlertTriangle size={14} color="var(--color-metro-primary)" />;
      case 'alerta':  return <AlertTriangle size={14} color="var(--color-metro-gold)" />;
      case 'exito':   return <CheckCircle size={14} color="var(--color-metro-green)" />;
      case 'info':    return <Info size={14} color="var(--color-metro-blue)" />;
    }
  };

  const colorNotificacion = (tipo: Notification['tipo']) => {
    const map = {
      urgente: { bg: 'rgba(212,0,0,0.12)', border: 'rgba(212,0,0,0.25)' },
      alerta:  { bg: 'rgba(245,166,35,0.12)', border: 'rgba(245,166,35,0.25)' },
      exito:   { bg: 'rgba(0,132,61,0.12)', border: 'rgba(0,132,61,0.25)' },
      info:    { bg: 'rgba(0,61,165,0.12)', border: 'rgba(0,61,165,0.25)' },
    };
    return map[tipo];
  };

  const marcarTodas = () => {
    setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })));
  };

  return (
    <>
      <header style={{
        height: '64px',
        background: 'rgba(13, 13, 13, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #2A2A3E',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: '12px',
        flexShrink: 0,
        position: 'relative',
        zIndex: 100,
      }}>
        {/* Mobile menu */}
        {onMenu && (
          <button
            id="header-mobile-menu-btn"
            onClick={onMenu}
            style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: '#1C1C28', border: '1px solid #2A2A3E',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#A0AEC0', cursor: 'pointer', flexShrink: 0,
            }}
          >
            <Menu size={18} />
          </button>
        )}

        {/* Page title */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Train size={16} color="var(--color-metro-primary)" style={{ flexShrink: 0 }} />
            <h1 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#FFFFFF',
              fontFamily: 'Outfit, sans-serif',
              margin: 0,
            }}>
              {title}
            </h1>
          </div>
          <div style={{ fontSize: '11px', color: '#A0AEC0', marginTop: '1px', textTransform: 'capitalize' }}>
            {fechaFormateada}
          </div>
        </div>

        {/* Reloj en Vivo CDMX */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '6px 12px', background: '#121212', border: '1px solid #2A2A3E',
          borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', color: '#FFFFFF',
          fontFamily: 'Outfit, sans-serif'
        }} className="hide-mobile">
          <Clock size={12} color="var(--color-metro-gold)" />
          <span>CDMX {time}</span>
        </div>

        {/* Search */}
        <button
          id="header-search-btn"
          onClick={() => setBuscadorAbierto(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 14px',
            background: '#1C1C28',
            border: '1px solid #2A2A3E',
            borderRadius: '10px',
            color: '#A0AEC0',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontSize: '12px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#222238';
            e.currentTarget.style.borderColor = 'var(--color-metro-primary)';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#1C1C28';
            e.currentTarget.style.borderColor = '#2A2A3E';
            e.currentTarget.style.color = '#A0AEC0';
          }}
        >
          <Search size={14} />
          <span className="hide-mobile">Pregunta al asistente de rutas…</span>
        </button>

        {/* IA badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '6px 12px',
          background: 'rgba(212,0,0,0.1)',
          border: '1px solid rgba(212,0,0,0.25)',
          borderRadius: '999px',
          fontSize: '11px',
          color: '#FFFFFF',
          fontWeight: '600',
          cursor: 'default',
        }} className="hide-mobile">
          <Compass size={12} color="var(--color-metro-primary)" />
          {ia.nombre}
          <div style={{
            width: '6px', height: '6px',
            borderRadius: '50%', background: '#00843D',
            boxShadow: '0 0 6px #00843D',
          }} />
        </div>

        {/* Notifications */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            id="header-notifications-btn"
            onClick={() => setNotificacionesAbiertas(!notificacionesAbiertas)}
            style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: notificacionesAbiertas ? 'rgba(212,0,0,0.1)' : '#1C1C28',
              border: `1px solid ${notificacionesAbiertas ? 'rgba(212,0,0,0.3)' : '#2A2A3E'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#A0AEC0', cursor: 'pointer',
              position: 'relative', transition: 'all 0.2s',
            }}
          >
            <Bell size={17} />
            {sinLeer > 0 && (
              <span style={{
                position: 'absolute', top: '-4px', right: '-4px',
                width: '18px', height: '18px',
                background: 'var(--color-metro-primary)',
                borderRadius: '50%',
                fontSize: '10px', fontWeight: '700', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #0D0D0D',
              }}>
                {sinLeer}
              </span>
            )}
          </button>

          {notificacionesAbiertas && (
            <div style={{
              position: 'absolute', top: '48px', right: 0,
              width: '360px', maxHeight: '480px',
              background: '#1A1A2E',
              border: '1px solid #2A2A3E',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              zIndex: 1000,
              overflow: 'hidden',
              animation: 'fadeIn 0.2s ease',
            }}>
              {/* Header */}
              <div style={{
                padding: '16px 18px 12px',
                borderBottom: '1px solid #2A2A3E',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF', fontFamily: 'Outfit, sans-serif' }}>
                    Alertas de Movilidad
                  </div>
                  {sinLeer > 0 && (
                    <div style={{ fontSize: '11px', color: 'var(--color-metro-primary)', fontWeight: '600', marginTop: '2px' }}>
                      {sinLeer} sin leer
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {sinLeer > 0 && (
                    <button
                      onClick={marcarTodas}
                      style={{
                        fontSize: '11px', color: 'var(--color-metro-primary)', fontWeight: '600',
                        background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Marcar todas
                    </button>
                  )}
                  <button
                    onClick={() => setNotificacionesAbiertas(false)}
                    style={{
                      width: '26px', height: '26px', borderRadius: '8px',
                      background: '#1C1C28', border: '1px solid #2A2A3E',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#A0AEC0', cursor: 'pointer',
                    }}
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>

              {/* Notification list */}
              <div className="no-scrollbar" style={{ overflowY: 'auto', maxHeight: '380px' }}>
                {notificaciones.map((n) => {
                  const { bg, border } = colorNotificacion(n.tipo);
                  return (
                    <div
                      key={n.id}
                      onClick={() => setNotificaciones((prev) =>
                        prev.map((item) => item.id === n.id ? { ...item, leida: true } : item)
                      )}
                      style={{
                        padding: '12px 18px',
                        borderBottom: '1px solid #2A2A3E',
                        display: 'flex', gap: '10px',
                        background: n.leida ? 'transparent' : 'rgba(212,0,0,0.02)',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#222238'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = n.leida ? 'transparent' : 'rgba(212,0,0,0.02)'; }}
                    >
                      <div style={{
                        width: '30px', height: '30px', borderRadius: '8px',
                        background: bg, border: `1px solid ${border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginTop: '2px',
                      }}>
                        {iconoNotificacion(n.tipo)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: '12px', fontWeight: n.leida ? '500' : '700',
                          color: n.leida ? '#A0AEC0' : '#FFFFFF',
                          marginBottom: '2px',
                        }}>
                          {n.titulo}
                        </div>
                        <div style={{ fontSize: '11px', color: '#A0AEC0', lineHeight: 1.4 }}>
                          {n.mensaje}
                        </div>
                        <div style={{ fontSize: '10px', color: '#4A5568', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={9} />
                          {n.tiempo}
                        </div>
                      </div>
                      {!n.leida && (
                        <div style={{
                          width: '8px', height: '8px', borderRadius: '50%',
                          background: 'var(--color-metro-primary)', flexShrink: 0, marginTop: '4px',
                        }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Search Modal */}
      {buscadorAbierto && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex', alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '80px',
        }} onClick={() => setBuscadorAbierto(false)}>
          <div onClick={(e) => e.stopPropagation()}
            style={{ width: '600px', maxWidth: '90vw', animation: 'fadeIn 0.2s ease' }}>
            <AsistenteBuscador />
          </div>
        </div>
      )}
    </>
  );
};
