import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ADULT_BELTS, BELT_COLORS, MATCH_MINUTES } from '@/lib/divisions';
import { scoring } from '@/data/mock';
import { anton, colors, eyebrow, manrope } from '@/theme';

export default function RulesScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Rules & guides</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={() => router.back()} style={styles.close}>
            <Text style={[manrope(600, 18), { color: colors.text }]}>×</Text>
          </Pressable>
        </View>

        <Section label="SCORING">
          {scoring.map((s) => (
            <View key={s.label} style={styles.scoreRow}>
              <Text style={[manrope(600, 14), { color: colors.text }]}>{s.label}</Text>
              <Text style={[anton(20), { color: colors.gold }]}>{s.pts}</Text>
            </View>
          ))}
        </Section>

        <Section label="WEIGH-IN">
          <Text style={[manrope(500, 14, 1.55), { color: colors.textSoft }]}>
            Weigh in once, immediately before your first match. Gi athletes weigh in wearing their gi. Missing weight means
            disqualification from your weight division.
          </Text>
        </Section>

        <Section label="MATCH LENGTH (ADULT)">
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {ADULT_BELTS.map((b) => (
              <View key={b} style={styles.lengthCell}>
                <View style={[styles.belt, { backgroundColor: BELT_COLORS[b] }]} />
                <Text style={[anton(18), { color: colors.text }]}>{MATCH_MINUTES[b]}</Text>
                <Text style={[manrope(600, 10), { color: colors.textMuted }]}>MIN</Text>
              </View>
            ))}
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={eyebrow}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  body: { paddingTop: 12, paddingHorizontal: 20, paddingBottom: 30, gap: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { ...anton(40, 1), textTransform: 'uppercase', color: colors.text },
  close: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  section: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 16, gap: 10 },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lengthCell: { flex: 1, alignItems: 'center', gap: 6, paddingVertical: 10, backgroundColor: colors.bg, borderRadius: 8 },
  belt: { width: 22, height: 7, borderRadius: 2 },
});
