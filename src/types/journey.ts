export type Language = 'en' | 'ar';
export type ThemeMode = 'light' | 'dark';

export type MotivationCategory =
  | 'discipline'
  | 'patience'
  | 'self-control'
  | 'confidence'
  | 'consistency'
  | 'starting-again';

export interface MotivationalMessage {
  id: string;
  category: MotivationCategory;
  en: string;
  ar: string;
}

export interface EmergencyMessage {
  id: string;
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
  actionEn: string;
  actionAr: string;
}

export type DayStatus = 'completed' | 'missed' | 'pending' | 'recovered';

export interface JourneyCalendarDay {
  dayNumber: number; // 1..75
  dateKey: string; // YYYY-MM-DD
  status: DayStatus;
  isToday: boolean;
}

export interface MilestoneDefinition {
  day: number;
  id: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
}

export interface MilestoneStatus extends MilestoneDefinition {
  unlocked: boolean;
  daysRemaining: number;
}

export interface JournalEntry {
  id: string;
  dateKey: string;
  createdAt: string;
  updatedAt: string;
  howWasDay: string;
  whatWentWell: string;
  whatChallengedYou: string;
  gratefulFor: string;
}

export interface RecoveryRecord {
  id: string;
  dateKey: string;
  mode: 'continue-forward' | 'recommit-today';
  note: string;
  createdAt: string;
}

export interface UserProfile {
  habitName: string; // Kept strictly private, never displayed in notifications
  personalReasons: string;
  startDateKey: string; // YYYY-MM-DD local date when journey started
  language: Language;
  theme: ThemeMode;
  reminderTime: string; // HH:MM 24h format
  notificationsEnabled: boolean;
  onboardingCompleted: boolean;
}

export interface JourneyState {
  profile: UserProfile;
  checkedInDates: string[]; // Sorted unique YYYY-MM-DD local calendar dates
  recoveredDates: string[]; // Missed days acknowledged via supportive recovery without erasing history
  recoveryHistory: RecoveryRecord[];
  journalEntries: JournalEntry[];
  favoriteMessageIds: string[];
  lastNotificationSentDateKey: string | null;
}

export interface JourneyProgressSummary {
  currentDayNumber: number; // 1..75 (clamped)
  elapsedCalendarDays: number;
  completedCount: number;
  missedCount: number;
  recoveredCount: number;
  daysRemaining: number;
  percentageCompleted: number; // 0..100 integer or rounded 1 decimal
  currentStreak: number;
  longestStreak: number;
  isCheckedInToday: boolean;
  isJourneyComplete: boolean;
  hasUnacknowledgedMissedDays: boolean;
  calendarDays: JourneyCalendarDay[];
  milestones: MilestoneStatus[];
  nextMilestone: MilestoneStatus | null;
}
