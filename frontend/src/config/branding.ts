export const brandingConfig = {
  empresa: {
    nombre: "Renault",
    eslogan: "Passion for life",
    logo: "/assets/logosEmpresas/renault-logo.svg",
  },
  
  colores: {
    // Colores Renault Minimalistas (Nouvel'R) - Dominancia de negros, grises y blanco, con detalles amarillos
    primario: "#000000",           // Negro puro (para botones principales, sidebar activo)
    primarioOscuro: "#1A1A1A",     // Negro suavizado
    primarioClaro: "#333333",      // Gris muy oscuro
    
    secundario: "#F4F4F4",         // Gris claro para fondos secundarios
    acento: "#FFCC00",             // Amarillo Renault (solo para detalles y badges)
    acentoOscuro: "#E6B800",       // Amarillo oscuro
    
    peligro: "#EF4444",            
    advertencia: "#F59E0B",        
    exito: "#10B981",              
    
    // Fondos - muy limpios, blancos y grises
    fondoPrincipal: "#FFFFFF",     // Blanco puro
    fondoSecundario: "#FAFAFA",    // Gris casi blanco (ultra limpio)
    fondoTerciario: "#F0F0F0",     // Gris claro para tarjetas o elementos inactivos
    fondoClaro: "#FFFFFF",         
    
    // Textos
    textoClaro: "#000000",         // Negro absoluto para alto contraste
    textoMedio: "#555555",         // Gris medio para texto secundario
    textoOscuro: "#888888",        // Gris claro para notas o placeholders
    textoEnOscuro: "#FFFFFF",      // Blanco puro sobre fondos negros
    
    // Bordes
    borde: "#E5E5E5",              // Gris muy sutil para bordes
    bordeHover: "#000000",         // Bordes negros al hacer hover (minimalista)
    
    // Gradientes - Eliminamos gradientes pesados para mantener el minimalismo
    gradientePrimario: "linear-gradient(135deg, #111111 0%, #000000 100%)",
    gradienteSecundario: "linear-gradient(135deg, #F9F9F9 0%, #F0F0F0 100%)",
    gradienteAcento: "linear-gradient(135deg, #FFCC00 0%, #FFD633 100%)",
    
    // Glass effect
    fondoGlass: "rgba(255, 255, 255, 0.8)", // Clean glass
    
    // Sombras (más sutiles y elegantes)
    sombra: "0 2px 8px rgba(0, 0, 0, 0.04)",
    sombraMedia: "0 8px 16px rgba(0, 0, 0, 0.06)",
    sombraGrande: "0 16px 32px rgba(0, 0, 0, 0.08)",
  },
  
  metricas: {
    empleados: 568,
    departamentos: 9,
    tareasCompletadas: 13,
    progreso: 70,
  },
  
  ia: {
    nombre: "MAYIA",
    modelo: "Gemini 2.5 Flash",
    habilitado: true,
  }
};

export type BrandingConfig = typeof brandingConfig;