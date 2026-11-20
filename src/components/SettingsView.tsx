import React, { useState } from 'react';
import {
  Bell,
  Download,
  Lock,
  Moon,
  RotateCcw,
  Shield,
  Sun,
} from 'lucide-react';
import type { Translations } from '../data/translations';
import {
  getNotificationPermission,
  requestNotificationPermission,
  type NotificationPermissionState,
} from '../services/notifications';
import type { Language, ThemeMode, UserProfile } from '../types/journey';

interface SettingsViewProps {
  profile: UserProfile;
  language: Language;
  t: Translations;
  onChangeLanguage: (lang: Language) => void;
  onChangeTheme: (theme: ThemeMode) => void;
  onUpdateProfile: (partial: Partial<UserProfile>) => void;
  onSendTestNotification: () => boolean;
  onExportData: () => void;
  onResetJourney: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  language,
  t,
  onChangeLanguage,
  onChangeTheme,
  onUpdateProfile,
  onSendTestNotification,
  onExportData,
  onResetJourney,
}) => {
  const [habitInput, setHabitInput] = useState(profile.habitName);
  const [reasonsInput, setReasonsInput] = useState(profile.personalReasons);
  const [savedNotice, setSavedNotice] = useState(false);
  const [testNotice, setTestNotice] = useState<string | null>(null);
  const [permState, setPermState] = useState<NotificationPermissionState>(() =>
    getNotificationPermission(),
  );
  const [showResetModal, setShowResetModal] = useState(false);

  const handleSavePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      habitName: habitInput.trim(),
      personalReasons: reasonsInput.trim(),
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleRequestPermission = async () => {
    const result = await requestNotificationPermission();
    setPermState(result);
    if (result === 'granted') {
      onUpdateProfile({ notificationsEnabled: true });
    }
  };

  const handleToggleNotifications = async () => {
    if (!profile.notificationsEnabled) {
      let currentPerm = getNotificationPermission();
      if (currentPerm === 'default') {
        currentPerm = await requestNotificationPermission();
        setPermState(currentPerm);
      }
      onUpdateProfile({ notificationsEnabled: true });
    } else {
      onUpdateProfile({ notificationsEnabled: false });
    }
  };

  const handleTestNotification = () => {
    const sent = onSendTestNotification();
    if (sent) {
      setTestNotice(t.settings.testSentSuccess);
    } else {
      setTestNotice(
        permState === 'denied'
          ? t.settings.permissionDenied
          : t.settings.permissionDefault,
      );
    }
    setTimeout(() => setTestNotice(null), 4000);
  };

  const permissionLabel =
    permState === 'granted'
      ? t.settings.permissionGranted
      : permState === 'denied'
        ? t.settings.permissionDenied
        : permState === 'unsupported'
          ? t.settings.permissionUnsupported
          : t.settings.permissionDefault;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
          {t.settings.title}
        </h1>
        <p className="mt-1 text-sm text-[#5C6158] dark:text-[#A6ABA1]">
          {t.settings.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Language, Theme, Notifications */}
        <div className="lg:col-span-6 space-y-6">
          {/* Language & Theme */}
          <section className="rounded-3xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-6 space-y-6">
            <div>
              <h2 className="text-sm font-semibold text-[#1E201D] dark:text-[#F2EFE9] mb-3">
                {t.settings.languageLabel}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onChangeLanguage('en')}
                  className={`min-h-[46px] rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                    language === 'en'
                      ? 'border-[#556B45] bg-[#E9EFE4] text-[#1E201D] dark:border-[#7D9868] dark:bg-[#252E1F] dark:text-[#F2EFE9]'
                      : 'border-[#DED8CB] bg-[#F6F4EF] text-[#5C6158] hover:bg-[#EDE8DE] dark:border-[#32372F] dark:bg-[#171916] dark:text-[#A6ABA1]'
                  }`}
                >
                  English (LTR)
                </button>
                <button
                  type="button"
                  onClick={() => onChangeLanguage('ar')}
                  className={`min-h-[46px] rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                    language === 'ar'
                      ? 'border-[#556B45] bg-[#E9EFE4] text-[#1E201D] dark:border-[#7D9868] dark:bg-[#252E1F] dark:text-[#F2EFE9]'
                      : 'border-[#DED8CB] bg-[#F6F4EF] text-[#5C6158] hover:bg-[#EDE8DE] dark:border-[#32372F] dark:bg-[#171916] dark:text-[#A6ABA1]'
                  }`}
                >
                  العربية (RTL)
                </button>
              </div>
            </div>

            <div className="pt-5 border-t border-[#DED8CB] dark:border-[#32372F]">
              <h2 className="text-sm font-semibold text-[#1E201D] dark:text-[#F2EFE9] mb-3">
                {t.settings.themeLabel}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onChangeTheme('light')}
                  className={`min-h-[46px] rounded-xl border px-4 py-2.5 text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors ${
                    profile.theme === 'light'
                      ? 'border-[#556B45] bg-[#E9EFE4] text-[#1E201D] dark:border-[#7D9868] dark:bg-[#252E1F] dark:text-[#F2EFE9]'
                      : 'border-[#DED8CB] bg-[#F6F4EF] text-[#5C6158] hover:bg-[#EDE8DE] dark:border-[#32372F] dark:bg-[#171916] dark:text-[#A6ABA1]'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span>{t.settings.light}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChangeTheme('dark')}
                  className={`min-h-[46px] rounded-xl border px-4 py-2.5 text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors ${
                    profile.theme === 'dark'
                      ? 'border-[#556B45] bg-[#E9EFE4] text-[#1E201D] dark:border-[#7D9868] dark:bg-[#252E1F] dark:text-[#F2EFE9]'
                      : 'border-[#DED8CB] bg-[#F6F4EF] text-[#5C6158] hover:bg-[#EDE8DE] dark:border-[#32372F] dark:bg-[#171916] dark:text-[#A6ABA1]'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  <span>{t.settings.dark}</span>
                </button>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="rounded-3xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-[#556B45] dark:text-[#8CA877]" />
              <h2 className="text-base font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
                {t.settings.notificationsTitle}
              </h2>
            </div>

            <div className="flex items-center justify-between gap-4 py-2">
              <label
                htmlFor="notif-toggle-btn"
                className="text-sm font-medium text-[#1E201D] dark:text-[#F2EFE9]"
              >
                {t.settings.enableNotifications}
              </label>
              <button
                id="notif-toggle-btn"
                type="button"
                role="switch"
                aria-checked={profile.notificationsEnabled}
                onClick={handleToggleNotifications}
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors ${
                  profile.notificationsEnabled
                    ? 'bg-[#556B45] dark:bg-[#7D9868]'
                    : 'bg-[#D6D0C4] dark:bg-[#3A3F36]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                    profile.notificationsEnabled
                      ? language === 'ar'
                        ? '-translate-x-5'
                        : 'translate-x-5'
                      : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label
                htmlFor="settings-reminder-time"
                className="text-sm text-[#5C6158] dark:text-[#A6ABA1]"
              >
                {t.settings.reminderTimeLabel}
              </label>
              <input
                id="settings-reminder-time"
                type="time"
                value={profile.reminderTime}
                onChange={(e) =>
                  onUpdateProfile({ reminderTime: e.target.value })
                }
                className="min-h-[44px] rounded-xl border border-[#DED8CB] dark:border-[#32372F] bg-[#F6F4EF] dark:bg-[#171916] px-3.5 py-2 text-sm font-mono-tabular text-[#1E201D] dark:text-[#F2EFE9] focus:outline-none focus:ring-2 focus:ring-[#556B45]"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-[#5C6158] dark:text-[#A6ABA1]">
              <span>
                {t.settings.permissionStatus}:{' '}
                <strong className="text-[#1E201D] dark:text-[#F2EFE9]">
                  {permissionLabel}
                </strong>
              </span>
              {permState === 'default' && (
                <button
                  type="button"
                  onClick={handleRequestPermission}
                  className="min-h-[38px] px-3 py-1.5 rounded-lg bg-[#EDE8DE] dark:bg-[#262A24] text-[#1E201D] dark:text-[#F2EFE9] font-semibold hover:bg-[#E2DBD0] dark:hover:bg-[#30352D] transition-colors"
                >
                  {t.settings.requestPermission}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleTestNotification}
              className="min-h-[44px] w-full rounded-xl border border-[#DED8CB] dark:border-[#32372F] bg-[#F6F4EF] dark:bg-[#262A24] px-4 py-2.5 text-xs font-semibold text-[#1E201D] dark:text-[#F2EFE9] hover:bg-[#EDE8DE] dark:hover:bg-[#30352D] transition-colors"
            >
              {t.settings.sendTestNotification}
            </button>

            {testNotice && (
              <p
                role="status"
                className="text-xs font-medium text-[#556B45] dark:text-[#8CA877]"
              >
                {testNotice}
              </p>
            )}

            <p className="text-xs text-[#5C6158] dark:text-[#A6ABA1] leading-relaxed flex items-start gap-2">
              <Lock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>{t.settings.notificationPrivacyNote}</span>
            </p>
          </section>
        </div>

        {/* Right Column: Personal Reasons, Data Export, Reset, Privacy */}
        <div className="lg:col-span-6 space-y-6">
          {/* Edit Personal Details */}
          <section className="rounded-3xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-6">
            <h2 className="text-base font-semibold text-[#1E201D] dark:text-[#F2EFE9] mb-4">
              {t.settings.personalSectionTitle}
            </h2>
            <form onSubmit={handleSavePersonal} className="space-y-4">
              <div>
                <label
                  htmlFor="settings-habit-name"
                  className="block text-xs font-semibold text-[#5C6158] dark:text-[#A6ABA1] mb-1.5"
                >
                  {t.settings.habitNameLabel}
                </label>
                <input
                  id="settings-habit-name"
                  type="text"
                  value={habitInput}
                  onChange={(e) => setHabitInput(e.target.value)}
                  className="w-full min-h-[46px] rounded-xl border border-[#DED8CB] dark:border-[#32372F] bg-[#F6F4EF] dark:bg-[#171916] px-3.5 py-2.5 text-sm text-[#1E201D] dark:text-[#F2EFE9] focus:outline-none focus:ring-2 focus:ring-[#556B45]"
                />
              </div>

              <div>
                <label
                  htmlFor="settings-personal-reasons"
                  className="block text-xs font-semibold text-[#5C6158] dark:text-[#A6ABA1] mb-1.5"
                >
                  {t.settings.personalReasonsLabel}
                </label>
                <textarea
                  id="settings-personal-reasons"
                  rows={3}
                  value={reasonsInput}
                  onChange={(e) => setReasonsInput(e.target.value)}
                  className="w-full rounded-xl border border-[#DED8CB] dark:border-[#32372F] bg-[#F6F4EF] dark:bg-[#171916] px-3.5 py-2.5 text-sm text-[#1E201D] dark:text-[#F2EFE9] focus:outline-none focus:ring-2 focus:ring-[#556B45]"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="submit"
                  className="min-h-[44px] rounded-xl bg-[#556B45] dark:bg-[#7D9868] px-5 py-2.5 text-sm font-semibold text-white dark:text-[#151714] hover:bg-[#465938] dark:hover:bg-[#8FA97A] transition-colors"
                >
                  {t.settings.saveChanges}
                </button>
                {savedNotice && (
                  <span
                    role="status"
                    className="text-xs font-medium text-[#556B45] dark:text-[#8CA877]"
                  >
                    {t.settings.savedToast}
                  </span>
                )}
              </div>
            </form>
          </section>

          {/* Export & Reset */}
          <section className="rounded-3xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-6 space-y-5">
            <h2 className="text-base font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
              {t.settings.dataSectionTitle}
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#1E201D] dark:text-[#F2EFE9]">
                  {t.settings.exportData}
                </p>
                <p className="text-xs text-[#5C6158] dark:text-[#A6ABA1] mt-0.5">
                  {t.settings.exportDesc}
                </p>
              </div>
              <button
                type="button"
                onClick={onExportData}
                className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl border border-[#DED8CB] dark:border-[#32372F] bg-[#F6F4EF] dark:bg-[#262A24] px-4 py-2 text-xs font-semibold text-[#1E201D] dark:text-[#F2EFE9] hover:bg-[#EDE8DE] dark:hover:bg-[#30352D] transition-colors whitespace-nowrap shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>{t.settings.exportData}</span>
              </button>
            </div>

            <div className="pt-4 border-t border-[#DED8CB] dark:border-[#32372F] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#7D4730] dark:text-[#E2AC93]">
                  {t.settings.resetJourney}
                </p>
                <p className="text-xs text-[#5C6158] dark:text-[#A6ABA1] mt-0.5">
                  {t.settings.resetDesc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowResetModal(true)}
                className="min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl border border-[#DFC4B6] dark:border-[#52392F] bg-[#F4EAE4] dark:bg-[#2F231E] px-4 py-2 text-xs font-semibold text-[#7D4730] dark:text-[#E2AC93] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.settings.resetJourney}</span>
              </button>
            </div>
          </section>

          {/* Privacy Info */}
          <section className="rounded-3xl bg-[#EDE8DE]/60 dark:bg-[#1A1D18] border border-[#DED8CB] dark:border-[#2E332B] p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#556B45] dark:text-[#8CA877]">
              <Shield className="w-4 h-4" />
              <h2 className="text-sm font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
                {t.settings.privacySectionTitle}
              </h2>
            </div>
            <ul className="space-y-2 text-xs text-[#5C6158] dark:text-[#A6ABA1] leading-relaxed list-disc ps-4">
              {t.settings.privacyPoints.map((pt, idx) => (
                <li key={idx}>{pt}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-modal-title"
        >
          <div className="w-full max-w-md rounded-3xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-6 shadow-2xl">
            <h2
              id="reset-modal-title"
              className="text-lg font-semibold text-[#1E201D] dark:text-[#F2EFE9]"
            >
              {t.settings.resetConfirmTitle}
            </h2>
            <p className="mt-2 text-sm text-[#5C6158] dark:text-[#A6ABA1] leading-relaxed">
              {t.settings.resetConfirmBody}
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="min-h-[44px] rounded-xl border border-[#DED8CB] dark:border-[#32372F] px-4 py-2 text-sm font-medium text-[#1E201D] dark:text-[#F2EFE9] hover:bg-[#EDE8DE] dark:hover:bg-[#262A24]"
              >
                {t.journey.cancel}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowResetModal(false);
                  onResetJourney();
                }}
                className="min-h-[44px] rounded-xl bg-[#7D4730] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                {t.settings.confirmResetBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
