import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '75days_expo_state_v1';

export interface ExpoJourneyState {
  habitName: string;
  personalReasons: string;
  startDateKey: string;
  language: 'en' | 'ar';
  theme: 'light' | 'dark';
  reminderTime: string;
  notificationsEnabled: boolean;
  onboardingCompleted: boolean;
  checkedInDates: string[];
  recoveredDates: string[];
  journalEntries: Array<{
    id: string;
    dateKey: string;
    howWasDay: string;
    whatWentWell: string;
    whatChallengedYou: string;
    gratefulFor: string;
  }>;
}

export async function loadExpoState(): Promise<ExpoJourneyState | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as ExpoJourneyState) : null;
}

export async function saveExpoState(state: ExpoJourneyState): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
