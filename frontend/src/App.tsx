import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { BescoDashboard } from './besco/BescoDashboard';
import { ModuloBesco } from './besco/ModuloBesco';
import { ControladorPisos } from './besco/ControladorPisos';
import { AbastecimientoInteligente } from './besco/AbastecimientoInteligente';
import { RendimientoVendedores } from './besco/RendimientoVendedores';
import { ToastAlertas } from './besco/ToastAlertas';
import { modulosPorModo, modulosCompras, modulosFlotillas, modulosAdmin, modulosCliente, modulosDepartamentos, modulosEspeciales, type Modo } from './besco/bescoData';
import { Administracion } from './components/departamentos/Administracion';
import { FinanzasContabilidad } from './components/departamentos/FinanzasContabilidad';
import { Operaciones } from './components/departamentos/Operaciones';
import { RecursosHumanos } from './components/departamentos/RecursosHumanos';
import { TecnologiasInformacion } from './components/departamentos/TecnologiasInformacion';
import { VentasMarketing } from './components/departamentos/VentasMarketing';
import { Playground } from './components/departamentos/Playground';
import { Ciberseguridad } from './components/departamentos/Ciberseguridad';
import { Academia } from './components/departamentos/Academia';
import { CentroMonitoreo } from './components/departamentos/CentroMonitoreo';
import { MesaAyuda } from './components/departamentos/MesaAyuda';

// Módulos Compras
import { Requisiciones } from './components/modules/compras/Requisiciones';
import { Proveedores } from './components/modules/compras/Proveedores';
import { Cotizaciones } from './components/modules/compras/Cotizaciones';
import { Inventario } from './components/modules/compras/Inventario';
import { Aprobaciones } from './components/modules/compras/Aprobaciones';
import { Presupuesto } from './components/modules/compras/Presupuesto';
import { OrdenesCompra } from './components/modules/compras/OrdenesCompra';
import { ImpactoSLA } from './components/modules/compras/ImpactoSLA';
import { Auditoria } from './components/modules/compras/Auditoria';

// Módulos Flotillas
import { FleetCommand } from './components/modules/flotillas/FleetCommand';
import { FleetRutas } from './components/modules/flotillas/FleetRutas';
import { FleetMantenimiento } from './components/modules/flotillas/FleetMantenimiento';
import { FleetSpeed } from './components/modules/flotillas/FleetSpeed';
import { FleetPolizas } from './components/modules/flotillas/FleetPolizas';
import { FleetGasto } from './components/modules/flotillas/FleetGasto';
import { FleetSupervisor } from './components/modules/flotillas/FleetSupervisor';
import { FleetAuditor } from './components/modules/flotillas/FleetAuditor';
import { FleetSLA } from './components/modules/flotillas/FleetSLA';

// Módulos Edificios & Nuevos Negocios
import { CCTVInteligente } from './components/modules/edificios/CCTVInteligente';
import { DeteccionEmergencias } from './components/modules/edificios/DeteccionEmergencias';
import { BuildingHealth } from './components/modules/edificios/BuildingHealth';
import { HVACPredictivo } from './components/modules/edificios/HVACPredictivo';
import { EnergyRisk } from './components/modules/edificios/EnergyRisk';
import { ReporteEjecutivo } from './components/modules/edificios/ReporteEjecutivo';
import { FacilityPortal } from './components/modules/edificios/FacilityPortal';
import { UpsellScoring } from './components/modules/edificios/UpsellScoring';

import { brandingConfig } from './config/branding';
import { AIChatProvider, useAIChat } from './context/AIChatContext';

// Credenciales dummy del acceso admin
const ADMIN_USER = 'bescouser';
const ADMIN_PASS = 'mayiabesco';

