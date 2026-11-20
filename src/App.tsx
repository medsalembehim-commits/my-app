import { useEffect, useMemo, useState } from 'react';
import { EmergencyMotivationModal } from './components/EmergencyMotivationModal';
import { HomeDashboard } from './components/HomeDashboard';
import { JournalView } from './components/JournalView';
import { JourneyView } from './components/JourneyView';
import { MotivationView } from './components/MotivationView';
import { NavigationShell, type NavTab } from './components/NavigationShell';
import { OnboardingFlow } from './components/OnboardingFlow';
import { SettingsView } from './components/SettingsView';
import { SupportiveRecoveryModal } from './components/SupportiveRecoveryModal';
import { MOTIVATIONAL_MESSAGES } from './data/motivations';
import { TRANSLATIONS } from './data/translations';
import {
  dispatchLocalReminder,
  isReminderTimeDueNow,
} from './services/notifications';
import {
  createInitialState,
  exportJourneyDataAsJson,
  loadJourneyState,
  saveJourneyState,
} from './services/storage';
import type {
  JourneyState,
  Language,
  ThemeMode,
  UserProfile,
} from './types/journey';
import {
  applySupportiveRecovery,
  calculateJourneyProgress,
  getDailyMotivationMessage,
  getLocalDateKey,
  performDailyCheckIn,
} from './utils/journeyMath';

