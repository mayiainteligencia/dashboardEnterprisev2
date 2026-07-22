import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  BarChart3, 
  ShieldCheck, 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Users, 
  MapPin,
  Activity
} from 'lucide-react';
import { brandingConfig } from '../../config/branding';

export const Operaciones: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const kpis = [
    { label: 'Órdenes Activas', value: '142', icon: <Activity size={20} />, color: brandingConfig.colores.acento },
    { label: 'Técnicos Desplegados', value: '87', icon: <Users size={20} />, color: '#10B981' }, // Green
    { label: 'SLA Cumplimiento', value: '96.4%', icon: <CheckCircle2 size={20} />, color: brandingConfig.colores.acento },
    { label: 'Alertas Críticas', value: '3', icon: <AlertTriangle size={20} />, color: '#EF4444' }, // Red
  ];

  const largeCards = [
    {
      id: 'produccion',
      title: 'Producción',
      image: '/assets/operaciones/produccion.png',
      description: 'Control de líneas de producción y servicios en campo. Monitoreo constante de operarios.',
      sla: 98,
      activeOrders: 45,
      status: 'ÓPTIMO',
      statusColor: '#10B981', // Green
      icon: <BarChart3 className="text-slate-400" size={24} />
    },
    {
      id: 'mantenimiento',
      title: 'Mantenimiento',
      image: '/assets/operaciones/mantenimiento.png',
      description: 'Mantenimiento preventivo y correctivo de instalaciones industriales, control de incidencias.',
      sla: 89,
      activeOrders: 97,
      status: 'EN ALERTA',
      statusColor: '#F59E0B', // Amber
      icon: <Wrench className="text-slate-400" size={24} />
    }
  ];

  const mediumCards = [
    {
      id: 'inventario',
      title: 'Inventario',
      image: '/assets/operaciones/inventario.png',
      description: 'Gestión de almacén central y control de stock de refacciones críticas.',
      status: 'ACTIVO',
      statusColor: '#10B981',
      metrics: [
        { label: 'Items Stock', value: '14.2k' },
        { label: 'Abastecimiento', value: '92%' }
      ],
      icon: <Package size={18} />
    },
    {
      id: 'logistica',
      title: 'Logística',
      image: '/assets/operaciones/logistica.png',
      description: 'Distribución de recursos, despacho de técnicos y ruteo a locaciones.',
      status: 'ACTIVO',
      statusColor: '#10B981',
      metrics: [
        { label: 'Rutas Activas', value: '24' },
        { label: 'Vehículos', value: '18' }
      ],
      icon: <Truck size={18} />
    },
    {
      id: 'calidad',
      title: 'Calidad',
      image: '/assets/operaciones/calidad.png',
      description: 'Auditorías de calidad, inspecciones de seguridad y normativas ISO.',
      status: 'REVISIÓN',
      statusColor: '#F59E0B',
      metrics: [
        { label: 'Auditorías', value: '4' },
        { label: 'Score Promedio', value: '98/100' }
      ],
      icon: <ShieldCheck size={18} />
    }
  ];

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100%', padding: '2rem' }}>
      
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2" style={{ color: brandingConfig.colores.acento }}>
          Operaciones en Campo
        </h1>
        <p className="text-slate-500 mb-6">
          Panel de control maestro para facilities management, mantenimiento e inventario de BESCO.
        </p>

        {/* KPI Chips */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {kpis.map((kpi, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 transition-all hover:shadow-md"
            >
              <div 
                className="p-3 rounded-lg flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: kpi.color }}
              >
                {kpi.icon}
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">{kpi.label}</p>
                <p className="text-2xl font-bold text-slate-800">{kpi.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Top Row: Large Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {largeCards.map((card) => (
            <div 
              key={card.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 flex flex-col md:flex-row group cursor-pointer"
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transform: hoveredCard === card.id ? 'translateY(-4px)' : 'none'
              }}
            >
              {/* Image Section (40%) */}
              <div className="md:w-[40%] relative overflow-hidden h-48 md:h-auto">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div 
                  className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-md"
                  style={{ backgroundColor: card.statusColor }}
                >
                  <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                  {card.status}
                </div>
              </div>

              {/* Info Section (60%) */}
              <div className="md:w-[60%] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-slate-800">{card.title}</h2>
                    {card.icon}
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* SLA Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 font-medium">SLA Cumplimiento</span>
                      <span className="font-bold" style={{ color: card.sla >= 95 ? '#10B981' : '#F59E0B' }}>
                        {card.sla}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${card.sla}%`, 
                          backgroundColor: card.sla >= 95 ? '#10B981' : '#F59E0B' 
                        }}
                      />
                    </div>
                  </div>

                  {/* Active Orders */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <Clock size={16} className="text-slate-400" />
                    <span className="text-sm text-slate-600">
                      Órdenes activas: <span className="font-bold text-slate-800">{card.activeOrders}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row: Medium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mediumCards.map((card) => (
            <div 
              key={card.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col group cursor-pointer"
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transform: hoveredCard === card.id ? 'translateY(-4px)' : 'none'
              }}
            >
              {/* Image Top */}
              <div className="h-[160px] relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div 
                  className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm flex items-center gap-1.5"
                  style={{ backgroundColor: card.statusColor }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                  {card.status}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="p-2 rounded-lg text-white shadow-sm"
                    style={{ backgroundColor: brandingConfig.colores.acento }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">{card.title}</h3>
                </div>
                
                <p className="text-sm text-slate-500 mb-6 flex-1">
                  {card.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 mt-auto">
                  {card.metrics.map((metric, idx) => (
                    <div key={idx}>
                      <p className="text-xs text-slate-400 font-medium mb-1">{metric.label}</p>
                      <p className="text-base font-bold text-slate-700">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
