import React, { useState } from 'react';
import { FileText, CheckCircle2, AlertCircle, Building2, MapPin, DollarSign, Calendar, ShieldCheck } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { INMUEBLES_SAMPLE } from '../../../risko/riskoData';

export const ExpedienteDigitalModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [selectedProperty, setSelectedProperty] = useState(INMUEBLES_SAMPLE[0]);

  return (
    <div style={{ padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro }}>
            Alta y Expediente Digital (Gemelo de Riesgo)
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
            Dashboard 02 · Identidad, dimensiones, ocupación, valores y completitud documental
          </p>
        </div>

        <select
          value={selectedProperty.id}
          onChange={(e) => {
            const p = INMUEBLES_SAMPLE.find(x => x.id === e.target.value);
            if (p) setSelectedProperty(p);
          }}
          style={{ padding: '8px 14px', borderRadius: '10px', border: `1px solid ${colores.borde}`, fontSize: '13px', fontWeight: '600', backgroundColor: '#F8FAFC', outline: 'none' }}
        >
          {INMUEBLES_SAMPLE.map(p => (
            <option key={p.id} value={p.id}>{p.nombre} ({p.ubicacion})</option>
          ))}
        </select>
      </div>

      {/* Tarjeta Principal del Expediente Vivo */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Ficha Técnica */}
        <div style={{ padding: '24px', backgroundColor: '#F8FAFC', borderRadius: '16px', border: `1px solid ${colores.borde}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Building2 size={28} color={colores.primario} />
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: colores.textoClaro }}>{selectedProperty.nombre}</h3>
              <span style={{ fontSize: '12px', color: colores.textoOscuro }}>ID: {selectedProperty.id} · {selectedProperty.tipo}</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px' }}>
              <span style={{ color: colores.textoOscuro }}>Ubicación:</span>
              <span style={{ fontWeight: '600', color: colores.textoClaro }}>{selectedProperty.ubicacion}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px' }}>
              <span style={{ color: colores.textoOscuro }}>Superficie Construida:</span>
              <span style={{ fontWeight: '600', color: colores.textoClaro }}>{selectedProperty.superficieConstruida}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px' }}>
              <span style={{ color: colores.textoOscuro }}>Niveles / Año:</span>
              <span style={{ fontWeight: '600', color: colores.textoClaro }}>{selectedProperty.niveles} Niveles ({selectedProperty.anioConstruccion})</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px' }}>
              <span style={{ color: colores.textoOscuro }}>Valor Reposición VRN:</span>
              <span style={{ fontWeight: '700', color: colores.primario }}>{selectedProperty.valorReposicion}</span>
            </div>
          </div>
        </div>

        {/* Indicador de Completitud Documental */}
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: `1px solid ${colores.borde}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>Completitud del Expediente Digital</h4>
              <span style={{ fontSize: '18px', fontWeight: '800', color: '#10B981' }}>94%</span>
            </div>
            <p style={{ fontSize: '12px', color: colores.textoOscuro, margin: '0 0 16px' }}>
              Documentación crítica auditada por el Agente de Ingesta IA.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              {[
                { doc: 'Escritura & Título de Propiedad', status: 'Verificado', ok: true },
                { doc: 'Dictamen de Estabilidad Estructural 2026', status: 'Verificado', ok: true },
                { doc: 'Programa Interno de Protección Civil', status: 'Vigente', ok: true },
                { doc: 'Prueba de Presión de Red NFPA 25', status: 'Vencido (Actualizar)', ok: false },
                { doc: 'Póliza de Seguro All-Risk Vigente', status: 'Verificado', ok: true }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#F8FAFC' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {item.ok ? <CheckCircle2 size={16} color="#10B981" /> : <AlertCircle size={16} color="#EF4444" />}
                    <span style={{ fontWeight: '600', color: colores.textoClaro }}>{item.doc}</span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: item.ok ? '#10B981' : '#EF4444' }}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
