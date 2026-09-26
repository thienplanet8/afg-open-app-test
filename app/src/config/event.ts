/**
 * Event configuration. Bracketed values are placeholders from the design —
 * replace them with the real details before release.
 */
export type EventMode = 'pre-event' | 'competition-day';

export const event = {
  name: '[EVENT NAME]',
  title: 'AFG Open International',
  month: 'OCTOBER',
  date: '[EVENT DATE]',
  venue: '[VENUE]',
  city: 'Bangkok',
  registrationDeadline: '[DEADLINE]',
  entryFee: '[ENTRY FEE]',
  /** Countdown target (first match of day 1). */
  startsAt: '2026-10-24T08:00:00+07:00',

  /** 'pre-event' shows the countdown card on Home; 'competition-day' shows the live mat summary. */
  mode: 'pre-event' as EventMode,
  registrationOpen: true,
};
