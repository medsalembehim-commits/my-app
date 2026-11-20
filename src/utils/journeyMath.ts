import type {
  DayStatus,
  JourneyCalendarDay,
  JourneyProgressSummary,
  JourneyState,
  MilestoneDefinition,
  MilestoneStatus,
  MotivationalMessage,
} from '../types/journey';

export const TOTAL_JOURNEY_DAYS = 75;

export const MILESTONES: MilestoneDefinition[] = [
  {
    day: 1,
    id: 'beginning',
    titleEn: 'The Beginning',
    titleAr: 'البداية',
    subtitleEn: 'You chose direction over impulse.',
    subtitleAr: 'اخترتَ الاتجاه الواعي على الاندفاع.',
  },
  {
    day: 7,
    id: 'beginner',
    titleEn: 'The Beginner',
    titleAr: 'المبتدئ',
    subtitleEn: 'One full week of intentional restraint.',
    subtitleAr: 'أسبوع كامل من ضبط النفس الواعي.',
  },
  {
    day: 15,
    id: 'disciplined',
    titleEn: 'The Disciplined',
    titleAr: 'المنضبط',
    subtitleEn: 'Routine is becoming quiet strength.',
    subtitleAr: 'الروتين يتحوّل إلى قوة هادئة.',
  },
  {
    day: 30,
    id: 'builder',
    titleEn: 'The Builder',
    titleAr: 'البنّاء',
    subtitleEn: 'Thirty days of foundations laid stone by stone.',
    subtitleAr: 'ثلاثون يوماً من البناء الثابت حجراً بعد حجر.',
  },
  {
    day: 50,
    id: 'strong',
    titleEn: 'The Strong',
    titleAr: 'القوي',
    subtitleEn: 'Two-thirds complete. Resilience is your baseline.',
    subtitleAr: 'تجاوزتَ ثلثي الطريق؛ الصمود أصبح طبيعتك.',
  },
  {
    day: 75,
    id: 'finisher',
    titleEn: 'The Finisher',
    titleAr: 'المنجز',
    subtitleEn: 'Seventy-five days honored. A stronger version of yourself.',
    subtitleAr: 'أتممتَ خمسة وسبعين يوماً؛ نسخة أقوى منك.',
  },
];

export function getLocalDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function dateKeyToUtcMs(dateKey: string): number {
  const [yStr, mStr, dStr] = dateKey.split('-');
  const year = Number(yStr);
  const month = Number(mStr);
  const day = Number(dStr);
  return Date.UTC(year, month - 1, day);
}

