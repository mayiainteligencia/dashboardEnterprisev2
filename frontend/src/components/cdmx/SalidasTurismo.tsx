import React, { useState } from 'react';
import { Compass, Calendar, MapPin, Ticket, Star, ArrowRight, Eye, Info, Landmark, Trees, Trophy, Music, Coffee } from 'lucide-react';

interface Destino {
  nombre: string;
  categoria: 'Cultura' | 'Historia' | 'Naturaleza' | 'Deporte' | 'Entretenimiento' | 'Gastronomía';
  linea: string;
  estacion: string;
  tiempo: string;
  descripcion: string;
  rating: number;
  accesible: boolean;
}

const DESTINOS: Destino[] = [
  { nombre: 'Museo de Antropología', categoria: 'Cultura', linea: 'L7', estacion: 'Auditorio', tiempo: '15 min', descripcion: 'El museo más emblemático de México con colecciones arqueológicas inestimables de Mesoamérica.', rating: 5, accesible: true },
  { nombre: 'Zócalo Capitalino', categoria: 'Historia', linea: 'L2', estacion: 'Zócalo', tiempo: '5 min', descripcion: 'La Plaza de la Constitución, Palacio Nacional, Templo Mayor y la gran Catedral.', rating: 5, accesible: true },
  { nombre: 'Canales de Xochimilco', categoria: 'Naturaleza', linea: 'TL', estacion: 'Xochimilco', tiempo: '45 min', descripcion: 'Jardines flotantes prehispánicos y paseos tradicionales en trajineras coloridas.', rating: 4, accesible: false },
  { nombre: 'Estadio Azteca', categoria: 'Deporte', linea: 'L2', estacion: 'Tasqueña + Tren Ligero', tiempo: '50 min', descripcion: 'El coloso de Santa Úrsula, sede histórica de mundiales y grandes partidos.', rating: 5, accesible: true },
  { nombre: 'Auditorio Nacional', categoria: 'Entretenimiento', linea: 'L7', estacion: 'Auditorio', tiempo: '20 min', descripcion: 'El recinto de espectáculos y conciertos más importante de América Latina.', rating: 5, accesible: true },
  { nombre: 'Mercado de Jamaica', categoria: 'Gastronomía', linea: 'L8', estacion: 'Jamaica', tiempo: '10 min', descripcion: 'Famoso por su inmensa variedad de flores, plantas y antojitos tradicionales.', rating: 4, accesible: false },
  { nombre: 'Palacio de Bellas Artes', categoria: 'Cultura', linea: 'L2', estacion: 'Bellas Artes', tiempo: '2 min', descripcion: 'Obra cumbre del Art Nouveau con espectaculares murales de Rivera, Siqueiros y Orozco.', rating: 5, accesible: true },
  { nombre: 'Foro Sol', categoria: 'Entretenimiento', linea: 'L9', estacion: 'Ciudad Deportiva', tiempo: '25 min', descripcion: 'Sede de conciertos masivos de rock/pop y el Gran Premio de la F1.', rating: 4, accesible: true },
  { nombre: 'Teotihuacán', categoria: 'Historia', linea: 'L5', estacion: 'Autobuses del Norte', tiempo: '1h', descripcion: 'La gran ciudadela prehispánica de los dioses con las pirámides del Sol y la Luna.', rating: 5, accesible: false }
];

const EVENTOS_DESTACADOS = [
  { nombre: 'Concierto en Foro Sol', fecha: 'Sáb, 11 Julio', recinto: 'Foro Sol', transporte: 'Línea 9 (Ciudad Deportiva)', desc: 'Servicio de Metro extendido hasta las 01:00 AM.' },
  { nombre: 'Fútbol en Estadio Azteca', fecha: 'Dom, 12 Julio', recinto: 'Estadio Azteca', transporte: 'Tren Ligero (Estadio Azteca)', desc: 'Frecuencia aumentada en Tren Ligero previo y posterior al partido.' },
  { nombre: 'Feria de las Flores', fecha: 'Dom, 12 Julio', recinto: 'Mercado de Jamaica', transporte: 'Línea 8 (Jamaica)', desc: 'Afluencia alta esperada. Usa la Tarjeta MI.' }
];

