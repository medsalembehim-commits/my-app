import test from 'node:test';
import assert from 'node:assert/strict';
import {
  addDaysToDateKey,
  applySupportiveRecovery,
  calculateJourneyProgress,
  diffCalendarDays,
  getDailyMotivationMessage,
  performDailyCheckIn,
} from './journeyMath';
import type { JourneyState, MotivationalMessage } from '../types/journey';

function makeBaseState(startDateKey = '2026-11-01'): JourneyState {
  return {
    profile: {
      habitName: 'Late night scrolling',
      personalReasons: 'Protect sleep and focus',
      startDateKey,
      language: 'en',
      theme: 'light',
      reminderTime: '20:00',
      notificationsEnabled: false,
      onboardingCompleted: true,
    },
    checkedInDates: [],
    recoveredDates: [],
    recoveryHistory: [],
    journalEntries: [],
    favoriteMessageIds: [],
    lastNotificationSentDateKey: null,
  };
}

test('calendar arithmetic handles DST boundaries accurately without off-by-one drift', () => {
  // US DST fall-back day was Nov 1, 2026
  assert.equal(addDaysToDateKey('2026-10-31', 1), '2026-11-01');
  assert.equal(addDaysToDateKey('2026-11-01', 1), '2026-11-02');
  assert.equal(diffCalendarDays('2026-10-31', '2026-11-03'), 3);
  // Spring forward March 2026
  assert.equal(diffCalendarDays('2026-03-07', '2026-03-10'), 3);
});

test('performDailyCheckIn prevents duplicate check-ins on the same calendar date', () => {
  const state = makeBaseState('2026-11-10');
  const first = performDailyCheckIn(state, '2026-11-10');
  assert.equal(first.didCheckIn, true);
  assert.deepEqual(first.nextState.checkedInDates, ['2026-11-10']);

  const duplicate = performDailyCheckIn(first.nextState, '2026-11-10');
  assert.equal(duplicate.didCheckIn, false);
  assert.deepEqual(duplicate.nextState.checkedInDates, ['2026-11-10']);
});

test('progress, streak, percentage, and milestones compute correctly across 75 days', () => {
  let state = makeBaseState('2026-11-01');
  // Check in for 7 consecutive days: Nov 1..Nov 7
  for (let i = 0; i < 7; i += 1) {
    const key = addDaysToDateKey('2026-11-01', i);
    state = performDailyCheckIn(state, key).nextState;
  }

  const summary = calculateJourneyProgress(state, '2026-11-07');
  assert.equal(summary.currentDayNumber, 7);
  assert.equal(summary.completedCount, 7);
  assert.equal(summary.daysRemaining, 68);
  assert.equal(summary.percentageCompleted, 9);
  assert.equal(summary.currentStreak, 7);
  assert.equal(summary.longestStreak, 7);
  assert.equal(summary.isCheckedInToday, true);
  assert.equal(summary.milestones.find((m) => m.day === 1)?.unlocked, true);
  assert.equal(summary.milestones.find((m) => m.day === 7)?.unlocked, true);
  assert.equal(summary.milestones.find((m) => m.day === 15)?.unlocked, false);
  assert.equal(summary.nextMilestone?.day, 15);
});

test('supportive recovery never erases historical progress and marks missed days as recovered', () => {
  let state = makeBaseState('2026-11-01');
  state = performDailyCheckIn(state, '2026-11-01').nextState;
  state = performDailyCheckIn(state, '2026-11-02').nextState;
  // Missed Nov 3 and Nov 4, today is Nov 5
  const beforeRecovery = calculateJourneyProgress(state, '2026-11-05');
  assert.equal(beforeRecovery.completedCount, 2);
  assert.equal(beforeRecovery.missedCount, 2);
  assert.equal(beforeRecovery.hasUnacknowledgedMissedDays, true);

  const recoveredState = applySupportiveRecovery(
    state,
    'recommit-today',
    'Resetting calmly without guilt',
    '2026-11-05',
  );
  const afterRecovery = calculateJourneyProgress(recoveredState, '2026-11-05');

  // Historical days Nov 1 & Nov 2 remain completed, plus Nov 5 recommitted = 3
  assert.equal(afterRecovery.completedCount, 3);
  assert.equal(afterRecovery.missedCount, 0);
  assert.equal(afterRecovery.recoveredCount, 2);
  assert.equal(afterRecovery.hasUnacknowledgedMissedDays, false);
  assert.equal(recoveredState.recoveryHistory.length, 1);
});

test('daily motivational message deterministically varies across days', () => {
  const sample: MotivationalMessage[] = Array.from({ length: 100 }, (_, i) => ({
    id: `m_${i}`,
    category: 'discipline',
    en: `En ${i}`,
    ar: `Ar ${i}`,
  }));
  const day1 = getDailyMotivationMessage(sample, 1, '2026-11-20');
  const day2 = getDailyMotivationMessage(sample, 2, '2026-11-21');
  assert.notEqual(day1.id, day2.id);
});
