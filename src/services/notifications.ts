import { MOTIVATIONAL_MESSAGES } from '../data/motivations';
import { TRANSLATIONS } from '../data/translations';
import type { Language } from '../types/journey';
import { getDailyMotivationMessage, getLocalDateKey } from '../utils/journeyMath';

export type NotificationPermissionState =
  | 'granted'
  | 'denied'
  | 'default'
  | 'unsupported';

export function getNotificationPermission(): NotificationPermissionState {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<NotificationPermissionState> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  try {
    const result = await Notification.requestPermission();
    return result;
  } catch {
    return Notification.permission ?? 'default';
  }
}

/**
 * Fires a privacy-preserving local notification.
 * CRITICAL PRIVACY RULE: Never displays the private habit name in notifications.
 */
export function dispatchLocalReminder(
  language: Language,
  dayNumber: number,
  dateKey: string = getLocalDateKey(),
): boolean {
  if (
    typeof window === 'undefined' ||
    !('Notification' in window) ||
    Notification.permission !== 'granted'
  ) {
    return false;
  }

  const t = TRANSLATIONS[language];
  const dailyQuote = getDailyMotivationMessage(
    MOTIVATIONAL_MESSAGES,
    dayNumber,
    dateKey,
  );
  const quoteText = language === 'ar' ? dailyQuote.ar : dailyQuote.en;

  const title =
    language === 'ar'
      ? `${t.notificationCopy.title} · اليوم ${dayNumber}`
      : `${t.notificationCopy.title} · Day ${dayNumber}`;

  try {
    new Notification(title, {
      body: quoteText,
      tag: `75days-daily-${dateKey}`,
      silent: false,
    });
    return true;
  } catch {
    return false;
  }
}

export function isReminderTimeDueNow(
  reminderTime: string,
  now: Date = new Date(),
): boolean {
  const [targetHourStr, targetMinStr] = reminderTime.split(':');
  const targetHour = Number(targetHourStr);
  const targetMin = Number(targetMinStr);
  if (Number.isNaN(targetHour) || Number.isNaN(targetMin)) return false;

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const targetMinutes = targetHour * 60 + targetMin;
  return nowMinutes >= targetMinutes;
}
