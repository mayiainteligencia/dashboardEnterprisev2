import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, ArrowRight, Clock, Search, ArrowLeftRight, Share2, Zap, CheckCircle2, AlertTriangle, X, TrendingUp, Train, Coins, Users } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Estacion {
  nombre: string;
  linea: string;
  color_hex: string;
  latitud: number;
  longitud: number;
}

const LINEA_COLORES: Record<string, string> = {
  'L1': '#F54394', 'L2': '#004F9F', 'L3': '#007D63', 'L4': '#B0925A',
  'L5': '#F5A623', 'L6': '#DA0000', 'L7': '#E87722', 'L8': '#009A44',
  'L9': '#6B2E8C', 'L12': '#B5A139', 'LA': '#6B6B6B', 'LB': '#6BC2C8'
};

const RUTAS_POPULARES = [
  { or: 'Indios Verdes', dest: 'Tasqueña', tiempo: '35 min', transbordos: 1, costo: '$5.00', lineas: ['L3'] },
  { or: 'Observatorio', dest: 'Universidad', tiempo: '28 min', transbordos: 1, costo: '$10.00', lineas: ['L1', 'L3'] },
  { or: 'Buenavista', dest: 'Zócalo/Tenochtitlan', tiempo: '14 min', transbordos: 0, costo: '$5.00', lineas: ['L2'] },
  { or: 'Mixcoac', dest: 'Pantitlán', tiempo: '42 min', transbordos: 2, costo: '$5.00', lineas: ['L12', 'L1'] },
  { or: 'Balderas', dest: 'Aeropuerto', tiempo: '25 min', transbordos: 1, costo: '$5.00', lineas: ['L1', 'L5'] },
];

const LIVE_STATS = [
  { label: 'Viajeros activos', value: '4.2M', icon: Users, color: '#003DA5' },
  { label: 'Trenes circulando', value: '147', icon: Train, color: '#D40000' },
  { label: 'Frecuencia L1', value: '4 min', icon: Clock, color: '#F54394' },
];

