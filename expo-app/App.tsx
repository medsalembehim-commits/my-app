import React, { useEffect, useState } from 'react';
import {
  I18nManager,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  configureAndroidNotifications,
  scheduleDailyDisciplineReminder,
} from './src/notifications';
import { loadExpoState, saveExpoState, type ExpoJourneyState } from './src/storage';

const PALETTE = {
  light: {
    bg: '#F6F4EF',
    card: '#FCFBF8',
    border: '#DED8CB',
    text: '#1E201D',
    muted: '#5C6158',
    olive: '#556B45',
  },
  dark: {
    bg: '#151714',
    card: '#1E211C',
    border: '#32372F',
    text: '#F2EFE9',
    muted: '#A6ABA1',
    olive: '#7D9868',
  },
};

export default function App() {
  const [state, setState] = useState<ExpoJourneyState | null>(null);

  useEffect(() => {
    loadExpoState().then((loaded) => {
      const todayKey = new Date().toISOString().slice(0, 10);
      setState(
        loaded ?? {
          habitName: '',
          personalReasons: '',
          startDateKey: todayKey,
          language: 'en',
          theme: 'light',
          reminderTime: '20:00',
          notificationsEnabled: false,
          onboardingCompleted: true,
          checkedInDates: [],
          recoveredDates: [],
          journalEntries: [],
        },
      );
    });
  }, []);

  useEffect(() => {
    if (!state) return;
    saveExpoState(state);
    I18nManager.allowRTL(state.language === 'ar');
    I18nManager.forceRTL(state.language === 'ar');
  }, [state]);

  if (!state) return null;

  const colors = PALETTE[state.theme];
  const todayKey = new Date().toISOString().slice(0, 10);
  const checkedToday = state.checkedInDates.includes(todayKey);
  const completedCount = state.checkedInDates.length;
  const pct = Math.min(100, Math.round((completedCount / 75) * 100));

  const handleCheckIn = () => {
    if (checkedToday) return;
    setState((prev) =>
      prev
        ? {
            ...prev,
            checkedInDates: [...prev.checkedInDates, todayKey].sort(),
          }
        : prev,
    );
  };

  const handleEnableNotifications = async () => {
    const granted = await configureAndroidNotifications();
    if (granted) {
      await scheduleDailyDisciplineReminder(
        state.reminderTime,
        state.language,
        state.language === 'ar'
          ? 'الانضباط هو أن تفي بوعدك لنفسك.'
          : 'Discipline is keeping a promise to yourself.',
      );
      setState((prev) =>
        prev ? { ...prev, notificationsEnabled: true } : prev,
      );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar style={state.theme === 'dark' ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>75 DAYS</Text>
        <Text style={[styles.slogan, { color: colors.muted }]}>
          {state.language === 'ar'
            ? 'أنت لا تترك عادةً فحسب، بل تبني نسخةً أقوى من نفسك.'
            : 'You are not just leaving a habit. You are building a stronger version of yourself.'}
        </Text>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.metric, { color: colors.text }]}>
            {completedCount} / 75 ({pct}%)
          </Text>
          <TouchableOpacity
            onPress={handleCheckIn}
            disabled={checkedToday}
            style={[
              styles.button,
              { backgroundColor: colors.olive, opacity: checkedToday ? 0.6 : 1 },
            ]}
          >
            <Text style={styles.buttonText}>
              {checkedToday
                ? state.language === 'ar'
                  ? 'تم التزام اليوم'
                  : 'Committed Today'
                : state.language === 'ar'
                  ? 'تأكيد التزام اليوم'
                  : 'Commit Today'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleEnableNotifications}
          style={[
            styles.outlineBtn,
            { borderColor: colors.border, backgroundColor: colors.card },
          ]}
        >
          <Text style={{ color: colors.text, fontWeight: '600' }}>
            {state.language === 'ar'
              ? 'تفعيل تذكير الأندرويد اليومي'
              : 'Enable Offline Android Reminder'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, gap: 16 },
  title: { fontSize: 32, fontWeight: '700' },
  slogan: { fontSize: 15, lineHeight: 22 },
  card: { borderWidth: 1, borderRadius: 20, padding: 24, gap: 16 },
  metric: { fontSize: 28, fontWeight: '700', textAlign: 'center' },
  button: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
  outlineBtn: {
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
});
