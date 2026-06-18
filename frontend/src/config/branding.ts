export const brandingConfig = {
  empresa: {
    nombre: "Honda",
    eslogan: "The Power of Dreams",
    logo: "/assets/logosEmpresas/hondaLogo.png",
  },
  
  colores: {
    // Colores Honda - Dominancia de rojo, negro y gris, sobre fondos limpios blancos
    primario: "#CC0000",           // Rojo Honda (para botones principales, sidebar activo)
    primarioOscuro: "#990000",     // Rojo oscuro
    primarioClaro: "#FF3333",      // Rojo claro
    
    secundario: "#F4F4F4",         // Gris claro para fondos secundarios
    acento: "#CC0000",             // Rojo Honda (para detalles y badges)
    acentoOscuro: "#990000",       // Rojo oscuro
    
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
    textoEnOscuro: "#FFFFFF",      // Blanco puro sobre fondos negros o rojos
    
    // Bordes
    borde: "#E5E5E5",              // Gris muy sutil para bordes
    bordeHover: "#CC0000",         // Bordes rojos al hacer hover
    
    // Gradientes - Eliminamos gradientes pesados para mantener el minimalismo
    gradientePrimario: "linear-gradient(135deg, #CC0000 0%, #990000 100%)",
    gradienteSecundario: "linear-gradient(135deg, #F9F9F9 0%, #F0F0F0 100%)",
    gradienteAcento: "linear-gradient(135deg, #CC0000 0%, #FF3333 100%)",
    
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
    modelo: "Gemini 3.5 Flash",
    habilitado: true,
  }
};

export type BrandingConfig = typeof brandingConfig;