export function addDaysToDateKey(dateKey: string, days: number): string {
  const utcMs = dateKeyToUtcMs(dateKey) + days * 86_400_000;
  const d = new Date(utcMs);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function diffCalendarDays(startKey: string, endKey: string): number {
  const startMs = dateKeyToUtcMs(startKey);
  const endMs = dateKeyToUtcMs(endKey);
  return Math.round((endMs - startMs) / 86_400_000);
}

export function calculateLongestStreak(sortedUniqueDates: string[]): number {
  if (sortedUniqueDates.length === 0) return 0;
  let longest = 1;
  let current = 1;
  for (let i = 1; i < sortedUniqueDates.length; i += 1) {
    const gap = diffCalendarDays(sortedUniqueDates[i - 1], sortedUniqueDates[i]);
    if (gap === 1) {
      current += 1;
      if (current > longest) longest = current;
    } else if (gap > 1) {
      current = 1;
    }
  }
  return longest;
}

export function calculateCurrentStreak(
  checkedInSet: Set<string>,
  todayKey: string,
): number {
  let cursor = checkedInSet.has(todayKey)
    ? todayKey
    : addDaysToDateKey(todayKey, -1);

  if (!checkedInSet.has(cursor)) {
    return 0;
  }

  let streak = 0;
  while (checkedInSet.has(cursor)) {
    streak += 1;
    cursor = addDaysToDateKey(cursor, -1);
  }
  return streak;
}

export function calculateJourneyProgress(
  state: JourneyState,
  todayKey: string = getLocalDateKey(),
): JourneyProgressSummary {
  const startKey = state.profile.startDateKey || todayKey;
  const rawElapsed = diffCalendarDays(startKey, todayKey);
  const elapsedCalendarDays = Math.max(0, rawElapsed);
  const currentDayNumber = Math.min(
    TOTAL_JOURNEY_DAYS,
    Math.max(1, elapsedCalendarDays + 1),
  );

  const sortedChecked = [...new Set(state.checkedInDates)].sort();
  const checkedInSet = new Set(sortedChecked);
  const recoveredSet = new Set(state.recoveredDates);

  const calendarDays: JourneyCalendarDay[] = [];
  let completedCount = 0;
  let missedCount = 0;
  let recoveredCount = 0;

  for (let i = 0; i < TOTAL_JOURNEY_DAYS; i += 1) {
    const dayNumber = i + 1;
    const dateKey = addDaysToDateKey(startKey, i);
    const cmp = diffCalendarDays(dateKey, todayKey); // >0 means dateKey is in the past, 0 is today, <0 is future

    let status: DayStatus = 'pending';
    if (checkedInSet.has(dateKey)) {
      status = 'completed';
      completedCount += 1;
    } else if (cmp > 0) {
      if (recoveredSet.has(dateKey)) {
        status = 'recovered';
        recoveredCount += 1;
      } else {
        status = 'missed';
        missedCount += 1;
      }
    } else {
      status = 'pending';
    }

    calendarDays.push({
      dayNumber,
      dateKey,
      status,
      isToday: dateKey === todayKey,
    });
  }

  const daysRemaining = Math.max(0, TOTAL_JOURNEY_DAYS - completedCount);
  const percentageCompleted = Math.min(
    100,
    Math.round((completedCount / TOTAL_JOURNEY_DAYS) * 100),
  );
  const isCheckedInToday = checkedInSet.has(todayKey);
  const currentStreak = calculateCurrentStreak(checkedInSet, todayKey);
  const longestStreak = calculateLongestStreak(sortedChecked);
  const isJourneyComplete = completedCount >= TOTAL_JOURNEY_DAYS;

  const milestones: MilestoneStatus[] = MILESTONES.map((m) => ({
    ...m,
    unlocked: completedCount >= m.day,
    daysRemaining: Math.max(0, m.day - completedCount),
  }));

  const nextMilestone = milestones.find((m) => !m.unlocked) ?? null;

  return {
    currentDayNumber,
    elapsedCalendarDays,
    completedCount,
    missedCount,
    recoveredCount,
    daysRemaining,
    percentageCompleted,
    currentStreak,
    longestStreak,
    isCheckedInToday,
    isJourneyComplete,
    hasUnacknowledgedMissedDays: missedCount > 0,
    calendarDays,
    milestones,
    nextMilestone,
  };
}

export function performDailyCheckIn(
  state: JourneyState,
  todayKey: string = getLocalDateKey(),
): { nextState: JourneyState; didCheckIn: boolean } {
  const startKey = state.profile.startDateKey || todayKey;
  const dayOffset = diffCalendarDays(startKey, todayKey);

  // Prevent checking in before journey start or duplicating today's check-in
  if (dayOffset < 0 || state.checkedInDates.includes(todayKey)) {
    return { nextState: state, didCheckIn: false };
  }

  const nextChecked = [...new Set([...state.checkedInDates, todayKey])].sort();
  const nextRecovered = state.recoveredDates.filter((d) => d !== todayKey);

  return {
    didCheckIn: true,
    nextState: {
      ...state,
      checkedInDates: nextChecked,
      recoveredDates: nextRecovered,
    },
  };
}

export function applySupportiveRecovery(
  state: JourneyState,
  mode: 'continue-forward' | 'recommit-today',
  note: string,
  todayKey: string = getLocalDateKey(),
): JourneyState {
  const progress = calculateJourneyProgress(state, todayKey);
  const missedDateKeys = progress.calendarDays
    .filter((d) => d.status === 'missed')
    .map((d) => d.dateKey);

  const nextRecovered = [...new Set([...state.recoveredDates, ...missedDateKeys])].sort();

  let nextChecked = [...state.checkedInDates];
  if (mode === 'recommit-today' && !nextChecked.includes(todayKey)) {
    nextChecked = [...new Set([...nextChecked, todayKey])].sort();
  }

  const record = {
    id: `rec_${Date.now()}`,
    dateKey: todayKey,
    mode,
    note: note.trim(),
    createdAt: new Date().toISOString(),
  };

  return {
    ...state,
    checkedInDates: nextChecked,
    recoveredDates: nextRecovered,
    recoveryHistory: [record, ...state.recoveryHistory],
  };
}

export function getDailyMotivationMessage(
  messages: MotivationalMessage[],
  dayNumber: number,
  dateKey: string,
): MotivationalMessage {
  if (messages.length === 0) {
    return {
      id: 'fallback',
      category: 'discipline',
      en: 'Discipline is remembering what you want most over what you want right now.',
      ar: 'الانضباط هو أن تتذكر ما تريده حقاً قبل ما تشتهيه الآن.',
    };
  }
  const dateHash = dateKey
    .split('')
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const index = Math.abs(dayNumber * 7 + dateHash) % messages.length;
  return messages[index];
}

export function formatDisplayDate(
  dateKey: string,
  language: 'en' | 'ar',
): string {
  const [year, month, day] = dateKey.split('-').map(Number);
  const localNoon = new Date(year, month - 1, day, 12, 0, 0);
  return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA-u-ca-gregory' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(localNoon);
}
