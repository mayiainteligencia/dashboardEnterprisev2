import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Calendar,
  Menu,
  AlertTriangle,
  CheckCircle,
  X,
  Lock
} from 'lucide-react';
import { brandingConfig } from '../config/branding';
import { AlertasHeader } from './comercial/AlertasHeader';
import { AsistenteBuscador } from './AsistenteBuscador';
import { notifsPorModo, colorSeveridad, type Notif, type Modo } from '../besco/bescoData';

interface HeaderProps {
  title: string;
  onMenu?: () => void;
  modo: Modo;
  onCliente?: () => void;
  onAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onMenu, modo, onCliente, onAdmin }) => {
  const { colores, empresa, temas } = brandingConfig;
  const tema = modo === 'admin' ? temas.admin : temas.cliente;
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false);
  const [notificaciones, setNotificaciones] = useState<Notif[]>(notifsPorModo[modo]);
  useEffect(() => { setNotificaciones(notifsPorModo[modo]); }, [modo]);
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
        height: '80px',
        backgroundColor: colores.fondoSecundario,
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

      {/* IZQUIERDA - Fecha (estática, se actualiza con el día) */}
      <div
        style={{
          display: onMenu ? 'none' : 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          borderRadius: '12px',
          backgroundColor: colores.fondoTerciario,
          flexShrink: 0,
        }}
      >
        <Calendar size={18} style={{ color: colores.textoClaro }} />
        <span style={{
          fontSize: '14px',
          fontWeight: '500',
          color: colores.textoClaro
        }}>
          {fechaFormateada}
        </span>
      </div>

      {/* Asistente IA tipo buscador */}
      <AsistenteBuscador modo={modo} />

      {/* CENTRO - Logo de la empresa (se oculta en móvil para dar espacio) */}
      <div style={{ textAlign: 'center', display: onMenu ? 'none' : 'flex', alignItems: 'center', gap: '16px' }}>
        <img 
          src={empresa.logo} 
          alt={`${empresa.nombre} logo`}
          style={{
            height: '48px',
            width: 'auto',
            objectFit: 'contain',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            const fallback = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'block';
          }}
        />
        
        <div style={{ display: 'none' }}>
          <h1 
            style={{ 
              fontSize: '28px', 
              fontWeight: 'bold',
              background: `linear-gradient(135deg, ${colores.primario} 100%, ${colores.secundario} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
            }}
          >
            {empresa.nombre}
          </h1>
          <p style={{ 
            fontSize: '12px',
            color: colores.textoMedio,
            margin: '4px 0 0 0',
          }}>
            {empresa.eslogan}
          </p>
        </div>
      </div>

      {/* DERECHA - Notificaciones y Perfil */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Toggle Cliente / Admin */}
        {modo && (
          <div style={{ display: 'flex', gap: '4px', padding: '4px', background: colores.fondoTerciario, borderRadius: '999px', flexShrink: 0 }}>
            <button
              onClick={onCliente}
              style={{ border: 'none', cursor: 'pointer', padding: '7px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: 600, transition: 'all .2s',
                background: modo === 'cliente' ? temas.cliente.acento : 'transparent', color: modo === 'cliente' ? temas.cliente.sobreAcento : colores.textoMedio }}
            >
              Cliente
            </button>
            <button
              onClick={onAdmin}
              style={{ border: 'none', cursor: 'pointer', padding: '7px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: 600, transition: 'all .2s', display: 'flex', alignItems: 'center', gap: '5px',
                background: modo === 'admin' ? temas.admin.acento : 'transparent', color: modo === 'admin' ? temas.admin.sobreAcento : colores.textoMedio }}
            >
              <Lock size={12} /> Admin
            </button>
          </div>
        )}

        {/* Alertas de la operación / inmuebles */}
        <AlertasHeader modo={modo} />

        {/* Notificaciones con Dropdown */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button 
            onClick={() => setNotificacionesAbiertas(!notificacionesAbiertas)}
            style={{
              width: '48px',
              height: '48px',
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
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Bell size={20} style={{ color: colores.textoClaro }} />
            {notificacionesNoLeidas > 0 && (
              <span 
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  minWidth: '18px',
                  height: '18px',
                  borderRadius: '10px',
                  backgroundColor: colores.peligro,
                  border: `2px solid ${colores.fondoSecundario}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  padding: '0 4px',
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
                top: '60px',
                right: '0',
                width: 'min(380px, calc(100vw - 24px))',
                maxHeight: '500px',
                backgroundColor: colores.fondoSecundario,
                borderRadius: '16px',
                border: `1px solid ${colores.borde}`,
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                overflow: 'hidden',
                zIndex: 1000,
              }}
            >
              {/* Header del dropdown */}
              <div 
                style={{
                  padding: '16px 20px',
                  borderBottom: `1px solid ${colores.borde}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    color: colores.textoClaro 
                  }}>
                    Notificaciones
                  </h3>
                  <p style={{ 
                    margin: '4px 0 0 0', 
                    fontSize: '12px',
                    color: colores.textoMedio 
                  }}>
                    Tienes {notificacionesNoLeidas} sin leer
                  </p>
                </div>
                {notificacionesNoLeidas > 0 && (
                  <button
                    onClick={marcarTodasComoLeidas}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: tema.acentoOscuro,
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      padding: '4px 8px',
                    }}
                  >
                    Marcar todas
                  </button>
                )}
              </div>

              {/* Lista de notificaciones */}
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {notificaciones.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => marcarComoLeida(notif.id)}
                    style={{
                      padding: '16px 20px',
                      borderBottom: `1px solid ${colores.borde}`,
                      backgroundColor: notif.leida ? 'transparent' : colores.fondoTerciario + '40',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colores.fondoTerciario;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = notif.leida 
                        ? 'transparent' 
                        : colores.fondoTerciario + '40';
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div style={{ flexShrink: 0, marginTop: '2px' }}>
                        {getIconoPorSeveridad(notif.severidad)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '4px' }}>
                          <h4 style={{
                            margin: 0,
                            fontSize: '13px',
                            fontWeight: notif.leida ? '500' : '700',
                            color: colores.textoClaro,
                          }}>
                            {notif.titulo}
                          </h4>
                          {!notif.leida && (
                            <div 
                              style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: tema.acento,
                                flexShrink: 0,
                                marginLeft: '8px',
                                marginTop: '4px',
                              }}
                            />
                          )}
                        </div>
                        <p style={{
                          margin: '4px 0',
                          fontSize: '12px',
                          color: colores.textoMedio,
                          lineHeight: '1.4',
                        }}>
                          {notif.mensaje}
                        </p>
                        <span style={{
                          fontSize: '11px',
                          color: colores.textoOscuro,
                        }}>
                          {notif.tiempo}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer del dropdown */}
              <div 
                style={{
                  padding: '12px 20px',
                  borderTop: `1px solid ${colores.borde}`,
                  textAlign: 'center',
                }}
              >
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: tema.acentoOscuro,
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    width: '100%',
                    padding: '8px',
                  }}
                >
                  Ver todas las notificaciones
                </button>
              </div>
            </div>
          )}
        </div>

      {/* Perfil */}
        <button 
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'all 0.2s',
            overflow: 'hidden',
            padding: '4px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
          }}
        >
          <img
            src={empresa.logo}
            alt="Perfil"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
            onError={(e) => {
              // Fallback a la letra M si la imagen no carga
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const container = target.parentElement;
              if (container) {
                container.style.background = `linear-gradient(135deg, ${colores.primario} 100%, ${colores.secundario} 100%)`;
                container.style.fontSize = '18px';
                container.style.fontWeight = 'bold';
                container.style.color = '#FFFFFF';
                container.textContent = 'M';
              }
            }}
          />
        </button>
      </div>
    </header>
  );
};
