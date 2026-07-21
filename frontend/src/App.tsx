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
import { modulosPorModo, type Modo } from './besco/bescoData';
import { brandingConfig } from './config/branding';

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

function App() {
  const [modo, setModo] = useState<Modo>('cliente');
  const [adminAuth, setAdminAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedSellerName, setSelectedSellerName] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { colores, temas } = brandingConfig;

  const tema = modo === 'admin' ? temas.admin : temas.cliente;
  const selectSection = (s: string) => { setActiveSection(s); setDrawerOpen(false); };

  const irARendimientoVendedor = (sellerName?: string) => {
    setSelectedSellerName(sellerName || null);
    setActiveSection('rendimiento-vendedores');
    setDrawerOpen(false);
  };

  const irCliente = () => { setModo('cliente'); setActiveSection('dashboard'); };
  const irAdmin = () => {
    if (adminAuth) { setModo('admin'); setActiveSection('dashboard'); }
    else setShowLogin(true);
  };
  const loginOk = () => { setAdminAuth(true); setShowLogin(false); setModo('admin'); setActiveSection('dashboard'); };

  const moduloActivo = modulosPorModo(modo).find(m => m.id === activeSection);
  const getTitulo = () => activeSection === 'dashboard' ? 'Dashboard General' : (moduloActivo?.titulo ?? 'Dashboard');

  const renderContent = () => {
    if (activeSection === 'dashboard') return <BescoDashboard modo={modo} tema={tema} onOpen={selectSection} />;
    if (activeSection === 'pisos') return <ControladorPisos tema={tema} />;
    if (activeSection === 'abastecimiento') return <AbastecimientoInteligente tema={tema} modo={modo} onNavigateToRendimiento={irARendimientoVendedor} />;
    if (activeSection === 'rendimiento-vendedores') return <RendimientoVendedores tema={tema} modo={modo} initialSelectedSellerName={selectedSellerName} />;
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

export default App;