export default function App() {
  const [state, setState] = useState<JourneyState>(() => loadJourneyState());
  const [todayKey, setTodayKey] = useState<string>(() => getLocalDateKey());
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [recoveryFeedback, setRecoveryFeedback] = useState<string | null>(null);

  const language = state.profile.language;
  const theme = state.profile.theme;
  const t = TRANSLATIONS[language];

  // Sync HTML dir, lang, and .dark class with state
  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [language, theme]);

  // Persist every state transition locally
  useEffect(() => {
    saveJourneyState(state);
  }, [state]);

  // Refresh todayKey across midnight or timezone updates and check reminder schedule
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const freshKey = getLocalDateKey(now);
      setTodayKey((prev) => (prev === freshKey ? prev : freshKey));

      setState((prev) => {
        if (
          !prev.profile.onboardingCompleted ||
          !prev.profile.notificationsEnabled ||
          prev.lastNotificationSentDateKey === freshKey
        ) {
          return prev;
        }
        if (!isReminderTimeDueNow(prev.profile.reminderTime, now)) {
          return prev;
        }
        const prog = calculateJourneyProgress(prev, freshKey);
        const sent = dispatchLocalReminder(
          prev.profile.language,
          prog.currentDayNumber,
          freshKey,
        );
        if (!sent) return prev;
        return {
          ...prev,
          lastNotificationSentDateKey: freshKey,
        };
      });
    };

    tick();
    const interval = setInterval(tick, 30_000);
    return () => clearInterval(interval);
  }, []);

  const progress = useMemo(
    () => calculateJourneyProgress(state, todayKey),
    [state, todayKey],
  );

  const dailyQuote = useMemo(
    () =>
      getDailyMotivationMessage(
        MOTIVATIONAL_MESSAGES,
        progress.currentDayNumber,
        todayKey,
      ),
    [progress.currentDayNumber, todayKey],
  );

  const handleLanguageChange = (lang: Language) => {
    setState((prev) => ({
      ...prev,
      profile: { ...prev.profile, language: lang },
    }));
  };

  const handleThemeChange = (nextTheme: ThemeMode) => {
    setState((prev) => ({
      ...prev,
      profile: { ...prev.profile, theme: nextTheme },
    }));
  };

  const handleCompleteOnboarding = (payload: {
    habitName: string;
    personalReasons: string;
    reminderTime: string;
    language: Language;
    theme: ThemeMode;
  }) => {
    const startKey = getLocalDateKey();
    setTodayKey(startKey);
    setState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        habitName: payload.habitName,
        personalReasons: payload.personalReasons,
        reminderTime: payload.reminderTime,
        language: payload.language,
        theme: payload.theme,
        startDateKey: startKey,
        onboardingCompleted: true,
      },
    }));
  };

  const handleCommitToday = () => {
    setState((prev) => {
      const { nextState, didCheckIn } = performDailyCheckIn(prev, todayKey);
      return didCheckIn ? nextState : prev;
    });
  };

  const handleRecover = (
    mode: 'continue-forward' | 'recommit-today',
    note: string,
  ) => {
    setState((prev) => applySupportiveRecovery(prev, mode, note, todayKey));
    setRecoveryFeedback(t.journey.recoverySuccess);
    setTimeout(() => setRecoveryFeedback(null), 5000);
  };

  const handleToggleFavorite = (msgId: string) => {
    setState((prev) => {
      const exists = prev.favoriteMessageIds.includes(msgId);
      const nextFavs = exists
        ? prev.favoriteMessageIds.filter((id) => id !== msgId)
        : [...prev.favoriteMessageIds, msgId];
      return {
        ...prev,
        favoriteMessageIds: nextFavs,
      };
    });
  };

  const handleSaveJournal = (payload: {
    id?: string;
    howWasDay: string;
    whatWentWell: string;
    whatChallengedYou: string;
    gratefulFor: string;
  }) => {
    const nowIso = new Date().toISOString();
    setState((prev) => {
      if (payload.id) {
        return {
          ...prev,
          journalEntries: prev.journalEntries.map((entry) =>
            entry.id === payload.id
              ? {
                  ...entry,
                  howWasDay: payload.howWasDay,
                  whatWentWell: payload.whatWentWell,
                  whatChallengedYou: payload.whatChallengedYou,
                  gratefulFor: payload.gratefulFor,
                  updatedAt: nowIso,
                }
              : entry,
          ),
        };
      }

      const newEntry = {
        id: `j_${Date.now()}`,
        dateKey: todayKey,
        createdAt: nowIso,
        updatedAt: nowIso,
        howWasDay: payload.howWasDay,
        whatWentWell: payload.whatWentWell,
        whatChallengedYou: payload.whatChallengedYou,
        gratefulFor: payload.gratefulFor,
      };
      return {
        ...prev,
        journalEntries: [newEntry, ...prev.journalEntries],
      };
    });
  };

  const handleDeleteJournal = (id: string) => {
    setState((prev) => ({
      ...prev,
      journalEntries: prev.journalEntries.filter((e) => e.id !== id),
    }));
  };

  const handleUpdateProfile = (partial: Partial<UserProfile>) => {
    setState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...partial,
      },
    }));
  };

  const handleSendTestNotification = () => {
    return dispatchLocalReminder(language, progress.currentDayNumber, todayKey);
  };

  const handleResetJourney = () => {
    const freshKey = getLocalDateKey();
    setTodayKey(freshKey);
    const fresh = createInitialState(freshKey);
    setState({
      ...fresh,
      profile: {
        ...fresh.profile,
        language: state.profile.language,
        theme: state.profile.theme,
      },
    });
    setActiveTab('home');
  };

  if (!state.profile.onboardingCompleted) {
    return (
      <OnboardingFlow
        language={language}
        theme={theme}
        onChangeLanguage={handleLanguageChange}
        onChangeTheme={handleThemeChange}
        onComplete={handleCompleteOnboarding}
      />
    );
  }

  return (
    <NavigationShell
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      language={language}
      t={t}
      dayNumber={progress.currentDayNumber}
    >
      {activeTab === 'home' && (
        <HomeDashboard
          profile={state.profile}
          progress={progress}
          dailyQuote={dailyQuote}
          language={language}
          t={t}
          onCommitToday={handleCommitToday}
          onOpenEmergency={() => setEmergencyOpen(true)}
          onOpenRecovery={() => setRecoveryOpen(true)}
          onNavigateJourney={() => setActiveTab('journey')}
        />
      )}

      {activeTab === 'journey' && (
        <JourneyView
          progress={progress}
          language={language}
          t={t}
          onOpenRecovery={() => setRecoveryOpen(true)}
          recoveryBannerMessage={recoveryFeedback}
        />
      )}

      {activeTab === 'motivation' && (
        <MotivationView
          dailyQuote={dailyQuote}
          favoriteIds={state.favoriteMessageIds}
          language={language}
          t={t}
          onToggleFavorite={handleToggleFavorite}
          onOpenEmergency={() => setEmergencyOpen(true)}
        />
      )}

      {activeTab === 'journal' && (
        <JournalView
          entries={state.journalEntries}
          language={language}
          t={t}
          onSaveEntry={handleSaveJournal}
          onDeleteEntry={handleDeleteJournal}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsView
          profile={state.profile}
          language={language}
          t={t}
          onChangeLanguage={handleLanguageChange}
          onChangeTheme={handleThemeChange}
          onUpdateProfile={handleUpdateProfile}
          onSendTestNotification={handleSendTestNotification}
          onExportData={() => exportJourneyDataAsJson(state)}
          onResetJourney={handleResetJourney}
        />
      )}

      <EmergencyMotivationModal
        open={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
        language={language}
        t={t}
        personalReasons={state.profile.personalReasons}
      />

      <SupportiveRecoveryModal
        open={recoveryOpen}
        onClose={() => setRecoveryOpen(false)}
        t={t}
        onRecover={handleRecover}
      />
    </NavigationShell>
  );
}
