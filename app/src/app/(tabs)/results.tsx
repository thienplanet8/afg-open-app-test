import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Screen, ScreenTitle, Segmented } from '@/components/ui';
import { medalPoints, podiums, teamStandings } from '@/data/mock';
import { anton, colors, manrope } from '@/theme';

type ResultsTab = 'ind' | 'team';

export default function ResultsScreen() {
  const [tab, setTab] = useState<ResultsTab>('ind');

  return (
    <Screen gap={18}>
      <ScreenTitle>Results</ScreenTitle>
      <Segmented<ResultsTab> options={[['ind', 'Individual'], ['team', 'Teams']]} value={tab} onChange={setTab} />
      {tab === 'ind' ? <Podiums /> : <Teams />}
    </Screen>
  );
}

function Podiums() {
  return (
    <View style={{ gap: 12 }}>
      {podiums.map((p) => (
        <View key={p.div} style={[styles.card, { paddingVertical: 14, paddingHorizontal: 16, gap: 10 }]}>
          <Text style={[anton(17), { textTransform: 'uppercase', letterSpacing: 0.3, color: colors.text }]}>{p.div}</Text>
          {p.places.map((r) => (
            <View key={r.n} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={[styles.medal, { backgroundColor: r.color }]}>
                <Text style={[anton(13), { color: colors.bg }]}>{r.n}</Text>
              </View>
              <Text style={[manrope(700, 13.5), { flex: 1, color: colors.text }]}>{r.name}</Text>
              <Text style={[manrope(500, 12), { color: colors.textMuted }]}>{r.team}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function Teams() {
  const head = [manrope(700, 10), { letterSpacing: 1, color: colors.textFaint }];
  const cell = [manrope(600, 13), { color: colors.text }];
  return (
    <>
      <View style={[styles.card, { overflow: 'hidden' }]}>
        <View style={[styles.tableRow, { paddingVertical: 10, borderBottomColor: colors.border }]}>
          <Text style={[head, styles.rank]}>#</Text>
          <Text style={[head, { flex: 1 }]}>TEAM</Text>
          <Text style={[head, styles.medalCol, { color: colors.gold }]}>G</Text>
          <Text style={[head, styles.medalCol, { color: colors.silver }]}>S</Text>
          <Text style={[head, styles.medalCol, { color: colors.bronze }]}>B</Text>
          <Text style={[head, styles.pts]}>PTS</Text>
        </View>
        {teamStandings.map((t) => (
          <View key={t.name} style={styles.tableRow}>
            <Text style={[anton(16), styles.rank, { color: t.rank === 1 ? colors.gold : colors.textFaint }]}>{t.rank}</Text>
            <Text style={[cell, manrope(700, 13), { flex: 1 }]}>{t.name}</Text>
            <Text style={[cell, styles.medalCol]}>{t.g}</Text>
            <Text style={[cell, styles.medalCol]}>{t.s}</Text>
            <Text style={[cell, styles.medalCol]}>{t.b}</Text>
            <Text style={[anton(16), styles.pts, { color: colors.text }]}>{t.pts}</Text>
          </View>
        ))}
      </View>
      <Text style={[manrope(500, 12, 1.5), { color: colors.textFaint }]}>
        Gold {medalPoints.gold} pts · Silver {medalPoints.silver} pts · Bronze {medalPoints.bronze} pt
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 14 },
  medal: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tableRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: colors.divider },
  rank: { width: 28 },
  medalCol: { width: 26 },
  pts: { width: 40, textAlign: 'right' },
});