const CATEGORIAS = ['Todos', 'Cultura', 'Historia', 'Naturaleza', 'Deporte', 'Entretenimiento', 'Gastronomía'];

const LINEA_COLORES: Record<string, string> = {
  'L1': '#F54394', 'L2': '#004F9F', 'L3': '#007D63', 'L4': '#B0925A',
  'L5': '#F5A623', 'L6': '#DA0000', 'L7': '#E87722', 'L8': '#009A44',
  'L9': '#6B2E8C', 'L12': '#B5A139', 'TL': '#B5A139'
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Cultura': return <Landmark size={24} color="var(--color-metro-primary)" />;
    case 'Historia': return <Landmark size={24} color="var(--color-metro-gold)" />;
    case 'Naturaleza': return <Trees size={24} color="var(--color-metro-green)" />;
    case 'Deporte': return <Trophy size={24} color="var(--color-metro-blue)" />;
    case 'Entretenimiento': return <Music size={24} color="var(--color-metro-purple)" />;
    case 'Gastronomía': return <Coffee size={24} color="var(--color-metro-orange)" />;
    default: return <Compass size={24} color="#A0AEC0" />;
  }
};

export const SalidasTurismo: React.FC<{ onNavigate?: (section: string) => void }> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredDestinos = selectedCategory === 'Todos'
    ? DESTINOS
    : DESTINOS.filter(d => d.categoria === selectedCategory);

  const totalDestinos = DESTINOS.length;
  const accesibles = DESTINOS.filter(d => d.accesible).length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)', gap: '20px', height: 'calc(100vh - 120px)' }}>
      {/* LEFT COLUMN: DESTINATIONS & FILTERS */}
      <div className="no-scrollbar" style={{ overflowY: 'auto', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* STATS SUMMARY BAR */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {[
            { label: 'Destinos Recomendados', value: `${totalDestinos} sitios`, color: 'var(--color-metro-primary)' },
            { label: 'Recintos Accesibles', value: `${accesibles} de ${totalDestinos}`, color: 'var(--color-metro-green)' },
            { label: 'Tiempo de viaje promedio', value: '25 min', color: 'var(--color-metro-gold)' }
          ].map((s, i) => (
            <div key={i} style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '12px', padding: '12px 14px', borderLeft: `3px solid ${s.color}` }}>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#fff', fontFamily: 'Outfit, sans-serif' }}>{s.value}</div>
              <div style={{ fontSize: '10px', color: '#A0AEC0', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {CATEGORIAS.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 14px', borderRadius: '999px', fontSize: '11.5px',
                background: selectedCategory === cat ? 'var(--color-metro-primary)' : '#1A1A2E',
                border: `1px solid ${selectedCategory === cat ? 'var(--color-metro-primary)' : '#2A2A3E'}`,
                color: selectedCategory === cat ? '#fff' : '#A0AEC0',
                fontWeight: '700', cursor: 'pointer', transition: 'all 0.18s'
              }}
              onMouseEnter={e => { if (selectedCategory !== cat) e.currentTarget.style.borderColor = 'var(--color-metro-primary)'; }}
              onMouseLeave={e => { if (selectedCategory !== cat) e.currentTarget.style.borderColor = '#2A2A3E'; }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CARDS LIST */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
          {filteredDestinos.map((d, idx) => {
            const lineColor = LINEA_COLORES[d.linea] || '#4A5568';
            return (
              <div
                key={idx}
                style={{
                  background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '16px',
                  padding: '16px', display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between', gap: '12px', transition: 'all 0.2s',
                  animation: `cardEnter 0.35s ease ${idx * 0.05}s both`
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-metro-primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A3E'; }}
              >
                <div>
                  {/* Title & Emoji replaced with category icon */}
                  <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '8px', border: '1px solid #2A2A3E' }}>
                      {getCategoryIcon(d.categoria)}
                    </div>
                    <span style={{
                      fontSize: '9px', fontWeight: '800', color: '#fff',
                      background: 'rgba(255,255,255,0.04)', border: '1px solid #2A2A3E',
                      padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase'
                    }}>{d.categoria}</span>
                  </div>

                  <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#fff', margin: '0 0 6px' }}>{d.nombre}</h4>
                  
                  {/* Rating & Accessibility */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', gap: '1px' }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={10} color={i < d.rating ? '#F5A623' : '#2A2A3E'} fill={i < d.rating ? '#F5A623' : 'none'} />
                      ))}
                    </div>
                    {d.accesible && (
                      <span style={{ fontSize: '9px', color: '#00843D', fontWeight: '700', background: 'rgba(0,132,61,0.12)', padding: '1px 6px', borderRadius: '4px' }}>
                        ♿ Accesible
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '11.5px', color: '#A0AEC0', lineHeight: 1.4, margin: 0 }}>
                    {d.descripcion}
                  </p>
                </div>

                {/* Footer connection details & CTA */}
                <div style={{ borderTop: '1px solid #2A2A3E', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={11} color="#A0AEC0" />
                      <span style={{ color: '#fff', fontWeight: '600' }}>{d.estacion}</span>
                    </div>
                    <span style={{ background: lineColor, color: '#fff', fontSize: '9px', fontWeight: '800', padding: '1px 5px', borderRadius: '3px' }}>
                      {d.linea}
                    </span>
                  </div>

                  {onNavigate && (
                    <button
                      onClick={() => onNavigate('home')}
                      style={{
                        width: '100%', background: '#121212', border: '1px solid #2A2A3E',
                        color: 'var(--color-metro-primary)', padding: '7px', borderRadius: '8px',
                        fontSize: '11px', fontWeight: '700', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,0,0,0.12)'; e.currentTarget.style.borderColor = 'var(--color-metro-primary)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#121212'; e.currentTarget.style.borderColor = '#2A2A3E'; }}
                    >
                      Planificar Viaje
                      <ArrowRight size={11} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: EVENTS CALENDAR */}
      <div style={{ background: '#1A1A2E', border: '1px solid #2A2A3E', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }} className="no-scrollbar">
        
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Outfit, sans-serif', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          <Calendar size={16} color="var(--color-metro-gold)" />
          Calendario de Eventos en CDMX
        </h3>
        
        <p style={{ fontSize: '11.5px', color: '#A0AEC0', margin: 0, lineHeight: 1.4 }}>
          Información en tiempo real sobre la movilidad recomendada para los próximos espectáculos, ferias o partidos deportivos.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {EVENTOS_DESTACADOS.map((ev, i) => (
            <div key={i} style={{ background: '#121212', border: '1px solid #2A2A3E', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-metro-gold)', fontWeight: '700' }}>{ev.fecha}</span>
                <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid #2A2A3E', padding: '1px 6px', borderRadius: '4px', color: '#A0AEC0' }}>
                  {ev.recinto}
                </span>
              </div>
              <strong style={{ fontSize: '13px', color: '#fff' }}>{ev.nombre}</strong>
              <div style={{ fontSize: '11px', color: 'var(--color-metro-primary)', fontWeight: '700' }}>
                📍 Transporte recomendado: {ev.transporte}
              </div>
              
              <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', background: 'rgba(212,0,0,0.06)', border: '1px solid rgba(212,0,0,0.15)', padding: '8px 10px', borderRadius: '6px', fontSize: '10px', color: '#A0AEC0', marginTop: '2px' }}>
                <Info size={11} color="var(--color-metro-primary)" style={{ flexShrink: 0, marginTop: '1px' }} />
                <span>{ev.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
