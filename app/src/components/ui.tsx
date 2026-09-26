import { useEffect, useRef, type ReactNode } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { anton, colors, manrope } from '@/theme';

/** Tab screen: safe-area top, scrolling body with the standard 20px gutter. */
export function Screen({ children, gap = 20, gutter = 20 }: { children: ReactNode; gap?: number; gutter?: number }) {
  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <ScrollView
        contentContainerStyle={{ paddingTop: 6, paddingBottom: 28, paddingHorizontal: gutter, gap }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function ScreenTitle({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[{ paddingTop: 8 }, style]}>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
}

export function Card({ children, style, radius = 18, padding = 20 }: { children: ReactNode; style?: StyleProp<ViewStyle>; radius?: number; padding?: number }) {
  return <View style={[styles.card, { borderRadius: radius, padding }, style]}>{children}</View>;
}

type ButtonVariant = 'light' | 'gold' | 'dark';
const buttonColors: Record<ButtonVariant, { bg: string; fg: string }> = {
  light: { bg: colors.text, fg: colors.bg },
  gold: { bg: colors.gold, fg: colors.bg },
  dark: { bg: colors.bg, fg: colors.text },
};

export function Button({ label, onPress, variant = 'light', height = 50 }: { label: string; onPress: () => void; variant?: ButtonVariant; height?: number }) {
  const c = buttonColors[variant];
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, { height, backgroundColor: c.bg }, pressed && { transform: [{ scale: 0.98 }] }]}
    >
      <Text style={[manrope(700, 15), { color: c.fg }]}>{label}</Text>
    </Pressable>
  );
}

/** Outlined secondary button used in headers ("Rules", "← Back"). */
export function GhostButton({ label, onPress, height = 36, filled }: { label: string; onPress: () => void; height?: number; filled?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.ghost,
        { height, backgroundColor: filled ? colors.surface : 'transparent' },
        pressed && { backgroundColor: colors.surfacePressed },
      ]}
    >
      <Text style={[manrope(600, 13), { color: colors.text }]}>{label}</Text>
    </Pressable>
  );
}

/** Two-option segmented control ("Day 1 · Gi" / "Day 2 · No-Gi"). */
export function Segmented<T extends string | number>({ options, value, onChange }: { options: [T, string][]; value: T; onChange: (v: T) => void }) {
  return (
    <View style={styles.segmented}>
      {options.map(([v, label]) => {
        const active = v === value;
        return (
          <Pressable
            key={String(v)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(v)}
            style={[styles.segment, active && { backgroundColor: colors.text }]}
          >
            <Text style={[manrope(700, 13), { color: active ? colors.bg : colors.textMuted }]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function Chip({ label, active, onPress, swatch, display }: { label: string; active: boolean; onPress: () => void; swatch?: string; display?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={[
        styles.chip,
        display ? styles.matChip : null,
        swatch ? { paddingLeft: 10, gap: 8 } : null,
        { backgroundColor: active ? colors.gold : colors.surface, borderColor: active ? colors.gold : colors.borderStrong },
      ]}
    >
      {swatch ? <View style={[styles.swatch, { backgroundColor: swatch }]} /> : null}
      <Text style={[display ? [anton(16), { letterSpacing: 0.5 }] : manrope(600, 13), { color: active ? colors.bg : colors.text }]}>{label}</Text>
    </Pressable>
  );
}

/** Pulsing red dot for live indicators. */
export function LiveDot({ size = 7 }: { size?: number }) {
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.35, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);
  return <Animated.View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: colors.live, opacity }} />;
}

export function Tag({ label, live }: { label: string; live?: boolean }) {
  return (
    <View style={[styles.tag, { backgroundColor: live ? colors.liveTint : colors.tag }]}>
      <Text style={[manrope(700, 9.5), { letterSpacing: 1, color: live ? colors.live : colors.textSoft }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  title: { ...anton(40, 1), textTransform: 'uppercase', color: colors.text },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  button: { borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  ghost: { paddingHorizontal: 14, borderRadius: 10, borderWidth: 1, borderColor: colors.borderStrong, alignItems: 'center', justifyContent: 'center' },
  segmented: { flexDirection: 'row', gap: 4, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 4 },
  segment: { flex: 1, height: 40, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  chip: { height: 36, paddingHorizontal: 14, borderRadius: 999, borderWidth: 1, flexDirection: 'row', alignItems: 'center' },
  matChip: { height: 38, paddingHorizontal: 16, borderRadius: 10 },
  swatch: { width: 14, height: 6, borderRadius: 2, borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(0,0,0,.35)' },
  tag: { paddingVertical: 3, paddingHorizontal: 7, borderRadius: 5 },
});
