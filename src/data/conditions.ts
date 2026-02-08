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
];
