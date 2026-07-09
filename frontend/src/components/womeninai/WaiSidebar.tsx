import React, { useState } from 'react';
import { 
  LayoutDashboard, Globe, UserPlus, Building2, Calendar, MessagesSquare,
  Bot, FileText, Network, Mic, Users, TrendingUp, MapPin, Briefcase,
  BarChart3, Award, ShieldCheck, Sparkles, ChevronDown, ChevronRight,
  BookOpen, Target, Star
} from 'lucide-react';
import { WAI_BRAND_CONFIG } from '../../config/branding';

interface WaiSidebarProps {
  config: typeof WAI_BRAND_CONFIG;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  LayoutDashboard, Globe, UserPlus, Building2, Calendar, MessagesSquare,
  Bot, FileText, Network, Mic, Users, TrendingUp, MapPin, Briefcase,
  BarChart3, Award, ShieldCheck, BookOpen, Target, Star,
};

export const WaiSidebar: React.FC<WaiSidebarProps> = ({ config, activeSection, onSectionChange }) => {
  const { theme, clientName, slogan, logo, sidebar } = config;
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (label: string) => {
    setCollapsedGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div style={{
      width: '260px',
      height: '100vh',
      backgroundColor: theme.background,
      display: 'flex',
      flexDirection: 'column',
      borderRight: `1px solid ${theme.border}`,
      boxShadow: `10px 0 40px rgba(2, 11, 28, 0.6)`,
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes pulseGlow {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(1); opacity: 0.6; }
        }
      `}</style>
      {/* Brand Header */}
      <div style={{
        padding: '20px 18px',
        borderBottom: `1px solid rgba(255,255,255,0.07)`,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(2,11,28,0.15)',
      }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '10px',
          background: 'rgba(255,255,255,0.04)', border: `1.5px solid ${theme.secondary}`,
          boxShadow: `0 0 16px rgba(255,192,0,0.25)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <img src={logo} alt={clientName} style={{ width: '85%', height: '85%', objectFit: 'contain' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </div>
        <div>
          <span style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '0.3px', display: 'block' }}>
            Women in AI
          </span>
          <span style={{ fontSize: '9px', color: theme.secondary, fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>
            México 2026 · Intelligence Platform
          </span>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 10px' }} className="no-scrollbar">
        {sidebar.groups.map((group) => {
          const isCollapsed = collapsedGroups[group.label] || false;
          return (
            <div key={group.label} style={{ marginBottom: '4px' }}>
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(group.label)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', padding: '6px 8px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  borderRadius: '6px', marginBottom: '2px',
                }}
              >
                <span style={{
                  fontSize: '9px', fontWeight: '700', color: theme.textMuted,
                  textTransform: 'uppercase', letterSpacing: '1.2px',
                }}>
                  {group.label}
                </span>
                {isCollapsed
                  ? <ChevronRight size={12} color={theme.textMuted} />
                  : <ChevronDown size={12} color={theme.textMuted} />
                }
              </button>

              {/* Group Items */}
              {!isCollapsed && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {group.items.map((item) => {
                    const Icon = iconMap[item.icon] || Sparkles;
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onSectionChange(item.id)}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center',
                          gap: '10px', padding: '9px 12px',
                          borderRadius: '8px',
                          backgroundColor: isActive ? 'rgba(255,192,0,0.14)' : 'transparent',
                          color: isActive ? theme.secondary : 'rgba(255,255,255,0.82)',
                          border: isActive ? `1px solid rgba(255,192,0,0.3)` : '1px solid transparent',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textAlign: 'left', outline: 'none',
                          boxShadow: isActive ? `0 0 14px rgba(255,192,0,0.08)` : 'none',
                        }}
                        onMouseEnter={e => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                            e.currentTarget.style.color = '#FFFFFF';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'rgba(255,255,255,0.82)';
                          }
                        }}
                      >
                        <Icon size={15} strokeWidth={isActive ? 2.5 : 1.8} style={{ flexShrink: 0 }} />
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{ fontSize: '12px', fontWeight: isActive ? '700' : '500', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.label}
                          </div>
                          <div style={{ fontSize: '9px', color: isActive ? 'rgba(255,192,0,0.7)' : theme.textMuted, lineHeight: 1.1, marginTop: '1px' }}>
                            {item.desc}
                          </div>
                        </div>
                        {isActive && (
                          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: theme.secondary, flexShrink: 0, marginLeft: 'auto' }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '16px',
        borderTop: `1px solid rgba(255,255,255,0.07)`,
        background: 'linear-gradient(to bottom, rgba(2,11,28,0.1) 0%, rgba(2,11,28,0.4) 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <a 
          href="https://mayia.com" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '10px 14px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 100%)',
            border: `1px solid rgba(255, 255, 255, 0.08)`,
            borderRadius: '12px',
            textDecoration: 'none',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 192, 0, 0.07) 0%, rgba(255, 255, 255, 0.06) 100%)';
            e.currentTarget.style.borderColor = 'rgba(255, 192, 0, 0.35)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 192, 0, 0.12), 0 0 10px rgba(255, 192, 0, 0.05)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 100%)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {/* Pulsing indicator */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '8px',
            height: '8px',
            marginRight: '2px'
          }}>
            <div style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#FFC000',
              opacity: 0.4,
              animation: 'pulseGlow 2s infinite ease-in-out'
            }} />
            <div style={{
              position: 'relative',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: '#FFC000',
              boxShadow: '0 0 4px #FFC000'
            }} />
          </div>

          <span style={{ 
            fontSize: '11px', 
            fontWeight: '600', 
            color: '#FFFFFF', 
            opacity: 0.8,
            letterSpacing: '0.5px', 
            textTransform: 'lowercase',
            fontFamily: "'Inter', sans-serif"
          }}>
            made by
          </span>
          <img 
            src="/assets/logosNativos/mayiaLogoBlanco.png" 
            alt="MAYiA" 
            style={{ 
              height: '16px', 
              objectFit: 'contain', 
              display: 'block',
              filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.1))'
            }} 
          />
        </a>
      </div>
    </div>
  );
};
