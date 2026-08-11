import React, { useState, useEffect } from 'react';
import { Package, Truck, Sparkles, MapPin, CheckCircle, FileText, X, ChevronRight, Download, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { brandingConfig } from '../../../config/branding';

const { colores } = brandingConfig;
const tema = {
  acento: '#DC2626',
  acentoOscuro: '#991B1B',
  acentoSuave: '#FEE2E2',
  sobreAcento: '#FFFFFF',
};

const mockDataChart = [
  { mes: 'Ene', ordenes: 120, costo: 450000 },
  { mes: 'Feb', ordenes: 132, costo: 510000 },
  { mes: 'Mar', ordenes: 101, costo: 390000 },
  { mes: 'Abr', ordenes: 145, costo: 590000 },
  { mes: 'May', ordenes: 160, costo: 640000 },
  { mes: 'Jun', ordenes: 152, costo: 610000 },
];

const mockPOs = [
  { id: 'PO-2023-001', proveedor: 'TechCorp SA', monto: 125000, fecha: '2023-10-01', estado: 'Emitida', step: 1 },
  { id: 'PO-2023-002', proveedor: 'Global Supplies', monto: 45000, fecha: '2023-10-02', estado: 'En Tránsito GPS', step: 4 },
  { id: 'PO-2023-003', proveedor: 'Industrias Alfa', monto: 89000, fecha: '2023-10-03', estado: 'En Almacén', step: 3 },
  { id: 'PO-2023-004', proveedor: 'Sistemas Beta', monto: 210000, fecha: '2023-10-04', estado: 'Proveedor Confirmó', step: 2 },
  { id: 'PO-2023-005', proveedor: 'Logística Omega', monto: 34000, fecha: '2023-10-05', estado: 'Entregada', step: 5 },
  { id: 'PO-2023-006', proveedor: 'Materiales Zeta', monto: 76000, fecha: '2023-10-06', estado: 'En Tránsito GPS', step: 4 },
  { id: 'PO-2023-007', proveedor: 'Servicios Gamma', monto: 112000, fecha: '2023-10-07', estado: 'En Almacén', step: 3 },
  { id: 'PO-2023-008', proveedor: 'TechCorp SA', monto: 54000, fecha: '2023-10-08', estado: 'Proveedor Confirmó', step: 2 },
];

const steps = ['Emitida', 'Proveedor Confirmó', 'En Almacén', 'En Tránsito GPS', 'Entregada'];

const useAnimations = () => {
  useEffect(() => {
    const id = 'module-animations-compras-ordenes';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.1); } }
      @keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
    `;
    document.head.appendChild(style);
  }, []);
};

export const OrdenesCompra: React.FC = () => {
  useAnimations();
  const [selectedPO, setSelectedPO] = useState(mockPOs[1]);
  const [previewModal, setPreviewModal] = useState<any>(null);

  return (
    <div style={{ maxWidth: 1200, display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 0', animation: 'fadeSlideUp 0.6s ease-out' }}>
      
      {/* HEADER */}
      <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 24, display: 'flex', alignItems: 'center', gap: 24, border: `1px solid ${colores.borde}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: `linear-gradient(to bottom, ${tema.acento}, ${tema.acentoOscuro})` }} />
        <div style={{ width: 64, height: 64, borderRadius: 16, background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tema.sobreAcento }}>
          <Package size={32} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 style={{ margin: 0, fontSize: 28, color: colores.textoClaro }}>Órdenes de Compra</h1>
            <span style={{ background: `${colores.exito}20`, color: colores.exito, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Activity size={14} /> EN VIVO
            </span>
          </div>
          <p style={{ margin: '8px 0 0 0', color: colores.textoMedio, fontSize: 16 }}>Rastreo logístico y gestión inteligente de compras corporativas.</p>
        </div>
      </div>

      {/* AI FREIGHT GROUPING */}
      <div style={{ background: `linear-gradient(110deg, ${tema.acento}08 0%, ${colores.fondoPrincipal} 60%)`, borderRadius: 20, padding: 24, border: `1px solid ${colores.borde}`, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ background: tema.acentoSuave, padding: 8, borderRadius: 12, color: tema.acento }}>
            <Sparkles size={20} />
          </div>
          <h3 style={{ margin: 0, color: colores.textoClaro, fontSize: 18 }}>Insight de MAYIA · IA</h3>
        </div>
        <p style={{ margin: '0 0 16px 0', color: colores.textoMedio, fontSize: 15, lineHeight: 1.5 }}>
          Se ha detectado una oportunidad de consolidación de carga. Las órdenes <strong>PO-2023-006</strong> y <strong>PO-2023-007</strong> provienen de la misma región (Nuevo León) con fechas de entrega similares.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: colores.fondoSecundario, padding: 16, borderRadius: 12, border: `1px solid ${colores.borde}` }}>
          <Truck size={24} color={colores.exito} />
          <div>
            <div style={{ fontSize: 14, color: colores.textoMedio }}>Ahorro potencial en flete:</div>
            <div style={{ fontSize: 20, fontWeight: 'bold', color: colores.exito }}>$14,500 MXN</div>
          </div>
          <button style={{ marginLeft: 'auto', background: tema.acento, color: tema.sobreAcento, border: 'none', padding: '8px 16px', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}>
            Consolidar Envíos
          </button>
        </div>
      </div>

      {/* LIVE LOGISTICS TRACKING STEPPER */}
      <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 24, border: `1px solid ${colores.borde}` }}>
        <h3 style={{ margin: '0 0 24px 0', color: colores.textoClaro, fontSize: 18 }}>Rastreo Logístico en Tiempo Real: {selectedPO.id}</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', margin: '0 20px' }}>
          <div style={{ position: 'absolute', top: 16, left: 0, right: 0, height: 4, background: colores.fondoTerciario, zIndex: 0 }} />
          <div style={{ position: 'absolute', top: 16, left: 0, width: `${(selectedPO.step - 1) * 25}%`, height: 4, background: tema.acento, zIndex: 0, transition: 'width 0.5s ease-out' }} />
          
          {steps.map((stepName, i) => {
            const isCompleted = i + 1 < selectedPO.step;
            const isCurrent = i + 1 === selectedPO.step;
            const isPending = i + 1 > selectedPO.step;
            
            return (
              <div key={stepName} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, zIndex: 1, width: 100 }}>
                <div style={{ 
                  width: 36, height: 36, borderRadius: 18, 
                  background: isCompleted ? tema.acento : isCurrent ? colores.fondoPrincipal : colores.fondoTerciario,
                  border: `4px solid ${isCurrent ? tema.acento : isCompleted ? tema.acento : colores.borde}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isCompleted ? tema.sobreAcento : isCurrent ? tema.acento : colores.textoOscuro,
                  animation: isCurrent ? 'pulse 2s infinite' : 'none',
                  transition: 'all 0.3s'
                }}>
                  {isCompleted ? <CheckCircle size={18} /> : isCurrent ? <MapPin size={18} /> : i + 1}
                </div>
                <div style={{ fontSize: 13, fontWeight: isCurrent ? 'bold' : 'normal', color: isCurrent ? tema.acento : colores.textoMedio, textAlign: 'center', lineHeight: 1.2 }}>
                  {stepName}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* DATA TABLE */}
        <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 24, border: `1px solid ${colores.borde}`, overflow: 'auto', maxHeight: 400 }}>
          <h3 style={{ margin: '0 0 16px 0', color: colores.textoClaro }}>Órdenes Recientes</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${colores.borde}`, color: colores.textoOscuro, fontSize: 12, textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 8px' }}>ID / Proveedor</th>
                <th style={{ padding: '12px 8px' }}>Monto</th>
                <th style={{ padding: '12px 8px' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {mockPOs.map((po, idx) => (
                <tr 
                  key={po.id} 
                  onClick={() => { setSelectedPO(po); setPreviewModal(po); }}
                  style={{ 
                    borderBottom: `1px solid ${colores.fondoTerciario}`, cursor: 'pointer', transition: 'background 0.2s',
                    background: selectedPO.id === po.id ? colores.fondoSecundario : 'transparent',
                    animation: `fadeSlideUp 0.4s ease-out ${idx * 0.05}s both`
                  }}
                >
                  <td style={{ padding: '12px 8px' }}>
                    <div style={{ fontWeight: 'bold', color: colores.textoClaro, fontSize: 14 }}>{po.id}</div>
                    <div style={{ color: colores.textoMedio, fontSize: 12 }}>{po.proveedor}</div>
                  </td>
                  <td style={{ padding: '12px 8px', fontWeight: 'bold', color: colores.textoMedio }}>
                    ${po.monto.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px 8px' }}>
                    <span style={{ 
                      background: po.step === 5 ? `${colores.exito}20` : po.step === 4 ? `${tema.acento}20` : colores.fondoTerciario,
                      color: po.step === 5 ? colores.exito : po.step === 4 ? tema.acento : colores.textoMedio,
                      padding: '4px 8px', borderRadius: 12, fontSize: 12, fontWeight: 'bold'
                    }}>
                      {po.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CHART */}
        <div style={{ background: colores.fondoPrincipal, borderRadius: 20, padding: 24, border: `1px solid ${colores.borde}` }}>
          <h3 style={{ margin: '0 0 16px 0', color: colores.textoClaro }}>Tendencia de Gastos (MXN)</h3>
          <div style={{ height: 300, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockDataChart}>
                <defs>
                  <linearGradient id="colorCosto" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={tema.acento} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={tema.acento} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colores.fondoTerciario} />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{fill: colores.textoOscuro, fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: colores.textoOscuro, fontSize: 12}} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: 12, border: `1px solid ${colores.borde}`, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value?: number) => [`$${(value ?? 0).toLocaleString()}`, 'Costo']}
                />
                <Area type="monotone" dataKey="costo" stroke={tema.acento} strokeWidth={3} fillOpacity={1} fill="url(#colorCosto)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* MODAL PREVIEW */}
      {previewModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeSlideUp 0.3s ease-out' }}>
          <div style={{ background: colores.fondoPrincipal, width: 600, borderRadius: 20, overflow: 'hidden', border: `1px solid ${colores.borde}`, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 24, borderBottom: `1px solid ${colores.borde}`, background: colores.fondoSecundario }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <FileText size={24} color={tema.acento} />
                <h2 style={{ margin: 0, fontSize: 20 }}>Vista Previa PO: {previewModal.id}</h2>
              </div>
              <button onClick={() => setPreviewModal(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: colores.textoMedio }}><X size={24} /></button>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 12, color: colores.textoOscuro, textTransform: 'uppercase', marginBottom: 4 }}>Proveedor</div>
                  <div style={{ fontWeight: 'bold', fontSize: 16 }}>{previewModal.proveedor}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: colores.textoOscuro, textTransform: 'uppercase', marginBottom: 4 }}>Fecha de Emisión</div>
                  <div style={{ fontWeight: 'bold', fontSize: 16 }}>{previewModal.fecha}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: colores.textoOscuro, textTransform: 'uppercase', marginBottom: 4 }}>Monto Total</div>
                  <div style={{ fontWeight: 'bold', fontSize: 24, color: tema.acento }}>${previewModal.monto.toLocaleString()} MXN</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: colores.textoOscuro, textTransform: 'uppercase', marginBottom: 4 }}>Estado Actual</div>
                  <div style={{ fontWeight: 'bold', fontSize: 16 }}>{previewModal.estado}</div>
                </div>
              </div>
              <div style={{ background: colores.fondoTerciario, padding: 16, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: colores.textoOscuro, border: `1px dashed ${colores.borde}` }}>
                [Simulación de Documento PDF de la Orden de Compra]
              </div>
            </div>
            <div style={{ padding: '16px 24px', background: colores.fondoSecundario, borderTop: `1px solid ${colores.borde}`, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button onClick={() => setPreviewModal(null)} style={{ padding: '8px 16px', background: 'transparent', border: `1px solid ${colores.borde}`, borderRadius: 8, cursor: 'pointer', fontWeight: 'bold' }}>Cerrar</button>
              <button style={{ padding: '8px 16px', background: tema.acento, color: tema.sobreAcento, border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 8 }}><Download size={16} /> Descargar PDF</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
