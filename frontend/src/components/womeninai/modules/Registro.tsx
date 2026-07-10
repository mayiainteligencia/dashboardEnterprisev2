import React, { useState } from 'react';
import { WAI_BRAND_CONFIG } from '../../../config/branding';
import { UserPlus, CheckCircle2, ShieldAlert, ArrowRight, ArrowLeft } from 'lucide-react';

export const Registro: React.FC = () => {
  const theme = WAI_BRAND_CONFIG.theme;
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [folio, setFolio] = useState("");
  
  // Form State
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    organizacion: "",
    cargo: "",
    linkedin: "",
    delegacion: "industria",
    mesa: "01",
    contribucion: "",
    c1: false,
    c2: false
  });

  const handleNext = () => {
    if (step < 3) setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.c1 || !form.c2) {
      alert("Por favor acepta los términos de uso y el consentimiento de procesamiento por IA.");
      return;
    }
    
    // Simular envío
    const rand = Math.floor(1000 + Math.random() * 9000);
    setFolio(`WAI-2026-${rand}`);
    setSubmitted(true);
  };

  const cardStyle = {
    backgroundColor: theme.cardBgGlass,
    border: `1.5px solid ${theme.border}`,
    borderRadius: '16px',
    padding: '24px',
    boxShadow: theme.shadowCard,
  };

  const inputStyle = {
    width: '100%',
    backgroundColor: '#020B1C',
    border: `1px solid ${theme.border}`,
    borderRadius: '8px',
    padding: '10px 12px',
    color: '#FFFFFF',
    fontSize: '13px',
    marginTop: '6px',
    outline: 'none',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '600px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '19px', fontWeight: '900', color: '#FFFFFF', margin: '0 0 8px 0' }}>Registro & Invitación Curada</h1>
        <p style={{ color: theme.textSecondary, fontSize: '13px', margin: 0 }}>
          Solicitud de asiento para la Primera Asamblea Nacional de Women in AI México · Septiembre 24, 2026.
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Stepper progress */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  backgroundColor: step === s ? theme.secondary : step > s ? theme.teal : 'rgba(255,255,255,0.05)',
                  color: step === s ? '#020B1C' : '#FFFFFF',
                  fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px'
                }}>
                  {s}
                </div>
                <span style={{ fontSize: '11px', color: step === s ? '#FFFFFF' : theme.textMuted, fontWeight: step === s ? '700' : '400' }}>
                  {s === 1 ? 'Perfil' : s === 2 ? 'Contribución' : 'Consentimiento'}
                </span>
              </div>
            ))}
          </div>

          {/* Step 1: Perfil Profesional */}
          {step === 1 && (
            <div style={cardStyle}>
              <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 16px 0' }}>Paso 1: Perfil Profesional</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: theme.textSecondary }}>Nombre Completo *</label>
                  <input type="text" required value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} style={inputStyle} placeholder="Ej. Dra. Susan Verdiguel" />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: theme.textSecondary }}>Correo Electrónico Institucional *</label>
                  <input type="email" required value={form.correo} onChange={e => setForm({...form, correo: e.target.value})} style={inputStyle} placeholder="ejemplo@organizacion.org" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: theme.textSecondary }}>Organización / Universidad *</label>
                    <input type="text" required value={form.organizacion} onChange={e => setForm({...form, organizacion: e.target.value})} style={inputStyle} placeholder="Ej. UNAM" />
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: theme.textSecondary }}>Cargo / Puesto *</label>
                    <input type="text" required value={form.cargo} onChange={e => setForm({...form, cargo: e.target.value})} style={inputStyle} placeholder="Ej. Investigadora IA" />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: theme.textSecondary }}>Enlace a LinkedIn (Opcional)</label>
                  <input type="url" value={form.linkedin} onChange={e => setForm({...form, linkedin: e.target.value})} style={inputStyle} placeholder="https://linkedin.com/in/..." />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: theme.textSecondary }}>Delegación correspondiente *</label>
                  <select value={form.delegacion} onChange={e => setForm({...form, delegacion: e.target.value})} style={inputStyle}>
                    {WAI_BRAND_CONFIG.delegaciones.map(d => (
                      <option key={d.id} value={d.id}>{d.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contribución */}
          {step === 2 && (
            <div style={cardStyle}>
              <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 16px 0' }}>Paso 2: Aportación & Mesa Temática</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: theme.textSecondary }}>Mesa preferente de Asamblea *</label>
                  <select value={form.mesa} onChange={e => setForm({...form, mesa: e.target.value})} style={inputStyle}>
                    <option value="01">Mesa 01 - Talento y Formación</option>
                    <option value="02">Mesa 02 - IA y Competitividad</option>
                    <option value="03">Mesa 03 - Gobernanza y Confianza</option>
                    <option value="04">Mesa 04 - Investigación y Transferencia</option>
                    <option value="05">Mesa 05 - Emprendimiento y Capital</option>
                    <option value="06">Mesa 06 - Liderazgo y Representación</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: theme.textSecondary }}>Tu propuesta o diagnóstico inicial para la mesa (Máx. 250 palabras)</label>
                  <textarea value={form.contribucion} onChange={e => setForm({...form, contribucion: e.target.value})} style={{ ...inputStyle, height: '120px', resize: 'none' }} placeholder="Comparte una recomendación o caso de uso que consideres crítico..." />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Consentimiento */}
          {step === 3 && (
            <div style={cardStyle}>
              <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 16px 0' }}>Paso 3: Consentimiento & Privacidad</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <input type="checkbox" checked={form.c1} onChange={e => setForm({...form, c1: e.target.checked})} style={{ marginTop: '3px', accentColor: theme.secondary }} />
                  <span style={{ fontSize: '11.5px', color: theme.textSecondary, lineHeight: 1.4 }}>
                    Acepto los términos de uso y el <strong>aviso de privacidad</strong> de WAI México conforme a la LFPDPPP.
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <input type="checkbox" checked={form.c2} onChange={e => setForm({...form, c2: e.target.checked})} style={{ marginTop: '3px', accentColor: theme.secondary }} />
                  <span style={{ fontSize: '11.5px', color: theme.textSecondary, lineHeight: 1.4 }}>
                    Autorizo expresamente que mi propuesta de aportación sea procesada por los <strong>Agentes de IA de WAI</strong> de forma agregada para la elaboración del borrador de la Declaratoria.
                  </span>
                </div>
                
                <div style={{ display: 'flex', gap: '8px', backgroundColor: 'rgba(255,64,129,0.04)', border: `1px solid ${theme.border}`, padding: '12px', borderRadius: '10px' }}>
                  <ShieldAlert size={16} color={theme.accent} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '10.5px', color: theme.textSecondary, lineHeight: 1.4 }}>
                    WAI no comparte tus datos de contacto con patrocinadores ni terceros sin tu consentimiento directo. Los reportes a patrocinadores se consolidan de forma anonimizada.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Form navigation buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
            {step > 1 ? (
              <button type="button" onClick={handleBack} style={{ backgroundColor: 'transparent', border: `1px solid ${theme.border}`, borderRadius: '10px', padding: '10px 20px', color: '#FFFFFF', cursor: 'pointer', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ArrowLeft size={13} /> Anterior
              </button>
            ) : <div />}

            {step < 3 ? (
              <button type="button" onClick={handleNext} style={{ backgroundColor: theme.secondary, border: 'none', borderRadius: '10px', padding: '10px 20px', color: '#020B1C', cursor: 'pointer', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
                Siguiente <ArrowRight size={13} />
              </button>
            ) : (
              <button type="submit" style={{ backgroundColor: theme.teal, border: 'none', borderRadius: '10px', padding: '10px 24px', color: '#FFFFFF', cursor: 'pointer', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
                Enviar Solicitud <CheckCircle2 size={13} />
              </button>
            )}
          </div>
        </form>
      ) : (
        /* Submission success view */
        <div style={{ ...cardStyle, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(16,185,129,0.1)', border: `1.5px solid ${theme.teal}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={24} color={theme.teal} />
          </div>
          <div>
            <h2 style={{ fontSize: '13px', fontWeight: '900', color: '#FFFFFF', margin: '0 0 6px 0' }}>¡Solicitud Recibida Exitosamente!</h2>
            <p style={{ color: theme.textSecondary, fontSize: '13px', margin: 0, lineHeight: 1.5 }}>
              Tu perfil y aportación para la asamblea han sido registrados. El comité editorial evaluará tu solicitud para asignación de asiento de delegación.
            </p>
          </div>

          <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '12px 24px', borderRadius: '10px', border: `1px solid ${theme.border}` }}>
            <span style={{ fontSize: '9px', color: theme.textMuted, textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Folio de Registro</span>
            <span style={{ fontSize: '13px', fontWeight: '900', color: theme.secondary, letterSpacing: '1px' }}>{folio}</span>
          </div>

          <button onClick={() => { setSubmitted(false); setStep(1); }} style={{ backgroundColor: 'rgba(255,255,255,0.04)', color: '#FFFFFF', border: `1.5px solid ${theme.border}`, borderRadius: '10px', padding: '8px 16px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', marginTop: '12px' }}>
            Registrar otra invitada
          </button>
        </div>
      )}
    </div>
  );
};
