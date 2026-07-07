import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Clock, ShieldAlert, Zap, Activity, Calendar, Bike } from 'lucide-react';

interface LineaMetro {
  id: number;
  linea: string;
  nombre: string;
  color_hex: string;
  total_estaciones: number;
  estado: 'normal' | 'lento' | 'suspendido';
  mensaje_estado: string;
}

interface Alerta {
  id: number;
  sistema: string;
  linea: string;
  tipo: string;
  titulo: string;
  descripcion: string;
}

const MOCK_LINEAS: LineaMetro[] = [
  { id: 1, linea: 'L1', nombre: 'Observatorio - Pantitlán', color_hex: '#F54394', total_estaciones: 20, estado: 'normal', mensaje_estado: 'Servicio regular en toda la línea.' },
  { id: 2, linea: 'L2', nombre: 'Cuatro Caminos - Tasqueña', color_hex: '#004F9F', total_estaciones: 24, estado: 'normal', mensaje_estado: 'Operando con normalidad.' },
  { id: 3, linea: 'L3', nombre: 'Indios Verdes - Universidad', color_hex: '#007D63', total_estaciones: 21, estado: 'lento', mensaje_estado: 'Retrasos por afluencia en La Raza. Trenes cada 8 min.' },
  { id: 4, linea: 'L4', nombre: 'Santa Anita - Martín Carrera', color_hex: '#B0925A', total_estaciones: 10, estado: 'normal', mensaje_estado: 'Servicio regular.' },
  { id: 5, linea: 'L5', nombre: 'Politécnico - Pantitlán', color_hex: '#F5A623', total_estaciones: 13, estado: 'normal', mensaje_estado: 'Operando con normalidad.' },
  { id: 6, linea: 'L6', nombre: 'El Rosario - Martín Carrera', color_hex: '#DA0000', total_estaciones: 11, estado: 'normal', mensaje_estado: 'Servicio regular.' },
  { id: 7, linea: 'L7', nombre: 'El Rosario - Barranca del Muerto', color_hex: '#E87722', total_estaciones: 14, estado: 'normal', mensaje_estado: 'Operando con normalidad.' },
  { id: 8, linea: 'L8', nombre: 'Garibaldi - Constitución', color_hex: '#009A44', total_estaciones: 19, estado: 'lento', mensaje_estado: 'Velocidad reducida entre Obrera y Atlalilco.' },
  { id: 9, linea: 'L9', nombre: 'Tacubaya - Pantitlán', color_hex: '#6B2E8C', total_estaciones: 12, estado: 'normal', mensaje_estado: 'Servicio regular en toda la línea.' },
  { id: 10, linea: 'L12', nombre: 'Mixcoac - Tláhuac', color_hex: '#B5A139', total_estaciones: 20, estado: 'normal', mensaje_estado: 'Operando con normalidad.' },
  { id: 11, linea: 'LA', nombre: 'La Paz - Pantitlán', color_hex: '#6B6B6B', total_estaciones: 10, estado: 'normal', mensaje_estado: 'Servicio regular.' },
  { id: 12, linea: 'LB', nombre: 'Ciudad Azteca - Buenavista', color_hex: '#6BC2C8', total_estaciones: 21, estado: 'normal', mensaje_estado: 'Operando con normalidad.' },
];

const MOCK_ALERTAS: Alerta[] = [
  { id: 1, sistema: 'Metro', linea: 'L3', tipo: 'incidencia', titulo: 'Alta Afluencia - Velocidad Reducida', descripcion: 'Por alta afluencia de usuarios, los trenes circulan a velocidad reducida entre Indios Verdes y La Raza. Se estima normalización en 45 min.' },
  { id: 2, sistema: 'Metrobús', linea: 'L1', tipo: 'incidencia', titulo: 'Desvío por Manifestación', descripcion: 'Por manifestación en Av. Insurgentes a la altura de El Ángel, unidades L1 siguen ruta alterna. Tiempo adicional estimado: 15 min.' },
  { id: 3, sistema: 'Metro', linea: 'L8', tipo: 'mantenimiento', titulo: 'Trabajos Preventivos', descripcion: 'Trabajos de mantenimiento preventivo en tramos entre Obrera y Atlalilco. Servicio con intervalos extendidos.' },
];

const OCUPACION: Record<string, number> = {
  'L1': 85, 'L2': 60, 'L3': 90, 'L4': 30, 'L5': 75,
  'L6': 20, 'L7': 55, 'L8': 70, 'L9': 65, 'L12': 35, 'LA': 25, 'LB': 50
};

const INTERVALOS: Record<string, string> = {
  'L1': '4 min', 'L2': '5 min', 'L3': '8 min', 'L4': '6 min', 'L5': '5 min',
  'L6': '7 min', 'L7': '6 min', 'L8': '6 min', 'L9': '5 min', 'L12': '5 min', 'LA': '8 min', 'LB': '7 min'
};

