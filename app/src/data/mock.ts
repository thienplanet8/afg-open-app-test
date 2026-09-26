import { colors } from '@/theme';

// Mock competition data. Swap these for API calls once a backend exists.

export const athletes = [
  'Krit Srisuk', 'Daniel Moreau', 'Nattapong Chai', 'Leo Tanaka', 'Sofia Reyes', 'Arun Patel', 'Mai Nguyen', 'Jonas Berg',
  'Pim Wongsa', 'Rafael Costa', 'Hana Kim', 'Tom Walker', 'Chaiwat Boon', 'Marco Vitale', 'Aya Suzuki', 'Ben Okafor',
];

export const academies = ['Kinetic BJJ', 'Riverside Grappling', 'Lotus Jiu-Jitsu', 'Tiger Den', 'Northside MMA', 'Eastgate BJJ'];

// ---------- Schedule ----------

export type ScheduleItem = { time: string; title: string; sub: string; tag: 'GI' | 'NO-GI' | null };

export const schedule: Record<1 | 2, ScheduleItem[]> = {
  1: [
    { time: '07:00', title: 'Weigh-ins open', sub: 'Registration desk · Hall A', tag: null },
    { time: '08:30', title: 'Kids', sub: 'Mats 1–4', tag: 'GI' },
    { time: '10:30', title: 'Juvenile', sub: 'Mats 1–3', tag: 'GI' },
    { time: '12:00', title: 'Adult · White & Blue', sub: 'Mats 1–6', tag: 'GI' },
    { time: '15:00', title: 'Adult · Purple to Black', sub: 'Mats 1–6', tag: 'GI' },
    { time: '17:30', title: 'Absolute', sub: 'Mat 1', tag: 'GI' },
    { time: '18:30', title: 'Podiums', sub: 'Main stage', tag: null },
  ],
  2: [
    { time: '07:00', title: 'Weigh-ins open', sub: 'Registration desk · Hall A', tag: null },
    { time: '08:30', title: 'Kids', sub: 'Mats 1–4', tag: 'NO-GI' },
    { time: '10:00', title: 'Masters · All belts', sub: 'Mats 1–6', tag: 'GI' },
    { time: '12:30', title: 'Adult · Beginner & Intermediate', sub: 'Mats 1–6', tag: 'NO-GI' },
    { time: '15:00', title: 'Adult · Advanced', sub: 'Mats 1–4', tag: 'NO-GI' },
    { time: '17:00', title: 'Team awards', sub: 'Main stage', tag: null },
  ],
};

/** On competition day, the block currently running on day 1. */
export const liveScheduleIndex = 3;

// ---------- Mats / live brackets ----------

export type Fighter = { name: string; team: string; pts: number; adv: number; pen: number; color: string };
export type QueuedMatch = { n: string; div: string; a: string; b: string; call: string };
export type Semi = { a: string; b: string; as: string; bs: string; ac: string; bc: string };
export type Mat = { div: string; fighters: [Fighter, Fighter]; queue: QueuedMatch[]; semis: [Semi, Semi]; final: string };

const matDivisions = [
  'Adult Gi · Blue · Light', 'Adult Gi · White · Feather', 'Adult Gi · Blue · Middle',
  'Adult Gi · White · Heavy', 'Adult Gi · Blue · Feather', 'Adult Gi · White · Light',
];

const shortName = (full: string) => {
  const [first, last] = full.split(' ');
  return `${first} ${last[0]}.`;
};

export const mats: Mat[] = matDivisions.map((div, i) => {
  const n = (k: number) => athletes[(i * 3 + k) % athletes.length];
  const t = (k: number) => academies[(i + k) % academies.length];
  return {
    div,
    fighters: [
      { name: n(0), team: t(0), pts: [4, 2, 0, 6, 3, 2][i], adv: [1, 0, 1, 2, 0, 1][i], pen: [0, 1, 0, 0, 1, 0][i], color: colors.text },
      { name: n(1), team: t(1), pts: [2, 2, 0, 0, 3, 4][i], adv: [0, 1, 0, 0, 1, 0][i], pen: [1, 0, 0, 1, 0, 0][i], color: colors.blue },
    ],
    queue: [0, 1, 2].map((k) => ({
      n: `Match ${14 + i * 5 + k}`,
      div: matDivisions[(i + k) % 6].split(' · ').slice(1).join(' · '),
      a: shortName(n(4 + k * 2)),
      b: shortName(n(5 + k * 2)),
      call: ['12:40', '12:52', '13:05'][k],
    })),
    semis: [
      { a: n(8), b: n(9), as: '6', bs: '0', ac: colors.text, bc: colors.textFaint },
      { a: n(0), b: n(1), as: '•', bs: '•', ac: colors.gold, bc: colors.gold },
    ],
    final: n(8),
  };
});

/** Length of the simulated match clock, in seconds. */
export const matchClockSeconds = 360;

// ---------- Results ----------

export type Podium = { div: string; places: { n: number; name: string; team: string; color: string }[] };

const medalColors = [colors.gold, colors.silver, colors.bronze];
const podium = (div: string, ...places: [number, number][]): Podium => ({
  div,
  places: places.map(([a, t], i) => ({ n: i + 1, name: athletes[a], team: academies[t], color: medalColors[i] })),
});

export const podiums: Podium[] = [
  podium('Adult Gi · Black · Light', [9, 0], [3, 2], [13, 3]),
  podium('Adult Gi · Purple · Middle', [1, 1], [15, 4], [6, 0]),
  podium('Master 1 Gi · Brown · Heavy', [11, 5], [7, 2], [12, 1]),
  podium('Adult Gi · Blue · Feather', [14, 3], [4, 0], [2, 5]),
];

export const medalPoints = { gold: 9, silver: 3, bronze: 1 };

export type TeamStanding = { rank: number; name: string; g: number; s: number; b: number; pts: number };

export const teamStandings: TeamStanding[] = (
  [[0, 7, 4, 5], [2, 6, 5, 2], [1, 4, 6, 6], [3, 4, 2, 7], [5, 2, 4, 3], [4, 1, 3, 5]] as const
)
  .map(([t, g, s, b]) => ({ name: academies[t], g, s, b, pts: g * medalPoints.gold + s * medalPoints.silver + b * medalPoints.bronze }))
  .sort((x, y) => y.pts - x.pts)
  .map((row, i) => ({ ...row, rank: i + 1 }));

// ---------- Rules ----------

export const scoring = [
  { label: 'Takedown', pts: 2 },
  { label: 'Sweep', pts: 2 },
  { label: 'Knee on belly', pts: 2 },
  { label: 'Guard pass', pts: 3 },
  { label: 'Mount', pts: 4 },
  { label: 'Back control', pts: 4 },
];
