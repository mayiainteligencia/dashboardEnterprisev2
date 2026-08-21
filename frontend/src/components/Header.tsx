import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Calendar,
  Menu,
  AlertTriangle,
  CheckCircle,
  X,
  Lock,
  Flame,
  ShieldCheck,
  Building2,
  Clock
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
  critico: '#D32F2F',
  warning: '#D97706',
  ok: '#10B981'
};

const defaultNotifs: Notif[] = [
  {
    id: 1,
    titulo: 'Licitación PEMEX < 36 Horas',
    texto: 'Faltan 36h para presentar propuesta en ComprasMX (LA-18-T0O).',
    tiempo: '5 min',
    severidad: 'critico',
    leida: false
  },
  {
    id: 2,
    titulo: 'Cotización CFE Sin Seguimiento',
    texto: 'FSPM-2026-0178 lleva 7 días sin registrar nueva acción.',
    tiempo: '20 min',
    severidad: 'warning',
    leida: false
  },
  {
    id: 3,
    titulo: 'Orden de Compra Ternium Ganada',
    texto: 'Se confirmó cierre de rociadores por $3.2M MXN.',
    tiempo: '1 hora',
    severidad: 'ok',
    leida: false
  },
];

interface HeaderProps {
  title: string;
  onMenu?: () => void;
  modo?: Modo;
  onCliente?: () => void;
  onAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onMenu, modo = 'admin', onCliente, onAdmin }) => {
  const { colores, empresa, temas } = brandingConfig;
  const tema = temas.admin;
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

  // Cerrar dropdown al hacer clic fuera
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
      : s === 'critico'
      ? <AlertTriangle size={18} color={colorSeveridad.critico} />
      : <Clock size={18} color={colorSeveridad.warning} />;

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
        height: '75px',
        backgroundColor: '#FFFFFF',
        borderBottom: `1px solid ${colores.borde}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(14px, 3vw, 32px)',
        gap: '12px',
        flexShrink: 0,
      }}
    >
      {/* Hamburguesa (solo móvil) */}
      {onMenu && (
        <button
          onClick={onMenu}
          aria-label="Abrir menú"
          style={{
            width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
            backgroundColor: colores.fondoTerciario, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Menu size={20} color={colores.textoClaro} />
        </button>
      )}

      {/* IZQUIERDA - Fecha */}
      <div
        style={{
          display: onMenu ? 'none' : 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 14px',
          borderRadius: '10px',
          backgroundColor: colores.fondoTerciario,
          flexShrink: 0,
        }}
      >
        <Calendar size={16} style={{ color: colores.textoMedio }} />
        <span style={{
          fontSize: '13px',
          fontWeight: '600',
          color: colores.textoClaro
        }}>
          {fechaFormateada}
        </span>
      </div>

      {/* Asistente IA tipo buscador */}
      <AsistenteBuscador modo={modo} />

      {/* CENTRO - Branding FSPM */}
      <div style={{ textAlign: 'center', display: onMenu ? 'none' : 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '20px',
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          boxShadow: '0 2px 8px rgba(15,23,42,0.15)'
        }}>
          <Flame size={16} color="#FF6659" />
          <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.04em' }}>
            FSPM FIRE SAFETY
          </span>
          <span style={{ fontSize: '10px', fontWeight: '800', color: '#10B981', backgroundColor: 'rgba(16,185,129,0.2)', padding: '1px 6px', borderRadius: '6px' }}>
            CRM
          </span>
        </div>
      </div>

      {/* DERECHA - Notificaciones y Perfil */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Toggle Modo */}
        {modo && (
          <div style={{ display: 'flex', gap: '4px', padding: '3px', background: colores.fondoTerciario, borderRadius: '999px', flexShrink: 0 }}>
            <button
              onClick={onAdmin}
              style={{
                border: 'none',
                cursor: 'pointer',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 700,
                transition: 'all .2s',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: modo === 'admin' ? colores.primario : 'transparent',
                color: modo === 'admin' ? '#FFFFFF' : colores.textoMedio
              }}
            >
              <Lock size={12} /> Comercial
            </button>
            <button
              onClick={onCliente}
              style={{
                border: 'none',
                cursor: 'pointer',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 700,
                transition: 'all .2s',
                background: modo === 'cliente' ? '#0284C7' : 'transparent',
                color: modo === 'cliente' ? '#FFFFFF' : colores.textoMedio
              }}
            >
              Clientes
            </button>
          </div>
        )}

        {/* Notificaciones con Dropdown */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button 
            onClick={() => setNotificacionesAbiertas(!notificacionesAbiertas)}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: colores.fondoTerciario,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transition: 'all 0.2s',
            }}
          >
            <Bell size={18} style={{ color: colores.textoClaro }} />
            {notificacionesNoLeidas > 0 && (
              <span 
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  minWidth: '18px',
                  height: '18px',
                  borderRadius: '10px',
                  backgroundColor: '#D32F2F',
                  border: `2px solid #FFFFFF`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  padding: '0 3px',
                }}
              >
                {notificacionesNoLeidas}
              </span>
            )}
          </button>

          {/* Dropdown de Notificaciones */}
          {notificacionesAbiertas && (
            <div
              style={{
                position: 'absolute',
                top: '52px',
                right: '0',
                width: 'min(380px, calc(100vw - 24px))',
                maxHeight: '480px',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: `1px solid ${colores.borde}`,
                boxShadow: '0 10px 36px rgba(0,0,0,0.15)',
                overflow: 'hidden',
                zIndex: 1000,
              }}
            >
              <div 
                style={{
                  padding: '16px 18px',
                  borderBottom: `1px solid ${colores.borde}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: colores.fondoSecundario,
                }}
              >
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>
                    Alertas FSPM
                  </h3>
                  <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: colores.textoMedio }}>
                    {notificacionesNoLeidas} alertas pendientes
                  </p>
                </div>
                {notificacionesNoLeidas > 0 && (
                  <button
                    onClick={marcarTodasComoLeidas}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: colores.primario,
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                    }}
                  >
                    Marcar todas
                  </button>
                )}
              </div>

              {/* Lista */}
              <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
                {notificaciones.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => marcarComoLeida(notif.id)}
                    style={{
                      padding: '14px 18px',
                      borderBottom: `1px solid ${colores.borde}`,
                      backgroundColor: notif.leida ? 'transparent' : '#FEF2F230',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ flexShrink: 0, marginTop: '2px' }}>
                        {getIconoPorSeveridad(notif.severidad)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                          <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '800', color: colores.textoClaro }}>
                            {notif.titulo}
                          </h4>
                          <span style={{ fontSize: '10px', color: colores.textoOscuro }}>
                            {notif.tiempo}
                          </span>
                        </div>
                        <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: colores.textoMedio, lineHeight: '1.3' }}>
                          {notif.texto}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Perfil FSPM */}
        <button 
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#0F172A',
            border: 'none',
            color: '#FFFFFF',
            fontWeight: '800',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(15,23,42,0.25)',
          }}
        >
          FS
        </button>
      </div>
    </header>
  );
};
