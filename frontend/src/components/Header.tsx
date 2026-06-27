import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Menu,
  X,
  AlertTriangle,
  CheckCircle,
  Info,
  Atom,
  Search,
  ChevronDown,
  Dna,
  Microscope,
  Clock,
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

const notificacionesRichs: Notification[] = [
  {
    id: 1,
    tipo: 'urgente',
    titulo: 'Alerta Demanda: Whip Topping CDMX',
    mensaje: 'El pronóstico de demanda en Zona Centro para Julio supera el stock proyectado en 15%.',
    tiempo: 'Hace 8 min',
    leida: false,
  },
  {
    id: 2,
    tipo: 'alerta',
    titulo: 'Distribuidor 360: Servipan Guadalajara',
    mensaje: 'Se detectó baja cobertura en catálogo de bases de pan para pastel. Revisar promoción.',
    tiempo: 'Hace 32 min',
    leida: false,
  },
  {
    id: 3,
    tipo: 'exito',
    titulo: 'Chef Copilot: Receta Autorizada',
    mensaje: 'Se publicó y validó con éxito el rendimiento de la receta "Tres Leches Moka Festivo".',
    tiempo: 'Hace 2 horas',
    leida: false,
  },
  {
    id: 4,
    tipo: 'info',
    titulo: 'E-commerce CDMX: Pedidos en alza',
    mensaje: 'Se detectó un incremento de recompra del 12% en pasteles terminados esta semana.',
    tiempo: 'Hace 3 horas',
    leida: true,
  },
  {
    id: 5,
    tipo: 'exito',
    titulo: 'Academia Rich: Cursos completados',
    mensaje: '24 vendedores de foodservice de Cuajimalpa acreditaron el módulo de Data Selling.',
    tiempo: 'Hace 5 horas',
    leida: true,
  },
  {
    id: 6,
    tipo: 'info',
    titulo: 'Competidor Alert: Precios Puratos',
    mensaje: 'Puratos México ajustó precios en cobertura de chocolate (-5%). Analizando impacto.',
    tiempo: 'Hace 6 horas',
    leida: true,
  },
];

export const Header: React.FC<HeaderProps> = ({ title, onMenu }) => {
  const { colores, empresa, ia } = brandingConfig;
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false);
  const [notificaciones, setNotificaciones] = useState<Notification[]>(notificacionesRichs);
  const [buscadorAbierto, setBuscadorAbierto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      case 'urgente': return <AlertTriangle size={14} color="#EF4444" />;
      case 'alerta':  return <AlertTriangle size={14} color="#F59E0B" />;
      case 'exito':   return <CheckCircle size={14} color="#10B981" />;
      case 'info':    return <Info size={14} color="#0EA5E9" />;
    }
  };

  const colorNotificacion = (tipo: Notification['tipo']) => {
    const map = {
      urgente: { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.25)' },
      alerta:  { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)' },
      exito:   { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.25)' },
      info:    { bg: 'rgba(14,165,233,0.12)', border: 'rgba(14,165,233,0.25)' },
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
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #E2E8F0',
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
              background: '#F1F5F9', border: '1px solid #E2E8F0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#475569', cursor: 'pointer', flexShrink: 0,
            }}
          >
            <Menu size={18} />
          </button>
        )}

        {/* Page title */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Dna size={16} color="#0EA5E9" style={{ flexShrink: 0 }} />
            <h1 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#0F172A',
              fontFamily: 'Outfit, sans-serif',
              margin: 0,
            }}>
              {title}
            </h1>
          </div>
          <div style={{ fontSize: '11px', color: '#475569', marginTop: '1px', textTransform: 'capitalize' }}>
            {fechaFormateada}
          </div>
        </div>

        {/* Search */}
        <button
          id="header-search-btn"
          onClick={() => setBuscadorAbierto(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 14px',
            background: '#F1F5F9',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            color: '#64748B',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontSize: '12px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#E2E8F0';
            e.currentTarget.style.borderColor = '#CBD5E1';
            e.currentTarget.style.color = '#0F172A';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#F1F5F9';
            e.currentTarget.style.borderColor = '#E2E8F0';
            e.currentTarget.style.color = '#64748B';
          }}
        >
          <Search size={14} />
          <span className="hide-mobile">Buscar en el dashboard…</span>
        </button>

        {/* MAYIA badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '6px 12px',
          background: 'rgba(124,58,237,0.1)',
          border: '1px solid rgba(124,58,237,0.25)',
          borderRadius: '999px',
          fontSize: '11px',
          color: '#A78BFA',
          fontWeight: '600',
          cursor: 'default',
        }} className="hide-mobile">
          <Atom size={12} color="#A78BFA" />
          {ia.nombre}
          <div style={{
            width: '6px', height: '6px',
            borderRadius: '50%', background: '#10B981',
            boxShadow: '0 0 6px rgba(16,185,129,0.6)',
          }} />
        </div>

        {/* Notifications */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            id="header-notifications-btn"
            onClick={() => setNotificacionesAbiertas(!notificacionesAbiertas)}
            style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: notificacionesAbiertas ? 'rgba(14,165,233,0.1)' : '#F1F5F9',
              border: `1px solid ${notificacionesAbiertas ? 'rgba(14,165,233,0.3)' : '#E2E8F0'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#475569', cursor: 'pointer',
              position: 'relative', transition: 'all 0.2s',
            }}
          >
            <Bell size={17} />
            {sinLeer > 0 && (
              <span style={{
                position: 'absolute', top: '-4px', right: '-4px',
                width: '18px', height: '18px',
                background: '#EF4444',
                borderRadius: '50%',
                fontSize: '10px', fontWeight: '700', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid #FFFFFF',
              }}>
                {sinLeer}
              </span>
            )}
          </button>

          {notificacionesAbiertas && (
            <div style={{
              position: 'absolute', top: '48px', right: 0,
              width: '360px', maxHeight: '480px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              zIndex: 1000,
              overflow: 'hidden',
              animation: 'fadeIn 0.2s ease',
            }}>
              {/* Header */}
              <div style={{
                padding: '16px 18px 12px',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', fontFamily: 'Outfit, sans-serif' }}>
                    Alertas Científicas
                  </div>
                  {sinLeer > 0 && (
                    <div style={{ fontSize: '11px', color: '#EF4444', fontWeight: '600', marginTop: '2px' }}>
                      {sinLeer} sin leer
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {sinLeer > 0 && (
                    <button
                      onClick={marcarTodas}
                      style={{
                        fontSize: '11px', color: '#0EA5E9', fontWeight: '600',
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
                      background: '#F1F5F9', border: '1px solid #E2E8F0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#64748B', cursor: 'pointer',
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
                        borderBottom: '1px solid #E2E8F0',
                        display: 'flex', gap: '10px',
                        background: n.leida ? 'transparent' : 'rgba(14,165,233,0.02)',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#F8FAFC'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = n.leida ? 'transparent' : 'rgba(14,165,233,0.02)'; }}
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
                          color: n.leida ? '#64748B' : '#0F172A',
                          marginBottom: '2px',
                        }}>
                          {n.titulo}
                        </div>
                        <div style={{ fontSize: '11px', color: '#475569', lineHeight: 1.4 }}>
                          {n.mensaje}
                        </div>
                        <div style={{ fontSize: '10px', color: '#475569', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={9} />
                          {n.tiempo}
                        </div>
                      </div>
                      {!n.leida && (
                        <div style={{
                          width: '8px', height: '8px', borderRadius: '50%',
                          background: '#EF4444', flexShrink: 0, marginTop: '4px',
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
          background: 'rgba(255, 255, 255, 0.7)',
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
