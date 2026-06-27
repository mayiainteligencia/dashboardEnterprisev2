import React, { useState } from 'react';
import { ChefHat, HelpCircle, MessageSquare, Plus, CheckCircle, Calculator, Thermometer } from 'lucide-react';

interface Recipe {
  id: string;
  nombre: string;
  productoPrincipal: string;
  rendimientoPorciones: number;
  estabilidadTemperatura: string; // e.g. "Hasta 28°C"
  dificultad: 'Fácil' | 'Media' | 'Avanzada';
  ingredientes: string[];
  instrucciones: string[];
}

const recipes: Recipe[] = [
  {
    id: '1',
    nombre: 'Pastel Tres Leches Tradicional Rich',
    productoPrincipal: 'Tres Riches Jarabe 1kg',
    rendimientoPorciones: 12,
    estabilidadTemperatura: 'Estable en refrigeración (4-8°C)',
    dificultad: 'Fácil',
    ingredientes: [
      '1 base de pan para pastel Rich (Vainilla 8")',
      '800g de Jarabe Tres Riches Original',
      '200g de Crema para batir Whip Topping Base (montada)',
      'Frutas de temporada para decorar'
    ],
    instrucciones: [
      'Colocar la base de pan en una base limpia y pinchar la superficie uniformemente.',
      'Verter el jarabe Tres Riches despacio para lograr una absorción del 100%.',
      'Batir el Whip Topping Base frío (entre 4°C y 7°C) a velocidad media hasta formar picos firmes.',
      'Decorar el pastel cubriendo los bordes y coronando con la fruta.'
    ]
  },
  {
    id: '2',
    nombre: 'Selva Negra Premium Versatié',
    productoPrincipal: 'Versatié Crema Culinaria 1L',
    rendimientoPorciones: 16,
    estabilidadTemperatura: 'Estable hasta 25°C',
    dificultad: 'Media',
    ingredientes: [
      '1 base de pan sabor chocolate Rich (8")',
      '300ml de Crema Culinaria Versatié (para el ganache)',
      '400g de Bettercreme Doble Chocolate (para cubrir)',
      '150g de cerezas en almíbar'
    ],
    instrucciones: [
      'Preparar un ganache de chocolate calentando Versatié e incorporando chocolate semiamargo.',
      'Dividir el pan en capas y rellenar con el ganache de chocolate y mitades de cereza.',
      'Cubrir el pastel con Bettercreme Doble Chocolate montado.',
      'Decorar con virutas de chocolate obscuro y cerezas enteras en la parte superior.'
    ]
  },
  {
    id: '3',
    nombre: 'Pastel de Bodas Alta Estabilidad Bettercreme',
    productoPrincipal: 'Bettercreme Vainilla 4kg',
    rendimientoPorciones: 24,
    estabilidadTemperatura: 'Excelente temperatura ambiente (Hasta 30°C)',
    dificultad: 'Avanzada',
    ingredientes: [
      '3 bases de pan Rich (10", 8", 6" para pisos)',
      '1.2kg de Bettercreme Vainilla',
      'Jarabe Tres Riches para humectar ligeramente',
      'Flores de fondant o flores orgánicas para decorar'
    ],
    instrucciones: [
      'Montar Bettercreme Vainilla a velocidad media-baja para evitar burbujas de aire.',
      'Armar los pisos humectando levemente el pan para no perder rigidez estructural.',
      'Aplicar una capa atrapamigas ligera y refrigerar por 15 minutos.',
      'Realizar la cobertura final lisa y montar los pisos con soportes internos. Decorar.'
    ]
  }
];

