# AFG Open — mobile app

Expo (SDK 57) + Expo Router implementation of the Claude Design handoff in `../project/AFG Open App.dc.html`.

```bash
npm install
npx expo start        # then press i / a / w, or scan with Expo Go
npx tsc --noEmit      # typecheck
```

## Structure

```
src/
  app/                  routes (Expo Router)
    _layout.tsx         fonts (Anton, Manrope), app state, root stack
    (tabs)/             Home · Schedule · Divisions · Brackets · Results + custom tab bar
    rules.tsx           Rules & guides (full-screen modal)
    register.tsx        3-step registration flow + confirmation (full-screen modal)
  config/event.ts       event details, placeholders, mode switches
  data/mock.ts          mock athletes, schedule, mats, podiums, team standings
  lib/divisions.ts      division / weight-class / match-length logic
  state/AppState.tsx    shared division selection + athlete form, clock hooks
  components/           shared UI (buttons, chips, segmented control, icons)
  theme.ts              colours and type helpers
```

## Before launch

- Fill in the placeholders in `src/config/event.ts`: `[EVENT NAME]`, `[EVENT DATE]`, `[VENUE]`, `[DEADLINE]`, `[ENTRY FEE]`.
- `event.mode` switches Home between the pre-event countdown and the competition-day live summary
  (it also flags the live block in Schedule). `event.registrationOpen` drives the status pill.
- Everything in `src/data/mock.ts`, the "Registered" count and the entry ID in `lib/divisions.ts` are stand-ins —
  replace them with API data. "Pay & register" does not take payment yet.
