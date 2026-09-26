import { Anton_400Regular } from '@expo-google-fonts/anton';
import { Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from '@expo-google-fonts/manrope';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { AppStateProvider } from '@/state/AppState';
import { colors } from '@/theme';

export default function RootLayout() {
  const [loaded] = useFonts({
    Anton_400Regular,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  if (!loaded) return <View style={{ flex: 1, backgroundColor: colors.bg }} />;

  return (
    <AppStateProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="rules" options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="register" options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom', gestureEnabled: false }} />
      </Stack>
    </AppStateProvider>
  );
}
