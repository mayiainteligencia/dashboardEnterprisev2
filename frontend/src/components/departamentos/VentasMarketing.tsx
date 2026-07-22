import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  Users, 
  BarChart3, 
  Megaphone, 
  Tag, 
  CheckCircle2, 
  ArrowUpRight, 
  Star, 
  Zap 
} from 'lucide-react';
import { brandingConfig } from '../../config/branding';

export const VentasMarketing: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-8 font-sans">
      {/* Header */}
      <div className="mb-8 flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-[#038CAE]/10 text-[#038CAE]">
              <TrendingUp size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Ventas & Marketing</h1>
              <p className="text-gray-500 font-medium flex items-center gap-2 mt-1">
                Inteligencia Comercial BESCO <Zap size={14} className="text-amber-500" />
              </p>
            </div>
          </div>
        </div>

        {/* KPI Chips */}
        <div className="flex flex-wrap items-center gap-3">
          {[
            { label: 'Pipeline', value: '$48.2M', icon: BarChart3, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Prospectos Activos', value: '234', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Conversión', value: '18.4%', icon: Target, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'NPS', value: '72', icon: Star, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex items-center gap-3 min-w-[160px]">
              <div className={`p-2 rounded-lg ${kpi.bg}`}>
                <kpi.icon size={18} className={kpi.color} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">{kpi.label}</p>
                <p className="text-lg font-bold text-gray-900">{kpi.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Top Section: 2 Hero Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            
            {/* Estrategia Comercial */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col md:flex-row group">
              <div className="md:w-[45%] h-48 md:h-auto relative overflow-hidden bg-gray-100">
                <img 
                  src="/assets/ventasM/estrategia.png" 
                  alt="Estrategia Comercial" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="bg-[#038CAE] text-xs font-bold px-2 py-1 rounded mb-2 inline-block">CORE</span>
                  <h3 className="font-bold text-lg leading-tight">Estrategia Comercial</h3>
                </div>
              </div>
              <div className="p-5 md:w-[55%] flex flex-col justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">Planes de ventas, prospección y desarrollo de nuevos mercados B2B.</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-gray-600">Meta Anual BESCO</span>
                      <span className="text-[#038CAE] font-bold">68%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-[#038CAE] h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-1 mb-4">
                    {['Lead', 'Reunión', 'Propuesta', 'Cierre'].map((etapa, i) => (
                      <div key={i} className="flex-1 text-center">
                        <div className={`h-1.5 rounded-full mb-1 ${i < 3 ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
                        <span className="text-[10px] font-semibold text-gray-500 uppercase">{etapa}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-[#038CAE] font-medium text-sm rounded-lg flex items-center justify-center gap-2 transition-colors">
                  Ver Pipeline <ArrowUpRight size={16} />
                </button>
              </div>
            </div>

            {/* Gestión de CRM */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden flex flex-col md:flex-row group">
              <div className="md:w-[45%] h-48 md:h-auto relative overflow-hidden bg-gray-100">
                <img 
                  src="/assets/ventasM/crm.png" 
                  alt="Gestión CRM" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="bg-emerald-500 text-xs font-bold px-2 py-1 rounded mb-2 inline-block">SISTEMAS</span>
                  <h3 className="font-bold text-lg leading-tight">Gestión de CRM</h3>
                </div>
              </div>
              <div className="p-5 md:w-[55%] flex flex-col justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">Seguimiento a prospectos y clientes mediante herramientas CRM.</p>
                  
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-3xl font-black text-gray-800 leading-none">234</span>
                    <span className="text-xs text-emerald-600 font-medium flex items-center mb-1">
                      <TrendingUp size={12} className="mr-1"/> +12 este mes
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold">145 CALIFICADOS</span>
                    <span className="px-2 py-1 bg-amber-50 text-amber-600 rounded text-[10px] font-bold">64 NEGOCIACIÓN</span>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold">25 GANADOS</span>
                  </div>
                </div>
                
                <div className="space-y-2 mt-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#038CAE]"></div>
                    <span>Llamada con <span className="font-medium text-gray-800">Corp. Industrial</span> completada</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                    <span>Propuesta enviada a <span className="font-medium text-gray-800">Logistics SA</span></span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Section: 3 Medium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Campañas Digitales */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group flex flex-col">
              <div className="h-[180px] overflow-hidden relative">
                <img 
                  src="/assets/ventasM/campanas.png" 
                  alt="Campañas Digitales" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">
                  <Megaphone size={18} className="text-[#038CAE]" />
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 mb-1">Campañas Digitales</h3>
                <p className="text-sm text-gray-500 mb-4 flex-1">Marketing digital, publicidad y generación de leads online BESCO.</p>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">ROAS Mensual</p>
                    <p className="font-bold text-gray-900">4.2x</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    Activa <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  </span>
                </div>
              </div>
            </div>

            {/* Análisis de Mercado */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group flex flex-col">
              <div className="h-[180px] overflow-hidden relative">
                <img 
                  src="/assets/ventasM/analisis.png" 
                  alt="Análisis de Mercado" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">
                  <BarChart3 size={18} className="text-[#038CAE]" />
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 mb-1">Análisis de Mercado</h3>
                <p className="text-sm text-gray-500 mb-4 flex-1">Estudios de competencia, tendencias y pricing en facilities.</p>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Reportes Q3</p>
                    <p className="font-bold text-gray-900">4/5 Completados</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                    En Proceso
                  </span>
                </div>
              </div>
            </div>

            {/* Branding & Contenido */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group flex flex-col">
              <div className="h-[180px] overflow-hidden relative">
                <img 
                  src="/assets/ventasM/branding.png" 
                  alt="Branding & Contenido" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">
                  <Tag size={18} className="text-[#038CAE]" />
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 mb-1">Branding & Contenido</h3>
                <p className="text-sm text-gray-500 mb-4 flex-1">Identidad de marca, brochures, casos de éxito y PR.</p>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Materiales</p>
                    <p className="font-bold text-gray-900">12 Nuevos</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-[#038CAE] bg-[#038CAE]/10 px-2 py-1 rounded-full">
                    Actualizado
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Sidebar: Metas del Trimestre */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
            <div className="flex items-center gap-2 mb-6">
              <Target className="text-[#038CAE]" size={20} />
              <h2 className="font-bold text-gray-900">Metas del Trimestre</h2>
            </div>

            <div className="space-y-6">
              
              {/* Meta 1 */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Nuevos Contratos FM</span>
                  <span className="font-bold text-[#038CAE]">12 / 15</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1">
                  <div className="bg-[#038CAE] h-2.5 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <p className="text-xs text-gray-500 text-right">80% completado</p>
              </div>

              {/* Meta 2 */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Leads Calificados (MQL)</span>
                  <span className="font-bold text-emerald-600">340 / 500</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1">
                  <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '68%' }}></div>
                </div>
                <p className="text-xs text-gray-500 text-right">68% completado</p>
              </div>

              {/* Meta 3 */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Eventos del Sector</span>
                  <span className="font-bold text-amber-500">2 / 4</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                </div>
                <p className="text-xs text-gray-500 text-right">50% completado</p>
              </div>

            </div>

            <div className="mt-8 p-4 bg-[#038CAE]/5 rounded-xl border border-[#038CAE]/10">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-[#038CAE] mt-0.5 shrink-0" size={18} />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Cierre de mes próximo</h4>
                  <p className="text-xs text-gray-600 mt-1">Revisión de pipeline el próximo martes. Actualizar todos los estados en CRM.</p>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 py-2.5 bg-[#038CAE] hover:bg-[#02708b] text-white font-medium rounded-xl transition-colors shadow-sm text-sm flex items-center justify-center gap-2">
              Reporte Completo <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
