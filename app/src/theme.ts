import type { TextStyle } from 'react-native';

export const colors = {
  page: '#0b0a08',
  bg: '#12100d',
  surface: '#1b1916',
  surfacePressed: '#23201c',
  border: '#2a2723',
  borderStrong: '#2e2a25',
  divider: '#22201c',
  bracketLine: '#3a352f',
  text: '#f4efe6',
  textSoft: '#d9d3c9',
  textMuted: '#a39d93',
  textFaint: '#6f6a62',
  tabInactive: '#8a847a',
  gold: '#F4B829',
  goldTint: '#2a2410',
  live: '#ff6b57',
  liveTint: '#3a1a15',
  tag: '#26231f',
  silver: '#C9C4BA',
  bronze: '#C07A45',
  blue: '#3b6fd1',
} as const;

type Weight = 400 | 500 | 600 | 700 | 800;

const manropeFamilies: Record<Weight, string> = {
  400: 'Manrope_400Regular',
  500: 'Manrope_500Medium',
  600: 'Manrope_600SemiBold',
  700: 'Manrope_700Bold',
  800: 'Manrope_800ExtraBold',
};

/** Manrope at a given weight and size. Custom fonts need one family per weight on Android. */
export function manrope(weight: Weight, size: number, lineHeight?: number): TextStyle {
  return { fontFamily: manropeFamilies[weight], fontSize: size, ...(lineHeight ? { lineHeight: size * lineHeight } : null) };
}

/** Anton display face. `lineHeight` is a multiplier, as in the CSS shorthand. */
export function anton(size: number, lineHeight?: number): TextStyle {
  return { fontFamily: 'Anton_400Regular', fontSize: size, ...(lineHeight ? { lineHeight: size * lineHeight } : null) };
}

/** Small uppercase section label, e.g. "NEXT EVENT". */
export const eyebrow: TextStyle = { ...manrope(700, 10.5), letterSpacing: 1.2, color: colors.textMuted };
