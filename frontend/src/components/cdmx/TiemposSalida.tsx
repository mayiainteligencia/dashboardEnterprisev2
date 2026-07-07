import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Train, User } from 'lucide-react';

const LINEA_COLORES: Record<string, string> = {
  'L1': '#F54394', 'L2': '#004F9F', 'L3': '#007D63', 'L4': '#B0925A',
  'L5': '#F5A623', 'L6': '#DA0000', 'L7': '#E87722', 'L8': '#009A44',
  'L9': '#6B2E8C', 'L12': '#B5A139', 'LA': '#6B6B6B', 'LB': '#6BC2C8'
};

const LINEAS = Object.keys(LINEA_COLORES);

// Terminal stations for each line direction
const TERMINALES: Record<string, [string, string]> = {
  'L1': ['Observatorio', 'Pantitlán'],
  'L2': ['Cuatro Caminos', 'Tasqueña'],
  'L3': ['Indios Verdes', 'Universidad'],
  'L4': ['Santa Anita', 'Martín Carrera'],
  'L5': ['Politécnico', 'Pantitlán'],
  'L6': ['El Rosario', 'Martín Carrera'],
  'L7': ['El Rosario', 'Barranca del Muerto'],
  'L8': ['Garibaldi', 'Constitución'],
  'L9': ['Tacubaya', 'Pantitlán'],
  'L12': ['Mixcoac', 'Tláhuac'],
  'LA': ['La Paz', 'Pantitlán'],
  'LB': ['Ciudad Azteca', 'Buenavista'],
};

const POPULAR_STATIONS: Record<string, string[]> = {
  'L1': ['Observatorio', 'Tacubaya', 'Balderas', 'Pino Suárez', 'Pantitlán'],
  'L2': ['Cuatro Caminos', 'Tacuba', 'Bellas Artes', 'Zócalo', 'Tasqueña'],
  'L3': ['Indios Verdes', 'La Raza', 'Tlatelolco', 'Balderas', 'Universidad'],
  'L4': ['Santa Anita', 'Jamaica', 'Fray Servando', 'Candelaria', 'Martín Carrera'],
  'L5': ['Politécnico', 'Consulado', 'Pantitlán', 'Hangares', 'Terminal Aérea'],
  'L6': ['El Rosario', 'Instituto del Petróleo', 'Valle Gómez', 'Deportivo 18 de Marzo', 'Martín Carrera'],
  'L7': ['El Rosario', 'Refinería', 'Auditorio', 'Mixcoac', 'Barranca del Muerto'],
  'L8': ['Garibaldi', 'Bellas Artes', 'Salto del Agua', 'Jamaica', 'Atlalilco'],
  'L9': ['Tacubaya', 'Patriotismo', 'Centro Médico', 'Pantitlán', 'Ciudad Deportiva'],
  'L12': ['Mixcoac', 'Insurgentes Sur', 'Hospital 20 de Noviembre', 'Atlalilco', 'Tláhuac'],
  'LA': ['La Paz', 'Los Reyes', 'Pantitlán', 'Peñón Viejo', 'Investigador'],
  'LB': ['Ciudad Azteca', 'Muzquiz', 'Ecatepec', 'Buenavista', 'Tultitlán'],
};

const INTERVALOS: Record<string, number> = {
  'L1': 4, 'L2': 5, 'L3': 8, 'L4': 6, 'L5': 5,
  'L6': 7, 'L7': 6, 'L8': 6, 'L9': 5, 'L12': 5, 'LA': 8, 'LB': 7
};

const OCUPACION_DEMO: Record<string, number> = {
  'L1': 75, 'L2': 55, 'L3': 90, 'L4': 30, 'L5': 65,
  'L6': 25, 'L7': 50, 'L8': 70, 'L9': 60, 'L12': 40, 'LA': 20, 'LB': 45
};

function generateDepartures(intervalMinutes: number) {
  const now = new Date();
  return [1, 2, 3].map(i => {
    const t = new Date(now.getTime() + i * intervalMinutes * 60000);
    return {
      time: `${t.getHours().toString().padStart(2,'0')}:${t.getMinutes().toString().padStart(2,'0')}`,
      minutos: i * intervalMinutes,
    };
  });
}

