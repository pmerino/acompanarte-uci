import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialIconName } from '@/data/types';

interface IconCircleProps {
  icon: MaterialIconName;
  color: string;
  backgroundColor: string;
  size?: number;
  iconSize?: number;
}

export function IconCircle({
  icon,
  color,
  backgroundColor,
  size = 48,
  iconSize = 24,
}: IconCircleProps) {
  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}
    >
      <MaterialIcons name={icon} size={iconSize} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
