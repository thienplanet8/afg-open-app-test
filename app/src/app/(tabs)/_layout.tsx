import { Tabs, type BottomTabBarProps } from 'expo-router/tabs';
import type { ComponentType } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BracketIcon, CalendarIcon, HomeIcon, SearchIcon, TrophyIcon } from '@/components/icons';
import { colors, manrope } from '@/theme';

const tabs: { name: string; title: string; Icon: ComponentType<{ color: string }> }[] = [
  { name: 'index', title: 'Home', Icon: HomeIcon },
  { name: 'schedule', title: 'Schedule', Icon: CalendarIcon },
  { name: 'divisions', title: 'Divisions', Icon: SearchIcon },
  { name: 'brackets', title: 'Brackets', Icon: BracketIcon },
  { name: 'results', title: 'Results', Icon: TrophyIcon },
];

function TabBar({ state, navigation, insets }: BottomTabBarProps) {
  return (
    // 84pt tall on a notched iPhone (8 + 48 + 28), as in the design.
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom - 6, 8) }]}>
      {state.routes.map((route, i) => {
        const tab = tabs.find((t) => t.name === route.name);
        if (!tab) return null;
        const focused = state.index === i;
        const color = focused ? colors.gold : colors.tabInactive;
        const onPress = () => {
          const e = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !e.defaultPrevented) navigation.navigate(route.name);
        };
        return (
          <Pressable key={route.key} accessibilityRole="tab" accessibilityState={{ selected: focused }} onPress={onPress} style={styles.item}>
            <tab.Icon color={color} />
            <Text style={[manrope(600, 10.5), { color }]}>{tab.title}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.bg } }}>
      {tabs.map((t) => (
        <Tabs.Screen key={t.name} name={t.name} options={{ title: t.title }} />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingHorizontal: 6,
    backgroundColor: 'rgba(18,16,13,0.94)',
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  item: { flex: 1, height: 48, alignItems: 'center', gap: 4 },
});
