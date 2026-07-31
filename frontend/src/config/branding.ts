export const brandingConfig = {
  empresa: {
    nombre: "VitroForte",
    eslogan: "Vidrios Blindados Certificados",
    logo: "/assets/LogoForte.jpg",
  },

  colores: {
    // Paleta VitroForte: crimson red, charcoal, grises metálicos sobre fondos blancos
    primario: "#d4000a",           // Crimson Red VitroForte (botones, sidebar activo)
    primarioOscuro: "#a30008",     // Rojo oscuro
    primarioClaro: "#ff1a24",      // Rojo claro

    secundario: "#f4f5f7",         // Gris metálico claro para fondos secundarios
    acento: "#d4000a",             // Crimson Red (detalles y badges)
    acentoOscuro: "#a30008",       // Rojo oscuro
    
    peligro: "#EF4444",            
    advertencia: "#F59E0B",        
    exito: "#10B981",              
    
    // Fondos - limpios, blancos y grises metálicos
    fondoPrincipal: "#FFFFFF",     // Blanco puro
    fondoSecundario: "#FAFAFA",    // Gris casi blanco
    fondoTerciario: "#f0f1f3",     // Gris metálico claro para tarjetas
    fondoClaro: "#FFFFFF",         
    
    // Textos
    textoClaro: "#000000",         // Negro absoluto para alto contraste
    textoMedio: "#4a5568",         // Slate gris para texto secundario
    textoOscuro: "#8a8f98",        // Gris metálico para notas o placeholders
    textoEnOscuro: "#FFFFFF",      // Blanco puro sobre fondos oscuros o rojos
    
    // Bordes
    borde: "#e2e8f0",              // Gris sutil metálico para bordes
    bordeHover: "#d4000a",         // Bordes crimson al hacer hover
    
    // Gradientes - VitroForte identity
    gradientePrimario: "linear-gradient(135deg, #d4000a 0%, #a30008 100%)",
    gradienteSecundario: "linear-gradient(135deg, #f9fafb 0%, #f0f1f3 100%)",
    gradienteAcento: "linear-gradient(135deg, #d4000a 0%, #ff1a24 100%)",
    
    // Glass effect
    fondoGlass: "rgba(255, 255, 255, 0.8)", // Clean glass
    
    // Sombras (sutiles y elegantes)
    sombra: "0 2px 8px rgba(0, 0, 0, 0.04)",
    sombraMedia: "0 8px 16px rgba(0, 0, 0, 0.06)",
    sombraGrande: "0 16px 32px rgba(0, 0, 0, 0.08)",
  },
  
  metricas: {
    empleados: 85,
    departamentos: 6,
    tareasCompletadas: 24,
    progreso: 78,
  },
  
  ia: {
    nombre: "MAYIA",
    modelo: "Gemini 3.5 Flash",
    habilitado: true,
  }
};

export type BrandingConfig = typeof brandingConfig;