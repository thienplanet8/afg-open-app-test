export type Style = 'gi' | 'nogi';
export type Age = (typeof AGES)[number];
export type Belt = keyof typeof BELT_COLORS;

export const AGES = ['Kids', 'Juvenile', 'Adult', 'Master 1', 'Master 2', 'Master 3'] as const;

export const BELT_COLORS = {
  White: '#f4efe6',
  Grey: '#8f8a82',
  Yellow: '#f2cf3a',
  Orange: '#e8863a',
  Green: '#4f9a55',
  Blue: '#3b6fd1',
  Purple: '#7a4bb8',
  Brown: '#7a5234',
  Black: '#0a0a0a',
};

export const MATCH_MINUTES: Record<Belt, number> = {
  White: 5, Blue: 6, Purple: 7, Brown: 8, Black: 10, Grey: 4, Yellow: 4, Orange: 4, Green: 4,
};

export const ADULT_BELTS: Belt[] = ['White', 'Blue', 'Purple', 'Brown', 'Black'];

export function beltsFor(age: Age): Belt[] {
  if (age === 'Kids') return ['White', 'Grey', 'Yellow', 'Orange', 'Green'];
  if (age === 'Juvenile') return ['White', 'Blue', 'Purple'];
  return ADULT_BELTS;
}

const OPEN = Infinity;

/** [class name, upper limit in kg, with gi]. */
const ADULT_WEIGHTS: [string, number][] = [
  ['Rooster', 57.5], ['Light Feather', 64], ['Feather', 70], ['Light', 76], ['Middle', 82.3],
  ['Medium Heavy', 88.3], ['Heavy', 94.3], ['Super Heavy', 100.5], ['Ultra Heavy', OPEN],
];
const KIDS_WEIGHTS: [string, number][] = [
  ['Mighty Mite', 25], ['Pee Wee', 30], ['Light', 35], ['Middle', 40], ['Heavy', 45], ['Open', OPEN],
];

export function weightRange(age: Age) {
  return age === 'Kids' ? { min: 20, max: 60 } : { min: 50, max: 120 };
}

export type Selection = { style: Style; age: Age; belt: Belt; weight: number };

export type Division = {
  title: string;
  styleName: string;
  weightClass: string;
  /** e.g. "−76" or "+100.5" */
  weightLimit: string;
  matchLength: string;
  registered: number;
  entryId: string;
};

export function resolveDivision({ style, age, belt, weight }: Selection): Division {
  const table = age === 'Kids' ? KIDS_WEIGHTS : ADULT_WEIGHTS;
  const idx = table.findIndex(([, limit]) => weight <= limit);
  const [weightClass, limit] = table[idx];
  const weightLimit = limit === OPEN ? `+${table[idx - 1][1]}` : `−${limit}`;
  const styleName = style === 'gi' ? 'Gi' : 'No-Gi';
  const title = `${age} ${styleName} · ${belt} · ${weightClass}`;
  // Stand-in for real registration counts and IDs until there is a backend.
  const hash = [...title].reduce((sum, c) => sum + c.charCodeAt(0), 0);
  return {
    title,
    styleName,
    weightClass,
    weightLimit,
    matchLength: `${MATCH_MINUTES[belt]} min`,
    registered: 4 + (hash % 21),
    entryId: `AFG-${1000 + ((hash * 7) % 9000)}`,
  };
}

/** Keeps belt and weight valid when the age group changes. */
export function withAge(sel: Selection, age: Age): Selection {
  const belts = beltsFor(age);
  const kids = age === 'Kids';
  return {
    ...sel,
    age,
    belt: belts.includes(sel.belt) ? sel.belt : belts[0],
    weight: kids ? (sel.weight > 60 ? 32 : sel.weight) : sel.weight < 50 ? 74 : sel.weight,
  };
}
