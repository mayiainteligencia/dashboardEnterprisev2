import React, { useState } from 'react';
import {
  Users,
  Search,
  Phone,
  Mail,
  MessageCircle,
  Building2,
  Calendar,
  Clock,
  Plus,
  ShieldCheck,
  UserCheck,
  Filter
} from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { CONTACTOS_FSPM } from '../../../fspm/fspmData';
import type { ContactoFSPM } from '../../../fspm/fspmData';

export const ContactosModule: React.FC = () => {
  const { colores } = brandingConfig;
  const [busqueda, setBusqueda] = useState('');
  const [filtroNivel, setFiltroNivel] = useState<string>('todos');

  const contactosFiltrados = CONTACTOS_FSPM.filter((c) => {
    const coincideTexto =
      c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.empresa.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.cargo.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.ejecutivoFspm.toLowerCase().includes(busqueda.toLowerCase());
    const coincideNivel = filtroNivel === 'todos' || c.nivelInfluencia === filtroNivel;
    return coincideTexto && coincideNivel;
  });

  const getNivelColor = (nivel: ContactoFSPM['nivelInfluencia']) => {
    switch (nivel) {
      case 'Decisor Clave':
        return { bg: '#FEE2E2', text: '#D32F2F', border: '#FCA5A5' };
      case 'Alto':
        return { bg: '#FEF3C7', text: '#D97706', border: '#FCD34D' };
      case 'Técnico / Evaluador':
        return { bg: '#E0F2FE', text: '#0284C7', border: '#BAE6FD' };
      default:
        return { bg: '#F1F5F9', text: '#475569', border: '#CBD5E1' };
    }
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
              backgroundColor: '#0284C7',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Users size={26} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: colores.textoClaro }}>
              Módulo Contactos &amp; Decisores
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: colores.textoMedio }}>
              Directorio institucional de Protección Civil, Seguridad Industrial, Compras y Licitaciones
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: colores.fondoTerciario,
              padding: '8px 14px',
              borderRadius: '10px',
              border: `1px solid ${colores.borde}`,
            }}
          >
            <Search size={16} color={colores.textoMedio} />
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por contacto, empresa o cargo…"
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '13px',
                color: colores.textoClaro,
                width: '240px',
              }}
            />
          </div>

          <button
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              backgroundColor: '#0284C7',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Plus size={16} /> Nuevo Contacto
          </button>
        </div>
      </div>

      {/* ── FILTROS DE INFLUENCIA ── */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: colores.textoMedio, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Filter size={14} /> Nivel de Influencia:
        </span>
        {['todos', 'Decisor Clave', 'Alto', 'Técnico / Evaluador', 'Medio'].map((nivel) => (
          <button
            key={nivel}
            onClick={() => setFiltroNivel(nivel)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: filtroNivel === nivel ? '800' : '600',
              border: `1px solid ${filtroNivel === nivel ? '#0284C7' : colores.borde}`,
              backgroundColor: filtroNivel === nivel ? '#E0F2FE' : colores.fondoPrincipal,
              color: filtroNivel === nivel ? '#0284C7' : colores.textoMedio,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {nivel === 'todos' ? 'Todos los Niveles' : nivel}
          </button>
        ))}
      </div>

      {/* ── GRID DE TARJETAS DE CONTACTOS ── */}
      <div
        className="animate-fade-up delay-1"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '20px',
        }}
      >
        {contactosFiltrados.map((contacto) => {
          const badgeNivel = getNivelColor(contacto.nivelInfluencia);
          return (
            <div
              key={contacto.id}
              className="fspm-card-interactive"
              style={{
                backgroundColor: colores.fondoPrincipal,
                borderRadius: '18px',
                border: `1px solid ${colores.borde}`,
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Header de tarjeta */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: colores.textoClaro }}>
                      {contacto.nombre}
                    </h3>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: colores.primario, marginTop: '2px' }}>
                      {contacto.cargo}
                    </div>
                  </div>
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '800',
                      backgroundColor: badgeNivel.bg,
                      color: badgeNivel.text,
                      border: `1px solid ${badgeNivel.border}`,
                    }}
                  >
                    {contacto.nivelInfluencia}
                  </span>
                </div>

                {/* Datos de empresa y área */}
                <div style={{ padding: '10px 12px', backgroundColor: colores.fondoTerciario, borderRadius: '10px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: colores.textoClaro }}>
                    <Building2 size={14} color={colores.textoMedio} />
                    {contacto.empresa}
                  </div>
                  <div style={{ fontSize: '11.5px', color: colores.textoMedio, marginTop: '2px', paddingLeft: '20px' }}>
                    Área: {contacto.area}
                  </div>
                </div>

                {/* Datos de contacto directo */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: colores.textoMedio, marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={14} color={colores.textoMedio} />
                    <span style={{ color: '#0284C7' }}>{contacto.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={14} color={colores.textoMedio} />
                    <span>{contacto.telefono}</span>
                  </div>
                </div>

                {/* Próxima Acción (Regla obligatoria FSPM) */}
                <div
                  style={{
                    padding: '12px',
                    backgroundColor: '#FEF3C750',
                    borderRadius: '10px',
                    border: '1px solid #FCD34D',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#92400E', fontWeight: '800' }}>
                    <span>PRÓXIMA ACCIÓN</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} /> {contacto.fechaProximaAccion}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#78350F', marginTop: '4px', fontWeight: '600' }}>
                    {contacto.proximaAccion}
                  </div>
                </div>
              </div>

              {/* Footer con ejecutivo FSPM y botones de acción rápida */}
              <div style={{ borderTop: `1px solid ${colores.borde}`, paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '11.5px', color: colores.textoMedio }}>
                  Ejecutivo FSPM: <strong>{contacto.ejecutivoFspm}</strong>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <a
                    href={`https://wa.me/${contacto.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: '6px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#25D366',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      fontSize: '11px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                  <a
                    href={`mailto:${contacto.email}`}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '8px',
                      backgroundColor: colores.fondoTerciario,
                      color: colores.textoClaro,
                      textDecoration: 'none',
                      fontSize: '11px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      border: `1px solid ${colores.borde}`,
                    }}
                  >
                    <Mail size={14} /> Email
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
