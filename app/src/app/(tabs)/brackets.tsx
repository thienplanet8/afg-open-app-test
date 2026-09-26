import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Chip, LiveDot, Screen, ScreenTitle } from '@/components/ui';
import { matchClockSeconds, mats } from '@/data/mock';
import { useMatchClock } from '@/state/AppState';
import { anton, colors, eyebrow, manrope } from '@/theme';

export default function BracketsScreen() {
  const [matNo, setMatNo] = useState(1);
  const mat = mats[matNo - 1];

  return (
    <Screen gap={18} gutter={0}>
      <View style={[styles.gutter, styles.header]}>
        <ScreenTitle>Live brackets</ScreenTitle>
        <View style={styles.live}>
          <LiveDot />
          <Text style={[manrope(700, 10.5), { letterSpacing: 1, color: colors.live }]}>LIVE</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.gutter, { gap: 8 }]}>
        {mats.map((_, i) => (
          <Chip key={i} display label={`MAT ${i + 1}`} active={matNo === i + 1} onPress={() => setMatNo(i + 1)} />
        ))}
      </ScrollView>

      <View style={[styles.card, { marginHorizontal: 20, borderRadius: 18, overflow: 'hidden' }]}>
        <View style={styles.scoreHeader}>
          <Text style={[manrope(600, 12.5), { color: colors.textMuted }]}>{mat.div}</Text>
          <MatClock />
        </View>
        {mat.fighters.map((f) => (
          <View key={f.name} style={styles.fighter}>
            <View style={[styles.fighterBar, { backgroundColor: f.color }]} />
            <View style={{ flex: 1, gap: 2, minWidth: 0 }}>
              <Text style={[manrope(700, 15), { color: colors.text }]}>{f.name}</Text>
              <Text style={[manrope(500, 12), { color: colors.textMuted }]}>{f.team}</Text>
            </View>
            <SmallStat value={f.adv} label="ADV" />
            <SmallStat value={f.pen} label="PEN" />
            <Text style={[anton(34), { width: 40, textAlign: 'right', color: colors.text }]}>{f.pts}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.gutter, { gap: 10 }]}>
        <Text style={eyebrow}>UP NEXT ON MAT {matNo}</Text>
        {mat.queue.map((q) => (
          <View key={q.n} style={[styles.card, styles.queueRow]}>
            <View style={{ flex: 1, gap: 3, minWidth: 0 }}>
              <Text numberOfLines={1} style={[manrope(700, 13.5), { color: colors.text }]}>{q.a} vs {q.b}</Text>
              <Text style={[manrope(500, 12), { color: colors.textMuted }]}>{q.n} · {q.div}</Text>
            </View>
            <View style={{ alignItems: 'flex-end', gap: 2 }}>
              <Text style={[anton(17), { color: colors.text }]}>{q.call}</Text>
              <Text style={[manrope(600, 10), { color: colors.textFaint }]}>CALL TIME</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.gutter, { gap: 10 }]}>
        <Text style={eyebrow}>BRACKET · {mat.div}</Text>
        <View style={styles.bracket}>
          <View style={{ flex: 1, gap: 14 }}>
            {mat.semis.map((m, i) => (
              <View key={i} style={[styles.card, styles.slot]}>
                <View style={[styles.slotRow, styles.slotDivider]}>
                  <Text style={[manrope(600, 12), { color: m.ac }]}>{m.a}</Text>
                  <Text style={[manrope(600, 12), { color: m.ac }]}>{m.as}</Text>
                </View>
                <View style={styles.slotRow}>
                  <Text style={[manrope(600, 12), { color: m.bc }]}>{m.b}</Text>
                  <Text style={[manrope(600, 12), { color: m.bc }]}>{m.bs}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={{ width: 20, alignSelf: 'stretch' }}>
            <View style={styles.connector} />
          </View>
          <View style={[styles.card, styles.slot, { flex: 1, borderColor: colors.gold }]}>
            <View style={styles.finalLabel}>
              <Text style={[manrope(800, 9.5), { letterSpacing: 1, color: colors.bg }]}>FINAL</Text>
            </View>
            <View style={[styles.slotRow, styles.slotDivider]}>
              <Text style={[manrope(600, 12), { color: colors.text }]}>{mat.final}</Text>
            </View>
            <View style={styles.slotRow}>
              <Text style={[manrope(600, 12), { color: colors.textFaint }]}>Winner of semi 2</Text>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
}

function MatClock() {
  const clock = useMatchClock(matchClockSeconds);
  return <Text style={[anton(22), { color: colors.gold, fontVariant: ['tabular-nums'] }]}>{clock}</Text>;
}

function SmallStat({ value, label }: { value: number; label: string }) {
  return (
    <View style={{ width: 22, alignItems: 'center' }}>
      <Text style={[anton(15), { color: colors.textSoft }]}>{value}</Text>
      <Text style={[manrope(600, 9), { color: colors.textFaint }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gutter: { paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  live: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingBottom: 6 },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  scoreHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  fighter: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, paddingRight: 16, borderBottomWidth: 1, borderBottomColor: colors.divider },
  fighterBar: { width: 6, height: 40, borderTopRightRadius: 3, borderBottomRightRadius: 3 },
  queueRow: { flexDirection: 'row', alignItems: 'center', gap: 12, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14 },
  bracket: { flexDirection: 'row', alignItems: 'center' },
  slot: { borderRadius: 10, overflow: 'hidden' },
  slotRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, paddingHorizontal: 10 },
  slotDivider: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  // Joins the two semis (centred at 25% and 75% of the column) to the final.
  connector: { position: 'absolute', top: '25%', bottom: '25%', left: 0, right: 6, borderWidth: 1, borderLeftWidth: 0, borderColor: colors.bracketLine, borderTopRightRadius: 6, borderBottomRightRadius: 6 },
  finalLabel: { paddingVertical: 5, paddingHorizontal: 10, backgroundColor: colors.gold },
});