export const ChefTechnicalCopilot: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(recipes[0]);
  const [trouble, setTrouble] = useState('agrietamiento');
  const [aiResponse, setAiResponse] = useState(
    'Para evitar el agrietamiento de la crema en vitrina, asegúrate de no sobrebatir el producto (el sobrebatido incorpora demasiado aire y reseca la crema). Adicionalmente, verifica que la vitrina mantenga una humedad relativa adecuada (75-80%) y evita corrientes directas de aire frío sobre el pastel.'
  );

  const handleTroubleChange = (t: string) => {
    setTrouble(t);
    let resp = '';
    if (t === 'agrietamiento') {
      resp = 'Para evitar el agrietamiento de la crema en vitrina, asegúrate de no sobrebatir el producto (el sobrebatido incorpora demasiado aire y reseca la crema). Adicionalmente, verifica que la vitrina mantenga una humedad relativa adecuada (75-80%) y evita corrientes directas de aire frío sobre el pastel. Humectar el pan adecuadamente también evita que este absorba la humedad de la cobertura.';
    } else if (t === 'burbujas') {
      resp = 'Las burbujas de aire se forman usualmente al batir la crema a velocidad excesiva o por un batido prolongado. Solución: Bate siempre la crema líquida fría (4-7°C) a velocidad media en batidora de globo, llenando la taza solo hasta el 20-25% de su capacidad. Si la crema ya tiene burbujas, bate manualmente con una espátula para alisar y sacar el aire.';
    } else if (t === 'derretido') {
      resp = 'Si experimentas derretido o pérdida de estabilidad en zonas calurosas: 1) Cambia tu crema tradicional a Bettercreme Vainilla/Chocolate de Rich, la cual tolera hasta 30°C a temperatura ambiente sin perder forma. 2) Asegúrate de que las bases de pan no estén calientes al momento de decorar. 3) Mantén el tazón y batidor fríos antes de verter el producto.';
    } else if (t === 'rendimiento') {
      resp = 'Para maximizar el rendimiento (overrun) de Whip Topping Base: 1) Asegúrate de batir a la temperatura de producto recomendada (4.5°C a 7°C). Si está muy fría o congelada, no montará bien. 2) Respeta la proporción de dilución recomendada de 1 parte de crema base por hasta 1 parte de líquido adicional (agua, leche, pulpas).';
    }
    setAiResponse(resp);
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
            <ChefHat size={18} color="#D31245" />
            <span style={{ fontSize: '11px', color: '#D31245', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Chef Copilot Rich’s — Soporte Técnico & Innovación Dulce
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '750', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
            Chef & Bakery Technical Assistant
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Asistente inteligente para la formulación de recetas, control de rendimiento y resolución de problemas de consistencia en reposterías profesionales.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ padding: '8px 14px', background: '#FFF', border: '1px solid var(--border)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600' }}>TEMPERATURA MAX SOPORTADA</div>
            <div style={{ fontSize: '16px', fontWeight: '750', color: '#D31245' }}>30°C (Bettercreme)</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* RECIPE BOX */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
            Fichas Técnicas & Recetario Autorizado
          </h3>
          
          {/* Selector buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recipes.map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedRecipe(r)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid',
                  borderColor: selectedRecipe.id === r.id ? '#D31245' : 'var(--border)',
                  background: selectedRecipe.id === r.id ? 'rgba(211,18,69,0.03)' : '#FFF',
                  transition: 'all 0.15s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{r.nombre}</span>
                  <span style={{ fontSize: '10px', fontWeight: '700', padding: '2px 6px', borderRadius: '6px', background: '#F1F5F9', color: 'var(--text-secondary)' }}>
                    {r.dificultad}
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Base: {r.productoPrincipal}
                </div>
              </button>
            ))}
          </div>

          {/* Selected Recipe Details */}
          <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '16px', border: '1px solid var(--border)', flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px', fontSize: '11px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Rendimiento: </span>
                <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{selectedRecipe.rendimientoPorciones} porciones</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Tolerancia: </span>
                <span style={{ fontWeight: '700', color: '#D31245' }}>{selectedRecipe.estabilidadTemperatura}</span>
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>Ingredientes Clave:</div>
              <ul style={{ paddingLeft: '16px', margin: 0, fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {selectedRecipe.ingredientes.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>

            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>Procedimiento:</div>
              <ol style={{ paddingLeft: '16px', margin: 0, fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedRecipe.instrucciones.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* TROUBLESHOOTING BOX */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={18} color="#D31245" />
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
              Resolución de Incidencias de Calidad (Pastelería)
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Seleccione el problema observado:</label>
            <select
              value={trouble}
              onChange={e => handleTroubleChange(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                outline: 'none',
                backgroundColor: '#F8FAFC',
                fontSize: '13px',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}
            >
              <option value="agrietamiento">Agrietamiento o resecamiento de la crema en vitrina</option>
              <option value="burbujas">Presencia de burbujas de aire / textura porosa</option>
              <option value="derretido">Derretido rápido o pérdida de forma en clima cálido</option>
              <option value="rendimiento">Poco rendimiento o volumen al batir (bajo Overrun)</option>
            </select>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(30,64,175,0.02) 0%, rgba(211,18,69,0.02) 100%)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '16px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '8px' }}>
              <span style={{
                background: '#D31245',
                color: '#FFF',
                fontSize: '9px',
                fontWeight: '800',
                padding: '2px 6px',
                borderRadius: '4px'
              }}>RECOMENDACIÓN MAYIA AI</span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Solución técnica instantánea</span>
            </div>
            
            <p style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              whiteSpace: 'pre-line'
            }}>
              {aiResponse}
            </p>
          </div>

          {/* Calculator widget */}
          <div style={{
            background: '#FFF',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calculator size={15} color="#1E40AF" />
              <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Calculadora de Rendimiento de Crema</span>
            </div>
            <button
              onClick={() => alert('Simulador de cálculo: 1L de Crema Whip Topping rinde para cubrir y decorar 3 pasteles medianos (8") con overrun de 3.2x.')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#1E40AF',
                fontWeight: '700',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Abrir Calculadora &rarr;
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
