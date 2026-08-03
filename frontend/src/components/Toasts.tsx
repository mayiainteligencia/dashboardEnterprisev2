import React, { useState, useEffect } from 'react';
import { AlertTriangle, CloudRain, PackageX, Thermometer, Syringe, Truck, Pill, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { brandingConfig } from '../config/branding';

export interface Alerta {
  id: number;
  icono: LucideIcon;
  tipo: 'peligro' | 'advertencia' | 'exito' | 'info';
  titulo: string;
  texto: string;
  ts: number;
  leida: boolean;
}

// ponytail: alertas simuladas en duro; cambiar por fetch al backend cuando exista el endpoint
const ALERTAS = [
  { icono: PackageX,      tipo: 'peligro',     titulo: 'Quiebre de stock',  texto: 'Paracetamol 500mg agotado en 12 sucursales del Valle de México.' },
  { icono: Thermometer,   tipo: 'advertencia', titulo: 'Cadena de frío',    texto: 'Refrigerador de vacunas en Sucursal Norte a 9°C, fuera de rango.' },
  { icono: CloudRain,     tipo: 'advertencia', titulo: 'Clima',             texto: 'Frente frío en el norte: se anticipa alza en antigripales y jarabes.' },
  { icono: Syringe,       tipo: 'peligro',     titulo: 'Epidemiología',     texto: 'Repunte de casos respiratorios en 4 estados. Reforzar inventario.' },
  { icono: Truck,         tipo: 'info',        titulo: 'Abastecimiento',    texto: 'Pedido de reabasto retrasado 6h por bloqueo carretero en Puebla.' },
  { icono: Pill,          tipo: 'advertencia', titulo: 'Caducidad',         texto: '340 piezas de antibióticos caducan en menos de 30 días.' },
  { icono: TrendingUp,    tipo: 'exito',       titulo: 'Demanda',           texto: 'Categoría dermatológicos +18% esta semana por ola de calor.' },
  { icono: AlertTriangle, tipo: 'peligro',     titulo: 'Receta controlada', texto: '3 recetas de medicamento controlado pendientes de validación.' },
] as const;

const INTERVALO_MS = 15000;
const DURACION_MS = 6000;

export const colorAlerta = (tipo: Alerta['tipo']) => {
  const { colores } = brandingConfig;
  return tipo === 'peligro' ? colores.peligro
    : tipo === 'advertencia' ? colores.advertencia
    : tipo === 'exito' ? colores.exito
    : colores.primario;
};

export const tiempoRelativo = (ts: number) => {
  const min = Math.floor((Date.now() - ts) / 60000);
  if (min < 1) return 'Ahora';
  if (min < 60) return `Hace ${min} min`;
  return `Hace ${Math.floor(min / 60)} h`;
};

/** Genera alertas nuevas cada INTERVALO_MS. Las acumula (más reciente primero). */
export const useAlertas = () => {
  const [alertas, setAlertas] = useState<Alerta[]>([]);

  useEffect(() => {
    let i = 0;
    const emitir = () => {
      const base = ALERTAS[i++ % ALERTAS.length];
      setAlertas(prev => [{ ...base, id: Date.now() + i, ts: Date.now(), leida: false }, ...prev]);
    };
    const primero = setTimeout(emitir, 4000);
    const timer = setInterval(emitir, INTERVALO_MS);
    return () => { clearTimeout(primero); clearInterval(timer); };
  }, []);

  return [alertas, setAlertas] as const;
};

export const Toasts: React.FC<{ alertas: Alerta[] }> = ({ alertas }) => {
  const { colores } = brandingConfig;
  const [visibles, setVisibles] = useState<number[]>([]);
  const ultima = alertas[0];

  useEffect(() => {
    if (!ultima) return;
    setVisibles(v => [...v, ultima.id]);
    const t = setTimeout(() => setVisibles(v => v.filter(x => x !== ultima.id)), DURACION_MS);
    return () => clearTimeout(t);
  }, [ultima]);

  return (
    <div style={{
      position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
      display: 'flex', flexDirection: 'column-reverse', gap: '12px',
      maxWidth: 'calc(100vw - 32px)', pointerEvents: 'none',
    }}>
      {alertas.filter(a => visibles.includes(a.id)).map(a => {
        const Icono = a.icono;
        const color = colorAlerta(a.tipo);
        return (
          <div key={a.id} onClick={() => setVisibles(v => v.filter(x => x !== a.id))}
            style={{
              pointerEvents: 'auto', cursor: 'pointer',
              display: 'flex', gap: '12px', alignItems: 'flex-start',
              width: '340px', maxWidth: '100%',
              background: colores.fondoClaro, border: `1px solid ${colores.borde}`,
              borderLeft: `4px solid ${color}`, borderRadius: '12px',
              padding: '14px 16px', boxShadow: colores.sombraGrande,
              animation: 'toastIn 0.3s ease-out',
            }}>
            <Icono size={20} color={color} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: colores.textoClaro, marginBottom: '2px' }}>{a.titulo}</div>
              <div style={{ fontSize: '12px', color: colores.textoMedio, lineHeight: 1.4 }}>{a.texto}</div>
            </div>
          </div>
        );
      })}
      <style>{`
        @keyframes toastIn { from { opacity: 0; transform: translate(24px, 12px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
};
