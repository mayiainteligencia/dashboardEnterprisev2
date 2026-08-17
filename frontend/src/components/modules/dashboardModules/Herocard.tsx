import React, { useState } from 'react';
import { Sparkles, Send, ShieldCheck, Building2, BrainCircuit, ArrowRight, Activity, Zap } from 'lucide-react';
import { brandingConfig } from '../../../config/branding';
import { useAIChat } from '../../../context/AIChatContext';

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
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)'
      }}
    >
      {/* Elemento Decorativo Inteligente */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* ENCABEZADO CENTRADO DEL ASISTENTE */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
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
              boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)'
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
              gap: '6px'
            }}
          >
            <span>Ver Chat Completo</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>

      {/* INPUT PRINCIPAL DEL ASISTENTE EN EL HERO CARD */}
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
          marginBottom: '16px'
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
            fontWeight: '500'
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
            opacity: !consultaLocal.trim() ? 0.6 : 1
          }}
        >
          <span>Preguntar</span>
          <Send size={15} />
        </button>
      </div>

      {/* SUGERENCIAS RÁPIDAS DE INGENIERÍA DE RIESGOS */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', color: colores.textoOscuro, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Consultas Frecuentes:
        </span>
        {[
          'Analizar infraseguro global',
          'Inmuebles con riesgo sísmico crítico',
          'Simular huracán en Cancún',
          'Optimizar CAPEX preventivo'
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
              transition: 'all 0.15s ease'
            }}
          >
            {sug}
          </button>
        ))}
      </div>
    </div>
  );
};