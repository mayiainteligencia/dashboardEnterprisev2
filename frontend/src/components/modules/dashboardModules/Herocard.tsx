import React, { useState } from 'react';
import { Sparkles, Send, ShieldCheck, Building2, BrainCircuit, ArrowRight, Activity, Zap } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { useAIChat } from '../../../context/AIChatContext';
import { BrainCanvas } from './BrainCanvas';

interface HeroCardProps {
  onNavigate?: (id: string) => void;
  secciones?: { id: string; titulo: string }[];
}

export const HeroCard: React.FC<HeroCardProps> = ({ onNavigate }) => {
  const { colores } = brandingConfig;
  const { sendMessage, setIsChatOpen } = useAIChat();
  const [consultaLocal, setConsultaLocal] = useState('');

  const handleConsultar = (promptText?: string) => {
    const texto = promptText || consultaLocal;
    if (!texto.trim()) return;
    setConsultaLocal('');
    setIsChatOpen(true);
    sendMessage(texto);
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: `1px solid ${colores.borde}`,
        boxShadow: '0 8px 24px rgba(37, 99, 235, 0.08)',
        padding: '28px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
        display: 'grid',
        gridTemplateColumns: '1fr 260px',
        gap: '24px',
        alignItems: 'stretch',
      }}
    >
      {/* Elemento Decorativo de Fondo */}
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          right: '220px',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── COLUMNA IZQUIERDA: Contenido del asistente ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>

        {/* ENCABEZADO */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: colores.gradientePrimario,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 6px 16px rgba(37, 99, 235, 0.30)',
                flexShrink: 0,
              }}
            >
              <BrainCircuit size={28} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: colores.textoClaro, letterSpacing: '-0.02em' }}>
                  Asistente Inteligente RISKO Copilot
                </h3>
                <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: '#ECFDF5', color: '#047857', padding: '2px 8px', borderRadius: '12px' }}>
                  ● En Línea 24/7
                </span>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: colores.textoOscuro, fontWeight: '500' }}>
                Consultor agéntico para evaluación multiamenaza, auditoría de pólizas y scoring de riesgo
              </p>
            </div>
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate('asistente-ia-chat')}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                border: `1px solid ${colores.borde}`,
                backgroundColor: '#FFFFFF',
                color: colores.primario,
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                flexShrink: 0,
              }}
            >
              <span>Ver Chat Completo</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>

        {/* INPUT PRINCIPAL */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#FFFFFF',
            border: `2px solid ${colores.primarioClaro}`,
            borderRadius: '14px',
            padding: '8px 16px',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.06)',
          }}
        >
          <Sparkles size={20} color={colores.primario} />
          <input
            type="text"
            value={consultaLocal}
            onChange={(e) => setConsultaLocal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleConsultar();
            }}
            placeholder="Pregunta a RISKO Copilot (ej. '¿Cuál es el valor expuesto en riesgo sísmico crítico?')..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              color: colores.textoClaro,
              backgroundColor: 'transparent',
              fontWeight: '500',
            }}
          />
          <button
            onClick={() => handleConsultar()}
            disabled={!consultaLocal.trim()}
            style={{
              backgroundColor: colores.primario,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 18px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              opacity: !consultaLocal.trim() ? 0.6 : 1,
            }}
          >
            <span>Preguntar</span>
            <Send size={15} />
          </button>
        </div>

        {/* SUGERENCIAS RÁPIDAS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: colores.textoOscuro, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Consultas Frecuentes:
          </span>
          {[
            'Analizar infraseguro global',
            'Inmuebles con riesgo sísmico crítico',
            'Simular huracán en Cancún',
            'Optimizar CAPEX preventivo',
          ].map((sug, i) => (
            <button
              key={i}
              onClick={() => handleConsultar(sug)}
              style={{
                padding: '5px 12px',
                borderRadius: '20px',
                border: `1px solid ${colores.borde}`,
                backgroundColor: '#FFFFFF',
                color: colores.textoMedio,
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {sug}
            </button>
          ))}
        </div>

        {/* MÉTRICAS RÁPIDAS DE ESTADO */}
        <div style={{ display: 'flex', gap: '12px', marginTop: 'auto', paddingTop: '4px' }}>
          {[
            { icon: Activity, label: 'Contexto activo', value: 'Cartera completa', color: colores.primario },
            { icon: Zap, label: 'Motor IA', value: 'Gemini Risk Engine', color: '#4F46E5' },
            { icon: ShieldCheck, label: 'Cobertura NatCat', value: '8 amenazas', color: '#0EA5E9' },
            { icon: Building2, label: 'Activos cargados', value: '1,450 inmuebles', color: '#10B981' },
          ].map(({ icon: Icon, label, value, color }, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: '10px',
                backgroundColor: '#F8FAFC',
                border: `1px solid ${colores.borde}`,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icon size={13} color={color} />
                <span style={{ fontSize: '10px', color: colores.textoOscuro, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                  {label}
                </span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: colores.textoClaro }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── COLUMNA DERECHA: BrainCanvas ── */}
      <div
        style={{
          position: 'relative',
          borderRadius: '16px',
          background: 'linear-gradient(145deg, #EFF6FF 0%, #F0F9FF 100%)',
          border: `1px solid ${colores.primarioClaro}`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
        }}
      >
        {/* Badge flotante superior */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontSize: '10px',
              fontWeight: '800',
              backgroundColor: '#FFFFFF',
              color: colores.primario,
              padding: '4px 10px',
              borderRadius: '20px',
              boxShadow: '0 2px 8px rgba(37,99,235,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              display: 'inline-block',
              animation: 'pulse 2s infinite',
            }} />
            Sistema Activo
          </span>
          <span
            style={{
              fontSize: '10px',
              fontWeight: '700',
              backgroundColor: 'rgba(255,255,255,0.85)',
              color: colores.textoOscuro,
              padding: '4px 8px',
              borderRadius: '8px',
              backdropFilter: 'blur(4px)',
            }}
          >
            IA Core v3
          </span>
        </div>

        {/* Canvas neuronal */}
        <div style={{ width: '100%', flex: 1, minHeight: '160px' }}>
          <BrainCanvas accent={colores.primario} height={200} />
        </div>

        {/* Label inferior */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            textAlign: 'center',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontSize: '10px',
              fontWeight: '700',
              color: colores.primario,
              backgroundColor: 'rgba(255,255,255,0.85)',
              padding: '3px 10px',
              borderRadius: '8px',
              backdropFilter: 'blur(4px)',
              display: 'inline-block',
            }}
          >
            RISKO Neural Engine · Multiamenaza
          </span>
        </div>
      </div>
    </div>
  );
};