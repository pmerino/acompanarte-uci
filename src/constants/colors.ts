export const colors = {
  // Fondos principales
  background: '#F7F9FB',
  surface: '#FFFFFF',
  surfaceSecondary: '#EDF4F8',

  // Texto
  textPrimary: '#1A2B3C',
  textSecondary: '#5A6B7C',
  textTertiary: '#8A97A4',
  textInverse: '#FFFFFF',

  // Azul principal - confianza y serenidad
  primary: '#4A90B8',
  primaryLight: '#D6E8F4',
  primaryDark: '#2E6A8A',

  // Verde salvia - esperanza y calma
  sage: '#7BA68C',
  sageLight: '#DFF0E4',
  sageDark: '#5C8A6C',

  // Melocotón - calidez y cercanía
  peach: '#E8A87C',
  peachLight: '#FDE8D8',
  peachDark: '#C4845C',

  // Lavanda - tranquilidad
  lavender: '#9B8EC4',
  lavenderLight: '#E8E2F4',
  lavenderDark: '#7A6EA0',

  // Azul cielo - información
  sky: '#6BAED6',
  skyLight: '#DCF0FA',
  skyDark: '#4A8AB0',

  // Rosa suave - apoyo emocional
  rose: '#D4889C',
  roseLight: '#F8E4EA',
  roseDark: '#B06A80',

  // Colores por categoría
  category: {
    conditions: '#4A90B8',   // azul - patologías
    devices: '#7BA68C',      // verde - dispositivos
    info: '#E8A87C',         // melocotón - info útil
    help: '#9B8EC4',         // lavanda - cómo ayudar
    social: '#6BAED6',       // cielo - trabajador social
    glossary: '#D4889C',     // rosa - glosario
    faq: '#4A90B8',          // azul - FAQ
    emergency: '#E07A5F',    // coral - emergencias
    emotional: '#9B8EC4',    // lavanda - apoyo emocional
    settings: '#8A97A4',     // gris - ajustes
  },

  // Estados
  border: '#E2E8F0',
  borderLight: '#F0F4F8',
  divider: '#E8EDF2',
  shadow: 'rgba(26, 43, 60, 0.08)',

  // Feedback
  success: '#68B984',
  warning: '#E8A87C',
  error: '#E07A5F',
} as const;

export type ColorKey = keyof typeof colors;
