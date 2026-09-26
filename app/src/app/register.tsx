import { router } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CheckIcon } from '@/components/icons';
import { Button, GhostButton } from '@/components/ui';
import { event } from '@/config/event';
import { useAppState, type Athlete } from '@/state/AppState';
import { anton, colors, eyebrow, manrope } from '@/theme';

type Step = 1 | 2 | 3 | 4;

function validate(a: Athlete): Record<keyof Athlete, string> {
  return {
    name: a.name.trim().length < 2 ? 'Enter your full name' : '',
    team: !a.team.trim() ? 'Enter your team or academy' : '',
    email: !/^\S+@\S+\.\S+$/.test(a.email) ? 'Enter a valid email' : '',
  };
}

export default function RegisterScreen() {
  const { division, selection, athlete, setAthlete } = useAppState();
  const [step, setStep] = useState<Step>(1);
  const [tried, setTried] = useState(false);
  const errors = validate(athlete);

  const close = () => router.back();
  const back = () => (step === 1 || step === 4 ? close() : setStep((step - 1) as Step));
  const next = () => {
    if (step === 2 && (errors.name || errors.team || errors.email)) return setTried(true);
    setStep((step + 1) as Step);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.topBar}>
            <GhostButton filled height={40} label={step === 1 || step === 4 ? 'Close' : '← Back'} onPress={back} />
            <Text style={[manrope(700, 11), { letterSpacing: 1.2, color: colors.textMuted }]}>
              {step === 4 ? 'CONFIRMED' : `STEP ${step} OF 3`}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {[1, 2, 3].map((n) => (
              <View key={n} style={[styles.stepBar, { backgroundColor: n <= step ? colors.gold : colors.border }]} />
            ))}
          </View>

          {step === 1 && (
            <StepBody title="Confirm your division" action={<Button variant="gold" height={54} label="Continue →" onPress={next} />}>
              <View style={styles.card}>
                <Text style={[anton(24, 1.05), { textTransform: 'uppercase', color: colors.gold }]}>{division.title}</Text>
                {[
                  ['Style', division.styleName],
                  ['Age', selection.age],
                  ['Belt', selection.belt],
                  ['Weight limit', `${division.weightLimit} kg`],
                ].map(([l, v]) => (
                  <View key={l} style={styles.divRow}>
                    <Text style={[manrope(600, 14), { color: colors.textMuted }]}>{l}</Text>
                    <Text style={[manrope(600, 14), { color: colors.text }]}>{v}</Text>
                  </View>
                ))}
              </View>
              <Pressable
                onPress={() => {
                  router.back();
                  router.navigate('/divisions');
                }}
                style={{ alignSelf: 'flex-start' }}
              >
                <Text style={[manrope(700, 14), { color: colors.gold }]}>Change division</Text>
              </Pressable>
            </StepBody>
          )}

          {step === 2 && (
            <StepBody title="Athlete details" action={<Button variant="gold" height={54} label="Review entry →" onPress={next} />}>
              <Field label="FULL NAME" placeholder="As on your ID" value={athlete.name} error={tried ? errors.name : ''} onChangeText={(name) => setAthlete({ name })} autoComplete="name" textContentType="name" />
              <Field label="TEAM / ACADEMY" placeholder="e.g. Kinetic BJJ" value={athlete.team} error={tried ? errors.team : ''} onChangeText={(team) => setAthlete({ team })} />
              <Field label="EMAIL" placeholder="you@example.com" value={athlete.email} error={tried ? errors.email : ''} onChangeText={(email) => setAthlete({ email })} keyboardType="email-address" autoCapitalize="none" autoComplete="email" textContentType="emailAddress" />
            </StepBody>
          )}

          {step === 3 && (
            <StepBody title="Review & pay" action={<Button variant="gold" height={54} label="Pay & register" onPress={next} />}>
              <View style={[styles.card, { gap: 10 }]}>
                {[
                  ['Athlete', athlete.name || '—'],
                  ['Team', athlete.team || '—'],
                  ['Division', division.title],
                  ['Weight limit', `${division.weightLimit} kg`],
                  ['Event', event.title],
                ].map(([l, v]) => (
                  <View key={l} style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 16 }}>
                    <Text style={[manrope(600, 14), { color: colors.textMuted }]}>{l}</Text>
                    <Text style={[manrope(600, 14), { color: colors.text, textAlign: 'right', flexShrink: 1 }]}>{v}</Text>
                  </View>
                ))}
                <View style={styles.feeRow}>
                  <Text style={[manrope(700, 14), { color: colors.text }]}>Entry fee</Text>
                  <Text style={[anton(22), { color: colors.gold }]}>{event.entryFee}</Text>
                </View>
              </View>
              <Text style={[manrope(500, 12, 1.5), { color: colors.textFaint }]}>
                By registering you agree to the AFG Open rules and waiver. Division changes are free until {event.registrationDeadline}.
              </Text>
            </StepBody>
          )}

          {step === 4 && (
            <View style={{ flex: 1, gap: 18, justifyContent: 'center' }}>
              <View style={styles.check}>
                <CheckIcon size={30} color={colors.bg} strokeWidth={3} />
              </View>
              <Text style={[anton(52, 0.98), { textTransform: 'uppercase', color: colors.text }]}>
                You're on{'\n'}
                <Text style={{ color: colors.gold }}>the mat.</Text>
              </Text>
              <Text style={[manrope(500, 15, 1.5), { color: colors.textSoft }]}>
                {athlete.name.split(' ')[0] || 'You'} is registered for {division.title}. Brackets are published 48 hours before the event.
              </Text>
              <View style={[styles.card, styles.entryRow]}>
                <Text style={[manrope(600, 13), { color: colors.textMuted }]}>Entry ID</Text>
                <Text style={[anton(20), { letterSpacing: 0.5, color: colors.text }]}>{division.entryId}</Text>
              </View>
              <View style={{ flex: 1 }} />
              <Button
                height={54}
                label="View schedule"
                onPress={() => {
                  router.back();
                  router.navigate('/schedule');
                }}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function StepBody({ title, children, action }: { title: string; children: ReactNode; action: ReactNode }) {
  return (
    <View style={{ flex: 1, gap: 16 }}>
      <Text style={[anton(36, 1), { textTransform: 'uppercase', color: colors.text }]}>{title}</Text>
      {children}
      <View style={{ flex: 1 }} />
      {action}
    </View>
  );
}

function Field({ label, error, ...input }: { label: string; error: string } & TextInputProps) {
  return (
    <View style={{ gap: 7 }}>
      <Text style={eyebrow}>{label}</Text>
      <TextInput
        {...input}
        accessibilityLabel={label}
        placeholderTextColor={colors.textFaint}
        selectionColor={colors.gold}
        style={[styles.input, { borderColor: error ? colors.live : colors.borderStrong }]}
      />
      {error ? <Text style={[manrope(600, 12), { color: colors.live }]}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  body: { flexGrow: 1, paddingTop: 10, paddingHorizontal: 20, paddingBottom: 30, gap: 20 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stepBar: { flex: 1, height: 4, borderRadius: 2 },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 18, gap: 14 },
  divRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.divider },
  feeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border },
  check: { width: 64, height: 64, borderRadius: 16, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  entryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 16 },
  input: { ...manrope(600, 15), height: 50, borderRadius: 12, borderWidth: 1, backgroundColor: colors.surface, color: colors.text, paddingHorizontal: 14 },
});
