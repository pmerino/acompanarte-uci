import { colors } from '@/constants/colors';
import { InfoTopic } from './types';

export const infoTopics: InfoTopic[] = [
  {
    id: 'horarios',
    icon: 'schedule',
    color: colors.category.info,
    colorLight: colors.peachLight,
  },
  {
    id: 'cafeteria',
    icon: 'restaurant',
    color: colors.sage,
    colorLight: colors.sageLight,
  },
  {
    id: 'telefonos',
    icon: 'phone',
    color: colors.primary,
    colorLight: colors.primaryLight,
  },
  {
    id: 'parking',
    icon: 'local-parking',
    color: colors.lavender,
    colorLight: colors.lavenderLight,
  },
  {
    id: 'alojamiento',
    icon: 'hotel',
    color: colors.sky,
    colorLight: colors.skyLight,
  },
  {
    id: 'pertenencias',
    icon: 'inventory-2',
    color: colors.peach,
    colorLight: colors.peachLight,
  },
  {
    id: 'normas',
    icon: 'rule',
    color: colors.rose,
    colorLight: colors.roseLight,
  },
];
