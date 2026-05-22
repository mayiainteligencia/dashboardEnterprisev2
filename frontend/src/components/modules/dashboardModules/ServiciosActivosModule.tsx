import React from 'react';
import { Package, ArrowRight, CheckCircle, Clock, Star } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

interface ServiciosActivosModuleProps {
  onNavigate?: (section: string) => void;
}

export const ServiciosActivosModule: React.FC<ServiciosActivosModuleProps> = ({ onNavigate }) => {
  const { colores } = brandingConfig;

  const servicios = [
    { nombre: 'Colocation 42U', estado: 'activo', tipo: 'Infraestructura', color: colores.exito },
    { nombre: 'SOC IA Managed', estado: 'activo', tipo: 'Seguridad', color: colores.exito },
    { nombre: 'Backup Cloud', estado: 'activo', tipo: 'Continuidad', color: colores.exito },
    { nombre: 'GPU as a Service', estado: 'pendiente', tipo: 'Compute', color: colores.advertencia },
    { nombre: 'Data Lake Soberano', estado: 'recomendado', tipo: 'Datos', color: colores.primario },
  ];

  const estadoIcon: Record<string, React.ReactNode> = {
    activo: <CheckCircle size={12} color={colores.exito} />,
    pendiente: <Clock size={12} color={colores.advertencia} />,
    recomendado: <Star size={12} color={colores.primario} />,
  };

  const estadoLabel: Record<string, string> = {
    activo: 'En operación',
    pendiente: 'En proceso',
    recomendado: 'Recomendado',
  };

  const conteos = {
    activos: servicios.filter(s => s.estado === 'activo').length,
    pendientes: servicios.filter(s => s.estado === 'pendiente').length,
    recomendados: servicios.filter(s => s.estado === 'recomendado').length,
  };

  return (
    <div style={{ backgroundColor: colores.fondoSecundario, borderRadius: '24px', border: `1px solid ${colores.borde}`, padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: colores.gradienteSecundario, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Package size={22} color="white" />
        </div>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: colores.textoClaro, margin: 0, lineHeight: 1.2 }}>Servicios Activos</h3>
          <p style={{ fontSize: '11px', color: colores.textoMedio, margin: 0 }}>
            Contratados · Operación · Recomendados
          </p>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {[
          { valor: conteos.activos, label: 'Activos', color: colores.exito, bg: `${colores.exito}15` },
          { valor: conteos.pendientes, label: 'En Proceso', color: colores.advertencia, bg: `${colores.advertencia}15` },
          { valor: conteos.recomendados, label: 'Recomendados', color: colores.primario, bg: `${colores.primario}15` },
        ].map(({ valor, label, color, bg }) => (
          <div key={label} style={{ backgroundColor: bg, border: `1px solid ${color}33`, borderRadius: '12px', padding: '10px 8px', textAlign: 'center' }}>
            <p style={{ fontSize: '22px', fontWeight: 'bold', color, margin: 0, lineHeight: 1 }}>{valor}</p>
            <p style={{ fontSize: '9px', color: colores.textoMedio, margin: '4px 0 0 0', lineHeight: 1.3 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Lista de servicios */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        {servicios.map(({ nombre, estado, tipo, color }) => (
          <div key={nombre} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', backgroundColor: colores.fondoTerciario, borderRadius: '12px', borderLeft: `3px solid ${color}` }}>
            <div style={{ flexShrink: 0 }}>{estadoIcon[estado]}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '12px', fontWeight: '600', color: colores.textoClaro, margin: 0, lineHeight: 1.2 }}>{nombre}</p>
              <p style={{ fontSize: '9px', color: colores.textoMedio, margin: '2px 0 0 0' }}>{tipo}</p>
            </div>
            <span style={{ fontSize: '9px', fontWeight: '700', color, backgroundColor: `${color}15`, padding: '3px 8px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
              {estadoLabel[estado]}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => onNavigate?.('marketplace')}
        style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: 'none', background: colores.gradienteSecundario, color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s', marginTop: 'auto' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Activar servicio inteligente <ArrowRight size={16} />
      </button>
    </div>
  );
};
