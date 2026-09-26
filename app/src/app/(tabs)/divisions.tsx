import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Chip, Screen, ScreenTitle, Segmented } from '@/components/ui';
import { AGES, BELT_COLORS, beltsFor, weightRange, type Style } from '@/lib/divisions';
import { useAppState } from '@/state/AppState';
import { anton, colors, eyebrow, manrope } from '@/theme';

export default function DivisionsScreen() {
  const { selection, division, update, setAge } = useAppState();
  const { min, max } = weightRange(selection.age);

  return (
    <Screen>
      <View style={{ gap: 6 }}>
        <ScreenTitle>Find my division</ScreenTitle>
        <Text style={[manrope(500, 13), { color: colors.textMuted }]}>Match by style, age, belt and weight.</Text>
      </View>

      <Segmented<Style> options={[['gi', 'Gi'], ['nogi', 'No-Gi']]} value={selection.style} onChange={(style) => update({ style })} />

      <View style={{ gap: 10 }}>
        <Text style={eyebrow}>AGE</Text>
        <View style={styles.chips}>
          {AGES.map((a) => (
            <Chip key={a} label={a} active={a === selection.age} onPress={() => setAge(a)} />
          ))}
        </View>
      </View>

      <View style={{ gap: 10 }}>
        <Text style={eyebrow}>BELT</Text>
        <View style={styles.chips}>
          {beltsFor(selection.age).map((b) => (
            <Chip key={b} label={b} active={b === selection.belt} swatch={BELT_COLORS[b]} onPress={() => update({ belt: b })} />
          ))}
        </View>
      </View>

      <View style={{ gap: 10 }}>
        <View style={styles.weightHeader}>
          <Text style={eyebrow}>WEIGHT (WITH GI)</Text>
          <Text style={[anton(22), { color: colors.text }]}>{selection.weight.toFixed(1)} KG</Text>
        </View>
        <Slider
          minimumValue={min}
          maximumValue={max}
          step={0.5}
          value={selection.weight}
          onValueChange={(weight) => update({ weight })}
          minimumTrackTintColor={colors.gold}
          maximumTrackTintColor={colors.borderStrong}
          thumbTintColor={colors.gold}
          accessibilityLabel="Weight in kilograms"
        />
      </View>

      <View style={styles.result}>
        <Text style={[manrope(800, 10.5), { letterSpacing: 1.2, color: colors.bg }]}>YOUR DIVISION</Text>
        <Text style={[anton(30, 1.02), { textTransform: 'uppercase', color: colors.bg }]}>{division.title}</Text>
        <View style={styles.stats}>
          <Stat value={division.weightLimit} label="Weight limit" first />
          <Stat value={division.matchLength} label="Match length" />
          <Stat value={String(division.registered)} label="Registered" />
        </View>
        <Button variant="dark" label="Register for this division →" onPress={() => router.push('/register')} />
      </View>
    </Screen>
  );
}

function Stat({ value, label, first }: { value: string; label: string; first?: boolean }) {
  return (
    // The first cell has no side padding so it lines up with the card text.
    <View style={[styles.stat, { paddingHorizontal: first ? 0 : 12 }]}>
      <Text style={[anton(20), { color: colors.bg }]}>{value}</Text>
      <Text style={[manrope(600, 11), { color: colors.bg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  weightHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  result: { backgroundColor: colors.gold, borderRadius: 18, padding: 20, gap: 14 },
  stats: { flexDirection: 'row', gap: 1, backgroundColor: 'rgba(18,16,13,0.18)', borderRadius: 10, overflow: 'hidden' },
  stat: { flex: 1, backgroundColor: colors.gold, paddingVertical: 10, gap: 2 },
});
