import React, { useState } from 'react';
import { 
  Users, UserPlus, GraduationCap, Star, Heart, DollarSign, 
  CheckCircle2, Calendar, TrendingUp, Award 
} from 'lucide-react';
import { brandingConfig } from '../../config/branding';

const areas = [
  {
    title: 'Portal del Empleado',
    description: 'Gestión de perfil, recibos y vacaciones',
    image: '/assets/rh/rh1.png',
    icon: <Users size={20} className="text-[#038CAE]" />,
    metric: '1,240 colaboradores',
    status: 'ACTIVO'
  },
  {
    title: 'Reclutamiento y Selección',
    description: 'Seguimiento de vacantes y candidatos',
    image: '/assets/rh/rh2.png',
    icon: <UserPlus size={20} className="text-[#038CAE]" />,
    metric: '18 vacantes activas',
    status: 'EN PROCESO'
  },
  {
    title: 'Capacitación y Desarrollo',
    description: 'Cursos y planes de carrera',
    image: '/assets/rh/rh3.png',
    icon: <GraduationCap size={20} className="text-[#038CAE]" />,
    metric: '45 cursos online',
    status: 'ACTIVO'
  },
  {
    title: 'Evaluación del Desempeño',
    description: 'Evaluaciones 360° y KPIs',
    image: '/assets/rh/rh4.png',
    icon: <Star size={20} className="text-[#038CAE]" />,
    metric: '92% completado',
    status: 'EN CURSO'
  },
  {
    title: 'Clima Laboral',
    description: 'Encuestas y análisis de satisfacción',
    image: '/assets/rh/rh5.png',
    icon: <Heart size={20} className="text-[#038CAE]" />,
    metric: '87% satisfacción',
    status: 'ACTIVO'
  },
  {
    title: 'Nómina y Beneficios',
    description: 'Control de pagos y prestaciones',
    image: '/assets/rh/rh6.png',
    icon: <DollarSign size={20} className="text-[#038CAE]" />,
    metric: '100% procesado',
    status: 'COMPLETADO'
  }
];

