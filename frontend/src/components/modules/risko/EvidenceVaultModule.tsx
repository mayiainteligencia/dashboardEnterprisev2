import React, { useState } from 'react';
import { Camera, Eye, FileCheck, ShieldAlert, Cpu, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const EvidenceVaultModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [filterType, setFilterType] = useState('todos');

  const evidencias = [
    { id: 'ev-1', titulo: 'Grieta Diagonal en Muro de Carga Sótano 2', tipo: 'Foto 360°', hallazgo: 'Indicio de Asentamiento Diferencial', confianza: '96%', fecha: '12 Ago 2026', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
    { id: 'ev-2', titulo: 'Inspección con Dron Termográfico de Cubierta', tipo: 'Dron', hallazgo: 'Corrosión en Lámina y Filtración de Agua', confianza: '94%', fecha: '10 Ago 2026', hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4' },
    { id: 'ev-3', titulo: 'Obstrucción de Válvula Principal de Rociadores', tipo: 'Foto HD', hallazgo: 'Material Combustible Almacenado a < 0.5m', confianza: '98%', fecha: '08 Ago 2026', hash: '6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090' },
  ];

  return (
    <div style={{ padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro }}>
            Evidence Vault & Visión Computacional IA
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
            Dashboard 04 · Fotos 360°, dron, planos CAD, metadatos inmutables y detección automática de hallazgos
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: '#EFF6FF', color: colores.primario, padding: '6px 12px', borderRadius: '12px' }}>
            ● Cadena de Custodia Inmutable (SHA-256)
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {evidencias.map((ev) => (
          <div key={ev.id} style={{ borderRadius: '16px', border: `1px solid ${colores.borde}`, backgroundColor: '#FFFFFF', overflow: 'hidden', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)' }}>
            <div style={{ height: '180px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <ImageIcon size={48} color={colores.textoOscuro} />
              <span style={{ position: 'absolute', top: '12px', right: '12px', padding: '4px 10px', borderRadius: '8px', backgroundColor: colores.primario, color: '#FFFFFF', fontSize: '11px', fontWeight: '700' }}>
                {ev.tipo}
              </span>
            </div>

            <div style={{ padding: '20px' }}>
              <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: '800', color: colores.textoClaro }}>{ev.titulo}</h4>
              <div style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#FEF2F2', borderLeft: '4px solid #EF4444', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#EF4444', display: 'block' }}>Detección IA Visión ({ev.confianza} Confianza):</span>
                <span style={{ fontSize: '12px', color: colores.textoClaro, fontWeight: '600' }}>{ev.hallazgo}</span>
              </div>

              <div style={{ fontSize: '11px', color: colores.textoOscuro, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div><strong>Fecha Captura:</strong> {ev.fecha}</div>
                <div style={{ wordBreak: 'break-all', fontSize: '10px', color: '#94A3B8' }}><strong>Hash SHA-256:</strong> {ev.hash}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
