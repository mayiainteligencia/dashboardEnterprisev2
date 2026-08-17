import React, { useState } from 'react';
import { MapPin, Layers, ShieldAlert, Wind, Droplets, Flame, Mountain, Compass } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { INMUEBLES_SAMPLE } from '../../../risko/riskoData';

export const GeoRiskStudioModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [activeLayer, setActiveLayer] = useState<'sismo' | 'inundacion' | 'viento' | 'geotecnia'>('sismo');
  const [selectedProp, setSelectedProp] = useState(INMUEBLES_SAMPLE[0]);

  return (
    <div style={{ padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro }}>
            GeoRisk Studio & Geoestudio Multiamenaza
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
            Dashboard 03 · Geocodificación, polígono, capas sismológicas NatCat, inundación pluvial y geotecnia
          </p>
        </div>

        {/* Selector de Capas NatCat */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {[
            { id: 'sismo', label: 'Sismo (PGA)', icon: Mountain },
            { id: 'inundacion', label: 'Inundación', icon: Droplets },
            { id: 'viento', label: 'Viento / Ciclón', icon: Wind },
            { id: 'geotecnia', label: 'Geotecnia', icon: Compass },
          ].map(layer => {
            const Icon = layer.icon;
            const isSel = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${isSel ? colores.primario : colores.borde}`,
                  backgroundColor: isSel ? colores.primario : '#F8FAFC',
                  color: isSel ? '#FFFFFF' : colores.textoMedio,
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                <Icon size={16} />
                <span>{layer.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visor Cartográfico Interactivo Simulando GIS */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '20px' }}>
        {/* Mapa GIS Interactivo */}
        <div
          style={{
            height: '520px',
            backgroundColor: '#F1F5F9',
            borderRadius: '16px',
            border: `1px solid ${colores.borde}`,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.05)'
          }}
        >
          {/* Fondo simulando mapa GIS vectorial */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.15, background: 'radial-gradient(circle, #2563EB 2px, transparent 2px)', backgroundSize: '30px 30px' }} />

          {/* Marcadores de Inmuebles */}
          {INMUEBLES_SAMPLE.map((inm, idx) => (
            <div
              key={inm.id}
              onClick={() => setSelectedProp(inm)}
              style={{
                position: 'absolute',
                top: `${30 + idx * 14}%`,
                left: `${25 + idx * 15}%`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '20px',
                backgroundColor: selectedProp.id === inm.id ? colores.primario : '#FFFFFF',
                color: selectedProp.id === inm.id ? '#FFFFFF' : colores.textoClaro,
                boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)',
                border: `2px solid ${inm.scoreRiesgo > 60 ? '#EF4444' : '#10B981'}`,
                transition: 'all 0.2s ease'
              }}
            >
              <MapPin size={16} color={selectedProp.id === inm.id ? '#FFFFFF' : colores.primario} />
              <span style={{ fontSize: '11px', fontWeight: '700' }}>{inm.nombre}</span>
            </div>
          ))}

          {/* Leyenda GIS Flotante */}
          <div style={{ position: 'absolute', bottom: '16px', left: '16px', backgroundColor: '#FFFFFF', padding: '12px 16px', borderRadius: '12px', border: `1px solid ${colores.borde}`, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: '11px' }}>
            <span style={{ fontWeight: '700', display: 'block', marginBottom: '6px' }}>Capa Activa: {activeLayer.toUpperCase()}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#EF4444' }} /> Alto Peligro
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F59E0B' }} /> Moderado
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10B981' }} /> Bajo
            </div>
          </div>
        </div>

        {/* Panel lateral Ficha Geoestudio */}
        <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '16px', border: `1px solid ${colores.borde}`, display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>
            Ficha de Geoestudio
          </h3>
          <div style={{ fontSize: '13px', color: colores.textoMedio }}>
            <strong>Activo:</strong> {selectedProp.nombre}
          </div>

          <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#FFFFFF', border: `1px solid ${colores.borde}` }}>
            <span style={{ fontSize: '11px', color: colores.textoOscuro, display: 'block' }}>Aceleración Pico de Terreno (PGA)</span>
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#EF4444' }}>0.38g (Periodo 250y)</span>
          </div>

          <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#FFFFFF', border: `1px solid ${colores.borde}` }}>
            <span style={{ fontSize: '11px', color: colores.textoOscuro, display: 'block' }}>Riesgo de Inundación Pluvial</span>
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#F59E0B' }}>Tirante Estimado: 0.45m</span>
          </div>

          <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#FFFFFF', border: `1px solid ${colores.borde}` }}>
            <span style={{ fontSize: '11px', color: colores.textoOscuro, display: 'block' }}>Zona Geotécnica</span>
            <span style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro }}>Zona III (Arcilla Altamente Compresible)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