export const RecursosHumanos: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 font-sans text-slate-800">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: brandingConfig.colores.acento }}>
          Recursos Humanos
        </h1>
        <p className="text-slate-500 text-lg">Capital Humano Inteligente</p>
        
        {/* KPI Chips */}
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="bg-white px-5 py-3 rounded-lg shadow-sm flex items-center gap-3 border border-slate-100">
            <div className="p-2 bg-blue-50 rounded-full text-[#038CAE]">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Colaboradores</p>
              <p className="text-lg font-bold text-slate-800">1,240</p>
            </div>
          </div>
          <div className="bg-white px-5 py-3 rounded-lg shadow-sm flex items-center gap-3 border border-slate-100">
            <div className="p-2 bg-blue-50 rounded-full text-[#038CAE]">
              <UserPlus size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Vacantes Activas</p>
              <p className="text-lg font-bold text-slate-800">18</p>
            </div>
          </div>
          <div className="bg-white px-5 py-3 rounded-lg shadow-sm flex items-center gap-3 border border-slate-100">
            <div className="p-2 bg-blue-50 rounded-full text-[#038CAE]">
              <Heart size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Satisfacción</p>
              <p className="text-lg font-bold text-slate-800">87%</p>
            </div>
          </div>
          <div className="bg-white px-5 py-3 rounded-lg shadow-sm flex items-center gap-3 border border-slate-100">
            <div className="p-2 bg-blue-50 rounded-full text-[#038CAE]">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Rotación</p>
              <p className="text-lg font-bold text-slate-800">3.2%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Column - 60% */}
        <div className="lg:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-6">
          {areas.map((area, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col group relative"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#038CAE] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="h-[180px] relative overflow-hidden bg-slate-100">
                <img 
                  src={area.image} 
                  alt={area.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md">
                  {area.icon}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold tracking-wider text-slate-700 shadow-sm">
                  {area.status}
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-[#038CAE] transition-colors">{area.title}</h3>
                <p className="text-slate-500 text-sm mb-4 flex-1">{area.description}</p>
                
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                    {area.metric}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - 40% */}
        <div className="lg:w-[40%] flex flex-col gap-6">
          {/* Pulso Organizacional Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex-1 flex flex-col">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Heart className="text-[#038CAE]" /> 
              Pulso Organizacional
            </h2>
            
            {/* Circular Indicator */}
            <div className="flex justify-center mb-8">
              <div className="relative w-40 h-40 flex items-center justify-center rounded-full bg-blue-50 border-8 border-slate-50 shadow-inner">
                <svg className="absolute w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200" />
                  <circle 
                    cx="80" cy="80" r="70" 
                    stroke="currentColor" strokeWidth="8" fill="transparent" 
                    strokeDasharray="440" strokeDashoffset={440 - (440 * 87) / 100} 
                    className="text-[#038CAE]" 
                    style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                  />
                </svg>
                <div className="text-center z-10">
                  <span className="text-4xl font-bold text-slate-800 block">87%</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Satisfacción</span>
                </div>
              </div>
            </div>

            {/* 5 Hitos del Mes */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 border-b pb-2">Hitos del Mes</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckCircle2 size={18} className="text-[#038CAE] mt-0.5 flex-shrink-0" />
                  <span>Onboarding completado para 15 nuevos ingenieros</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckCircle2 size={18} className="text-[#038CAE] mt-0.5 flex-shrink-0" />
                  <span>Actualización del tabulador salarial 2024</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckCircle2 size={18} className="text-[#038CAE] mt-0.5 flex-shrink-0" />
                  <span>Lanzamiento de programa de bienestar mental</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckCircle2 size={18} className="text-[#038CAE] mt-0.5 flex-shrink-0" />
                  <span>Reducción de rotación en 1.5% vs trimestre anterior</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckCircle2 size={18} className="text-[#038CAE] mt-0.5 flex-shrink-0" />
                  <span>Auditoría STPS superada sin observaciones</span>
                </li>
              </ul>
            </div>

            {/* Próximos Eventos */}
            <div className="mt-auto">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 border-b pb-2">Próximos Eventos</h3>
              <div className="space-y-4">
                <div className="flex gap-4 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-blue-50 transition-colors group cursor-pointer">
                  <div className="flex flex-col items-center justify-center bg-white p-2 rounded shadow-sm w-12 h-12 text-[#038CAE] group-hover:scale-105 transition-transform">
                    <span className="text-[10px] font-bold uppercase leading-none">Oct</span>
                    <span className="text-lg font-black leading-none mt-1">12</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-semibold text-slate-800 text-sm">Evaluaciones Q3</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Calendar size={12} /> Cierre de periodo</span>
                  </div>
                </div>
                
                <div className="flex gap-4 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-blue-50 transition-colors group cursor-pointer">
                  <div className="flex flex-col items-center justify-center bg-white p-2 rounded shadow-sm w-12 h-12 text-[#038CAE] group-hover:scale-105 transition-transform">
                    <span className="text-[10px] font-bold uppercase leading-none">Oct</span>
                    <span className="text-lg font-black leading-none mt-1">25</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-semibold text-slate-800 text-sm">Encuesta de Clima</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Calendar size={12} /> Apertura de plataforma</span>
                  </div>
                </div>

                <div className="flex gap-4 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-blue-50 transition-colors group cursor-pointer">
                  <div className="flex flex-col items-center justify-center bg-white p-2 rounded shadow-sm w-12 h-12 text-[#038CAE] group-hover:scale-105 transition-transform">
                    <span className="text-[10px] font-bold uppercase leading-none">Nov</span>
                    <span className="text-lg font-black leading-none mt-1">15</span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="font-semibold text-slate-800 text-sm">Noche BESCO</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><Award size={12} /> Premiación anual</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
