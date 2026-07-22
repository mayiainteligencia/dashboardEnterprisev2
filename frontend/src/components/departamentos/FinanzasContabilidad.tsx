import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, TrendingDown, AlertCircle, 
  FileText, CreditCard, PieChart, BarChart3, 
  CheckCircle, Clock 
} from 'lucide-react';
import { brandingConfig } from '../../config/branding';

const tools = [
  {
    title: 'Estados Financieros',
    description: 'Reportes y balances en tiempo real',
    imgSrc: '/assets/finanzasConta/estadoFin.png',
    badge: 'TIEMPO REAL',
    kpi: '+15%',
  },
  {
    title: 'Presupuestos',
    description: 'Control y seguimiento presupuestal',
    imgSrc: '/assets/finanzasConta/presupuesto.png',
    badge: 'PRESUPUESTAL',
    kpi: '78%'
  },
  {
    title: 'Flujo de Caja',
    description: 'Monitoreo de ingresos y egresos',
    imgSrc: '/assets/finanzasConta/flujoCaja.png',
    badge: 'CAJA',
    kpi: '+$2.1M'
  },
  {
    title: 'Facturación',
    description: 'Sistema de facturación electrónica',
    imgSrc: '/assets/finanzasConta/facturacion.png',
    badge: 'SAT CFDI',
    kpi: '847'
  },
  {
    title: 'Análisis Financiero',
    description: 'Indicadores y KPIs financieros',
    imgSrc: '/assets/finanzasConta/AnalisisFinanciero.png',
    badge: 'INDICADORES',
    kpi: '98%'
  }
];

export const FinanzasContabilidad: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Finanzas y Contabilidad</h1>
        <p className="text-slate-500 mb-6">Gestión de estados financieros, presupuestos, flujo de caja y análisis corporativo BESCO.</p>
        
        {/* KPI Chips */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center space-x-4 transition-transform hover:-translate-y-1 duration-300">
            <div className="p-3 bg-teal-50 rounded-lg text-[#038CAE]">
              <PieChart size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Presupuesto Ejercido</p>
              <h3 className="text-xl font-bold text-slate-800">78%</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center space-x-4 transition-transform hover:-translate-y-1 duration-300">
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Facturación MXN</p>
              <h3 className="text-xl font-bold text-slate-800">$12.4M</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center space-x-4 transition-transform hover:-translate-y-1 duration-300">
            <div className="p-3 bg-green-50 rounded-lg text-green-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Flujo Positivo</p>
              <h3 className="text-xl font-bold text-slate-800">+$2.1M</h3>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center space-x-4 transition-transform hover:-translate-y-1 duration-300">
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">CFDI Activos</p>
              <h3 className="text-xl font-bold text-slate-800">847</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Section */}
        <div className="w-full lg:w-3/4">
          {/* Grid 1 Large + 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool, index) => {
              const isLarge = index === 0;
              return (
                <div 
                  key={index}
                  className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col ${isLarge ? 'md:col-span-2' : ''}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Background Image Container */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                    <img 
                      src={tool.imgSrc} 
                      alt={tool.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ${hoveredIndex === index ? 'scale-105' : 'scale-100'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full text-[#038CAE] shadow-sm uppercase tracking-wider">
                      {tool.badge}
                    </div>
                    
                    {/* KPI Top Right */}
                    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {tool.kpi}
                    </div>
                  </div>
                  
                  {/* Content below image */}
                  <div className="p-5 flex-grow flex flex-col justify-end bg-white border-t border-slate-50">
                    <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-[#038CAE] transition-colors">{tool.title}</h3>
                    <p className="text-sm text-slate-500">{tool.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/4 flex flex-col gap-6">
          {/* Alertas */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              <AlertCircle className="mr-2 text-amber-500" size={20} />
              Alertas Financieras
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="bg-amber-50 p-2 rounded-full text-amber-500 mt-1 group-hover:bg-amber-100 transition-colors">
                  <Clock size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-700">Factura Pendiente</h4>
                  <p className="text-xs text-slate-500">Proveedor X: Vence en 2 días</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="bg-red-50 p-2 rounded-full text-red-500 mt-1 group-hover:bg-red-100 transition-colors">
                  <TrendingDown size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-700">Presupuesto Mantenimiento</h4>
                  <p className="text-xs text-slate-500">Al 95% del límite mensual</p>
                </div>
              </div>
              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="bg-[#038CAE]/10 p-2 rounded-full text-[#038CAE] mt-1 group-hover:bg-[#038CAE]/20 transition-colors">
                  <CreditCard size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-700">Conciliación Bancaria</h4>
                  <p className="text-xs text-slate-500">Requiere revisión de cuenta BBVA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mini Chart */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
              <BarChart3 className="mr-2 text-[#038CAE]" size={20} />
              Ejecución Presupuestal
            </h3>
            <div className="space-y-5">
              <div className="group cursor-pointer">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 group-hover:text-[#038CAE] transition-colors">Operaciones</span>
                  <span className="text-slate-800">85%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-[#038CAE] h-2 rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="group cursor-pointer">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 group-hover:text-amber-500 transition-colors">Mantenimiento</span>
                  <span className="text-slate-800">95%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full transition-all duration-1000" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div className="group cursor-pointer">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 group-hover:text-emerald-500 transition-colors">Administrativo</span>
                  <span className="text-slate-800">45%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="group cursor-pointer">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 group-hover:text-[#038CAE] transition-colors">TI</span>
                  <span className="text-slate-800">60%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-[#038CAE] opacity-70 h-2 rounded-full transition-all duration-1000" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
