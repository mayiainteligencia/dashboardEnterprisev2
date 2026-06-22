import React from 'react';
import { Globe2 } from 'lucide-react';
import { MapaCalorEstados } from '../modules/MapaCalorEstados';
import { Shell, HeroKPI, badgeLive } from './paginasPro';

// Inteligencia Comercial: Geografía Comercial (mapa de México) con el estilo Pro.
export const VistaComercial: React.FC = () => (
  <Shell icon={Globe2} title="Inteligencia Comercial" subtitle="Geografía comercial · cobertura nacional" badge={badgeLive}
    kpis={<>
      <HeroKPI i={0} label="Leads totales" value="20,611" delta="12.8%" up accent="#CC0000" spark={[16, 17, 18, 19, 20, 20.6]} />
      <HeroKPI i={1} label="Ventas nacionales" value="2,681" delta="8.4%" up accent="#10B981" spark={[2.2, 2.3, 2.4, 2.5, 2.6, 2.68]} />
      <HeroKPI i={2} label="Conversión media" value="13.0%" delta="1.2 pts" up accent="#2563EB" />
      <HeroKPI i={3} label="Estados con cobertura" value="32" delta="100% país" up accent="#7C3AED" />
    </>}>
    <MapaCalorEstados />
  </Shell>
);
