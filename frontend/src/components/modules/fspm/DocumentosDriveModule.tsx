import React, { useState } from 'react';
import {
  Folder,
  FolderOpen,
  FileText,
  FileSpreadsheet,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Cloud,
  CheckCircle,
  RefreshCw,
  FolderGit2,
  HardDrive,
  Share2
} from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { ESTRUCTURA_DRIVE_FSPM } from '../../../fspm/fspmData';
import type { CarpetaDrive } from '../../../fspm/fspmData';

export const DocumentosDriveModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [carpetaSeleccionada, setCarpetaSeleccionada] = useState<CarpetaDrive>(
    ESTRUCTURA_DRIVE_FSPM.subelementos![0] // CLIENTES
  );
  const [nodosAbiertos, setNodosAbiertos] = useState<Record<string, boolean>>({
    'DRV-ROOT': true,
    'DRV-CLI': true,
    'DRV-LIC': true,
  });

  const toggleNodo = (id: string) => {
    setNodosAbiertos(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderArbol = (item: CarpetaDrive, nivel = 0) => {
    const tieneHijos = item.subelementos && item.subelementos.length > 0;
    const estaAbierto = nodosAbiertos[item.id];
    const esSeleccionado = carpetaSeleccionada.id === item.id;

    return (
      <div key={item.id} style={{ marginLeft: `${nivel * 16}px` }}>
        <div
          onClick={() => {
            if (tieneHijos) toggleNodo(item.id);
            setCarpetaSeleccionada(item);
          }}
          style={{
            padding: '8px 12px',
            borderRadius: '10px',
            backgroundColor: esSeleccionado ? '#F1F5F9' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            borderLeft: esSeleccionado ? `3px solid ${colores.primario}` : '3px solid transparent',
            transition: 'all 0.15s',
          }}
        >
          {tieneHijos ? (
            estaAbierto ? <ChevronDown size={14} color="#64748B" /> : <ChevronRight size={14} color="#64748B" />
          ) : (
            <span style={{ width: 14 }} />
          )}

          {item.tipo === 'carpeta' ? (
            estaAbierto ? <FolderOpen size={16} color="#D97706" /> : <Folder size={16} color="#D97706" />
          ) : item.extension === 'pdf' ? (
            <FileText size={16} color="#D32F2F" />
          ) : (
            <FileSpreadsheet size={16} color="#10B981" />
          )}

          <span style={{ fontSize: '13px', fontWeight: esSeleccionado ? '800' : '600', color: colores.textoClaro }}>
            {item.nombre}
          </span>
        </div>

        {tieneHijos && estaAbierto && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
            {item.subelementos!.map(sub => renderArbol(sub, nivel + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ── HEADER ── */}
      <div
        className="animate-fade-down fspm-card"
        style={{
          backgroundColor: colores.fondoPrincipal,
          borderRadius: '20px',
          padding: '24px 28px',
          border: `1px solid ${colores.borde}`,
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FolderGit2 size={26} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: colores.textoClaro }}>
              Módulo Documentos &amp; Google Drive FSPM
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: colores.textoMedio }}>
              Estructura automatizada en Google Workspace · Repositorio central de expedientes y propuestas
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              backgroundColor: '#D1FAE5',
              color: '#059669',
              fontSize: '12px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <CheckCircle size={14} /> Sincronizado con Google Sheets &amp; Drive
          </div>

          <a
            href="https://drive.google.com"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Cloud size={16} /> Abrir Google Drive <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* ── ARQUITECTURA TÉCNICA GOOGLE WORKSPACE (DOCUMENTO FSPM) ── */}
      <div
        className="animate-fade-up delay-1 fspm-card"
        style={{
          backgroundColor: '#0F172A',
          borderRadius: '18px',
          padding: '20px 24px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#38BDF8', textTransform: 'uppercase' }}>
            FLUJO DE AUTOMATIZACIÓN EN LA NUBE
          </span>
          <div style={{ fontSize: '14px', fontWeight: '700', marginTop: '4px' }}>
            AppSheet CRM ➔ Google Sheets (Base de Datos) ➔ Google Drive (Documentos) ➔ Apps Script (Alertas)
          </div>
        </div>
        <div style={{ fontSize: '12px', color: '#94A3B8' }}>
          Creación automática de carpetas al registrar nuevo cliente o licitación
        </div>
      </div>

      {/* ── EXPLORADOR DE ARCHIVOS Y CARPETAS ── */}
      <div className="animate-fade-up delay-2" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px', alignItems: 'start' }}>
        
        {/* ÁRBOL DE DIRECTORIOS */}
        <div
          className="fspm-card"
          style={{
            backgroundColor: colores.fondoPrincipal,
            borderRadius: '18px',
            border: `1px solid ${colores.borde}`,
            padding: '18px',
            maxHeight: '520px',
            overflowY: 'auto',
          }}
        >
          <h3 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <HardDrive size={16} color="#D32F2F" /> Estructura Drive FSPM
          </h3>
          {renderArbol(ESTRUCTURA_DRIVE_FSPM)}
        </div>

        {/* CONTENIDO DE LA CARPETA SELECCIONADA */}
        <div
          style={{
            backgroundColor: colores.fondoPrincipal,
            borderRadius: '18px',
            border: `1px solid ${colores.borde}`,
            padding: '24px',
            minHeight: '520px',
          }}
        >
          {/* Breadcrumbs de la ruta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', fontSize: '13px', color: colores.textoMedio, borderBottom: `1px solid ${colores.borde}`, paddingBottom: '14px' }}>
            <Cloud size={16} color="#0284C7" />
            <span>Ruta: <strong>{carpetaSeleccionada.ruta}</strong></span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ margin: 0, fontSize: '17px', fontWeight: '800', color: colores.textoClaro, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FolderOpen size={20} color="#D97706" /> {carpetaSeleccionada.nombre}
            </h2>
            <span style={{ fontSize: '12px', color: colores.textoMedio }}>
              {carpetaSeleccionada.subelementos ? `${carpetaSeleccionada.subelementos.length} elementos` : '1 archivo'}
            </span>
          </div>

          {/* Grid de Subcarpetas / Archivos */}
          {carpetaSeleccionada.subelementos && carpetaSeleccionada.subelementos.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
              {carpetaSeleccionada.subelementos.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setCarpetaSeleccionada(item)}
                  style={{
                    padding: '16px',
                    borderRadius: '14px',
                    border: `1px solid ${colores.borde}`,
                    backgroundColor: colores.fondoSecundario,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {item.tipo === 'carpeta' ? (
                      <Folder size={28} color="#D97706" />
                    ) : item.extension === 'pdf' ? (
                      <FileText size={28} color="#D32F2F" />
                    ) : (
                      <FileSpreadsheet size={28} color="#10B981" />
                    )}
                    <ChevronRight size={16} color="#94A3B8" />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: colores.textoClaro }}>
                      {item.nombre}
                    </div>
                    {item.tamano && (
                      <div style={{ fontSize: '11px', color: colores.textoMedio, marginTop: '2px' }}>
                        {item.tamano}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', backgroundColor: colores.fondoTerciario, borderRadius: '14px' }}>
              <FileText size={36} color="#64748B" style={{ margin: '0 auto 10px auto' }} />
              <div style={{ fontSize: '14px', fontWeight: '700', color: colores.textoClaro }}>
                {carpetaSeleccionada.nombre}
              </div>
              <div style={{ fontSize: '12px', color: colores.textoMedio, marginTop: '4px' }}>
                Archivo listo para visualización y descarga en Google Drive
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
