import React from 'react';
import {
  LayoutDashboard,
  Atom,
  FileText,
  BookOpen,
  Users,
  Shield,
  FlaskConical,
  ChevronRight,
  Dna,
  Microscope,
} from 'lucide-react';
import { brandingConfig } from '../config/branding';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const mainItems = [
  {
    id: 'dashboard',
    nombre: 'Command Center',
    icono: LayoutDashboard,
    color: '#0EA5E9',
    description: 'Vista ejecutiva',
  },
];

const modulosItems = [
  {
    id: 'pipeline',
    nombre: 'Drug Discovery',
    icono: Atom,
    color: '#7C3AED',
    description: 'Moléculas & I+D',
  },
  {
    id: 'reportes',
    nombre: 'Report Copilot',
    icono: FileText,
    color: '#0EA5E9',
    description: 'Reportes científicos',
  },
  {
    id: 'academia',
    nombre: 'Academia IA',
    icono: BookOpen,
    color: '#14B8A6',
    description: 'Cursos & diplomados',
  },
  {
    id: 'prospeccion',
    nombre: 'Prospección Pharma',
    icono: Users,
    color: '#10B981',
    description: 'Leads B2B',
  },
  {
    id: 'patentes',
    nombre: 'Patent & IP Agent',
    icono: Shield,
    color: '#F59E0B',
    description: 'Propiedad intelectual',
  },
  {
    id: 'regulatorio',
    nombre: 'Regulatory Intel.',
    icono: FlaskConical,
    color: '#EF4444',
    description: 'ICH · COFEPRIS · ADMET',
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { empresa, colores } = brandingConfig;

  const renderItem = (item: typeof mainItems[0], isActive: boolean) => {
    const Icon = item.icono;
    return (
      <button
        key={item.id}
        id={`sidebar-btn-${item.id}`}
        onClick={() => onSectionChange(item.id)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 14px',
          borderRadius: '12px',
          marginBottom: '2px',
          backgroundColor: isActive
            ? `${item.color}15`
            : 'transparent',
          border: isActive
            ? `1px solid ${item.color}33`
            : '1px solid transparent',
          color: isActive ? '#0F172A' : '#475569',
          cursor: 'pointer',
          transition: 'all 0.2s',
          textAlign: 'left',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = 'rgba(14,165,233,0.05)';
            e.currentTarget.style.color = '#0F172A';
            e.currentTarget.style.borderColor = 'rgba(14,165,233,0.2)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#475569';
            e.currentTarget.style.borderColor = 'transparent';
          }
        }}
      >
        {/* Active indicator */}
        {isActive && (
          <div style={{
            position: 'absolute',
            left: 0, top: '20%', bottom: '20%',
            width: '3px',
            borderRadius: '0 3px 3px 0',
            background: item.color,
          }} />
        )}

        {/* Icon */}
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: '10px',
          background: isActive ? `${item.color}22` : '#F1F5F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          border: isActive ? `1px solid ${item.color}33` : '1px solid #E2E8F0',
          transition: 'all 0.2s',
        }}>
          <Icon size={16} color={isActive ? item.color : '#475569'} />
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '13px',
            fontWeight: isActive ? '600' : '500',
            color: isActive ? '#0F172A' : '#475569',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {item.nombre}
          </div>
          <div style={{
            fontSize: '10px',
            color: isActive ? item.color : '#64748B',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {item.description}
          </div>
        </div>

        {isActive && (
          <ChevronRight size={14} color={item.color} style={{ flexShrink: 0 }} />
        )}
      </button>
    );
  };

  return (
    <div style={{
      width: '240px',
      height: '100vh',
      background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      borderRight: '1px solid #E2E8F0',
      position: 'relative',
    }}>
      {/* Subtle grid pattern overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(14,165,233,0.04) 1px, transparent 0)',
        backgroundSize: '24px 24px',
        pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', flexShrink: 0, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Logo container */}
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0EA5E9 0%, #7C3AED 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 16px rgba(14,165,233,0.3)',
            overflow: 'hidden',
          }}>
            <img
              src={empresa.logoUrl}
              alt={empresa.nombre}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const icon = document.createElement('div');
                  icon.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/></svg>`;
                  parent.appendChild(icon);
                }
              }}
            />
          </div>

          <div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', fontFamily: 'Outfit, sans-serif', lineHeight: 1.1 }}>
              {empresa.nombre}
            </div>
            <div style={{ fontSize: '10px', color: '#0EA5E9', fontWeight: '600', marginTop: '2px', letterSpacing: '0.04em' }}>
              × MAYIA
            </div>
          </div>
        </div>

        {/* Platform badge */}
        <div style={{
          marginTop: '12px',
          padding: '6px 10px',
          background: 'rgba(14,165,233,0.05)',
          border: '1px solid rgba(14,165,233,0.15)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <Dna size={11} color="#0D9488" />
          <span style={{ fontSize: '10px', color: '#0F766E', fontWeight: '600', letterSpacing: '0.04em' }}>
            AI BIOPHARMA COMMAND CENTER
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="no-scrollbar" style={{
        flex: '1 1 0',
        minHeight: 0,
        overflowY: 'auto',
        padding: '0 10px',
        position: 'relative',
      }}>
        {/* Overview Section */}
        <div style={{ padding: '4px 8px 6px', marginBottom: '4px' }}>
          <span style={{
            fontSize: '10px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#334155',
          }}>
            General
          </span>
        </div>
        {mainItems.map((item) => renderItem(item, activeSection === item.id))}

        {/* Modules Section */}
        <div style={{ padding: '16px 8px 6px', marginBottom: '4px' }}>
          <span style={{
            fontSize: '10px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#334155',
          }}>
            Módulos IA
          </span>
        </div>
        {modulosItems.map((item) => renderItem(item, activeSection === item.id))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '12px 16px 16px',
        flexShrink: 0,
        borderTop: '1px solid #E2E8F0',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10B981',
            boxShadow: '0 0 6px rgba(16,185,129,0.6)',
            animation: 'pulse-glow 2s infinite',
          }} />
          <div>
            <div style={{ fontSize: '11px', color: '#475569', fontWeight: '500' }}>
              MAYIA Scientific
            </div>
            <div style={{ fontSize: '10px', color: '#10B981' }}>
              Sistema activo
            </div>
          </div>
          <Microscope size={14} color="#94A3B8" style={{ marginLeft: 'auto' }} />
        </div>
      </div>
    </div>
  );
};