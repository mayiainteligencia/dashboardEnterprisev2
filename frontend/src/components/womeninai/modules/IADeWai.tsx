import React, { useState } from 'react';
import { WAI_BRAND_CONFIG } from '../../../config/branding';
import { Bot, Upload, Send, CheckCircle2, Shield, Eye, HelpCircle, ArrowRight, FileText } from 'lucide-react';

export const IADeWai: React.FC = () => {
  const theme = WAI_BRAND_CONFIG.theme;
  
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [consent, setConsent] = useState("sintesis");
  const [query, setQuery] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [statsDocs, setStatsDocs] = useState(1248);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileUploaded(true);
      setFileName(e.target.files[0].name);
      setStatsDocs(prev => prev + 1);
    }
  };

  const handleQuerySend = () => {
    if (!query.trim()) return;
    setLoading(true);
    setChatResponse("");
    setTimeout(() => {
      setLoading(false);
      setChatResponse("Según los 1,248 documentos ingresados en la base de datos de WAI México, existe un consenso del 84% de las delegaciones en que se requiere un Sandbox Regulatorio para pruebas éticas de IA antes de implementar multas. La mesa de Gobernanza destaca que este espacio de experimentación debe considerar el impacto diferenciado en mujeres y minorías.");
    }, 1500);
  };

  const cardStyle = {
    backgroundColor: theme.cardBgGlass,
    border: `1.5px solid ${theme.border}`,
    borderRadius: '16px',
    padding: '24px',
    boxShadow: theme.shadowCard,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Hero Banner */}
      <div style={{
        background: theme.gradientHero,
        border: `1.5px solid ${theme.border}`,
        borderRadius: '24px',
        padding: '36px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '280px', height: '280px', borderRadius: '50%', background: `radial-gradient(circle, rgba(255,192,0,0.1) 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ width: '56px', height: '56px', borderRadius: '14px', backgroundColor: 'rgba(255,192,0,0.12)', border: `1.5px solid ${theme.secondary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Bot size={28} color={theme.secondary} />
        </div>
        <div>
          <h1 style={{ fontSize: '19px', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>IA de WAI · Declaration Engine</h1>
          <p style={{ color: theme.textSecondary, fontSize: '13px', margin: '4px 0 0' }}>
            El motor de procesamiento que unifica e indexa documentos, transcripciones y relatorías para estructurar la Declaratoria WAI México 2026.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px' }}>
        
        {/* Document Ingestion & Consent */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Upload size={16} color={theme.secondary} /> Ingesta de Documentos y Propuestas
          </h3>

          <div style={{
            border: `2px dashed ${fileUploaded ? theme.teal : theme.border}`,
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
            position: 'relative',
            marginBottom: '16px',
          }}>
            <input 
              type="file" 
              onChange={handleFileUpload} 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} 
            />
            <Bot size={32} color={fileUploaded ? theme.teal : theme.textSecondary} style={{ marginBottom: '8px' }} />
            <p style={{ fontSize: '13px', fontWeight: '700', color: '#FFFFFF', margin: 0 }}>
              {fileUploaded ? `¡Archivo listo!: ${fileName}` : "Arrastra o selecciona tu archivo aquí"}
            </p>
            <p style={{ fontSize: '11px', color: theme.textMuted, margin: '4px 0 0' }}>
              Formatos soportados: PDF, DOCX, PPTX, TXT hasta 10MB
            </p>
          </div>

          {/* Consent Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            <span style={{ fontSize: '11px', color: theme.textMuted, textTransform: 'uppercase', fontWeight: '700' }}>Permiso de uso de datos</span>
            {[
              { id: 'privado', label: 'Privado (solo para mi perfil, sin RAG)' },
              { id: 'sintesis', label: 'Uso para síntesis agregada y anonimizada' },
              { id: 'declaratoria', label: 'Uso completo para la Declaratoria WAI México' },
              { id: 'publico', label: 'Uso público con atribución directa a mi organización' }
            ].map(o => (
              <label key={o.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: theme.textSecondary, cursor: 'pointer', backgroundColor: consent === o.id ? 'rgba(255,255,255,0.02)' : 'transparent', padding: '8px 12px', borderRadius: '8px', border: `1px solid ${consent === o.id ? theme.border : 'transparent'}` }}>
                <input 
                  type="radio" 
                  name="consent" 
                  checked={consent === o.id} 
                  onChange={() => setConsent(o.id)} 
                  style={{ accentColor: theme.secondary }} 
                />
                <span>{o.label}</span>
              </label>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: theme.textMuted }}>
            <Shield size={12} color={theme.teal} />
            <span>Los documentos se procesan bajo cumplimiento estricto de la LFPDPPP.</span>
          </div>
        </div>

        {/* Q&A / Query Tool */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={16} color={theme.accent} /> RAG de Consulta del Summit
          </h3>
          <p style={{ fontSize: '13px', color: theme.textSecondary, margin: '0 0 16px 0', lineHeight: 1.5 }}>
            Pregunta al motor IA de WAI sobre las posturas, consensos o preocupaciones de las delegaciones registradas en tiempo real.
          </p>

          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <input 
              type="text" 
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ej. ¿Qué postura hay sobre la ética de IA en la academia?"
              style={{
                width: '100%',
                backgroundColor: '#020B1C',
                border: `1px solid ${theme.border}`,
                borderRadius: '10px',
                padding: '12px 48px 12px 14px',
                color: '#FFFFFF',
                fontSize: '13px',
                outline: 'none',
              }}
              onKeyDown={e => e.key === 'Enter' && handleQuerySend()}
            />
            <button 
              onClick={handleQuerySend}
              style={{
                position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: theme.secondary, border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#020B1C',
              }}
            >
              <Send size={13} />
            </button>
          </div>

          {/* Chat response */}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme.secondary, fontSize: '12px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: `2px solid ${theme.secondary}`, borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
              <span>Buscando en la base de conocimientos WAI México...</span>
            </div>
          )}

          {chatResponse && (
            <div style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
              border: `1px solid ${theme.border}`,
              borderRadius: '12px',
              padding: '16px',
              fontSize: '13px',
              color: '#F1F5F9',
              lineHeight: 1.5,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <CheckCircle2 size={14} color={theme.teal} />
                <span style={{ fontSize: '10px', fontWeight: '800', color: theme.teal, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Respuesta de IA Citada (Fuentes: 1,248)</span>
              </div>
              <p style={{ margin: 0 }}>{chatResponse}</p>
            </div>
          )}
        </div>
      </div>

      {/* Visual Pipeline Flow */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 20px 0' }}>Flujo Técnico del Motor IA WAI</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { step: '1', title: 'Ingesta' },
            { step: '2', title: 'OCR/Texto' },
            { step: '3', title: 'Clasificación' },
            { step: '4', title: 'Chunking' },
            { step: '5', title: 'Embeddings' },
            { step: '6', title: 'RAG DB' },
            { step: '7', title: 'Síntesis' },
            { step: '8', title: 'Revisión Humana' }
          ].map((item, idx) => (
            <React.Fragment key={idx}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1, minWidth: '80px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255, 192, 0, 0.1)', border: `1.5px solid ${theme.secondary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '950', color: theme.secondary }}>
                  {item.step}
                </div>
                <span style={{ fontSize: '11px', color: theme.textSecondary, fontWeight: '600', textAlign: 'center' }}>{item.title}</span>
              </div>
              {idx < 7 && <ArrowRight size={14} color={theme.textMuted} style={{ display: 'block', alignSelf: 'center', margin: '0 -4px' }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Agentes de IA WAI list */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 16px 0' }}>Nuestros Agentes de IA Especializados</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {WAI_BRAND_CONFIG.agentesIA.map((agent) => (
            <div key={agent.id} style={{ ...cardStyle, padding: '16px 20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(255,64,129,0.08)', border: `1px solid ${theme.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Bot size={15} color={theme.accent} />
              </div>
              <div>
                <h5 style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 4px 0' }}>{agent.nombre}</h5>
                <p style={{ fontSize: '11.5px', color: theme.textSecondary, margin: 0, lineHeight: 1.4 }}>{agent.rol}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
