import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function configureAndroidNotifications(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('daily-discipline', {
      name: 'Daily Discipline Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 200],
      lightColor: '#556B45',
    });
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;
  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  return finalStatus === 'granted';
}

/**
 * Schedules a local offline daily reminder on Android.
 * Privacy invariant: never includes the user's private habit name.
 */
export async function scheduleDailyDisciplineReminder(
  reminderTime: string,
  language: 'en' | 'ar',
  quoteText: string,
): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const [hourStr, minuteStr] = reminderTime.split(':');
  const hour = Number(hourStr) || 20;
  const minute = Number(minuteStr) || 0;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: language === 'ar' ? '٧٥ يوماً · التزام اليوم' : '75 DAYS · Daily Check-in',
      body: quoteText,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
      channelId: 'daily-discipline',
    },
  });
}
