import React, { useState } from 'react';
import { Wind, Droplets, Mountain, Compass, Download, MapPin, Layers, RefreshCw, X, ShieldAlert, CheckCircle2, FileText } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { INMUEBLES_SAMPLE } from '../../../risko/riskoData';
import { MapaCalorEstados } from '../MapaCalorEstados';

export const GeoRiskStudioModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [activeLayer, setActiveLayer] = useState<'sismo' | 'inundacion' | 'viento' | 'geotecnia'>('sismo');
  const [selectedProp, setSelectedProp] = useState(INMUEBLES_SAMPLE[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [exportingGis, setExportingGis] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRecalculatePml = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
      showToast(`🎯 PML recalculado con éxito para ${selectedProp.nombre} con aceleración espectral local.`);
    }, 1400);
  };

  const handleExportGis = () => {
    setExportingGis(true);
    setTimeout(() => {
      setExportingGis(false);
      showToast(`🗺️ Capas GIS exportadas en formato GeoJSON / Shapefile.`);
    }, 1500);
  };

  const handleDownloadReport = () => {
    showToast(`📄 Dictamen de Microzonificación Sísmica & NatCat (${selectedProp.nombre}) generado en PDF.`);
  };

  return (
    <div style={{ padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          padding: '14px 20px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          fontSize: '13px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 9999,
          animation: 'fadeSlideUp 0.3s ease both'
        }}>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* ── ENCABEZADO ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ padding: '6px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'inline-flex' }}>
              <Compass size={24} color={colores.primario} />
            </span>
            GeoRisk Studio &amp; Geoestudio Multiamenaza
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
            Dashboard 03 · Geocodificación, polígono, capas sismológicas NatCat, inundación pluvial y geotecnia
          </p>
        </div>

        {/* Acciones Rápidas */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleExportGis}
            disabled={exportingGis}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '10px',
              border: `1px solid ${colores.borde}`,
              backgroundColor: '#F8FAFC',
              color: colores.textoClaro,
              fontSize: '12px',
              fontWeight: '700',
              cursor: exportingGis ? 'wait' : 'pointer'
            }}
          >
            <Download size={14} />
            {exportingGis ? 'Exportando...' : 'Exportar GeoJSON'}
          </button>

          <button
            onClick={handleDownloadReport}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: colores.primario,
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            <FileText size={14} />
            Descargar Dictamen GIS
          </button>
        </div>
      </div>

      {/* Selector de Capas NatCat */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: colores.textoOscuro, marginRight: '4px' }}>
          Capa Activa:
        </span>
        {[
          { id: 'sismo',     label: 'Sismo (PGA)',    icon: Mountain },
          { id: 'inundacion',label: 'Inundación',     icon: Droplets },
          { id: 'viento',    label: 'Viento / Ciclón',icon: Wind     },
          { id: 'geotecnia', label: 'Geotecnia',      icon: Compass  },
        ].map(layer => {
          const Icon = layer.icon;
          const isSel = activeLayer === layer.id;
          return (
            <button
              key={layer.id}
              onClick={() => {
                setActiveLayer(layer.id as any);
                showToast(`🌐 Capa Geoespacial activada: ${layer.label}`);
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 14px', borderRadius: '10px',
                border: `1px solid ${isSel ? colores.primario : colores.borde}`,
                backgroundColor: isSel ? colores.primario : '#F8FAFC',
                color: isSel ? '#FFFFFF' : colores.textoMedio,
                fontSize: '12px', fontWeight: '700', cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={15} />
              <span>{layer.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── GRID PRINCIPAL: MAPA DE CALOR + FICHA GEOESTUDIO ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '20px', alignItems: 'start' }}>

        {/* Columna izquierda — Mapa de Calor por Estados */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: `1px solid ${colores.borde}`,
          boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
          overflow: 'hidden',
        }}>
          <MapaCalorEstados />
        </div>

        {/* Columna derecha — Ficha de Geoestudio */}
        <div style={{
          padding: '20px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: `1px solid ${colores.borde}`,
          boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: colores.textoOscuro, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Inmueble Seleccionado
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
              {INMUEBLES_SAMPLE.map(inm => (
                <button
                  key={inm.id}
                  onClick={() => {
                    setSelectedProp(inm);
                    showToast(`📍 Mostrando ficha de microzonificación: ${inm.nombre}`);
                  }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: `1px solid ${selectedProp.id === inm.id ? colores.primario : colores.borde}`,
                    backgroundColor: selectedProp.id === inm.id ? '#EFF6FF' : '#F8FAFC',
                    color: selectedProp.id === inm.id ? colores.primario : colores.textoClaro,
                    fontSize: '12px',
                    fontWeight: selectedProp.id === inm.id ? '700' : '500',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '170px' }}>
                    {inm.nombre}
                  </span>
                  <span style={{
                    fontSize: '10px', fontWeight: '800', padding: '1px 6px', borderRadius: '4px',
                    backgroundColor: inm.scoreRiesgo >= 80 ? '#FEF2F2' : inm.scoreRiesgo >= 60 ? '#FFF7ED' : inm.scoreRiesgo >= 40 ? '#FFFBEB' : '#ECFDF5',
                    color: inm.scoreRiesgo >= 80 ? '#EF4444' : inm.scoreRiesgo >= 60 ? '#F97316' : inm.scoreRiesgo >= 40 ? '#D97706' : '#10B981',
                  }}>
                    {inm.scoreRiesgo}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${colores.borde}`, paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '800', color: colores.textoClaro }}>
              Amenazas Locales
            </h4>
            {[
              { label: 'Sismo (PGA 250y)', value: '0.38g', nivel: 'Zona III Arcilla', color: '#EF4444' },
              { label: 'Inundación Pluvial', value: 'Tr = 100 años', nivel: 'Riesgo Medio', color: '#F59E0B' },
              { label: 'Viento Máx. Ráfaga', value: '140 km/h', nivel: 'Norma CFE', color: '#10B981' },
              { label: 'Falla Geológica', value: 'A 420m', nivel: 'Monitoreo Activo', color: '#F97316' },
            ].map((a, i) => (
              <div key={i} style={{ padding: '8px 10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: `1px solid ${colores.borde}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', color: colores.textoClaro }}>
                  <span>{a.label}</span>
                  <span style={{ color: a.color }}>{a.value}</span>
                </div>
                <span style={{ fontSize: '10px', color: colores.textoOscuro, marginTop: '2px', display: 'block' }}>
                  {a.nivel}
                </span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: `1px solid ${colores.borde}`, paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: colores.textoOscuro }}>PML Máximo:</span>
              <strong style={{ color: '#EF4444' }}>{selectedProp.pml}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: colores.textoOscuro }}>AAL Promedio:</span>
              <strong>{selectedProp.aal}</strong>
            </div>
            <button
              onClick={handleRecalculatePml}
              disabled={isRecalculating}
              style={{
                width: '100%', padding: '9px', borderRadius: '10px', border: 'none',
                backgroundColor: colores.primario, color: '#FFFFFF',
                fontSize: '12px', fontWeight: '700', cursor: isRecalculating ? 'wait' : 'pointer',
                marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
              }}
            >
              <RefreshCw size={13} style={{ animation: isRecalculating ? 'spin 1s linear infinite' : 'none' }} />
              {isRecalculating ? 'Recalculando...' : 'Recalcular PML'}
            </button>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
