# Dashboard MAYIA escucha — Frontend

Stack: React 19 + Vite 7 + TypeScript · recharts · lucide-react · estilos inline con tokens de `src/config/branding.ts`.

Routing: `src/App.tsx` con `useState('activeSection')` + `switch` (sin react-router). El menú vive en `src/components/Sidebar.tsx` (desktop) y `src/components/ResponsiveLayout.tsx` (bottom nav móvil) — **ambas listas se mantienen sincronizadas a mano**.

Backends vía proxy de Vite (`vite.config.ts`): `/api/monitor` → Python `:8001`, `/api` → `:3001`.

---

## Informe de cambios — rama `monitoria`

### 1. Limpieza de código muerto (26 archivos eliminados)
Se borraron componentes y módulos que no eran alcanzables desde ningún menú:
- **Departamentos**: RecursosHumanos, FinanzasContabilidad, Operaciones, VentasMarketing, TecnologiasInformacion, Administracion, Analiticos.
- **sideBarR** + sus módulos: ReclutamientoList, CapacitacionStatus.
- **Módulos huérfanos**: DashboardEjecutivo, DashboardEpidemiologico, DashboardAbastecimiento, MapaCalorEstados, PanelKPIs, ClustersSegmentacion, AbastecimientoModule, Alertaempresa, ClusterModule, DashboardejecutivoModule, EpidemologiaModule, MapaCalorModule, Minicalendarcard.
- **Sin importadores**: carpeta `types/`, `utils/calendarUtils.ts`, `config/alertasConfig.ts`.

Quedó vivo: Dashboard + sus 9 cards, MonitorMedios, Ciberseguridad/Playground/Academia, Header (con AsistenteIAChat), Sidebar/ResponsiveLayout, branding.

### 2. Nueva sección: **Monitor IA** (`src/components/MonitorIA.tsx`)
Dashboard de presentación (datos **dummy**, la lógica/datos reales van después) con los 10 módulos adicionales solicitados para MVS, cada uno como "cuadrito":
1. Comercial — activación automática de campañas (Meta/Google)
2. Centros de procesos automatizados
3. Talento y programación (análisis de parrillas)
4. Inteligencia competitiva (share of voice)
5. Trending topics (radio + redes)
6. Hipersegmentación de audiencias
7. Portal para clientes (Brand Portal)
8. Integración con INRA y audiencia
9. Estrategia hacia 2027
10. Integración Web Services INRA

Cada card: icono numerado, badge de estado, 3 KPIs con tendencia, mini-visualización (área / barras / donut / gauge con recharts) y tiempo de desarrollo. **Sin precios** (indicación de Vero/CEO). Hero con 4 KPIs globales. Responsive (grid → 1 columna en móvil), animaciones de entrada/hover.

### 3. Nueva sección: **Inteligencia Electoral** (`src/components/InteligenciaElectoral.tsx`)
Desglose del anexo "Plataforma de Inteligencia Electoral 2027". Tema claro, datos **dummy**. Paneles:
- **Share of Voice** por candidato + **presencia por partido** (donut) + **evolución semanal** (multi-línea).
- **Sentimiento por candidato** (barras apiladas pos/neutral/neg) + **agenda temática**.
- **Narrativas emergentes** (con tendencia) + **correlación radio vs redes** (área comparada).
- **Monitoreo de discurso político** + **ranking de presencia mediática** por estación.

El panel **Monitoreo de discurso político** replica la mecánica de Monitor de Medios:
chips de **partidos predefinidos** (Morena, PAN, PRI, MC, PVEM, PT) que se encienden/apagan
para filtrar el feed en vivo ("escuchar sobre…"), con tarjetas estilo "testigos"
(borde de color por partido, badge, estación, hora, sentimiento, transcripción, chips de
candidato/tema). Datos en el array `FEED`; al conectar el backend real se reemplaza ese array.

### Menú resultante
Dashboard General · Monitor de Medios · Monitor IA · Inteligencia Electoral
(+ secciones extra: Ciberseguridad, Playground, Academia).

### Pendientes / notas
- Todo Monitor IA e Inteligencia Electoral es **dummy**; falta cablear datos/lógica reales.
- WebSocket de MonitorMedios sigue hardcoded a `ws://localhost:8001` (se rompe en prod).
- `menuItems` está duplicado entre Sidebar y ResponsiveLayout.
- Bundle ~735 kB (recharts); se puede lazy-load si hace falta.
