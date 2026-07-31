import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowUp } from 'lucide-react';
import { brandingConfig } from '../config/branding';

const { colores, ia } = brandingConfig;

type Msg = { role: 'user' | 'assistant'; content: string };

// Asistente IA con forma de buscador en el header. Al escribir abre un panel desplegable con la conversación.
export const AsistenteBuscador: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const text = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput(''); setLoading(true); setOpen(true);
    try {
      const res = await fetch('/api/chat/message', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: text, departamento: 'Ventas y Marketing' }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.respuesta }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'No fue posible conectar con el asistente.' }]);
    } finally { setLoading(false); }
  };

  return (
    <div ref={ref} style={{ position: 'relative', flex: 1, maxWidth: '460px' }}>
      {/* Barra buscador */}
      <div onClick={() => setOpen(true)} style={{
        display: 'flex', alignItems: 'center', gap: '10px', height: '44px', padding: '0 8px 0 16px',
        borderRadius: '999px', background: colores.fondoTerciario,
        border: `1px solid ${open ? colores.primario : colores.borde}`, transition: 'border-color .2s',
      }}>
        <Sparkles size={18} color={colores.primario} />
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          onFocus={() => setOpen(true)}
          placeholder={`Pregúntale a ${ia.nombre}…`}
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', color: colores.textoClaro }}
        />
        <button onClick={send} disabled={loading || !input.trim()} style={{
          width: '32px', height: '32px', borderRadius: '50%', border: 'none', flexShrink: 0,
          background: input.trim() ? colores.primario : colores.borde, color: '#fff', cursor: input.trim() ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s',
        }}><ArrowUp size={16} /></button>
      </div>

      {/* Panel desplegable */}
      {open && (
        <div style={{
          position: 'absolute', top: '52px', left: 0, right: 0, zIndex: 1500,
          background: colores.fondoSecundario, border: `1px solid ${colores.borde}`, borderRadius: '16px',
          boxShadow: '0 18px 48px rgba(0,0,0,0.18)', overflow: 'hidden', maxHeight: '440px', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', borderBottom: `1px solid ${colores.borde}` }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: `linear-gradient(135deg, ${colores.primario}, ${colores.primarioOscuro})`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>AI</div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro, margin: 0 }}>{ia.nombre}</p>
              <p style={{ fontSize: '11px', color: colores.textoMedio, margin: 0 }}>Asistente comercial</p>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.length === 0 && !loading && (
              <div style={{ textAlign: 'center', padding: '18px 8px' }}>
                <Sparkles size={26} color={colores.primario} style={{ marginBottom: '8px' }} />
                <p style={{ fontSize: '13px', color: colores.textoMedio, margin: 0 }}>Pregúntame sobre blindaje, prospectos, inventario o instalaciones.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '82%',
                background: m.role === 'user' ? colores.primario : colores.fondoTerciario, color: m.role === 'user' ? '#fff' : colores.textoClaro,
                padding: '10px 14px', borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', fontSize: '13px', lineHeight: 1.5 }}>
                {m.content}
              </div>
            ))}
            {loading && <div style={{ alignSelf: 'flex-start', fontSize: '13px', color: colores.textoMedio }}>{ia.nombre} está escribiendo…</div>}
            <div ref={endRef} />
          </div>
        </div>
      )}
    </div>
  );
};
