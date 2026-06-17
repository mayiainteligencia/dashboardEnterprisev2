import React, { useEffect, useMemo, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import { feature } from 'topojson-client';
import landTopo from 'world-atlas/countries-110m.json';
import { brandingConfig } from '../../../../config/branding';
import { hotspotsBase } from '../../../../mock/guardianMockData';
import type { HotSpot, Severidad } from '../../../../mock/guardianMockData';

// Países (GeoJSON empaquetado — sin red en runtime).
const countries = (feature(landTopo as any, (landTopo as any).objects.countries) as any).features;

let seq = 0;

// Puntos dentro del territorio mexicano (alerta cada 15s).
const mexicoSpots: Omit<HotSpot, 'id'>[] = [
  { lat: 19.43, lng: -99.13, severidad: 'critica', ciudad: 'CDMX' },
  { lat: 20.67, lng: -103.35, severidad: 'alta', ciudad: 'Guadalajara' },
  { lat: 25.69, lng: -100.32, severidad: 'critica', ciudad: 'Monterrey' },
  { lat: 32.51, lng: -117.04, severidad: 'alta', ciudad: 'Tijuana' },
  { lat: 21.16, lng: -86.85, severidad: 'media', ciudad: 'Cancún' },
  { lat: 19.04, lng: -98.21, severidad: 'media', ciudad: 'Puebla' },
  { lat: 20.97, lng: -89.62, severidad: 'alta', ciudad: 'Mérida' },
  { lat: 31.69, lng: -106.42, severidad: 'critica', ciudad: 'Ciudad Juárez' },
  { lat: 17.07, lng: -96.72, severidad: 'media', ciudad: 'Oaxaca' },
  { lat: 22.15, lng: -100.98, severidad: 'alta', ciudad: 'San Luis Potosí' },
  { lat: 19.18, lng: -96.14, severidad: 'media', ciudad: 'Veracruz' },
  { lat: 24.81, lng: -107.39, severidad: 'alta', ciudad: 'Culiacán' },
];

interface GuardianGlobeProps {
  height?: number;          // alto fijo; si se omite, responsivo (~0.85 del ancho)
  background?: string;      // fondo del contenedor del globo
  autoRotateSpeed?: number;
  onCount?: (n: number) => void;
  onSpotClick?: (s: HotSpot) => void;
}

export const GuardianGlobe: React.FC<GuardianGlobeProps> = ({
  height, background, autoRotateSpeed = 0.6, onCount, onSpotClick,
}) => {
  const { colores } = brandingConfig;
  const globeEl = useRef<any>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 320, h: height ?? 340 });

  const colorSev = (s: Severidad) =>
    s === 'critica' || s === 'alta' ? colores.peligro : s === 'media' ? colores.advertencia : colores.exito;

  const [spots, setSpots] = useState<HotSpot[]>(
    () => hotspotsBase.slice(0, 12).map((h) => ({ ...h, id: `hs-${seq++}` }))
  );
  const [aviso, setAviso] = useState<{ ciudad: string; sev: Severidad } | null>(null);

  useEffect(() => { onCount?.(spots.length); }, [spots.length, onCount]);

  // Hot-spots cada 2-4s.
  useEffect(() => {
    const id = setInterval(() => {
      setSpots((prev) => {
        const next = prev.length > 16 ? prev.slice(1) : prev;
        const base = hotspotsBase[Math.floor(Math.random() * hotspotsBase.length)];
        return [...next, { ...base, id: `hs-${seq++}` }];
      });
    }, 2000 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);

  // Alerta en México cada 15s, en distintas partes del territorio.
  useEffect(() => {
    const id = setInterval(() => {
      const mx = mexicoSpots[Math.floor(Math.random() * mexicoSpots.length)];
      setSpots((prev) => {
        const next = prev.length > 16 ? prev.slice(1) : prev;
        return [...next, { ...mx, id: `hs-${seq++}` }];
      });
      setAviso({ ciudad: mx.ciudad, sev: mx.severidad });
    }, 15000);
    return () => clearInterval(id);
  }, []);

  // Oculta el aviso tras 5s.
  useEffect(() => {
    if (!aviso) return;
    const t = setTimeout(() => setAviso(null), 5000);
    return () => clearTimeout(t);
  }, [aviso]);

  // Responsive.
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setSize({ w, h: height ?? Math.max(280, Math.min(420, w * 0.85)) });
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [height]);

  // Auto-rotación + home México.
  useEffect(() => {
    const g = globeEl.current;
    if (!g) return;
    const c = g.controls();
    c.autoRotate = true;
    c.autoRotateSpeed = autoRotateSpeed;
    c.enableZoom = false;
    g.pointOfView({ lat: 19, lng: -99, altitude: 2.3 }, 0);
  }, [autoRotateSpeed]);

  const globeMaterial = useMemo(
    () => new THREE.MeshPhongMaterial({ color: colores.primario, emissive: colores.primarioOscuro, emissiveIntensity: 0.25, shininess: 6 }),
    [colores.primario, colores.primarioOscuro]
  );

  const setRotate = (on: boolean) => {
    const c = globeEl.current?.controls();
    if (c) c.autoRotate = on;
  };

  const arcs = spots
    .filter((s) => s.severidad === 'critica' || s.severidad === 'alta')
    .map((s, i, arr) => {
      const next = arr[(i + 1) % arr.length];
      return next && next.id !== s.id
        ? { startLat: s.lat, startLng: s.lng, endLat: next.lat, endLng: next.lng }
        : null;
    })
    .filter(Boolean) as { startLat: number; startLng: number; endLat: number; endLng: number }[];

  return (
    <div ref={wrapRef}
      onMouseEnter={() => setRotate(false)}
      onMouseLeave={() => setRotate(true)}
      style={{
      position: 'relative', width: '100%', height: size.h, borderRadius: '14px',
      overflow: 'hidden', background: background ?? colores.gradienteSecundario,
      border: `1px solid ${colores.borde}40`,
    }}>
      <Globe
        ref={globeEl}
        width={size.w}
        height={size.h}
        backgroundColor="rgba(0,0,0,0)"
        globeMaterial={globeMaterial}
        showGraticules
        showAtmosphere
        atmosphereColor={colores.acento}
        atmosphereAltitude={0.18}
        hexPolygonsData={countries}
        hexPolygonResolution={3}
        hexPolygonMargin={0.0}
        hexPolygonAltitude={0.012}
        hexPolygonColor={() => `${colores.primarioClaro}aa`}
        pointsData={spots}
        pointLat="lat"
        pointLng="lng"
        pointColor={(d: any) => colorSev(d.severidad)}
        pointAltitude={0.04}
        pointRadius={1.1}
        pointsMerge={false}
        pointLabel={(d: any) => `${d.ciudad} — ${d.severidad}`}
        onPointClick={(p: any) => onSpotClick?.(p as HotSpot)}
        ringsData={spots}
        ringLat="lat"
        ringLng="lng"
        ringColor={(d: any) => () => colorSev(d.severidad)}
        ringMaxRadius={6}
        ringPropagationSpeed={2.5}
        ringRepeatPeriod={800}
        arcsData={arcs}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor={() => colores.peligro}
        arcStroke={0.4}
        arcDashLength={0.5}
        arcDashGap={0.3}
        arcDashAnimateTime={1800}
      />

      {aviso && (
        <div style={{
          position: 'absolute', top: '14px', right: '14px', zIndex: 5,
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '10px 14px', borderRadius: '12px',
          background: 'rgba(15,23,42,0.82)', backdropFilter: 'blur(6px)',
          border: `1px solid ${colorSev(aviso.sev)}80`,
          boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
          animation: 'gd-slide-in 0.3s ease',
        }}>
          <span style={{
            width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0,
            background: colorSev(aviso.sev), boxShadow: `0 0 8px ${colorSev(aviso.sev)}`,
            animation: 'gd-blink 1s ease infinite',
          }} />
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '0.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>
              Nueva alerta
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
              {aviso.ciudad}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes gd-slide-in { from { opacity: 0; transform: translateX(20px) } to { opacity: 1; transform: translateX(0) } }
        @keyframes gd-blink { 0%,100% { opacity: 1 } 50% { opacity: 0.3 } }
      `}</style>
    </div>
  );
};
