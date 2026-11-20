import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Lock, Moon, Sun } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import type { Language, ThemeMode } from '../types/journey';

const SUNRISE_IMG = '/src/assets/images/mountain_sunrise_dawn_1795207033329.jpg';
const STONE_IMG = '/src/assets/images/discipline_monolith_emblem_1795207034336.jpg';

interface OnboardingFlowProps {
  language: Language;
  theme: ThemeMode;
  onChangeLanguage: (lang: Language) => void;
  onChangeTheme: (theme: ThemeMode) => void;
  onComplete: (payload: {
    habitName: string;
    personalReasons: string;
    reminderTime: string;
    language: Language;
    theme: ThemeMode;
  }) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  language,
  theme,
  onChangeLanguage,
  onChangeTheme,
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [habitName, setHabitName] = useState('');
  const [personalReasons, setPersonalReasons] = useState('');
  const [reminderTime, setReminderTime] = useState('20:00');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';

  const handleNextFromStep1 = () => {
    setErrorMsg(null);
    setStep(2);
  };

  const handleNextFromStep2 = () => {
    if (!habitName.trim()) {
      setErrorMsg(t.onboarding.habitRequired);
      return;
    }
    if (!personalReasons.trim()) {
      setErrorMsg(t.onboarding.reasonsRequired);
      return;
    }
    setErrorMsg(null);
    setStep(3);
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!habitName.trim()) {
      setStep(2);
      setErrorMsg(t.onboarding.habitRequired);
      return;
    }
    if (!personalReasons.trim()) {
      setStep(2);
      setErrorMsg(t.onboarding.reasonsRequired);
      return;
    }
    onComplete({
      habitName: habitName.trim(),
      personalReasons: personalReasons.trim(),
      reminderTime,
      language,
      theme,
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F4EF] dark:bg-[#151714] text-[#1E201D] dark:text-[#F2EFE9] flex items-center justify-center p-4 sm:p-8 transition-colors">
      <div className="animate-fade-slide w-full max-w-5xl rounded-3xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm">
        {/* Left/Visual Column */}
        <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-[580px] bg-[#2B3326] overflow-hidden flex flex-col justify-end p-6 sm:p-8">
          {!heroImgFailed ? (
            <img
              src={step === 2 ? STONE_IMG : SUNRISE_IMG}
              alt="Calm mountain dawn landscape"
              referrerPolicy="no-referrer"
              onError={() => setHeroImgFailed(true)}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#3B4A31] via-[#273021] to-[#191D17]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" />

          <div className="relative z-10 text-[#F6F4EF]">
            <p className="text-xs font-medium tracking-widest text-[#D5DDD0]">
              {t.onboarding.stepLabel} {step} / 3
            </p>
            <h1 className="mt-2 font-serif-display text-4xl sm:text-5xl font-semibold tracking-tight">
              {t.onboarding.welcomeTitle}
            </h1>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#E9ECE6] text-balance">
              {t.slogan}
            </p>
          </div>
        </div>

        {/* Right/Form Column */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Progress Track */}
            <div className="flex items-center gap-2 mb-8" aria-hidden="true">
              {[1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    idx <= step
                      ? 'bg-[#556B45] dark:bg-[#7D9868]'
                      : 'bg-[#E6E0D4] dark:bg-[#2E332B]'
                  }`}
                />
              ))}
            </div>

            {step === 1 && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E201D] dark:text-[#F2EFE9] text-balance">
                  {t.onboarding.welcomeTitle} · {t.nav.journey}
                </h2>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#5C6158] dark:text-[#A6ABA1]">
                  {t.onboarding.welcomeSubtitle}
                </p>

                <div className="mt-8">
                  <span className="block text-xs font-semibold text-[#5C6158] dark:text-[#A6ABA1] mb-3">
                    {t.onboarding.chooseLanguage}
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => onChangeLanguage('en')}
                      className={`min-h-[52px] rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
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
                      className={`min-h-[52px] rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                        language === 'ar'
                          ? 'border-[#556B45] bg-[#E9EFE4] text-[#1E201D] dark:border-[#7D9868] dark:bg-[#252E1F] dark:text-[#F2EFE9]'
                          : 'border-[#DED8CB] bg-[#F6F4EF] text-[#5C6158] hover:bg-[#EDE8DE] dark:border-[#32372F] dark:bg-[#171916] dark:text-[#A6ABA1]'
                      }`}
                    >
                      العربية (RTL)
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-2.5 text-xs text-[#5C6158] dark:text-[#A6ABA1]">
                  <Lock className="w-4 h-4 shrink-0 mt-0.5 text-[#556B45] dark:text-[#8CA877]" />
                  <span>{t.onboarding.privacyGuarantee}</span>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="onboarding-habit-input"
                    className="block text-sm font-semibold text-[#1E201D] dark:text-[#F2EFE9] mb-2"
                  >
                    {t.onboarding.habitLabel}
                  </label>
                  <input
                    id="onboarding-habit-input"
                    type="text"
                    value={habitName}
                    onChange={(e) => {
                      setHabitName(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    placeholder={t.onboarding.habitPlaceholder}
                    className="w-full min-h-[48px] rounded-2xl border border-[#DED8CB] dark:border-[#32372F] bg-[#F6F4EF] dark:bg-[#171916] px-4 py-3 text-sm text-[#1E201D] dark:text-[#F2EFE9] placeholder:text-[#8B8F85] focus:outline-none focus:ring-2 focus:ring-[#556B45] dark:focus:ring-[#7D9868]"
                  />
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#5C6158] dark:text-[#A6ABA1]">
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span>{t.onboarding.habitPrivacyNote}</span>
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="onboarding-reasons-input"
                    className="block text-sm font-semibold text-[#1E201D] dark:text-[#F2EFE9] mb-2"
                  >
                    {t.onboarding.reasonsLabel}
                  </label>
                  <textarea
                    id="onboarding-reasons-input"
                    rows={4}
                    value={personalReasons}
                    onChange={(e) => {
                      setPersonalReasons(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    placeholder={t.onboarding.reasonsPlaceholder}
                    className="w-full rounded-2xl border border-[#DED8CB] dark:border-[#32372F] bg-[#F6F4EF] dark:bg-[#171916] px-4 py-3 text-sm text-[#1E201D] dark:text-[#F2EFE9] placeholder:text-[#8B8F85] focus:outline-none focus:ring-2 focus:ring-[#556B45] dark:focus:ring-[#7D9868]"
                  />
                </div>

                {errorMsg && (
                  <p
                    role="alert"
                    className="text-xs font-medium text-[#9A3412] dark:text-[#FDBA74]"
                  >
                    {errorMsg}
                  </p>
                )}
              </div>
            )}

            {step === 3 && (
              <form id="onboarding-finish-form" onSubmit={handleFinish} className="space-y-6">
                <div>
                  <label
                    htmlFor="onboarding-reminder-time"
                    className="block text-sm font-semibold text-[#1E201D] dark:text-[#F2EFE9] mb-2"
                  >
                    {t.onboarding.reminderLabel}
                  </label>
                  <input
                    id="onboarding-reminder-time"
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="w-full sm:w-56 min-h-[48px] rounded-2xl border border-[#DED8CB] dark:border-[#32372F] bg-[#F6F4EF] dark:bg-[#171916] px-4 py-3 text-sm font-mono-tabular text-[#1E201D] dark:text-[#F2EFE9] focus:outline-none focus:ring-2 focus:ring-[#556B45] dark:focus:ring-[#7D9868]"
                  />
                </div>

                <div>
                  <span className="block text-sm font-semibold text-[#1E201D] dark:text-[#F2EFE9] mb-3">
                    {t.onboarding.themeLabel}
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => onChangeTheme('light')}
                      className={`min-h-[52px] rounded-2xl border px-4 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors ${
                        theme === 'light'
                          ? 'border-[#556B45] bg-[#E9EFE4] text-[#1E201D] dark:border-[#7D9868] dark:bg-[#252E1F] dark:text-[#F2EFE9]'
                          : 'border-[#DED8CB] bg-[#F6F4EF] text-[#5C6158] hover:bg-[#EDE8DE] dark:border-[#32372F] dark:bg-[#171916] dark:text-[#A6ABA1]'
                      }`}
                    >
                      <Sun className="w-4 h-4" />
                      <span>{t.onboarding.lightMode}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onChangeTheme('dark')}
                      className={`min-h-[52px] rounded-2xl border px-4 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors ${
                        theme === 'dark'
                          ? 'border-[#556B45] bg-[#E9EFE4] text-[#1E201D] dark:border-[#7D9868] dark:bg-[#252E1F] dark:text-[#F2EFE9]'
                          : 'border-[#DED8CB] bg-[#F6F4EF] text-[#5C6158] hover:bg-[#EDE8DE] dark:border-[#32372F] dark:bg-[#171916] dark:text-[#A6ABA1]'
                      }`}
                    >
                      <Moon className="w-4 h-4" />
                      <span>{t.onboarding.darkMode}</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Step Navigation Footer */}
          <div className="mt-8 pt-6 border-t border-[#DED8CB] dark:border-[#32372F] flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null);
                  setStep((s) => (s === 3 ? 2 : 1));
                }}
                className="min-h-[46px] inline-flex items-center gap-2 rounded-xl border border-[#DED8CB] dark:border-[#32372F] px-4 py-2.5 text-sm font-medium text-[#5C6158] dark:text-[#A6ABA1] hover:bg-[#EDE8DE] dark:hover:bg-[#262A24] transition-colors whitespace-nowrap"
              >
                {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{t.onboarding.back}</span>
              </button>
            ) : (
              <div />
            )}

            {step === 1 && (
              <button
                type="button"
                onClick={handleNextFromStep1}
                className="min-h-[46px] inline-flex items-center gap-2 rounded-xl bg-[#556B45] dark:bg-[#7D9868] px-6 py-2.5 text-sm font-semibold text-white dark:text-[#151714] hover:bg-[#465938] dark:hover:bg-[#8FA97A] transition-colors whitespace-nowrap"
              >
                <span>{t.onboarding.next}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                onClick={handleNextFromStep2}
                className="min-h-[46px] inline-flex items-center gap-2 rounded-xl bg-[#556B45] dark:bg-[#7D9868] px-6 py-2.5 text-sm font-semibold text-white dark:text-[#151714] hover:bg-[#465938] dark:hover:bg-[#8FA97A] transition-colors whitespace-nowrap"
              >
                <span>{t.onboarding.next}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            )}

            {step === 3 && (
              <button
                type="submit"
                form="onboarding-finish-form"
                className="min-h-[46px] inline-flex items-center gap-2 rounded-xl bg-[#556B45] dark:bg-[#7D9868] px-6 py-2.5 text-sm font-semibold text-white dark:text-[#151714] hover:bg-[#465938] dark:hover:bg-[#8FA97A] transition-colors whitespace-nowrap"
              >
                <span>{t.onboarding.startJourney}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
