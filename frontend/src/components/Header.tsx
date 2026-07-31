import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell,
  Calendar,
  Menu,
  AlertTriangle,
  CheckCircle,
  Info,
  TrendingUp,
  X
} from 'lucide-react';
import { brandingConfig } from '../config/branding';
import { AlertasHeader } from './comercial/AlertasHeader';
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

// Notificaciones estáticas de ejemplo
const notificacionesEstaticas: Notification[] = [
  {
    id: 1,
    tipo: 'alerta',
    titulo: 'Alerta de calidad en lote',
    mensaje: 'Se detectó variación de espesor en lote VF-2024-087',
    tiempo: 'Hace 5 min',
    leida: false,
  },
  {
    id: 2,
    tipo: 'urgente',
    titulo: 'Stock bajo: Vidrio Nivel IIIA',
    mensaje: 'Inventario de vidrio blindado IIIA por debajo del mínimo en CDMX',
    tiempo: 'Hace 15 min',
    leida: false,
  },
  {
    id: 3,
    tipo: 'exito',
    titulo: 'Instalación completada #VF-1247',
    mensaje: 'Paquete FULL instalado exitosamente - Toyota Camry 2024',
    tiempo: 'Hace 1 hora',
    leida: true,
  },
  {
    id: 4,
    tipo: 'info',
    titulo: 'Nuevo prospecto calificado',
    mensaje: 'Cliente empresarial solicita cotización para flota de 12 unidades',
    tiempo: 'Hace 2 horas',
    leida: true,
  },
  {
    id: 5,
    tipo: 'exito',
    titulo: 'Meta mensual superada',
    mensaje: 'Se alcanzaron 45 instalaciones, 15% sobre la meta de julio',
    tiempo: 'Hace 3 horas',
    leida: true,
  },
];

export const Header: React.FC<HeaderProps> = ({ title, onMenu }) => {
  const { colores, empresa } = brandingConfig;
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false);
  const [notificaciones, setNotificaciones] = useState<Notification[]>(notificacionesEstaticas);
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

  const getIconoPorTipo = (tipo: Notification['tipo']) => {
    switch (tipo) {
      case 'alerta':
        return <AlertTriangle size={18} color="#F59E0B" />;
      case 'exito':
        return <CheckCircle size={18} color="#10B981" />;
      case 'urgente':
        return <AlertTriangle size={18} color="#EF4444" />;
      case 'info':
        return <Info size={18} color="#3B82F6" />;
    }
  };

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
      <AsistenteBuscador />

      {/* CENTRO - Logo de la empresa (se oculta en móvil para dar espacio) */}
      <div style={{ textAlign: 'center', display: onMenu ? 'none' : 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: '#111827',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 3px 10px rgba(212, 0, 10, 0.2)',
          border: '1px solid rgba(212, 0, 10, 0.25)',
          padding: '4px',
          flexShrink: 0,
        }}>
          <img 
            src="/assets/LogoForte_clean.png" 
            alt={`${empresa.nombre} logo`}
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'contain',
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/LogoForte.jpg';
            }}
          />
        </div>
        <span style={{ fontSize: '18px', fontWeight: 800, color: colores.textoClaro, letterSpacing: '-0.5px' }}>
          {empresa.nombre}
        </span>
      </div>

      {/* DERECHA - Notificaciones y Perfil */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Alertas comerciales */}
        <AlertasHeader />

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
                      color: colores.primario,
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
                        {getIconoPorTipo(notif.tipo)}
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
                                backgroundColor: colores.primario,
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
                    color: colores.primario,
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
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#111827',
            border: '2px solid rgba(212, 0, 10, 0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(212, 0, 10, 0.25)',
            transition: 'all 0.2s',
            overflow: 'hidden',
            padding: '4px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(212, 0, 10, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 0, 10, 0.25)';
          }}
        >
          <img 
            src="/assets/LogoForte_clean.png"
            alt="Perfil"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/assets/LogoForte.jpg';
            }}
          />
        </button>
      </div>
    </header>
  );
};
