import { router, type Href } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CalendarIcon, ClockIcon, PinIcon } from '@/components/icons';
import { Button, Card, GhostButton, LiveDot, Screen } from '@/components/ui';
import { event } from '@/config/event';
import { matchClockSeconds, mats } from '@/data/mock';
import { useCountdown, useMatchClock } from '@/state/AppState';
import { anton, colors, eyebrow, manrope } from '@/theme';

const quickLinks: { k: string; t: string; d: string; href: Href }[] = [
  { k: '01', t: 'Find my division', d: 'Match by belt, age and weight before you register.', href: '/divisions' },
  { k: '02', t: 'Live brackets', d: 'See your mat, match order and call time.', href: '/brackets' },
  { k: '03', t: 'Results & podiums', d: 'Medal results and team standings from every event.', href: '/results' },
  { k: '04', t: 'Rules & guides', d: 'Scoring, legal techniques and weigh-in info.', href: '/rules' },
];

export default function HomeScreen() {
  const compDay = event.mode === 'competition-day';
  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.brand}>
          <View style={styles.logo}>
            <Text style={[anton(18), { color: colors.bg }]}>AFG</Text>
          </View>
          <Text style={[anton(20), { letterSpacing: 0.5, color: colors.text }]}>AFG OPEN</Text>
        </View>
        <GhostButton label="Rules" onPress={() => router.push('/rules')} />
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={styles.pill}>
          <View style={[styles.pillDot, { backgroundColor: event.registrationOpen ? colors.gold : colors.textFaint }]} />
          <Text style={[manrope(700, 10.5), { letterSpacing: 1, color: colors.textSoft }]}>
            {event.registrationOpen ? 'REGISTRATION OPEN' : 'REGISTRATION CLOSED'} · {event.name}
          </Text>
        </View>
      </View>

      <Text style={styles.hero}>
        Step on the mat.{'\n'}
        <Text style={{ color: colors.gold }}>Earn the podium.</Text>
      </Text>

      {compDay ? <LiveCard /> : <NextEventCard />}

      <View style={styles.grid}>
        {quickLinks.map((q) => (
          <Pressable key={q.k} onPress={() => router.push(q.href)} style={({ pressed }) => [styles.quick, pressed && { backgroundColor: colors.surfacePressed }]}>
            <View style={styles.quickKey}>
              <Text style={[anton(16), { color: colors.gold }]}>{q.k}</Text>
            </View>
            <Text style={[manrope(700, 14), { color: colors.text }]}>{q.t}</Text>
            <Text style={[manrope(500, 12, 1.4), { color: colors.textMuted }]}>{q.d}</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

function NextEventCard() {
  const countdown = useCountdown(event.startsAt);
  return (
    <Card style={{ gap: 16 }}>
      <View style={styles.row}>
        <Text style={eyebrow}>NEXT EVENT</Text>
        <View style={styles.monthBadge}>
          <Text style={[manrope(700, 10), { letterSpacing: 1, color: colors.gold }]}>{event.month}</Text>
        </View>
      </View>
      <Text style={styles.cardTitle}>{event.title.replace(/ (?=\S+$)/, '\n')}</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {countdown.map((c) => (
          <View key={c.l} style={styles.countCell}>
            <Text style={[anton(26), { color: colors.text, fontVariant: ['tabular-nums'] }]}>{c.v}</Text>
            <Text style={[manrope(500, 10.5), { color: colors.textMuted }]}>{c.l}</Text>
          </View>
        ))}
      </View>
      <View style={{ gap: 10 }}>
        <InfoRow icon={<CalendarIcon size={15} color={colors.textMuted} />}>{event.date}</InfoRow>
        <InfoRow icon={<PinIcon size={15} color={colors.textMuted} />}>{event.venue}, {event.city}</InfoRow>
        <InfoRow icon={<ClockIcon size={15} color={colors.textMuted} />}>Registration closes {event.registrationDeadline}</InfoRow>
      </View>
      <Button label="Secure your spot" onPress={() => router.push('/register')} />
    </Card>
  );
}

function InfoRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
      {icon}
      <Text style={[manrope(500, 13), { color: colors.textSoft }]}>{children}</Text>
    </View>
  );
}

function LiveCard() {
  const clock = useMatchClock(matchClockSeconds);
  return (
    <Card style={{ gap: 14 }}>
      <View style={styles.row}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <LiveDot />
          <Text style={[eyebrow, { color: colors.live }]}>LIVE · DAY 1</Text>
        </View>
        <Text style={[manrope(600, 12), { color: colors.textMuted }]}>{mats.length} mats running</Text>
      </View>
      <Text style={styles.cardTitle}>Adult Gi{'\n'}White & Blue</Text>
      <View style={{ gap: 8 }}>
        {mats.slice(0, 3).map((m, i) => (
          <View key={i} style={styles.liveRow}>
            <Text style={[anton(15), { color: colors.gold, width: 44 }]}>MAT {i + 1}</Text>
            <Text numberOfLines={1} style={[manrope(600, 13), { flex: 1, color: colors.text }]}>
              {m.fighters[0].name.split(' ')[0]} vs {m.fighters[1].name.split(' ')[0]}
            </Text>
            <Text style={[manrope(600, 12), { color: colors.textMuted, fontVariant: ['tabular-nums'] }]}>{clock}</Text>
          </View>
        ))}
      </View>
      <Button label="Open live brackets" onPress={() => router.navigate('/brackets')} />
    </Card>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 44 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 34, height: 34, borderRadius: 8, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 8, height: 30, paddingHorizontal: 12, borderWidth: 1, borderColor: colors.borderStrong, borderRadius: 999 },
  pillDot: { width: 6, height: 6, borderRadius: 3 },
  hero: { ...anton(52, 0.98), textTransform: 'uppercase', letterSpacing: 0.3, color: colors.text },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  monthBadge: { backgroundColor: colors.goldTint, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 999 },
  cardTitle: { ...anton(30, 1), textTransform: 'uppercase', color: colors.text },
  countCell: { flex: 1, backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingTop: 10, paddingBottom: 8, alignItems: 'center', gap: 2 },
  liveRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  quick: { flexGrow: 1, flexBasis: '45%', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 14, gap: 10 },
  quickKey: { width: 32, height: 32, borderRadius: 8, backgroundColor: colors.goldTint, alignItems: 'center', justifyContent: 'center' },
});
