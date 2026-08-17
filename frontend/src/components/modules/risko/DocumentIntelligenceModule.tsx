import React, { useState } from 'react';
import { FileCheck2, Search, FileText, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';

export const DocumentIntelligenceModule: React.FC = () => {
  const { colores } = brandingConfig;

  const documentosExtraidos = [
    { id: 'doc-1', nombre: 'Dictamen_Estructural_Reforma222_2026.pdf', tipo: 'Dictamen Estructural', emisor: 'Colegio de Ingenieros Civiles', paginas: 42, campos: { norma: 'RCDF 2023', aceleraciónPGA: '0.38g', dictamen: 'Favorable con Observaciones', vigencia: 'Diciembre 2027' } },
    { id: 'doc-2', nombre: 'Poliza_AllRisk_Empresarial_2026.pdf', tipo: 'Póliza de Seguro', emisor: 'AXA Seguros', paginas: 118, campos: { sumaAsegurada: '$125,000,000 USD', deducibleSismo: '5% sobre suma asegurada', coaseguro: '10%', sublímiteBI: '$15,000,000 USD' } },
    { id: 'doc-3', nombre: 'Avaluo_Comercial_VRN_Apodaca.pdf', tipo: 'Avalúo VRN', emisor: 'SOFOVAL Avalúos', paginas: 28, campos: { vrnEdificio: '$98,000,000 USD', vrnContenidos: '$32,000,000 USD', fechaAvaluo: 'Enero 2026' } },
  ];

  return (
    <div style={{ padding: '28px', backgroundColor: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ borderBottom: `1px solid ${colores.borde}`, paddingBottom: '16px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: colores.textoClaro }}>
          AI Document Intelligence & RAG Extractor
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro }}>
          Dashboard 05 · OCR, clasificación, extracción estructurada, citación de fragmentos y auditoría de coherencia
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* Documentos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>Documentos Procesados (RAG)</h3>
          {documentosExtraidos.map(doc => (
            <div key={doc.id} style={{ padding: '16px', borderRadius: '12px', border: `1px solid ${colores.borde}`, backgroundColor: '#F8FAFC' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <FileText size={20} color={colores.primario} />
                <span style={{ fontWeight: '700', fontSize: '13px', color: colores.textoClaro }}>{doc.tipo}</span>
              </div>
              <p style={{ margin: '0 0 8px', fontSize: '11px', color: colores.textoOscuro, wordBreak: 'break-all' }}>{doc.nombre}</p>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#10B981' }}>✓ Extracción RAG 100% Completada ({doc.paginas} págs)</span>
            </div>
          ))}
        </div>

        {/* Extracción Estructurada */}
        <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: `1px solid ${colores.borde}` }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>Campos Clave Extraídos & Citaciones Citadas</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: colores.primario, display: 'block' }}>Cita de Póliza (Página 42, Cláusula 14):</span>
              <p style={{ margin: '4px 0 0', color: colores.textoClaro, fontStyle: 'italic' }}>
                "El deducible aplicable para la cobertura de Terremoto y Erupción Volcánica será del 5% sobre la suma asegurada total por ubicación..."
              </p>
            </div>

            <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#EF4444', display: 'block' }}>Hallazgo de Incoherencia Auditado por IA:</span>
              <p style={{ margin: '4px 0 0', color: colores.textoClaro }}>
                La suma asegurada contratada en póliza (\$95M USD) difiere en un -24% respecto al Valor de Reposición a Nuevo (VRN \$125M USD) determinado en el Avalúo SOFOVAL.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