export const TiemposSalida: React.FC = () => {
  const [lineaSeleccionada, setLineaSeleccionada] = useState('L1');
  const [stationQuery, setStationQuery] = useState('');
  const [stationSelected, setStationSelected] = useState('');
  const [departures, setDepartures] = useState<{ dir: string; salidas: { time: string; minutos: number }[] }[]>([]);
  const [refreshCountdown, setRefreshCountdown] = useState(30);
  const [refreshing, setRefreshing] = useState(false);
  const [progressAnim, setProgressAnim] = useState(false);

  const loadDepartures = useCallback(async () => {
    setRefreshing(true);
    const terminales = TERMINALES[lineaSeleccionada] || ['Terminal A', 'Terminal B'];
    const interval = INTERVALOS[lineaSeleccionada] || 5;

    // Try API, fall back to simulation
    try {
      const res = await fetch(`/api/salidas?estacion=${encodeURIComponent(stationSelected || 'Observatorio')}&linea=${lineaSeleccionada}`);
      const data = await res.json();
      if (data && data.salidas) {
        setDepartures(data.salidas);
        setRefreshing(false);
        return;
      }
    } catch {}

    // Simulated
    setDepartures([
      { dir: `Dirección ${terminales[1]}`, salidas: generateDepartures(interval) },
      { dir: `Dirección ${terminales[0]}`, salidas: generateDepartures(interval + 1) },
    ]);
    setRefreshing(false);
  }, [lineaSeleccionada, stationSelected]);

  // Initial load and on line/station change
  useEffect(() => {
    setProgressAnim(false);
    setTimeout(() => setProgressAnim(true), 100);
    loadDepartures();
    setRefreshCountdown(30);
  }, [lineaSeleccionada, stationSelected]);

  // Auto-refresh countdown
  useEffect(() => {
    const t = setInterval(() => {
      setRefreshCountdown(c => {
        if (c <= 1) { loadDepartures(); return 30; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [loadDepartures]);

  const color = LINEA_COLORES[lineaSeleccionada] || '#D40000';
  const interval = INTERVALOS[lineaSeleccionada] || 5;
  const ocupacion = OCUPACION_DEMO[lineaSeleccionada] || 50;
  const popularStations = POPULAR_STATIONS[lineaSeleccionada] || [];

  const getOcupColor = (v: number) => v >= 80 ? '#D40000' : v >= 55 ? '#F5A623' : '#00843D';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#fff', fontFamily: 'Outfit, sans-serif', margin: 0 }}>Próximas Salidas</h2>
          <div style={{ fontSize: '11px', color: '#A0AEC0', marginTop: '2px' }}>Selecciona una línea y estación para ver salidas en vivo</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 12px', background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '10px', fontSize: '11px', color: '#A0AEC0', fontWeight: '600' }}>
          {refreshing ? (
            <><div className="spin-anim" style={{ width: 12, height: 12, border: '2px solid rgba(255,255,255,0.15)', borderTopColor: '#D40000', borderRadius: '50%' }} /> Actualizando…</>
          ) : (
            <><RefreshCw size={11} color="#4A5568" /> Actualiza en {refreshCountdown}s</>
          )}
        </div>
      </div>

      {/* LINE SELECTOR */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {LINEAS.map(l => {
          const lColor = LINEA_COLORES[l];
          const isActive = l === lineaSeleccionada;
          return (
            <button key={l} onClick={() => { setLineaSeleccionada(l); setStationSelected(''); setStationQuery(''); }}
              style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: isActive ? lColor : '#1A1A2E',
                border: isActive ? `2px solid ${lColor}` : '1px solid #2A2A3E',
                color: '#fff', fontSize: '11px', fontWeight: '800',
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: isActive ? `0 0 14px ${lColor}60` : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = lColor + '22'; e.currentTarget.style.borderColor = lColor; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = '#1A1A2E'; e.currentTarget.style.borderColor = '#2A2A3E'; } }}>
              {l}
            </button>
          );
        })}
      </div>

      {/* STATION SEARCH */}
      <div style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '14px', padding: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '800', color: '#fff', boxShadow: `0 0 10px ${color}50`, flexShrink: 0 }}>
            {lineaSeleccionada}
          </div>
          <input type="text" placeholder={`Buscar estación en ${lineaSeleccionada}...`} value={stationQuery}
            onChange={e => setStationQuery(e.target.value)}
            style={{ flex: 1, background: '#121212', border: '1px solid #2A2A3E', borderRadius: '9px', padding: '9px 13px', color: '#fff', fontSize: '13px', outline: 'none' }} />
        </div>

        {/* Popular station chips */}
        <div>
          <div style={{ fontSize: '10px', color: '#4A5568', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Estaciones Populares</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
            {popularStations.filter(s => !stationQuery || s.toLowerCase().includes(stationQuery.toLowerCase())).map(s => (
              <button key={s} onClick={() => { setStationSelected(s); setStationQuery(s); }}
                style={{
                  padding: '6px 12px', borderRadius: '999px', fontSize: '12px',
                  background: stationSelected === s ? color : '#121212',
                  border: `1px solid ${stationSelected === s ? color : '#2A2A3E'}`,
                  color: stationSelected === s ? '#fff' : '#A0AEC0', cursor: 'pointer',
                  transition: 'all 0.18s', fontWeight: stationSelected === s ? '700' : '500',
                  boxShadow: stationSelected === s ? `0 0 8px ${color}40` : 'none',
                }}
                onMouseEnter={e => { if (stationSelected !== s) { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = '#fff'; } }}
                onMouseLeave={e => { if (stationSelected !== s) { e.currentTarget.style.borderColor = '#2A2A3E'; e.currentTarget.style.color = '#A0AEC0'; } }}>
                <Train size={10} style={{ marginRight: '4px', display: 'inline' }} />
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DEPARTURES */}
      {departures.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          {departures.map((dir, di) => (
            <div key={di} style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '16px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #2A2A3E', paddingBottom: '12px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}` }} />
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#fff' }}>{dir.dir}</span>
              </div>
              {dir.salidas.map((s, si) => {
                const progressPct = si === 0 ? Math.min(95, ((interval * 60 - refreshCountdown) / (interval * 60)) * 100) : null;
                return (
                  <div key={si} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '18px', fontWeight: '800', color: si === 0 ? color : '#fff', fontFamily: 'Outfit, sans-serif' }}>{s.time}</span>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: si === 0 ? color : '#A0AEC0', background: si === 0 ? `${color}18` : 'transparent', padding: si === 0 ? '2px 8px' : '0', borderRadius: '999px', border: si === 0 ? `1px solid ${color}30` : 'none' }}>
                          En {s.minutos} min
                        </span>
                      </div>
                      {/* Occupancy icons */}
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[0,1,2].map(j => {
                          const oc = si === 0 ? ocupacion : ocupacion - si * 15;
                          const threshold = j === 0 ? 30 : j === 1 ? 60 : 80;
                          const active = oc >= threshold;
                          return <User key={j} size={12} color={active ? getOcupColor(oc) : '#2A2A3E'} />;
                        })}
                      </div>
                    </div>
                    {/* Progress bar for next train */}
                    {progressPct !== null && (
                      <div style={{ height: '3px', background: '#2A2A3E', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', background: color, borderRadius: '2px',
                          width: progressAnim ? `${progressPct}%` : '0%',
                          transition: 'width 1s ease',
                          boxShadow: `0 0 6px ${color}80`,
                        }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Info if no station selected */}
      {!stationSelected && !refreshing && (
        <div style={{ background: '#1A1A2E', border: '1px dashed #2A2A3E', borderRadius: '14px', padding: '24px', textAlign: 'center' }}>
          <Train size={24} color="#4A5568" style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#A0AEC0' }}>Selecciona una estación</div>
          <div style={{ fontSize: '12px', color: '#4A5568', marginTop: '4px' }}>Elige una estación popular arriba para ver las próximas salidas</div>
        </div>
      )}
    </div>
  );
};
