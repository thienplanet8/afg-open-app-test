import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { resolveDivision, withAge, type Age, type Division, type Selection } from '@/lib/divisions';

export type Athlete = { name: string; team: string; email: string };

type AppState = {
  selection: Selection;
  division: Division;
  update: (patch: Partial<Omit<Selection, 'age'>>) => void;
  setAge: (age: Age) => void;
  athlete: Athlete;
  setAthlete: (patch: Partial<Athlete>) => void;
};

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<Selection>({ style: 'gi', age: 'Adult', belt: 'Blue', weight: 74 });
  const [athlete, setAthleteState] = useState<Athlete>({ name: '', team: '', email: '' });

  const value = useMemo<AppState>(
    () => ({
      selection,
      division: resolveDivision(selection),
      update: (patch) => setSelection((s) => ({ ...s, ...patch })),
      setAge: (age) => setSelection((s) => withAge(s, age)),
      athlete,
      setAthlete: (patch) => setAthleteState((a) => ({ ...a, ...patch })),
    }),
    [selection, athlete],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAppState must be used inside AppStateProvider');
  return ctx;
}

const appStart = Date.now();

/** Re-renders every second. Kept per-component so only clocks tick, not whole screens. */
export function useNow() {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const pad = (v: number) => String(v).padStart(2, '0');

/** Simulated match clock shared by every mat, counting down from `total` seconds and looping. */
export function useMatchClock(total: number) {
  const now = useNow();
  const remaining = total - (Math.floor((now - appStart) / 1000) % total);
  return `${pad(Math.floor(remaining / 60))}:${pad(remaining % 60)}`;
}

export function useCountdown(target: string) {
  const now = useNow();
  const d = Math.max(0, Math.floor((new Date(target).getTime() - now) / 1000));
  return [
    { v: pad(Math.floor(d / 86400)), l: 'Days' },
    { v: pad(Math.floor((d % 86400) / 3600)), l: 'Hours' },
    { v: pad(Math.floor((d % 3600) / 60)), l: 'Min' },
    { v: pad(d % 60), l: 'Sec' },
  ];
}
