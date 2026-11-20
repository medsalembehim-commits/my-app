import type { JourneyState } from '../types/journey';
import { addDaysToDateKey, getLocalDateKey } from '../utils/journeyMath';

const STORAGE_KEY = '75days_discipline_state_v1';

export function createInitialState(todayKey: string = getLocalDateKey()): JourneyState {
  return {
    profile: {
      habitName: '',
      personalReasons: '',
      startDateKey: todayKey,
      language: 'en',
      theme: 'light',
      reminderTime: '20:00',
      notificationsEnabled: false,
      onboardingCompleted: false,
    },
    checkedInDates: [],
    recoveredDates: [],
    recoveryHistory: [],
    journalEntries: [],
    favoriteMessageIds: [],
    lastNotificationSentDateKey: null,
  };
}

export function createAutostartSeedState(
  todayKey: string = getLocalDateKey(),
): JourneyState {
  const startDateKey = addDaysToDateKey(todayKey, -8);
  const checkedInDates: string[] = [];
  // Completed days 1..5 and 7..8 (day 6 missed for realistic calendar state, today ready to check in)
  for (let i = 0; i < 8; i += 1) {
    if (i !== 5) {
      checkedInDates.push(addDaysToDateKey(startDateKey, i));
    }
  }

  return {
    profile: {
      habitName: 'Late-night mindless scrolling',
      personalReasons:
        'Reclaim morning clarity, sleep deeply, and stay present with my family.',
      startDateKey,
      language: 'en',
      theme: 'light',
      reminderTime: '20:00',
      notificationsEnabled: false,
      onboardingCompleted: true,
    },
    checkedInDates,
    recoveredDates: [],
    recoveryHistory: [],
    journalEntries: [
      {
        id: 'seed_j1',
        dateKey: addDaysToDateKey(todayKey, -1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        howWasDay: 'Calm and focused after putting the phone outside the bedroom.',
        whatWentWell: 'Read twenty pages before sleep and woke up rested.',
        whatChallengedYou: 'Evening boredom right after dinner.',
        gratefulFor: 'Quiet morning coffee and steady energy.',
      },
    ],
    favoriteMessageIds: ['disc_01', 'pat_02'],
    lastNotificationSentDateKey: null,
  };
}

export function loadJourneyState(): JourneyState {
  const todayKey = getLocalDateKey();
  const params =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : null;
  const autostart = params?.get('autostart') === '1';

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      if (autostart) {
        const seeded = createAutostartSeedState(todayKey);
        saveJourneyState(seeded);
        return seeded;
      }
      return createInitialState(todayKey);
    }
    const parsed = JSON.parse(raw) as Partial<JourneyState>;
    const base = createInitialState(todayKey);
    const merged: JourneyState = {
      profile: {
        ...base.profile,
        ...(parsed.profile ?? {}),
      },
      checkedInDates: Array.isArray(parsed.checkedInDates)
        ? parsed.checkedInDates
        : [],
      recoveredDates: Array.isArray(parsed.recoveredDates)
        ? parsed.recoveredDates
        : [],
      recoveryHistory: Array.isArray(parsed.recoveryHistory)
        ? parsed.recoveryHistory
        : [],
      journalEntries: Array.isArray(parsed.journalEntries)
        ? parsed.journalEntries
        : [],
      favoriteMessageIds: Array.isArray(parsed.favoriteMessageIds)
        ? parsed.favoriteMessageIds
        : [],
      lastNotificationSentDateKey:
        typeof parsed.lastNotificationSentDateKey === 'string'
          ? parsed.lastNotificationSentDateKey
          : null,
    };

    if (autostart && !merged.profile.onboardingCompleted) {
      const seeded = createAutostartSeedState(todayKey);
      saveJourneyState(seeded);
      return seeded;
    }
    return merged;
  } catch {
    return autostart
      ? createAutostartSeedState(todayKey)
      : createInitialState(todayKey);
  }
}

export function saveJourneyState(state: JourneyState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors gracefully
  }
}

export function exportJourneyDataAsJson(state: JourneyState): void {
  const payload = {
    exportedAt: new Date().toISOString(),
    app: '75 DAYS - Discipline Journey',
    ...state,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `75-days-backup-${getLocalDateKey()}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
