import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type EventType = 'venta' | 'seguimiento' | 'lead' | 'alerta' | 'cita' | 'credito';

export interface LiveEvent {
  id: string;
  type: EventType;
  title: string;
  body: string;
  time: string;
  agencia?: string;
  vendedor?: string;
  modelo?: string;
  valor?: string;
}

interface LiveFeedContextValue {
  events: LiveEvent[];
  latestEvent: LiveEvent | null;
  addEvent: (e: Omit<LiveEvent, 'id' | 'time'>) => void;
}

const LiveFeedContext = createContext<LiveFeedContextValue>({
  events: [],
  latestEvent: null,
  addEvent: () => {},
});

const VENDEDORES = ['Carlos V.', 'Diana L.', 'Raúl S.', 'Paola M.', 'Tomás H.'];
const AGENCIAS   = ['CDMX (Polanco)', 'CDMX (Santa Fe)', 'Guadalajara', 'Monterrey', 'Querétaro', 'Puebla'];
const MODELOS    = ['Paquete BÁSICO', 'Paquete FULL', 'Paquete ULTRA', 'Vidrio Nivel IIIA', 'Parabrisas 15mm'];
const PROSPECTOS = ['María G.', 'Luis R.', 'Ana P.', 'Jorge M.', 'Sofía T.', 'Rodrigo M.', 'Valentina C.'];

function rnd<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function uid() { return Math.random().toString(36).slice(2, 9); }
function now() { return new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); }

function generateEvent(): Omit<LiveEvent, 'id' | 'time'> {
  const type = rnd<EventType>(['venta', 'seguimiento', 'lead', 'alerta', 'cita', 'credito']);
  const v = rnd(VENDEDORES);
  const a = rnd(AGENCIAS);
  const m = rnd(MODELOS);
  const p = rnd(PROSPECTOS);
  const valor = `$${(Math.floor(Math.random() * 80 + 35) * 1000).toLocaleString('es-MX')}`;

  switch (type) {
    case 'venta': return {
      type, agencia: a, vendedor: v, modelo: m, valor,
      title: `[Instalación Vendid] — ${m}`,
      body: `${v} cerró ${m} en ${a} · ${valor}`,
    };
    case 'seguimiento': return {
      type, agencia: a, vendedor: v, modelo: m,
      title: `[Seguimiento prospecto]`,
      body: `${v}: dar seguimiento a ${p} — cotización de blindaje`,
    };
    case 'lead': return {
      type, agencia: a, modelo: m,
      title: `[Prospecto calificado] — Score alto`,
      body: `MAYIA calificó a ${p} · interés en ${m} · score 87`,
    };
    case 'alerta': return {
      type, agencia: a,
      title: `[Alerta de stock] en ${a}`,
      body: `Inventario de ${m} crítico — quedan ${Math.floor(Math.random() * 8 + 2)} piezas`,
    };
    case 'cita': return {
      type, agencia: a, vendedor: v, modelo: m,
      title: `[Evaluación Vehículo]`,
      body: `${p} → inspección para ${m} en ${a} · ${v}`,
    };
    case 'credito': return {
      type, agencia: a, vendedor: v, modelo: m, valor,
      title: `[Cotización aprobada]`,
      body: `${p} aprobó cotización por ${valor} · listo para ${m}`,
    };
  }
}

export const LiveFeedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [latestEvent, setLatestEvent] = useState<LiveEvent | null>(null);

  const addEvent = useCallback((e: Omit<LiveEvent, 'id' | 'time'>) => {
    const full: LiveEvent = { ...e, id: uid(), time: now() };
    setEvents(prev => [full, ...prev].slice(0, 50));
    setLatestEvent(full);
  }, []);

  // Emitir eventos simulados periódicamente
  useEffect(() => {
    // Primer evento rápido al montar
    const first = setTimeout(() => addEvent(generateEvent()), 3000);

    const interval = setInterval(() => {
      addEvent(generateEvent());
    }, 20000); // exactamente cada 20s

    return () => { clearTimeout(first); clearInterval(interval); };
  }, [addEvent]);

  return (
    <LiveFeedContext.Provider value={{ events, latestEvent, addEvent }}>
      {children}
    </LiveFeedContext.Provider>
  );
};

export const useLiveFeed = () => useContext(LiveFeedContext);