const TICKER = 'L3 Retraso por afluencia · Metrobús L1 desvío en Insurgentes · L7 Servicio normalizado · BiciRed activo este domingo · L12 Tláhuac operando regular · Cablebús L2 servicio continuo · Trolebús Elevado sin incidencias · ';

const getOcupacionColor = (v: number) => v >= 80 ? '#D40000' : v >= 55 ? '#F5A623' : '#00843D';
const getOcupacionLabel = (v: number) => v >= 80 ? 'Alto' : v >= 55 ? 'Medio' : 'Bajo';

export const EstadoServicio: React.FC = () => {
  const [lineas, setLineas] = useState<LineaMetro[]>(MOCK_LINEAS);
  const [alertas, setAlertas] = useState<Alerta[]>(MOCK_ALERTAS);
  const [countdown, setCountdown] = useState(247);
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    fetch('/api/lineas').then(r => r.json()).then(setLineas).catch(() => {});
    fetch('/api/alertas').then(r => r.json()).then(setAlertas).catch(() => {});
  }, []);

  // Countdown timer for next train on L1
  useEffect(() => {
    const t = setInterval(() => setCountdown(c => c <= 0 ? 287 : c - 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Animate bars on mount
  useEffect(() => {
    const t = setTimeout(() => setBarsVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  const mins = Math.floor(countdown / 60);
  const secs = countdown % 60;

  const lineasActivas = lineas.filter(l => l.estado === 'normal').length;
  const lineasLentas = lineas.filter(l => l.estado === 'lento').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '20px' }}>

      {/* SUMMARY BAR */}
      <div style={{
        background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '14px', padding: '16px 20px',
        display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00843D', boxShadow: '0 0 8px #00843D', animation: 'pulse-green 2s infinite' }} />
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#00843D' }}>Sistema Activo</span>
        </div>
        <div style={{ width: '1px', height: '20px', background: '#2A2A3E' }} />
        {[
          { label: `${lineasActivas} Líneas Normales`, color: '#00843D', bg: 'rgba(0,132,61,0.12)', border: 'rgba(0,132,61,0.25)' },
          { label: `${lineasLentas} Con Retraso`, color: '#F5A623', bg: 'rgba(245,166,35,0.12)', border: 'rgba(245,166,35,0.25)' },
          { label: `${alertas.length} Alertas Activas`, color: '#D40000', bg: 'rgba(212,0,0,0.12)', border: 'rgba(212,0,0,0.25)' },
        ].map((p, i) => (
          <span key={i} style={{ fontSize: '11px', fontWeight: '700', color: p.color, background: p.bg, border: `1px solid ${p.border}`, padding: '4px 10px', borderRadius: '999px' }}>
            {p.label}
          </span>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={12} color="#F5A623" />
          <span style={{ fontSize: '11px', color: '#A0AEC0' }}>Próximo L1: </span>
          <span style={{ fontSize: '13px', fontWeight: '800', color: '#F54394', animation: secs === 0 ? 'countdown-pulse 0.5s ease' : 'none' }}>
            {mins}:{secs.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ALERTAS */}
      {alertas.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldAlert size={13} color="#D40000" />
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Alertas Críticas</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
            {alertas.map((a) => (
              <div key={a.id} style={{
                background: 'rgba(212,0,0,0.05)', border: '1px solid rgba(212,0,0,0.18)',
                borderRadius: '14px', padding: '16px', display: 'flex', gap: '12px',
              }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: 'rgba(212,0,0,0.12)', border: '1px solid rgba(212,0,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <AlertTriangle size={17} color="#D40000" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '10px', fontWeight: '800', background: '#D40000', color: '#fff', padding: '1px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>{a.sistema} {a.linea}</span>
                    <span style={{ fontSize: '10px', color: '#A0AEC0' }}>{a.tipo}</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>{a.titulo}</div>
                  <div style={{ fontSize: '11px', color: '#A0AEC0', lineHeight: 1.5 }}>{a.descripcion}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LINE GRID */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Red de Metro CDMX — 12 Líneas</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
          {lineas.map((l, idx) => {
            const oc = OCUPACION[l.linea] || 50;
            const ocColor = getOcupacionColor(oc);
            const ocLabel = getOcupacionLabel(oc);
            const intervalo = INTERVALOS[l.linea] || '5 min';
            const isIssue = l.estado !== 'normal';
            return (
              <div key={l.id} style={{
                background: '#1A1A2E', border: `1px solid ${isIssue ? l.color_hex + '35' : '#2A2A3E'}`,
                borderRadius: '14px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px',
                transition: 'all 0.2s', animation: `cardEnter 0.35s ease ${idx * 0.04}s both`,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = l.color_hex + '60'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = isIssue ? l.color_hex + '35' : '#2A2A3E'; }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: l.color_hex, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: '#fff', boxShadow: `0 4px 10px ${l.color_hex}50`, flexShrink: 0 }}>
                      {l.linea}
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '700', color: '#fff', lineHeight: 1.2 }}>{l.nombre}</div>
                      <div style={{ fontSize: '10px', color: '#A0AEC0', marginTop: '1px' }}>{l.total_estaciones} estaciones</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <span style={{
                      fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em',
                      padding: '3px 7px', borderRadius: '999px',
                      background: l.estado === 'normal' ? 'rgba(0,132,61,0.12)' : 'rgba(245,166,35,0.12)',
                      color: l.estado === 'normal' ? '#00843D' : '#F5A623',
                      border: `1px solid ${l.estado === 'normal' ? 'rgba(0,132,61,0.25)' : 'rgba(245,166,35,0.25)'}`,
                      display: 'flex', alignItems: 'center', gap: '4px',
                    }}>
                      {isIssue && <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#F5A623', animation: 'pulse-glow 1.5s infinite' }} />}
                      {l.estado === 'normal' ? 'Normal' : 'Lento'}
                    </span>
                    <span style={{ fontSize: '10px', color: '#4A5568' }}>Cada {intervalo}</span>
                  </div>
                </div>

                {/* Occupancy bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '10px', color: '#4A5568' }}>Ocupación</span>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: ocColor }}>{ocLabel} · {oc}%</span>
                  </div>
                  <div style={{ height: '5px', background: '#2A2A3E', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: '3px', background: ocColor,
                      width: barsVisible ? `${oc}%` : '0%',
                      transition: `width 0.9s cubic-bezier(0.34, 1.1, 0.64, 1) ${idx * 0.04 + 0.3}s`,
                      boxShadow: `0 0 6px ${ocColor}60`,
                    }} />
                  </div>
                </div>

                {/* Status message */}
                <div style={{ fontSize: '11px', color: '#A0AEC0', lineHeight: 1.4 }}>{l.mensaje_estado}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* OTHER SYSTEMS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '18px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Otros Sistemas de Movilidad</span>
          {[
            { nombre: 'Metrobús CDMX', msg: 'Desvío puntual en L1. Resto operando normal.', color: '#003DA5', estado: 'parcial' },
            { nombre: 'Cablebús CDMX', msg: 'L1 y L2 operando a velocidad nominal.', color: '#00843D', estado: 'normal' },
            { nombre: 'Trolebús CDMX', msg: 'Línea Elevada funcionando de Constitución a Acahualtepec.', color: '#6929C4', estado: 'normal' },
            { nombre: 'Tren Ligero', msg: 'Tasqueña - Xochimilco operando con regularidad.', color: '#6929C4', estado: 'normal' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '4px', height: '36px', borderRadius: '2px', background: s.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>{s.nombre}</div>
                <div style={{ fontSize: '11px', color: '#A0AEC0', marginTop: '2px' }}>{s.msg}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: s.estado === 'normal' ? '#00843D' : '#F5A623', boxShadow: `0 0 6px ${s.estado === 'normal' ? '#00843D' : '#F5A623'}` }} />
                <span style={{ fontSize: '10px', fontWeight: '700', color: s.estado === 'normal' ? '#00843D' : '#F5A623', textTransform: 'uppercase' }}>
                  {s.estado === 'normal' ? 'Operando' : 'Parcial'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Horario Oficial del Sistema</span>
          <div style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '16px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { dia: 'Lunes a Viernes', h: '05:00 — 00:00 hrs', icon: Calendar, color: '#D40000' },
              { dia: 'Sábados', h: '06:00 — 00:00 hrs', icon: Calendar, color: '#F5A623' },
              { dia: 'Domingos y Festivos', h: '07:00 — 00:00 hrs (BiciRed)', icon: Bike, color: '#00843D' },
            ].map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', paddingTop: i > 0 ? '14px' : '0', borderTop: i > 0 ? '1px solid #2A2A3E' : 'none' }}>
                <h.icon size={18} color={h.color} style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>{h.dia}</div>
                  <div style={{ fontSize: '12px', color: '#A0AEC0', marginTop: '2px' }}>{h.h}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TICKER */}
      <div style={{ background: '#0D0D0D', border: '1px solid #1E1E2A', borderRadius: '10px', padding: '10px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 35s linear infinite' }}>
          <span style={{ fontSize: '11px', color: '#A0AEC0', paddingRight: '60px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity size={10} color="#D40000" style={{ flexShrink: 0 }} /> {TICKER}{TICKER}
          </span>
        </div>
      </div>
    </div>
  );
};
