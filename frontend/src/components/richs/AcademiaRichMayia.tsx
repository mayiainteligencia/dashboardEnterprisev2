import React, { useState } from 'react';
import { BookOpen, GraduationCap, Award, PlayCircle, Users, CheckSquare, Plus } from 'lucide-react';

interface Course {
  id: string;
  titulo: string;
  categoria: string;
  avance: number; // percentage
  alumnos: number;
  horas: number;
  estatus: 'activo' | 'completado' | 'planeado';
}

const initialCourses: Course[] = [
  { id: '1', titulo: 'IA Aplicada a Ventas Foodservice', categoria: 'Comercial', avance: 88, alumnos: 120, horas: 12, estatus: 'activo' },
  { id: '2', titulo: 'Data Literacy de Inventarios & Supply Chain', categoria: 'Operaciones', avance: 65, alumnos: 85, horas: 15, estatus: 'activo' },
  { id: '3', titulo: 'Técnicas de Decoración y Tendencias con IA', categoria: 'Técnico Pastelería', avance: 42, alumnos: 50, horas: 8, estatus: 'activo' },
  { id: '4', titulo: 'Demand Sensing & Forecast para Distribuidores', categoria: 'Distribución', avance: 0, alumnos: 30, horas: 10, estatus: 'planeado' },
];

export const AcademiaRichMayia: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [showModal, setShowModal] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCat, setNewCourseCat] = useState('Comercial');

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;

    const nuevo: Course = {
      id: String(courses.length + 1),
      titulo: newCourseTitle,
      categoria: newCourseCat,
      avance: 0,
      alumnos: 0,
      horas: 8,
      estatus: 'planeado'
    };

    setCourses([...courses, nuevo]);
    setNewCourseTitle('');
    setShowModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      
      {/* Module Header — Limpio e institucional */}
      <div style={{
        background: '#FAFAFA',
        border: '1px solid var(--border)',
        borderRadius: '12px', padding: '20px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <GraduationCap size={18} color="#EA580C" />
            <span style={{ fontSize: '11px', color: '#EA580C', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Academia Rich + MAYIA — Formación Tecnológica & Adopción
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '750', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
            Capacitación y Adopción de IA para Equipos
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Programas educativos diseñados para certificar a vendedores de foodservice, chefs técnicos y distribuidores en el uso de herramientas predictivas de datos.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary"
          style={{
            background: '#EA580C',
            borderColor: '#EA580C',
            borderRadius: '8px',
            padding: '10px 18px',
            fontSize: '13px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Plus size={16} /> Crear Curso
        </button>
      </div>

      {/* Grid of stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Alumnos Certificados', val: '285', icon: Award, col: '#EA580C' },
          { label: 'Cursos Activos', val: '3', icon: BookOpen, col: '#1E40AF' },
          { label: 'Horas de Cátedra', val: '45 hrs', icon: PlayCircle, col: '#10B981' },
          { label: 'Tasa de Acreditación', val: '94%', icon: CheckSquare, col: '#F59E0B' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${s.col}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} color={s.col} />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>{s.label}</div>
                <div style={{ fontSize: '20px', fontWeight: '750', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', marginTop: '2px' }}>{s.val}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Courses List */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', marginBottom: '18px' }}>
          Programas de Estudio y Progreso del Personal
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {courses.map(c => (
            <div
              key={c.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: '#F8FAFC',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                gap: '20px'
              }}
            >
              <div style={{ flex: 2, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '6px', background: 'rgba(30,64,175,0.08)', color: '#1E40AF' }}>
                    {c.categoria}
                  </span>
                  {c.estatus === 'planeado' && (
                    <span style={{ fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '6px', background: '#FEF3C7', color: '#D97706' }}>
                      Próximamente
                    </span>
                  )}
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {c.titulo}
                </h4>
              </div>

              {/* Progress bar */}
              <div style={{ flex: 3, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${c.avance}%`, background: 'linear-gradient(90deg, #EA580C, #D31245)', borderRadius: '4px' }} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-primary)', width: '35px', textAlign: 'right' }}>
                  {c.avance}%
                </span>
              </div>

              {/* Alumnos / Info */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                <Users size={14} />
                <span style={{ fontSize: '12px', fontWeight: '600' }}>{c.alumnos} registrados</span>
              </div>

              <div style={{ flex: 1, fontSize: '12px', color: 'var(--text-muted)', textAlign: 'right' }}>
                Duración: <strong>{c.horas} horas</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for new course */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
          <form onSubmit={handleAddCourse} style={{ width: '90%', maxWidth: '420px', background: '#FFF', borderRadius: '24px', padding: '24px', border: '1px solid var(--border)', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', marginBottom: '16px' }}>Crear Nuevo Curso</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Nombre del Programa</label>
                <input
                  type="text"
                  value={newCourseTitle}
                  onChange={e => setNewCourseTitle(e.target.value)}
                  placeholder="Ej. Forecasting Avanzado para Chefs Técnicos"
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', fontSize: '13px' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Categoría</label>
                <select
                  value={newCourseCat}
                  onChange={e => setNewCourseCat(e.target.value)}
                  style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', fontSize: '13px', backgroundColor: '#FFF' }}
                >
                  <option value="Comercial">Comercial (Foodservice)</option>
                  <option value="Operaciones">Operaciones (Inventarios)</option>
                  <option value="Técnico Pastelería">Técnico (Chefs de Pastelería)</option>
                  <option value="Distribución">Distribución (Puntos de Venta)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowModal(false)} style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: '#FFF', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                Cancelar
              </button>
              <button type="submit" style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: '#EA580C', color: '#FFF', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                Agregar Curso
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
