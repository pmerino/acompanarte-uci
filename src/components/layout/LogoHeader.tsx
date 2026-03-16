import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

const logoSacyl = require('../../../assets/logo-sacyl.png');
const logoUci = require('../../../assets/logo-uci.jpg');

export function LogoHeader() {
  return (
    <View style={styles.container}>
      <Image source={logoSacyl} style={styles.logoSacyl} resizeMode="contain" />
      <Image source={logoUci} style={styles.logoUci} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: spacing.sm,
  },
  // SACYL: 483x219 → ratio 2.205:1
  logoSacyl: {
    height: 38,
    width: 84,
  },
  // UCI: 653x415 → ratio 1.574:1
  logoUci: {
    height: 42,
    width: 66,
  },
});