export const PlanificadorRutas: React.FC = () => {
  const [estaciones, setEstaciones] = useState<Estacion[]>([]);
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [hora, setHora] = useState(() => {
    const n = new Date();
    return `${n.getHours().toString().padStart(2,'0')}:${n.getMinutes().toString().padStart(2,'0')}`;
  });
  const [preferencia, setPreferencia] = useState('rapido');
  const [origenSugerencias, setOrigenSugerencias] = useState<string[]>([]);
  const [destinoSugerencias, setDestinoSugerencias] = useState<string[]>([]);
  const [mostrarOrSug, setMostrarOrSug] = useState(false);
  const [mostrarDestSug, setMostrarDestSug] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [swapAnim, setSwapAnim] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    fetch('/api/estaciones?sistema=metro')
      .then(res => res.json())
      .then(data => {
        const uniqueEst: Estacion[] = [];
        const seen = new Set();
        data.forEach((e: any) => {
          if (!seen.has(e.nombre)) {
            seen.add(e.nombre);
            uniqueEst.push({
              nombre: e.nombre,
              linea: e.linea,
              color_hex: e.color_hex,
              latitud: parseFloat(e.latitud),
              longitud: parseFloat(e.longitud),
            });
          }
        });
        setEstaciones(uniqueEst);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, { zoomControl: false })
        .setView([19.4326, -99.1332], 12);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors, © CartoDB'
      }).addTo(mapRef.current);
      L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);
    }
    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, []);

  const getSugerencias = (val: string) =>
    estaciones.filter(e => e.nombre.toLowerCase().includes(val.toLowerCase())).map(e => e.nombre).slice(0, 6);

  const handleSwap = () => {
    setSwapAnim(true);
    setTimeout(() => {
      const temp = origen;
      setOrigen(destino);
      setDestino(temp);
      setSwapAnim(false);
    }, 200);
  };

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origen || !destino) return;
    setLoading(true);
    setResultado(null);
    try {
      const res = await fetch(`/api/rutas/buscar?origen=${encodeURIComponent(origen)}&destino=${encodeURIComponent(destino)}&preferencia=${preferencia}`);
      const data = await res.json();
      setResultado(data);
      setLastUpdate(new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }));

      if (mapRef.current && data.success) {
        mapRef.current.eachLayer(layer => {
          if (layer instanceof L.Marker || layer instanceof L.Polyline) mapRef.current?.removeLayer(layer);
        });
        const coordRes = await fetch('/api/estaciones');
        const allEst = await coordRes.json();
        const pathCoords: [number, number][] = [];
        data.coordenadas.forEach((node: any) => {
          const matched = allEst.find((est: any) => est.nombre === node.nombre && est.linea === node.linea);
          if (matched) pathCoords.push([parseFloat(matched.latitud), parseFloat(matched.longitud)]);
        });
        if (pathCoords.length > 0) {
          const polyline = L.polyline(pathCoords, { color: '#D40000', weight: 5, opacity: 0.9, dashArray: '10, 5' }).addTo(mapRef.current);
          const greenIcon = L.divIcon({ className: '', html: '<div style="width:16px;height:16px;border-radius:50%;background:#00843D;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.5)"></div>', iconAnchor: [8,8] });
          const redIcon = L.divIcon({ className: '', html: '<div style="width:16px;height:16px;border-radius:50%;background:#D40000;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.5)"></div>', iconAnchor: [8,8] });
          L.marker(pathCoords[0], { icon: greenIcon }).addTo(mapRef.current).bindPopup(`<b>Origen:</b> ${data.origen}`).openPopup();
          L.marker(pathCoords[pathCoords.length - 1], { icon: redIcon }).addTo(mapRef.current).bindPopup(`<b>Destino:</b> ${data.destino}`);
          mapRef.current.fitBounds(polyline.getBounds(), { padding: [40, 40] });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (resultado) {
      const txt = `Movilidad Inteligente CDMX: ${resultado.origen} → ${resultado.destino}\n⏱️ ${resultado.tiempo} | 🔄 ${resultado.transbordos} transbordo(s) | 💰 $${resultado.costo?.toFixed(2)}\nVia Movilidad Inteligente CDMX`;
      navigator.clipboard.writeText(txt).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '20px', height: 'calc(100vh - 120px)' }}>
      {/* PANEL IZQUIERDO */}
      <div className="no-scrollbar" style={{ overflowY: 'auto', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* LIVE STATS STRIP */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
          {LIVE_STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} style={{
                background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '12px',
                padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px',
                borderLeftColor: s.color, borderLeftWidth: '3px'
              }}>
                <Icon size={18} color={s.color} />
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#fff', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: '10px', color: '#A0AEC0', marginTop: '2px' }}>{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BUSCADOR */}
        <div style={{
          background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '16px', padding: '22px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Color bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', display: 'flex' }}>
            {['#F54394','#004F9F','#007D63','#E97D00','#B0925A','#DA0000'].map((c,i) => (
              <div key={i} style={{ flex: 1, backgroundColor: c }} />
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Outfit, sans-serif', margin: 0 }}>
              <Navigation size={18} color="#D40000" />
              Planificador Puerta a Puerta
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#A0AEC0' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00843D', boxShadow: '0 0 6px #00843D' }} />
              En vivo
            </div>
          </div>

          <form onSubmit={handleBuscar} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* ORIGEN */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                📍 Origen
              </label>
              <div style={{ display: 'flex', alignItems: 'center', background: '#121212', borderRadius: '10px', border: `1px solid ${origen ? '#00843D40' : '#2A2A3E'}`, padding: '10px 14px', gap: '10px', transition: 'border-color 0.2s' }}>
                <MapPin size={15} color="#00843D" />
                <input
                  type="text" placeholder="Estación de origen (ej. Indios Verdes)" value={origen}
                  onChange={e => { setOrigen(e.target.value); setOrigenSugerencias(getSugerencias(e.target.value)); setMostrarOrSug(true); }}
                  onFocus={() => setMostrarOrSug(true)}
                  onBlur={() => setTimeout(() => setMostrarOrSug(false), 150)}
                  style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', color: '#fff', fontSize: '13px' }}
                />
                {origen && <button type="button" onClick={() => setOrigen('')} style={{ background: 'none', border: 'none', color: '#4A5568', cursor: 'pointer', padding: 0 }}><X size={13} /></button>}
              </div>
              {mostrarOrSug && origenSugerencias.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 200, background: '#1C1C28', border: '1px solid #2A2A3E', borderRadius: '10px', marginTop: '4px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.4)' }}>
                  {origenSugerencias.map((s, idx) => (
                    <div key={idx} onMouseDown={() => { setOrigen(s); setMostrarOrSug(false); }}
                      style={{ padding: '10px 14px', cursor: 'pointer', borderBottom: idx < origenSugerencias.length - 1 ? '1px solid #2A2A3E' : 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,0,0,0.08)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                      <Train size={12} color="#A0AEC0" /> {s}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SWAP BUTTON */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button type="button" onClick={handleSwap}
                style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  background: swapAnim ? 'rgba(212,0,0,0.2)' : '#1C1C28',
                  border: '1px solid #2A2A3E', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s',
                  transform: swapAnim ? 'rotate(180deg)' : 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#D40000'; e.currentTarget.style.background = 'rgba(212,0,0,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A3E'; e.currentTarget.style.background = '#1C1C28'; }}>
                <ArrowLeftRight size={14} color="#A0AEC0" />
              </button>
            </div>

            {/* DESTINO */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                🏁 Destino
              </label>
              <div style={{ display: 'flex', alignItems: 'center', background: '#121212', borderRadius: '10px', border: `1px solid ${destino ? '#D4000040' : '#2A2A3E'}`, padding: '10px 14px', gap: '10px', transition: 'border-color 0.2s' }}>
                <MapPin size={15} color="#D40000" />
                <input
                  type="text" placeholder="Estación de destino (ej. Observatorio)" value={destino}
                  onChange={e => { setDestino(e.target.value); setDestinoSugerencias(getSugerencias(e.target.value)); setMostrarDestSug(true); }}
                  onFocus={() => setMostrarDestSug(true)}
                  onBlur={() => setTimeout(() => setMostrarDestSug(false), 150)}
                  style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', color: '#fff', fontSize: '13px' }}
                />
                {destino && <button type="button" onClick={() => setDestino('')} style={{ background: 'none', border: 'none', color: '#4A5568', cursor: 'pointer', padding: 0 }}><X size={13} /></button>}
              </div>
              {mostrarDestSug && destinoSugerencias.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 200, background: '#1C1C28', border: '1px solid #2A2A3E', borderRadius: '10px', marginTop: '4px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.4)' }}>
                  {destinoSugerencias.map((s, idx) => (
                    <div key={idx} onMouseDown={() => { setDestino(s); setMostrarDestSug(false); }}
                      style={{ padding: '10px 14px', cursor: 'pointer', borderBottom: idx < destinoSugerencias.length - 1 ? '1px solid #2A2A3E' : 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,0,0,0.08)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                      <Train size={12} color="#A0AEC0" /> {s}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* OPTIONS ROW */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Preferencia</label>
                <select value={preferencia} onChange={e => setPreferencia(e.target.value)}
                  style={{ width: '100%', border: '1px solid #2A2A3E', borderRadius: '10px', padding: '9px 12px', background: '#121212', color: '#fff', fontSize: '12px', outline: 'none', cursor: 'pointer' }}>
                  <option value="rapido">Más rápido</option>
                  <option value="accesible">Accesible</option>
                  <option value="transbordos">Menos transbordos</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Hora de salida</label>
                <input type="time" value={hora} onChange={e => setHora(e.target.value)}
                  style={{ width: '100%', border: '1px solid #2A2A3E', borderRadius: '10px', padding: '9px 12px', background: '#121212', color: '#fff', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            <button type="submit" disabled={loading || !origen || !destino}
              style={{
                width: '100%', background: (!origen || !destino) ? '#1C1C28' : 'linear-gradient(135deg, #D40000 0%, #B50000 100%)',
                color: (!origen || !destino) ? '#4A5568' : '#fff', padding: '13px', borderRadius: '10px', border: 'none',
                fontWeight: '700', fontSize: '14px', cursor: (!origen || !destino) ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: (!origen || !destino) ? 'none' : '0 4px 16px rgba(212,0,0,0.35)', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (origen && destino) e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}>
              {loading ? <><div className="spin-anim" style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} /> Calculando ruta…</> : <><Search size={15} /> Planificar Viaje</>}
            </button>
          </form>
        </div>

        {/* SKELETON LOADER */}
        {loading && (
          <div style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[80, 60, 90, 50].map((w, i) => (
              <div key={i} style={{ height: '14px', borderRadius: '7px', background: 'linear-gradient(90deg, #1C1C28 25%, #252540 50%, #1C1C28 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', width: `${w}%` }} />
            ))}
          </div>
        )}

        {/* RUTAS POPULARES */}
        {!resultado && !loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={13} color="#A0AEC0" />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Rutas Populares Hoy</span>
            </div>
            {RUTAS_POPULARES.map((r, i) => (
              <div key={i} onClick={() => { setOrigen(r.or); setDestino(r.dest); }}
                style={{
                  background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '12px',
                  padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#D40000'; e.currentTarget.style.background = '#1E1E3A'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A3E'; e.currentTarget.style.background = '#1A1A2E'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {r.lineas.map(l => (
                      <span key={l} style={{ background: LINEA_COLORES[l] || '#333', color: '#fff', fontSize: '9px', fontWeight: 'bold', padding: '2px 5px', borderRadius: '3px' }}>{l}</span>
                    ))}
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.or}</span>
                  <ArrowRight size={11} color="#4A5568" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.dest}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: '#A0AEC0', flexShrink: 0, marginLeft: '8px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={10} /> {r.tiempo}</span>
                  <span style={{ fontWeight: 700, color: '#00843D' }}>{r.costo}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RESULTADO */}
        {resultado && resultado.success && !loading && (
          <div style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeInUp 0.4s ease' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #2A2A3E', paddingBottom: '14px' }}>
              <div>
                <div style={{ fontSize: '10px', color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={11} color="#00843D" /> Ruta Recomendada {lastUpdate && `· Actualizado ${lastUpdate}`}
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.3 }}>
                  {resultado.origen} <span style={{ color: '#D40000' }}>→</span> {resultado.destino}
                </h3>
              </div>
              <button onClick={handleShare}
                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 10px', background: copied ? 'rgba(0,132,61,0.15)' : '#1C1C28', border: `1px solid ${copied ? 'rgba(0,132,61,0.3)' : '#2A2A3E'}`, borderRadius: '8px', color: copied ? '#00843D' : '#A0AEC0', fontSize: '11px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 600 }}>
                {copied ? <><CheckCircle2 size={12} /> Copiado!</> : <><Share2 size={12} /> Compartir</>}
              </button>
            </div>

            {/* Metrics chips */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
              {[
                { label: 'Tiempo total', value: resultado.tiempo, color: '#D40000', icon: Clock },
                { label: 'Transbordos', value: `${resultado.transbordos}`, color: '#F5A623', icon: ArrowLeftRight },
                { label: 'Costo aprox.', value: `$${resultado.costo?.toFixed(2)}`, color: '#00843D', icon: Coins },
              ].map((m, i) => (
                <div key={i} style={{ background: '#121212', borderRadius: '10px', padding: '10px 12px', textAlign: 'center', border: '1px solid #2A2A3E' }}>
                  <div style={{ fontSize: '16px', marginBottom: '4px', display: 'flex', justifyContent: 'center' }}>
                    <m.icon size={16} color={m.color} />
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: m.color }}>{m.value}</div>
                  <div style={{ fontSize: '10px', color: '#A0AEC0' }}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div style={{ position: 'relative', paddingLeft: '22px', borderLeft: '2px dashed #2A2A3E', marginLeft: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {resultado.pasos.map((p: any, idx: number) => {
                const lineColor = LINEA_COLORES[p.linea] || '#D40000';
                const isTransbordo = p.modo === 'transbordo';
                return (
                  <div key={idx} style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute', left: '-29px', top: '4px',
                      width: '12px', height: '12px', borderRadius: '50%',
                      backgroundColor: isTransbordo ? '#F5A623' : lineColor,
                      border: '2px solid #1A1A2E', boxShadow: `0 0 0 2px ${isTransbordo ? '#F5A62340' : lineColor + '40'}`,
                    }} />
                    {isTransbordo ? (
                      <div style={{ background: 'rgba(245,166,35,0.07)', border: '1px solid rgba(245,166,35,0.18)', borderRadius: '10px', padding: '10px 14px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#F5A623', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Zap size={12} /> Transbordo de Línea
                        </div>
                        <div style={{ fontSize: '11px', color: '#A0AEC0', marginTop: '3px' }}>{p.descripcion}</div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ background: lineColor, color: '#fff', fontSize: '10px', fontWeight: 'bold', padding: '2px 7px', borderRadius: '4px', boxShadow: `0 2px 8px ${lineColor}50` }}>{p.linea}</span>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Dirección {p.hasta}</span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#A0AEC0', lineHeight: 1.5 }}>{p.descripcion}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ERROR */}
        {resultado && !resultado.success && !loading && (
          <div style={{ background: 'rgba(212,0,0,0.06)', border: '1px solid rgba(212,0,0,0.2)', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <AlertTriangle size={18} color="#D40000" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#D40000' }}>No se encontró ruta</div>
              <div style={{ fontSize: '12px', color: '#A0AEC0', marginTop: '4px' }}>Verifica que los nombres de las estaciones sean correctos o intenta con una ruta alternativa.</div>
            </div>
          </div>
        )}
      </div>

      {/* MAPA */}
      <div style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '16px', overflow: 'hidden', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
        <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
        {/* Overlay */}
        <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 1000, background: 'rgba(13,13,13,0.88)', backdropFilter: 'blur(10px)', border: '1px solid #2A2A3E', borderRadius: '10px', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'none' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00843D', boxShadow: '0 0 8px #00843D' }} />
          <span style={{ fontSize: '11px', fontWeight: '600', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Mapa en Vivo · CDMX</span>
        </div>
        {resultado && resultado.success && (
          <div style={{ position: 'absolute', bottom: '14px', left: '14px', zIndex: 1000, background: 'rgba(13,13,13,0.88)', backdropFilter: 'blur(10px)', border: '1px solid rgba(212,0,0,0.3)', borderRadius: '10px', padding: '8px 14px', pointerEvents: 'none' }}>
            <div style={{ fontSize: '10px', color: '#A0AEC0', marginBottom: '2px' }}>Ruta activa</div>
            <div style={{ fontSize: '12px', color: '#fff', fontWeight: 600 }}>{resultado.origen} → {resultado.destino}</div>
          </div>
        )}
      </div>
    </div>
  );
};