// true cuando el ancho es de móvil/tablet
function useIsMobile(bp = 900) {
  const [m, setM] = useState(typeof window !== 'undefined' ? window.innerWidth <= bp : false);
  useEffect(() => {
    const f = () => setM(window.innerWidth <= bp);
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, [bp]);
  return m;
}

// ---------- Login modal (dummy) ----------
const LoginModal: React.FC<{ onClose: () => void; onOk: () => void }> = ({ onClose, onOk }) => {
  const { colores, temas } = brandingConfig;
  const tema = temas.admin;
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.trim() === ADMIN_USER && pass === ADMIN_PASS) onOk();
    else setError('Usuario o contraseña incorrectos.');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: '10px', fontSize: '15px',
    border: `1px solid ${colores.borde}`, outline: 'none', background: colores.fondoSecundario, color: colores.textoClaro,
  };

  return (
    <div onClick={onClose} role="dialog" aria-modal="true"
      style={{ position: 'fixed', inset: 0, zIndex: 5000, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <form onClick={e => e.stopPropagation()} onSubmit={submit}
        style={{ width: '100%', maxWidth: '380px', background: colores.fondoPrincipal, borderRadius: '18px', padding: '28px', boxShadow: colores.sombraGrande, position: 'relative' }}>
        <button type="button" aria-label="Cerrar" onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', border: 'none', background: 'transparent', cursor: 'pointer', color: colores.textoOscuro }}>
          <X size={20} />
        </button>
        <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: tema.acentoSuave, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
          <ShieldCheck size={26} color={tema.acentoOscuro} />
        </div>
        <h2 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: 700, color: colores.textoClaro }}>Acceso administrador</h2>
        <p style={{ margin: '0 0 20px', fontSize: '14px', color: colores.textoMedio }}>Operación interna de BESCO.</p>

        <label style={{ fontSize: '13px', fontWeight: 600, color: colores.textoMedio }}>Usuario</label>
        <input style={{ ...inputStyle, margin: '6px 0 14px' }} value={user} autoFocus
          onChange={e => { setUser(e.target.value); setError(''); }} placeholder="bescouser" autoComplete="username" />

        <label style={{ fontSize: '13px', fontWeight: 600, color: colores.textoMedio }}>Contraseña</label>
        <input style={{ ...inputStyle, margin: '6px 0 4px' }} type="password" value={pass}
          onChange={e => { setPass(e.target.value); setError(''); }} placeholder="••••••••" autoComplete="current-password" />

        {error && <p role="alert" style={{ color: colores.peligro, fontSize: '13px', margin: '8px 0 0' }}>{error}</p>}

        <button type="submit"
          style={{ width: '100%', marginTop: '20px', padding: '13px', borderRadius: '10px', border: 'none', cursor: 'pointer', background: tema.acento, color: tema.sobreAcento, fontSize: '15px', fontWeight: 700 }}>
          Entrar
        </button>
      </form>
    </div>
  );
};

