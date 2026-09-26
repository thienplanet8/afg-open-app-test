import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Screen, ScreenTitle, Segmented, Tag } from '@/components/ui';
import { event } from '@/config/event';
import { liveScheduleIndex, schedule } from '@/data/mock';
import { anton, colors, manrope } from '@/theme';

export default function ScheduleScreen() {
  const [day, setDay] = useState<1 | 2>(1);
  const compDay = event.mode === 'competition-day';

  return (
    <Screen gap={18}>
      <ScreenTitle>Schedule</ScreenTitle>
      <Segmented options={[[1, 'Day 1 · Gi'], [2, 'Day 2 · No-Gi']]} value={day} onChange={setDay} />
      <View>
        {schedule[day].map((s, i) => {
          const live = compDay && day === 1 && i === liveScheduleIndex;
          return (
            <View key={s.time + s.title} style={styles.row}>
              <Text style={[anton(18), { width: 54, color: live ? colors.gold : colors.text, paddingTop: 1 }]}>{s.time}</Text>
              <View style={{ flex: 1, gap: 5 }}>
                <View style={styles.titleRow}>
                  <Text style={[manrope(700, 15), { color: colors.text }]}>{s.title}</Text>
                  {s.tag ? <Tag label={s.tag} /> : null}
                  {live ? <Tag label="LIVE" live /> : null}
                </View>
                <Text style={[manrope(500, 12.5), { color: colors.textMuted }]}>{s.sub}</Text>
              </View>
            </View>
          );
        })}
      </View>
      <Text style={[manrope(500, 12, 1.5), { color: colors.textFaint }]}>
        Times are estimates. Check your mat and call time in Brackets on the day.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 14, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.divider },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
});
