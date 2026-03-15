import { colors } from '@/constants/colors';
import { Condition } from './types';

export const conditions: Condition[] = [
  {
    id: 'sdra',
    icon: 'air',
    color: colors.category.conditions,
    colorLight: colors.primaryLight,
  },
  {
    id: 'sepsis',
    icon: 'coronavirus',
    color: '#E07A5F',
    colorLight: '#FCE8E4',
  },
  {
    id: 'iam',
    icon: 'favorite',
    color: '#D4889C',
    colorLight: colors.roseLight,
  },
  {
    id: 'ictus',
    icon: 'psychology',
    color: colors.category.conditions,
    colorLight: colors.primaryLight,
  },
  {
    id: 'politrauma',
    icon: 'healing',
    color: colors.sage,
    colorLight: colors.sageLight,
  },
  {
    id: 'insuficiencia_respiratoria',
    icon: 'masks',
    color: colors.sky,
    colorLight: colors.skyLight,
  },
  {
    id: 'delirio',
    icon: 'nights-stay',
    color: colors.lavender,
    colorLight: colors.lavenderLight,
  },
  {
    id: 'hemorragia_subaracnoidea',
    icon: 'bloodtype',
    color: '#D4889C',
    colorLight: colors.roseLight,
  },
  {
    id: 'hemorragia_digestiva',
    icon: 'emergency',
    color: '#E07A5F',
    colorLight: '#FCE8E4',
  },
  {
    id: 'aclf',
    icon: 'medical-services',
    color: colors.peach,
    colorLight: colors.peachLight,
  },
];