function AppInner() {
  const [modo, setModo] = useState<Modo>('cliente');
  const [adminAuth, setAdminAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSellerName, setSelectedSellerName] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { colores, temas } = brandingConfig;
  const { setActiveSectionContext } = useAIChat();

  const tema = modo === 'admin' ? temas.admin : temas.cliente;
  const selectSection = (s: string) => { setActiveSection(s); setDrawerOpen(false); };

  const irARendimientoVendedor = (sellerName?: string) => {
    setSelectedSellerName(sellerName || null);
    selectSection('rendimiento-vendedores');
  };

  const irAdmin = () => {
    if (adminAuth) setModo('admin');
    else setShowLogin(true);
  };
  const irCliente = () => setModo('cliente');
  const loginOk = () => { setAdminAuth(true); setModo('admin'); setShowLogin(false); };

  const modulosArray = modulosPorModo(modo);
  const moduloActivo = modulosArray.find(m => m.id === activeSection);

  const getTitulo = () => {
    if (activeSection === 'dashboard') return 'Dashboard Enterprise';
    if (activeSection === 'controlador-pisos') return 'Controlador de Pisos';
    if (activeSection === 'abastecimiento-inteligente') return 'Abastecimiento Inteligente';
    if (activeSection === 'rendimiento-vendedores') return selectedSellerName ? `Rendimiento: ${selectedSellerName}` : 'Rendimiento por Vendedor';
    if (activeSection === 'asistente-ia-chat') return 'Asistente IA Chat';

    const todos = [...modulosCompras, ...modulosFlotillas, ...modulosAdmin, ...modulosCliente, ...modulosDepartamentos, ...modulosEspeciales];
    const enc = todos.find(m => m.id === activeSection);
    return enc ? enc.titulo : 'Dashboard Enterprise';
  };

  useEffect(() => {
    setActiveSectionContext(activeSection, getTitulo());
  }, [activeSection, modo]);

  const renderContent = () => {
    if (activeSection === 'dashboard') return <BescoDashboard modo={modo} tema={tema} onOpen={selectSection} />;
    if (activeSection === 'controlador-pisos') return <ControladorPisos tema={tema} />;
    if (activeSection === 'abastecimiento-inteligente') return <AbastecimientoInteligente tema={tema} modo={modo} onNavigateToRendimiento={irARendimientoVendedor} />;
    if (activeSection === 'rendimiento-vendedores') return <RendimientoVendedores tema={tema} modo={modo} initialSelectedSellerName={selectedSellerName} />;

    // Compras & Abastecimiento
    if (activeSection === 'requisiciones') return <Requisiciones />;
    if (activeSection === 'proveedores') return <Proveedores />;
    if (activeSection === 'cotizaciones') return <Cotizaciones />;
    if (activeSection === 'inventario') return <Inventario />;
    if (activeSection === 'aprobaciones') return <Aprobaciones />;
    if (activeSection === 'presupuesto') return <Presupuesto />;
    if (activeSection === 'ordenes-compra') return <OrdenesCompra />;
    if (activeSection === 'impacto-sla') return <ImpactoSLA />;
    if (activeSection === 'auditoria') return <Auditoria />;

    // Flotillas
    if (activeSection === 'fleet') return <FleetCommand />;
    if (activeSection === 'rutas') return <FleetRutas />;
    if (activeSection === 'mant-veh') return <FleetMantenimiento />;
    if (activeSection === 'driver-risk') return <FleetSpeed />;
    if (activeSection === 'polizas') return <FleetPolizas />;
    if (activeSection === 'gasto') return <FleetGasto />;
    if (activeSection === 'copiloto') return <FleetSupervisor />;
    if (activeSection === 'auditor') return <FleetAuditor />;
    if (activeSection === 'sla') return <FleetSLA />;

    // Edificios & Nuevos Negocios
    if (activeSection === 'cctv') return <CCTVInteligente />;
    if (activeSection === 'fuego') return <DeteccionEmergencias />;
    if (activeSection === 'health') return <BuildingHealth />;
    if (activeSection === 'hvac') return <HVACPredictivo />;
    if (activeSection === 'energy') return <EnergyRisk />;
    if (activeSection === 'reporte') return <ReporteEjecutivo />;
    if (activeSection === 'portal') return <FacilityPortal />;
    if (activeSection === 'upsell') return <UpsellScoring />;

    // Departamentos
    if (activeSection === 'dept-administracion') return <Administracion />;
    if (activeSection === 'dept-finanzas') return <FinanzasContabilidad />;
    if (activeSection === 'dept-operaciones') return <Operaciones />;
    if (activeSection === 'dept-rh') return <RecursosHumanos />;
    if (activeSection === 'dept-ti') return <TecnologiasInformacion />;
    if (activeSection === 'dept-ventas') return <VentasMarketing />;
    if (activeSection === 'dept-playground') return <Playground />;

    // Especiales / Capacitación & Seguridad
    if (activeSection === 'dept-ciberseguridad') return <Ciberseguridad />;
    if (activeSection === 'dept-academia') return <Academia />;
    if (activeSection === 'dept-monitoreo') return <CentroMonitoreo />;
    if (activeSection === 'dept-mesa-ayuda') return <MesaAyuda />;

    if (moduloActivo) return <ModuloBesco modulo={moduloActivo} tema={tema} />;
    return <BescoDashboard modo={modo} tema={tema} onOpen={selectSection} />;
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: colores.fondoPrincipal
      }}
    >
      {/* SIDEBAR — fijo en escritorio */}
      {!isMobile && (
        <div style={{ width: '240px', flexShrink: 0 }}>
          <Sidebar activeSection={activeSection} onSectionChange={selectSection} modo={modo} />
        </div>
      )}

      {/* SIDEBAR — drawer en móvil */}
      {isMobile && drawerOpen && (
        <div onClick={() => setDrawerOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 3000, background: 'rgba(0,0,0,0.45)', display: 'flex' }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '240px', height: '100%', boxShadow: '0 0 40px rgba(0,0,0,0.3)' }}>
            <Sidebar activeSection={activeSection} onSectionChange={selectSection} modo={modo} />
          </div>
        </div>
      )}

      {/* CONTENIDO */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Header */}
        <Header
          title={getTitulo()}
          onMenu={isMobile ? () => setDrawerOpen(true) : undefined}
          modo={modo}
          onCliente={irCliente}
          onAdmin={irAdmin}
        />

        {/* Main content */}
        <div className="no-scrollbar" style={{ flex: 1, overflow: 'auto', padding: 'clamp(14px, 3vw, 24px)' }}>
          {renderContent()}
        </div>
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onOk={loginOk} />}

      {/* Alertas al momento (toaster) — solo admin */}
      <ToastAlertas modo={modo} />
    </div>
  );
}

function App() {
  return (
    <AIChatProvider>
      <AppInner />
    </AIChatProvider>
  );
}

export default App;
