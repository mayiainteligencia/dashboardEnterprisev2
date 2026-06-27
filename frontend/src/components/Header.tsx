import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Menu,
  X,
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
  CalendarDays,
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
  const { colores, empresa } = brandingConfig;
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false);
  const [notificaciones, setNotificaciones] = useState<Notification[]>(notificacionesRichs);
  const [chatAbierto, setChatAbierto] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fecha = new Date();
  const opcionesFecha: Intl.DateTimeFormatOptions = {
    day: '2-digit', month: 'short', year: 'numeric',
  };
  // Formato: 27 de Jun de 2026 o similar
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
      case 'info':    return <Info size={14} color="#3B82F6" />;
    }
  };

  const getColoresNotif = (tipo: Notification['tipo']) => {
    switch (tipo) {
      case 'urgente': return { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)' };
      case 'alerta':  return { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' };
      case 'exito':   return { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' };
      case 'info':    return { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)' };
    }
  };

  const marcarTodas = () => {
    setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })));
  };

  const marcarComoLeida = (id: number) => {
    setNotificaciones((prev) =>
      prev.map((item) => (item.id === id ? { ...item, leida: true } : item))
    );
  };

  return (
    <>
      {/* Backdrop overlay for conversational assistant */}
      {chatAbierto && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.3)',
            backdropFilter: 'blur(3px)',
            zIndex: 200,
            transition: 'opacity 0.2s ease',
          }}
        />
      )}

      <header
        style={{
          height: '72px',
          backgroundColor: colores.fondoSecundario,
          borderBottom: `1px solid ${colores.borde}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          gap: '16px',
          flexShrink: 0,
          position: 'relative',
          zIndex: 300,
        }}
      >
        {/* IZQUIERDA: Menu hamburguesa (móvil) + Título de sección */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {onMenu && (
            <button
              id="header-mobile-menu-btn"
              onClick={onMenu}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#F1F5F9',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#475569',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <Menu size={18} />
            </button>
          )}

          <div>
            <h1
              style={{
                fontSize: '16px',
                fontWeight: '700',
                color: colores.textoClaro,
                fontFamily: 'Outfit, sans-serif',
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {title}
            </h1>
            <p style={{ fontSize: '10px', color: '#94A3B8', marginTop: '1px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Command Center
            </p>
          </div>
        </div>

        {/* CENTRO: Barra de Asistente IA desplegable integrada */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', maxWidth: '480px' }}>
          <AsistenteBuscador onStateChange={setChatAbierto} />
        </div>

        {/* DERECHA: Logo Richs (en header escritorio) + Fecha Pill + Notificaciones + Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Logo corporativo de Richs (sutil) */}
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '6px' }} className="hide-mobile">
            <img
              src={empresa.logoUrl}
              alt={empresa.nombre}
              style={{ height: '36px', width: 'auto', objectFit: 'contain', opacity: 0.95 }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          {/* Pill de Fecha */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '999px',
              backgroundColor: '#FFFFFF',
              border: `1px solid ${colores.borde}`,
            }}
            className="hide-mobile"
          >
            <CalendarDays size={13} color={colores.textoMedio} />
            <span style={{ fontSize: '11px', fontWeight: '600', color: colores.textoMedio, textTransform: 'capitalize' }}>
              {fechaFormateada}
            </span>
          </div>

          {/* Campana de Notificaciones */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              id="header-notifications-btn"
              onClick={() => setNotificacionesAbiertas(!notificacionesAbiertas)}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: notificacionesAbiertas ? '#F1F5F9' : '#FFFFFF',
                border: `1px solid ${notificacionesAbiertas ? colores.primario : '#E2E8F0'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colores.textoMedio,
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease',
              }}
            >
              <Bell size={17} />
              {sinLeer > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-1px',
                    right: '-1px',
                    width: '16px',
                    height: '16px',
                    background: '#EF4444',
                    borderRadius: '50%',
                    fontSize: '9px',
                    fontWeight: '700',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #FFFFFF',
                  }}
                >
                  {sinLeer}
                </span>
              )}
            </button>

            {notificacionesAbiertas && (
              <div
                style={{
                  position: 'absolute',
                  top: '46px',
                  right: 0,
                  width: '360px',
                  maxHeight: '480px',
                  background: '#FFFFFF',
                  border: `1px solid ${colores.borde}`,
                  borderRadius: '16px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                  zIndex: 1000,
                  overflow: 'hidden',
                  animation: 'fadeIn 0.2s ease',
                }}
              >
                {/* Cabecera Notificaciones */}
                <div
                  style={{
                    padding: '14px 18px',
                    borderBottom: '1px solid #F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: colores.textoClaro, fontFamily: 'Outfit, sans-serif' }}>
                      Alertas de Operación Rich
                    </div>
                    {sinLeer > 0 && (
                      <div style={{ fontSize: '10px', color: '#EF4444', fontWeight: '600', marginTop: '1px' }}>
                        {sinLeer} sin leer
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {sinLeer > 0 && (
                      <button
                        onClick={marcarTodas}
                        style={{
                          fontSize: '11px',
                          color: colores.primario,
                          fontWeight: '600',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '2px 6px',
                        }}
                      >
                        Marcar todas
                      </button>
                    )}
                    <button
                      onClick={() => setNotificacionesAbiertas(false)}
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '6px',
                        background: '#F1F5F9',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#64748B',
                        cursor: 'pointer',
                      }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>

                {/* Lista de Alertas */}
                <div className="no-scrollbar" style={{ overflowY: 'auto', maxHeight: '360px' }}>
                  {notificaciones.map((n) => {
                    const c = getColoresNotif(n.tipo);
                    return (
                      <div
                        key={n.id}
                        onClick={() => marcarComoLeida(n.id)}
                        style={{
                          padding: '12px 18px',
                          borderBottom: '1px solid #F1F5F9',
                          display: 'flex',
                          gap: '10px',
                          background: n.leida ? 'transparent' : 'rgba(211, 18, 69, 0.01)',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#F8FAFC';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = n.leida ? 'transparent' : 'rgba(211, 18, 69, 0.01)';
                        }}
                      >
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '8px',
                            background: c.bg,
                            border: `1px solid ${c.border}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '2px',
                          }}
                        >
                          {iconoNotificacion(n.tipo)}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: '12px',
                              fontWeight: n.leida ? '600' : '700',
                              color: n.leida ? '#475569' : '#0F172A',
                              marginBottom: '2px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'baseline',
                            }}
                          >
                            <span>{n.titulo}</span>
                            {!n.leida && (
                              <div
                                style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  background: '#EF4444',
                                  marginLeft: '6px',
                                  flexShrink: 0,
                                }}
                              />
                            )}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.4 }}>
                            {n.mensaje}
                          </div>
                          <div style={{ fontSize: '9px', color: '#94A3B8', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={9} />
                            {n.tiempo}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Avatar Perfil */}
          <button
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${colores.primario}, ${colores.acento})`,
              border: `2px solid ${colores.borde}`,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              transition: 'transform 0.2s',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            R
          </button>
        </div>
      </header>
    </>
  );
};
