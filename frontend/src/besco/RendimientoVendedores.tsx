import React, { useState, useEffect } from 'react';
import { 
  Trophy, TrendingUp, TrendingDown, DollarSign, Award, CheckCircle, 
  Clock, ShieldAlert, Star, Search, Filter, Eye, X, ChevronRight, UserCheck, Sparkles, AlertCircle
} from 'lucide-react';
import { brandingConfig, type TemaBesco } from '../config/branding';
import { 
  type Modo, 
  vendedoresRendimientoMock, 
  type VendedorRendimiento, 
  colorSeveridad 
} from './bescoData';

const { colores, ia } = brandingConfig;

export const RendimientoVendedores: React.FC<{ 
  tema: TemaBesco; 
  modo: Modo;
  initialSelectedSellerName?: string | null;
}> = ({ tema, initialSelectedSellerName }) => {
  const [vendedoresList] = useState<VendedorRendimiento[]>(vendedoresRendimientoMock);
  const [busqueda, setBusqueda] = useState('');
  const [filtroPeriodo, setFiltroPeriodo] = useState<'mes' | 'trimestre' | 'ano'>('mes');
  const [vendedorSeleccionado, setVendedorSeleccionado] = useState<VendedorRendimiento | null>(null);

  // Auto-seleccionar vendedor si viene desde Abastecimiento IA
  useEffect(() => {
    if (initialSelectedSellerName) {
      const found = vendedoresList.find(
        v => v.nombre.toLowerCase().includes(initialSelectedSellerName.toLowerCase()) ||
             v.id.toLowerCase() === initialSelectedSellerName.toLowerCase()
      );
      if (found) {
        setVendedorSeleccionado(found);
      }
    }
  }, [initialSelectedSellerName, vendedoresList]);


  // Totales financieros y operativos
  const gananciaTotal = vendedoresList.reduce((acc, v) => acc + v.gananciaGenerada, 0);
  const perdidaTotalEvitada = vendedoresList.reduce((acc, v) => acc + v.perdidaEvitada, 0);
  const perdidaTotalGenerada = vendedoresList.reduce((acc, v) => acc + v.perdidaGenerada, 0);
  const slaPromedio = (vendedoresList.reduce((acc, v) => acc + v.cumplimientoSLA, 0) / vendedoresList.length).toFixed(1);
  const casosSolucionadosTotales = vendedoresList.reduce((acc, v) => acc + v.casosSolucionados, 0);

  // Filtrado de vendedores
  const vendedoresFiltrados = vendedoresList.filter(v => {
    const query = busqueda.toLowerCase();
    return (
      v.nombre.toLowerCase().includes(query) ||
      v.rol.toLowerCase().includes(query) ||
      v.region.toLowerCase().includes(query)
    );
  }).sort((a, b) => a.posicionRanking - b.posicionRanking);

  // Top 3 del ranking
  const top1 = vendedoresList.find(v => v.posicionRanking === 1);
  const top2 = vendedoresList.find(v => v.posicionRanking === 2);
  const top3 = vendedoresList.find(v => v.posicionRanking === 3);

  return (
    <div style={{ maxWidth: '1240px', animation: 'fadeIn 0.3s ease-out' }}>
      
      {/* HEADER DE CABECERA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '46px', 
            height: '46px', 
            borderRadius: '14px', 
            background: `linear-gradient(135deg, ${tema.acento}, ${tema.acentoOscuro})`, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: `0 6px 14px ${tema.acento}38` 
          }}>
            <Trophy size={24} color={tema.sobreAcento} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: colores.textoClaro, letterSpacing: '-0.3px' }}>
                Rendimiento y Ranking de Compradores / Agentes
              </h1>
              <span style={{ fontSize: '11px', fontWeight: 800, background: tema.acentoSuave, color: tema.acentoOscuro, padding: '3px 9px', borderRadius: '12px' }}>
                ANÁLISIS DE EFICIENCIA & RENTABILIDAD
              </span>
            </div>
            <p style={{ margin: '2px 0 0', fontSize: '14px', color: colores.textoMedio }}>
              Evaluación detallada de desempeño, ganancias generadas, pérdidas evitadas y SLA por persona asignada.
            </p>
          </div>
        </div>

        {/* Filtro de Período */}
        <div style={{ display: 'flex', gap: '6px', background: colores.fondoPrincipal, padding: '4px', borderRadius: '10px', border: `1px solid ${colores.borde}` }}>
          {[
            { id: 'mes', label: 'Este Mes' },
            { id: 'trimestre', label: 'Último Trimestre' },
            { id: 'ano', label: 'Año en Curso' },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setFiltroPeriodo(p.id as any)}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                border: 'none',
                background: filtroPeriodo === p.id ? tema.acento : 'transparent',
                color: filtroPeriodo === p.id ? tema.sobreAcento : colores.textoMedio,
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* METRICAS CONSOLIDADAS DE RENDIMIENTO FINANCIERO Y OPERATIVO */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '16px', 
        marginBottom: '24px' 
      }}>
        {/* 1. Ganancia Total Generada */}
        <div style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '16px', padding: '18px 20px', boxShadow: colores.sombra }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: colores.textoMedio, textTransform: 'uppercase' }}>Ganancia Generada</span>
            <div style={{ width: 32, height: 32, borderRadius: '8px', background: `${colores.exito}1F`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={16} color={colores.exito} />
            </div>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: '24px', fontWeight: 900, color: colores.textoClaro }}>
            ${gananciaTotal.toLocaleString('es-MX')} MXN
          </p>
          <span style={{ fontSize: '11px', color: colores.exito, fontWeight: 700 }}>+14.2% vs. mes anterior</span>
        </div>

        {/* 2. Pérdida Evitada */}
        <div style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '16px', padding: '18px 20px', boxShadow: colores.sombra }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: colores.textoMedio, textTransform: 'uppercase' }}>Pérdida Evitada</span>
            <div style={{ width: 32, height: 32, borderRadius: '8px', background: `${colores.exito}1F`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={16} color={colores.exito} />
            </div>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: '24px', fontWeight: 900, color: colores.exito }}>
            ${perdidaTotalEvitada.toLocaleString('es-MX')} MXN
          </p>
          <span style={{ fontSize: '11px', color: colores.textoOscuro }}>Por atención predictiva inmediata</span>
        </div>

        {/* 3. Pérdida Acumulada */}
        <div style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '16px', padding: '18px 20px', boxShadow: colores.sombra }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: colores.textoMedio, textTransform: 'uppercase' }}>Pérdidas Registradas</span>
            <div style={{ width: 32, height: 32, borderRadius: '8px', background: `${colorSeveridad.critico}1F`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingDown size={16} color={colorSeveridad.critico} />
            </div>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: '24px', fontWeight: 900, color: colorSeveridad.critico }}>
            ${perdidaTotalGenerada.toLocaleString('es-MX')} MXN
          </p>
          <span style={{ fontSize: '11px', color: colores.textoOscuro }}>Por demoras y sobrecostos inevitable</span>
        </div>

        {/* 4. Cumplimiento SLA Global */}
        <div style={{ background: colores.fondoPrincipal, border: `1px solid ${colores.borde}`, borderRadius: '16px', padding: '18px 20px', boxShadow: colores.sombra }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: colores.textoMedio, textTransform: 'uppercase' }}>SLA Promedio</span>
            <div style={{ width: 32, height: 32, borderRadius: '8px', background: `${tema.acento}1F`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={16} color={tema.acentoOscuro} />
            </div>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: '24px', fontWeight: 900, color: colores.textoClaro }}>
            {slaPromedio}%
          </p>
          <span style={{ fontSize: '11px', color: colores.textoOscuro }}>{casosSolucionadosTotales} casos resueltos en tiempo</span>
        </div>
      </div>

      {/* SECCIÓN PODIO TOP 3 RANKING */}
      <div style={{ 
        background: colores.fondoPrincipal, 
        border: `1px solid ${colores.borde}`, 
        borderRadius: '20px', 
        padding: '24px', 
        boxShadow: colores.sombra,
        marginBottom: '28px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
          <Trophy size={20} color="#F59E0B" />
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: colores.textoClaro }}>
            Podio de Excelencia Operativa & Financiera
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', alignItems: 'end' }}>
          
          {/* PODIO #2 - PLATA */}
          {top2 && (
            <div 
              onClick={() => setVendedorSeleccionado(top2)}
              style={{ 
                background: `linear-gradient(180deg, ${colores.fondoSecundario}, ${colores.fondoPrincipal})`, 
                border: `2px solid #94A3B8`, 
                borderRadius: '18px', 
                padding: '20px', 
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                boxShadow: colores.sombra
              }}
            >
              <div style={{ 
                width: 36, height: 36, borderRadius: '50%', background: '#94A3B8', color: '#fff', 
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '16px', marginBottom: '8px' 
              }}>
                2°
              </div>
              <h3 style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: 800, color: colores.textoClaro }}>{top2.nombre}</h3>
              <p style={{ margin: '0 0 10px', fontSize: '12px', color: colores.textoMedio }}>{top2.rol}</p>
              
              <div style={{ background: colores.fondoSecundario, padding: '10px', borderRadius: '10px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: colores.textoOscuro }}>Ganancia:</span>
                  <strong style={{ color: colores.textoClaro }}>${top2.gananciaGenerada.toLocaleString('es-MX')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: colores.textoOscuro }}>SLA Cumplido:</span>
                  <strong style={{ color: colores.exito }}>{top2.cumplimientoSLA}%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: colores.textoOscuro }}>Score IA:</span>
                  <strong style={{ color: tema.acentoOscuro }}>{top2.scoreEficiencia} / 100</strong>
                </div>
              </div>
            </div>
          )}

          {/* PODIO #1 - ORO (DESTACADO EN EL CENTRO Y MÁS ALTO) */}
          {top1 && (
            <div 
              onClick={() => setVendedorSeleccionado(top1)}
              style={{ 
                background: `linear-gradient(180deg, ${tema.acentoSuave}, ${colores.fondoPrincipal})`, 
                border: `3px solid #F59E0B`, 
                borderRadius: '22px', 
                padding: '24px 20px', 
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                boxShadow: `0 8px 24px rgba(245, 158, 11, 0.25)`,
                transform: 'scale(1.04)'
              }}
            >
              <div style={{ 
                width: 44, height: 44, borderRadius: '50%', background: '#F59E0B', color: '#fff', 
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '20px', marginBottom: '8px' 
              }}>
                1°
              </div>
              <span style={{ fontSize: '10px', fontWeight: 800, background: '#F59E0B', color: '#fff', padding: '2px 8px', borderRadius: '10px', display: 'inline-block', marginBottom: '4px' }}>
                LÍDER DEL MES
              </span>
              <h3 style={{ margin: '0 0 2px', fontSize: '18px', fontWeight: 900, color: colores.textoClaro }}>{top1.nombre}</h3>
              <p style={{ margin: '0 0 12px', fontSize: '12px', color: colores.textoMedio }}>{top1.rol}</p>
              
              <div style={{ background: colores.fondoPrincipal, padding: '12px', borderRadius: '12px', border: `1px solid ${colores.borde}`, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                  <span style={{ color: colores.textoOscuro }}>Ganancia Generada:</span>
                  <strong style={{ color: colores.exito, fontSize: '13.5px' }}>${top1.gananciaGenerada.toLocaleString('es-MX')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                  <span style={{ color: colores.textoOscuro }}>Pérdida Evitada:</span>
                  <strong style={{ color: colores.exito }}>${top1.perdidaEvitada.toLocaleString('es-MX')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                  <span style={{ color: colores.textoOscuro }}>Cumplimiento SLA:</span>
                  <strong style={{ color: colorSeveridad.ok }}>{top1.cumplimientoSLA}%</strong>
                </div>
              </div>
            </div>
          )}

          {/* PODIO #3 - BRONCE */}
          {top3 && (
            <div 
              onClick={() => setVendedorSeleccionado(top3)}
              style={{ 
                background: `linear-gradient(180deg, ${colores.fondoSecundario}, ${colores.fondoPrincipal})`, 
                border: `2px solid #D97706`, 
                borderRadius: '18px', 
                padding: '20px', 
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                boxShadow: colores.sombra
              }}
            >
              <div style={{ 
                width: 36, height: 36, borderRadius: '50%', background: '#D97706', color: '#fff', 
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '16px', marginBottom: '8px' 
              }}>
                3°
              </div>
              <h3 style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: 800, color: colores.textoClaro }}>{top3.nombre}</h3>
              <p style={{ margin: '0 0 10px', fontSize: '12px', color: colores.textoMedio }}>{top3.rol}</p>
              
              <div style={{ background: colores.fondoSecundario, padding: '10px', borderRadius: '10px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: colores.textoOscuro }}>Ganancia:</span>
                  <strong style={{ color: colores.textoClaro }}>${top3.gananciaGenerada.toLocaleString('es-MX')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: colores.textoOscuro }}>SLA Cumplido:</span>
                  <strong style={{ color: colores.exito }}>{top3.cumplimientoSLA}%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: colores.textoOscuro }}>Score IA:</span>
                  <strong style={{ color: tema.acentoOscuro }}>{top3.scoreEficiencia} / 100</strong>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* TABLA PRINCIPAL DE RENDIMIENTO FINANCIERO Y CASOS SOLUCIONADOS */}
      <div style={{ 
        background: colores.fondoPrincipal, 
        border: `1px solid ${colores.borde}`, 
        borderRadius: '20px', 
        padding: '20px', 
        boxShadow: colores.sombra
      }}>
        {/* BUSCADOR Y FILTROS */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} color={colores.textoMedio} style={{ position: 'absolute', left: '12px', top: '10px' }} />
            <input 
              type="text" 
              placeholder="Buscar por nombre de vendedor, rol o región..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '10px',
                border: `1px solid ${colores.borde}`,
                background: colores.fondoSecundario,
                color: colores.textoClaro,
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ fontSize: '12.5px', color: colores.textoMedio }}>
            Mostrando <strong>{vendedoresFiltrados.length}</strong> asignados en la red
          </div>
        </div>

        {/* TABLA */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${colores.borde}`, color: colores.textoOscuro, fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px' }}>Rank</th>
                <th style={{ padding: '10px' }}>Vendedor / Asignado</th>
                <th style={{ padding: '10px' }}>Casos Solucionados</th>
                <th style={{ padding: '10px' }}>Respuesta Prom.</th>
                <th style={{ padding: '10px' }}>Cumplimiento SLA</th>
                <th style={{ padding: '10px' }}>Ganancia Generada</th>
                <th style={{ padding: '10px' }}>Pérdida (Generada vs Evitada)</th>
                <th style={{ padding: '10px' }}>Score Eficiencia</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {vendedoresFiltrados.map((v) => {
                const margenNeto = v.gananciaGenerada - v.perdidaGenerada;
                const scoreColor = v.scoreEficiencia >= 95 ? colorSeveridad.ok : v.scoreEficiencia >= 90 ? colorSeveridad.atencion : colorSeveridad.critico;

                return (
                  <tr 
                    key={v.id} 
                    style={{ borderBottom: `1px solid ${colores.borde}`, transition: 'background 0.15s' }}
                    className="row-hover"
                  >
                    {/* Rank */}
                    <td style={{ padding: '12px 10px', fontWeight: 800 }}>
                      <span style={{ 
                        display: 'inline-flex', width: 26, height: 26, borderRadius: '50%', 
                        background: v.posicionRanking === 1 ? '#F59E0B' : v.posicionRanking === 2 ? '#94A3B8' : v.posicionRanking === 3 ? '#D97706' : colores.fondoTerciario, 
                        color: v.posicionRanking <= 3 ? '#fff' : colores.textoClaro, 
                        alignItems: 'center', justifyContent: 'center', fontSize: '12px' 
                      }}>
                        #{v.posicionRanking}
                      </span>
                    </td>

                    {/* Vendedor */}
                    <td style={{ padding: '12px 10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: 34, height: 34, borderRadius: '50%', background: tema.acentoSuave, color: tema.acentoOscuro, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12.5px' }}>
                          {v.avatar}
                        </div>
                        <div>
                          <strong style={{ color: colores.textoClaro, display: 'block' }}>{v.nombre}</strong>
                          <span style={{ fontSize: '11px', color: colores.textoMedio }}>{v.rol} · {v.region}</span>
                        </div>
                      </div>
                    </td>

                    {/* Casos solucionados */}
                    <td style={{ padding: '12px 10px' }}>
                      <span style={{ fontWeight: 700, color: colores.textoClaro }}>{v.casosSolucionados}</span>
                      <span style={{ fontSize: '11px', color: colores.textoOscuro }}> / {v.casosAsignados}</span>
                    </td>

                    {/* Respuesta Prom. */}
                    <td style={{ padding: '12px 10px', fontWeight: 700, color: colores.textoClaro }}>
                      <Clock size={12} style={{ display: 'inline', marginRight: 4 }} color={colores.textoMedio} />
                      {v.tiempoRespuestaMin} min
                    </td>

                    {/* Cumplimiento SLA */}
                    <td style={{ padding: '12px 10px' }}>
                      <span style={{ fontWeight: 800, color: v.cumplimientoSLA >= 95 ? colores.exito : colorSeveridad.atencion }}>
                        {v.cumplimientoSLA}%
                      </span>
                    </td>

                    {/* Ganancia Generada */}
                    <td style={{ padding: '12px 10px', fontWeight: 800, color: colores.exito }}>
                      ${v.gananciaGenerada.toLocaleString('es-MX')}
                    </td>

                    {/* Pérdida (Generada vs Evitada) */}
                    <td style={{ padding: '12px 10px' }}>
                      <div style={{ fontSize: '12px' }}>
                        <span style={{ color: colorSeveridad.critico, fontWeight: 700 }}>-${v.perdidaGenerada.toLocaleString('es-MX')}</span>
                      </div>
                      <div style={{ fontSize: '10.5px', color: colores.exito }}>
                        Evitada: +${v.perdidaEvitada.toLocaleString('es-MX')}
                      </div>
                    </td>

                    {/* Score Eficiencia */}
                    <td style={{ padding: '12px 10px' }}>
                      <span style={{ 
                        fontWeight: 800, 
                        color: scoreColor, 
                        background: `${scoreColor}1A`, 
                        padding: '3px 8px', 
                        borderRadius: '6px',
                        fontSize: '12px'
                      }}>
                        {v.scoreEficiencia} / 100
                      </span>
                    </td>

                    {/* Acción */}
                    <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                      <button
                        onClick={() => setVendedorSeleccionado(v)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '8px',
                          border: `1px solid ${colores.borde}`,
                          background: colores.fondoSecundario,
                          color: colores.textoClaro,
                          fontSize: '11.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Eye size={12} /> Ver Ficha
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DETALLE DE INSPECCIÓN INDIVIDUAL POR VENDEDOR / AGENTE */}
      {vendedorSeleccionado && (
        <div 
          onClick={() => setVendedorSeleccionado(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 4000, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        >
          <div 
            onClick={e => e.stopPropagation()}
            style={{ width: '100%', maxWidth: '640px', background: colores.fondoPrincipal, borderRadius: '20px', padding: '28px', boxShadow: colores.sombraGrande, position: 'relative', border: `1px solid ${colores.borde}` }}
          >
            <button 
              onClick={() => setVendedorSeleccionado(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'transparent', cursor: 'pointer', color: colores.textoOscuro }}
            >
              <X size={20} />
            </button>

            {/* Header del vendedor */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: tema.acento, color: tema.sobreAcento, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px' }}>
                {vendedorSeleccionado.avatar}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: colores.textoClaro }}>
                    {vendedorSeleccionado.nombre}
                  </h3>
                  <span style={{ fontSize: '11px', fontWeight: 800, background: '#F59E0B', color: '#fff', padding: '2px 8px', borderRadius: '10px' }}>
                    Rank #{vendedorSeleccionado.posicionRanking}
                  </span>
                </div>
                <p style={{ margin: '2px 0 0', fontSize: '13px', color: colores.textoMedio }}>
                  {vendedorSeleccionado.rol} · Region: {vendedorSeleccionado.region}
                </p>
              </div>
            </div>

            {/* Grid de Métricas Financieras y Rendimiento */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: colores.fondoSecundario, padding: '12px', borderRadius: '12px', border: `1px solid ${colores.borde}` }}>
                <span style={{ fontSize: '10px', color: colores.textoOscuro, textTransform: 'uppercase', fontWeight: 700 }}>Ganancia Generada</span>
                <p style={{ margin: '2px 0 0', fontSize: '16px', fontWeight: 900, color: colores.exito }}>${vendedorSeleccionado.gananciaGenerada.toLocaleString('es-MX')}</p>
              </div>

              <div style={{ background: colores.fondoSecundario, padding: '12px', borderRadius: '12px', border: `1px solid ${colores.borde}` }}>
                <span style={{ fontSize: '10px', color: colores.textoOscuro, textTransform: 'uppercase', fontWeight: 700 }}>Pérdida Registrada</span>
                <p style={{ margin: '2px 0 0', fontSize: '16px', fontWeight: 900, color: colorSeveridad.critico }}>-${vendedorSeleccionado.perdidaGenerada.toLocaleString('es-MX')}</p>
              </div>

              <div style={{ background: colores.fondoSecundario, padding: '12px', borderRadius: '12px', border: `1px solid ${colores.borde}` }}>
                <span style={{ fontSize: '10px', color: colores.textoOscuro, textTransform: 'uppercase', fontWeight: 700 }}>Pérdida Evitada</span>
                <p style={{ margin: '2px 0 0', fontSize: '16px', fontWeight: 900, color: colores.exito }}>+${vendedorSeleccionado.perdidaEvitada.toLocaleString('es-MX')}</p>
              </div>
            </div>

            {/* Histórico Mensual */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 10px', fontSize: '13.5px', fontWeight: 700, color: colores.textoClaro }}>
                Evolución de Rendimiento Financiero (Mes a Mes)
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {vendedorSeleccionado.historialMeses.map((hm, i) => (
                  <div key={i} style={{ background: colores.fondoSecundario, padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: tema.acentoOscuro, display: 'block' }}>{hm.mes}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: colores.exito, display: 'block', marginTop: '2px' }}>+${Math.round(hm.ganancia/1000)}k</span>
                    <span style={{ fontSize: '10px', color: colores.textoOscuro }}>{hm.casos} casos</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnóstico de IA */}
            <div style={{ 
              background: `linear-gradient(120deg, ${tema.acentoSuave}, ${colores.fondoSecundario})`, 
              borderLeft: `4px solid ${tema.acentoOscuro}`, 
              borderRadius: '12px', 
              padding: '14px', 
              fontSize: '13px',
              color: colores.textoClaro,
              lineHeight: 1.45
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '11px', fontWeight: 800, color: tema.acentoOscuro, textTransform: 'uppercase' }}>
                <Sparkles size={12} /> Diagnóstico de Eficiencia de {ia.nombre}
              </div>
              {vendedorSeleccionado.nombre} mantiene un nivel de cumplimiento de SLA del <strong>{vendedorSeleccionado.cumplimientoSLA}%</strong> con un margen neto positivo de <strong>${(vendedorSeleccionado.gananciaGenerada - vendedorSeleccionado.perdidaGenerada).toLocaleString('es-MX')} MXN</strong>. Destaca en la región {vendedorSeleccionado.region} por la velocidad de resolución en casos de alta prioridad.
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
