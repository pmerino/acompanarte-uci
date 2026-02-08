import { colors } from '@/constants/colors';
import { Device } from './types';

export const devices: Device[] = [
  {
    id: 'ventilador',
    icon: 'air',
    color: colors.category.devices,
    colorLight: colors.sageLight,
  },
  {
    id: 'monitor',
    icon: 'monitor-heart',
    color: colors.primary,
    colorLight: colors.primaryLight,
  },
  {
    id: 'bombas_infusion',
    icon: 'water-drop',
    color: colors.lavender,
    colorLight: colors.lavenderLight,
  },
  {
    id: 'cateteres',
    icon: 'linear-scale',
    color: colors.peach,
    colorLight: colors.peachLight,
  },
  {
    id: 'dialisis',
    icon: 'opacity',
    color: colors.sky,
    colorLight: colors.skyLight,
  },
  {
    id: 'drenajes',
    icon: 'download',
    color: colors.sage,
    colorLight: colors.sageLight,
  },
  {
    id: 'ecmo',
    icon: 'settings-suggest',
    color: colors.rose,
    colorLight: colors.roseLight,
  },
];
