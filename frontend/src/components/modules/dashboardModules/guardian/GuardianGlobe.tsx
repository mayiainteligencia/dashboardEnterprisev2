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
    () => hotspotsBase.slice(0, 5).map((h) => ({ ...h, id: `hs-${seq++}` }))
  );

  useEffect(() => { onCount?.(spots.length); }, [spots.length, onCount]);

  // Hot-spots cada 2-4s.
  useEffect(() => {
    const id = setInterval(() => {
      setSpots((prev) => {
        const next = prev.length > 7 ? prev.slice(1) : prev;
        const base = hotspotsBase[Math.floor(Math.random() * hotspotsBase.length)];
        return [...next, { ...base, id: `hs-${seq++}` }];
      });
    }, 2000 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);

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
    <div ref={wrapRef} style={{
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
        pointAltitude={0.07}
        pointRadius={0.35}
        pointsMerge={false}
        pointLabel={(d: any) => `${d.ciudad} — ${d.severidad}`}
        onPointClick={(p: any) => onSpotClick?.(p as HotSpot)}
        ringsData={spots}
        ringLat="lat"
        ringLng="lng"
        ringColor={(d: any) => () => colorSev(d.severidad)}
        ringMaxRadius={4}
        ringPropagationSpeed={2}
        ringRepeatPeriod={900}
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
    </div>
  );
};
