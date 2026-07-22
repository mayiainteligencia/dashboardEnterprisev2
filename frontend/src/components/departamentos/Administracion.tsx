import React, { useState } from 'react';
import { 
  Building2, TrendingUp, CheckCircle2, Brain, Target, Zap, ArrowRight, Star, FileCheck, 
  Activity, ShieldCheck, Cpu
} from 'lucide-react';
import { brandingConfig } from '../../config/branding';

interface ServiceCard {
  id: number;
  title: string;
  image: string;
  description: string;
  price?: string;
  tag: string;
}

const services: ServiceCard[] = [
  {
    id: 1,
    title: "ESTRATEGIA IA",
    image: "/assets/adminD/adminD1.png",
    description: "Consultor Digital para portafolio de sistemas de IA",
    price: "$98,000",
    tag: "Estrategia"
  },
  {
    id: 2,
    title: "INNOVACIÓN EMPRESARIAL",
    image: "/assets/adminD/adminD2.png",
    description: "Democratiza la innovación con IA generativa",
    price: "$98,000",
    tag: "Innovación"
  },
  {
    id: 3,
    title: "Business Consulting",
    image: "/assets/adminD/adminD3.png",
    description: "Enfoque holístico: personas, procesos y tecnología",
    tag: "Consultoría"
  },
  {
    id: 4,
    title: "Asesor ISO 9001",
    image: "/assets/adminD/adminD4.png",
    description: "Cumplimiento normativo y gestión de calidad con IA",
    tag: "Calidad"
  },
  {
    id: 5,
    title: "Operadora Con IA",
    image: "/assets/adminD/adminD5.png",
    description: "Automatización de operaciones administrativas",
    tag: "Operaciones"
  }
];

export const Administracion: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const primaryColor = brandingConfig.colores.primario || '#038CAE';

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${primaryColor}15` }}>
            <Building2 size={28} style={{ color: primaryColor }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Administración y Estrategia</h1>
            <p className="text-gray-500 mt-1">Gestión de consultoría estratégica, IA, innovación y operaciones BESCO</p>
          </div>
        </div>
        
        {/* KPI Chips */}
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <Target size={18} style={{ color: primaryColor }} />
            <span className="text-sm font-medium text-gray-700">5 Servicios Activos</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <CheckCircle2 size={18} className="text-green-500" />
            <span className="text-sm font-medium text-gray-700">ISO 9001 ✓</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <Brain size={18} className="text-purple-500" />
            <span className="text-sm font-medium text-gray-700">IA Integrada al 100%</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <TrendingUp size={18} className="text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Alto Crecimiento</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Services Grid (2 cols) */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Zap size={20} style={{ color: primaryColor }} />
              Portafolio de Servicios
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div 
                key={service.id}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative group cursor-pointer"
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image container */}
                <div className="h-[220px] overflow-hidden relative bg-gray-100">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay on hover */}
                  <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 flex items-center justify-center p-6 text-center ${hoveredId === service.id ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-white font-medium text-sm leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-gray-700 shadow-sm">
                    {service.tag}
                  </div>
                  
                  {service.price && (
                    <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs font-bold shadow-sm transition-opacity duration-300">
                      {service.price}
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-5 border-t-2" style={{ borderTopColor: primaryColor }}>
                  <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-[var(--primary)] transition-colors" style={{ '--primary': primaryColor } as React.CSSProperties}>
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-1">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Executive Summary Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
              <Star size={20} className="text-yellow-500" />
              Resumen Ejecutivo
            </h2>

            {/* Mini-stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <Activity size={16} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Proyectos</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">24<span className="text-sm font-medium text-gray-500 ml-1">activos</span></div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <Cpu size={16} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Madurez IA</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">92<span className="text-sm font-medium text-gray-500 ml-1">%</span></div>
              </div>
              <div className="col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <TrendingUp size={16} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Ahorro Operativo Est.</span>
                </div>
                <div className="text-3xl font-bold text-green-600">35<span className="text-lg font-medium ml-1">%</span></div>
              </div>
            </div>

            {/* Capacidades Clave */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Capacidades Clave</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 rounded-md bg-blue-50 text-blue-600">
                    <Brain size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">Transformación con IA</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Integración de modelos generativos en procesos diarios.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 rounded-md bg-green-50 text-green-600">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">Calidad Asegurada</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Cumplimiento estricto de normativas y estándar ISO 9001.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 rounded-md bg-purple-50 text-purple-600">
                    <FileCheck size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">Optimización de Costos</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Automatización administrativa para reducir overhead.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <button 
              className="w-full py-4 px-6 rounded-xl text-white font-bold text-sm shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              style={{ backgroundColor: primaryColor }}
            >
              Solicitar Diagnóstico Estratégico
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
