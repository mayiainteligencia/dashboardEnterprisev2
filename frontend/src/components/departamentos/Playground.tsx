import React, { useState } from 'react';
import { 
  Code2, 
  Cpu, 
  Zap, 
  Play, 
  Terminal, 
  GitBranch, 
  Sparkles, 
  FlaskConical, 
  Clock, 
  User 
} from 'lucide-react';
import { brandingConfig } from '../../config/branding';

interface RecentActivity {
  id: number;
  icon: React.ReactNode;
  name: string;
  user: string;
  time: string;
  color: string;
}

interface GridTool {
  title: string;
  description: string;
  image: string;
  badge: string;
  badgeColor: string;
  metric: string;
  status: 'Running' | 'Ready' | 'Building';
}

const recentActivities: RecentActivity[] = [
  { id: 1, icon: <Terminal size={16} />, name: 'Prueba de Endpoint Facturación', user: 'Ana Martínez', time: 'Hace 10 min', color: 'text-blue-600' },
  { id: 2, icon: <Sparkles size={16} />, name: 'Fine-tuning modelo LLaMA2', user: 'Carlos Dev', time: 'Hace 45 min', color: 'text-purple-600' },
  { id: 3, icon: <GitBranch size={16} />, name: 'Flujo de Notificaciones', user: 'Elena Torres', time: 'Hace 2 horas', color: 'text-green-600' },
  { id: 4, icon: <Code2 size={16} />, name: 'Script de validación de datos', user: 'Sistema Automático', time: 'Hace 5 horas', color: 'text-gray-600' },
];

const gridTools: GridTool[] = [
  {
    title: 'Testing de API',
    description: 'Pruebas y validación de endpoints del core BESCO.',
    image: '/assets/playG/apitest.png',
    badge: 'REST API',
    badgeColor: 'bg-blue-100 text-blue-700',
    metric: '48 Endpoints',
    status: 'Ready',
  },
  {
    title: 'Sandbox de Código',
    description: 'Entorno de pruebas y desarrollo seguro.',
    image: '/assets/playG/codesandbox.png',
    badge: 'SANDBOX',
    badgeColor: 'bg-orange-100 text-orange-700',
    metric: '12 Workspaces',
    status: 'Running',
  },
  {
    title: 'Visualización',
    description: 'Demos interactivos de componentes de UI.',
    image: '/assets/playG/visualizacion.png',
    badge: 'DATA VIZ',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    metric: '8 Dashboards',
    status: 'Ready',
  },
  {
    title: 'Automatización',
    description: 'Flujos y scripts de prueba para operaciones.',
    image: '/assets/playG/automatizacion.png',
    badge: 'WORKFLOW',
    badgeColor: 'bg-teal-100 text-teal-700',
    metric: '24 Scripts',
    status: 'Building',
  }
];

export const Playground: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running': return 'text-green-600 bg-green-50';
      case 'Ready': return 'text-blue-600 bg-blue-50';
      case 'Building': return 'text-amber-600 bg-amber-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'Running': return 'bg-green-500';
      case 'Ready': return 'bg-blue-500';
      case 'Building': return 'bg-amber-500 animate-pulse';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-8 font-sans">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg text-[#8B5CF6]">
                <FlaskConical size={28} />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Playground</h1>
              <span className="px-3 py-1 bg-[#10B981] text-white text-xs font-bold rounded-full shadow-sm">
                BETA
              </span>
            </div>
            <p className="text-gray-500 font-medium text-lg">Zona de Experimentación & Innovación MAYIA</p>
          </div>

          <div className="flex gap-4">
            <div className="bg-white px-5 py-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Experimentos Activos</span>
              <span className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                12 <ActivityIcon />
              </span>
            </div>
            <div className="bg-white px-5 py-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">APIs Testeadas</span>
              <span className="text-2xl font-bold text-gray-800">48</span>
            </div>
            <div className="bg-white px-5 py-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Modelos IA</span>
              <span className="text-2xl font-bold text-[#8B5CF6]">8</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col xl:flex-row gap-6 mb-8">
        {/* Hero Card - Generative AI */}
        <div className="xl:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col md:flex-row h-full">
            <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden bg-gray-50">
              <img 
                src="/assets/playG/ia-gen.png" 
                alt="IA Generativa" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/90 md:to-white"></div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#8B5CF6] text-xs font-bold rounded-full shadow-sm flex items-center gap-1.5">
                  <Sparkles size={12} /> CORE AI
                </span>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="text-[#8B5CF6]" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">IA Generativa</h2>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Experimentos con modelos de lenguaje y visión por computadora. Entorno seguro para probar prompts, fine-tuning y cadenas de razonamiento (RAG) para soluciones BESCO.
              </p>
              
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Modelos Disponibles</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['GPT-4', 'Gemini', 'Claude', 'LLaMA2'].map((model, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-gray-50 py-2 px-3 rounded-lg border border-gray-100">
                      <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                      <span className="text-sm font-medium text-gray-700">{model}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="mt-auto group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white px-6 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                <Play size={18} className="group-hover:scale-110 transition-transform" />
                Iniciar Experimento
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity Sidebar Strip */}
        <div className="xl:w-1/3 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Clock size={18} className="text-[#10B981]" />
              Actividad Reciente
            </h3>
            <button className="text-sm text-[#038CAE] hover:underline font-medium">Ver todo</button>
          </div>
          
          <div className="space-y-5">
            {recentActivities.map((activity, index) => (
              <div key={activity.id} className="relative pl-4">
                {index !== recentActivities.length - 1 && (
                  <div className="absolute left-1.5 top-6 bottom-[-16px] w-[2px] bg-gray-100"></div>
                )}
                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-white border-2 border-gray-200 z-10"></div>
                
                <div className="flex gap-3">
                  <div className={`mt-1 p-2 rounded-lg bg-gray-50 ${activity.color} shrink-0`}>
                    {activity.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-0.5">{activity.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><User size={12} /> {activity.user}</span>
                      <span>•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid 2x2 Tools */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Zap size={20} className="text-amber-500" />
          Herramientas de Desarrollo
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gridTools.map((tool, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col cursor-pointer"
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-[140px] w-full overflow-hidden relative bg-gray-50">
                <img 
                  src={tool.image} 
                  alt={tool.title} 
                  className={`w-full h-full object-cover transition-transform duration-500 ${hoveredCard === idx ? 'scale-110' : 'scale-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${tool.badgeColor} uppercase bg-white`}>
                    {tool.badge}
                  </span>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{tool.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{tool.description}</p>
                
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-semibold text-gray-400">Métrica</span>
                    <span className="text-sm font-bold text-gray-700">{tool.metric}</span>
                  </div>
                  
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(tool.status)}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(tool.status)}`}></div>
                    {tool.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Mini helper component for activity pulse
const ActivityIcon = () => (
  <span className="relative flex h-3 w-3 ml-1">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981]"></span>
  </span>
);

export default Playground;
