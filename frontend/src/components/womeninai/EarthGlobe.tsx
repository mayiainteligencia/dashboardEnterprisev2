import React, { useEffect, useState, useRef } from 'react';
import Globe from 'react-globe.gl';
import type { GlobeMethods } from 'react-globe.gl';

// Tipo para una feature GeoJSON (simplificado)
interface CountryFeature {
  type: 'Feature';
  properties: Record<string, unknown>;
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][][];
  };
}

interface EarthGlobeProps {
  width?: number;
  height?: number;
}

// Coordenadas de los hubs globales
const MEXICO_LAT = 23.6345;
const MEXICO_LNG = -102.5528;

// Arcos de conexión desde México a centros globales de IA
const ARCS_DATA = [
  { startLat: MEXICO_LAT, startLng: MEXICO_LNG, endLat: 48.8566, endLng: 2.3522, name: 'México ➔ París (WAI HQ)' },
  { startLat: MEXICO_LAT, startLng: MEXICO_LNG, endLat: 37.7749, endLng: -122.4194, name: 'México ➔ Silicon Valley' },
  { startLat: MEXICO_LAT, startLng: MEXICO_LNG, endLat: 43.6532, endLng: -79.3832, name: 'México ➔ Toronto AI Hub' },
  { startLat: MEXICO_LAT, startLng: MEXICO_LNG, endLat: 35.6762, endLng: 139.6503, name: 'México ➔ Tokyo AI Center' },
  { startLat: MEXICO_LAT, startLng: MEXICO_LNG, endLat: 51.5074, endLng: -0.1278, name: 'México ➔ London Tech Hub' },
  { startLat: MEXICO_LAT, startLng: MEXICO_LNG, endLat: -33.8688, endLng: 151.2093, name: 'México ➔ Sydney AI Lab' }
];

// Puntos de interés (Nodos de IA)
const POINTS_DATA = [
  { lat: MEXICO_LAT, lng: MEXICO_LNG, name: 'México Hub (Centro de Conexión)', color: '#FF4081', size: 0.8 },
  { lat: 48.8566, lng: 2.3522, name: 'París (Sede Global WAI)', color: '#D4AF37', size: 0.5 },
  { lat: 37.7749, lng: -122.4194, name: 'Silicon Valley AI', color: '#D4AF37', size: 0.5 },
  { lat: 43.6532, lng: -79.3832, name: 'Toronto AI Hub', color: '#D4AF37', size: 0.5 },
  { lat: 35.6762, lng: 139.6503, name: 'Tokyo AI Center', color: '#D4AF37', size: 0.5 },
  { lat: 51.5074, lng: -0.1278, name: 'London Tech Hub', color: '#D4AF37', size: 0.5 },
  { lat: -33.8688, lng: 151.2093, name: 'Sydney AI Lab', color: '#D4AF37', size: 0.5 }
];

// Anillo pulsante en México para dar destellos
const RINGS_DATA = [
  { lat: MEXICO_LAT, lng: MEXICO_LNG }
];

export const EarthGlobe: React.FC<EarthGlobeProps> = ({ width = 300, height = 300 }) => {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [countries, setCountries] = useState<CountryFeature[]>([]);

  useEffect(() => {
    // Dataset de países en formato GeoJSON (resolución 110m)
    fetch(
      'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'
    )
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.features);
      })
      .catch((err) => console.error('Error cargando países:', err));
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.8; // velocidad de rotación lenta
        controls.enableZoom = false;   // deshabilitar zoom
      }
      
      // Apuntar la cámara del globo directamente hacia México al cargar
      globeRef.current.pointOfView({ lat: 20, lng: -100, altitude: 2.1 }, 1400);
    }
  }, [countries]);

  return (
    <div style={{ width, height, position: 'relative', overflow: 'hidden' }}>
      <Globe
        ref={globeRef}
        // Textura base del planeta
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        
        // Polígonos de países
        polygonsData={countries}
        polygonCapColor={(feat) => {
          // Destacar a México en color más iluminado
          const name = (feat as CountryFeature).properties?.name;
          if (name === 'Mexico') {
            return 'rgba(255, 64, 129, 0.4)'; // Rosa WAI iluminado para México
          }
          return 'rgba(212, 175, 55, 0.18)'; // Dorado translúcido premium
        }}
        polygonSideColor={() => 'rgba(31, 73, 125, 0.25)'}
        polygonStrokeColor={(feat) => {
          const name = (feat as CountryFeature).properties?.name;
          if (name === 'Mexico') {
            return '#FF4081'; // Borde rosa para destacar México
          }
          return 'rgba(212, 175, 55, 0.45)';
        }}
        polygonAltitude={0.015}
        polygonsTransitionDuration={300}

        // Hilos de conexión (Arcos)
        arcsData={ARCS_DATA}
        arcStartLat={(d) => (d as typeof ARCS_DATA[0]).startLat}
        arcStartLng={(d) => (d as typeof ARCS_DATA[0]).startLng}
        arcEndLat={(d) => (d as typeof ARCS_DATA[0]).endLat}
        arcEndLng={(d) => (d as typeof ARCS_DATA[0]).endLng}
        // Gradiente de color en los arcos
        arcColor={() => ['rgba(255, 64, 129, 0.85)', 'rgba(212, 175, 55, 0.85)']}
        arcAltitude={0.35}
        arcStroke={0.7}
        // Animación de hilos (destellos que corren por los arcos)
        arcDashLength={0.4}
        arcDashGap={3}
        arcDashAnimateTime={1600}

        // Puntos de interés (Nodos de IA)
        pointsData={POINTS_DATA}
        pointColor={(d) => (d as typeof POINTS_DATA[0]).color}
        pointAltitude={0.02}
        pointRadius={(d) => (d as typeof POINTS_DATA[0]).size}
        pointLabel={(d) => (d as typeof POINTS_DATA[0]).name}

        // Anillos de ondas expansivas en México (Destello / Pulso)
        ringsData={RINGS_DATA}
        ringColor={() => (t: number) => `rgba(255, 64, 129, ${1 - t})`} // Rosa WAI pulsante
        ringMaxRadius={16}
        ringPropagationSpeed={3.5}
        ringRepeatPeriod={1400}

        // Fondo transparente para integrar en el layout
        backgroundColor="rgba(0,0,0,0)"
        width={width}
        height={height}
        
        // Atmósfera difusa dorada
        atmosphereColor="#D4AF37"
        atmosphereAltitude={0.16}
      />
    </div>
  );
};

export default EarthGlobe;
