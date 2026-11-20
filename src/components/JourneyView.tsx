import React from 'react';
import { Check, CircleDashed, HeartHandshake, Minus, RotateCcw } from 'lucide-react';
import type { Translations } from '../data/translations';
import type { JourneyProgressSummary, Language } from '../types/journey';
import { formatDisplayDate } from '../utils/journeyMath';
import { MilestoneBadgeArt } from './MilestoneBadgeArt';

interface JourneyViewProps {
  progress: JourneyProgressSummary;
  language: Language;
  t: Translations;
  onOpenRecovery: () => void;
  recoveryBannerMessage: string | null;
}

export const JourneyView: React.FC<JourneyViewProps> = ({
  progress,
  language,
  t,
  onOpenRecovery,
  recoveryBannerMessage,
}) => {
  return (
    <div className="space-y-6">
      {/* Page Title & Supportive Recovery CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
            {t.journey.title}
          </h1>
          <p className="mt-1 text-sm text-[#5C6158] dark:text-[#A6ABA1]">
            {t.journey.subtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenRecovery}
          className="min-h-[44px] self-start sm:self-auto inline-flex items-center gap-2 rounded-xl border border-[#DED8CB] dark:border-[#32372F] bg-[#FCFBF8] dark:bg-[#1E211C] px-4 py-2.5 text-xs font-semibold text-[#1E201D] dark:text-[#F2EFE9] hover:bg-[#EDE8DE] dark:hover:bg-[#262A24] transition-colors whitespace-nowrap"
        >
          <HeartHandshake className="w-4 h-4 text-[#556B45] dark:text-[#8CA877]" />
          <span>{t.journey.recoveryButton}</span>
        </button>
      </div>

      {recoveryBannerMessage && (
        <div
          role="status"
          className="rounded-2xl bg-[#E9EFE4] dark:bg-[#252E1F] border border-[#C6D5BC] dark:border-[#3A4930] px-4 py-3 text-xs sm:text-sm font-medium text-[#3B4B30] dark:text-[#BFD4AF]"
        >
          {recoveryBannerMessage}
        </div>
      )}

      {/* Consistency Summary Strip */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-4 sm:p-5">
          <p className="text-xs text-[#5C6158] dark:text-[#A6ABA1]">
            {t.journey.completedDays}
          </p>
          <p className="mt-1 font-mono-tabular text-2xl font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
            {progress.completedCount}
            <span className="text-sm font-normal text-[#5C6158] dark:text-[#A6ABA1]">
              /75
            </span>
          </p>
        </div>
        <div className="rounded-2xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-4 sm:p-5">
          <p className="text-xs text-[#5C6158] dark:text-[#A6ABA1]">
            {t.home.currentStreak}
          </p>
          <p className="mt-1 font-mono-tabular text-2xl font-semibold text-[#556B45] dark:text-[#8CA877]">
            {progress.currentStreak}{' '}
            <span className="text-xs font-medium">{t.home.daysUnit}</span>
          </p>
        </div>
        <div className="rounded-2xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-4 sm:p-5">
          <p className="text-xs text-[#5C6158] dark:text-[#A6ABA1]">
            {t.journey.longestStreak}
          </p>
          <p className="mt-1 font-mono-tabular text-2xl font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
            {progress.longestStreak}{' '}
            <span className="text-xs font-normal text-[#5C6158] dark:text-[#A6ABA1]">
              {t.home.daysUnit}
            </span>
          </p>
        </div>
      </div>

      {/* 75-Day Calendar Grid */}
      <section className="rounded-3xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <h2 className="text-base font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
            {t.journey.calendarTitle}
          </h2>
          {/* Clean legend with icon + text (never hue-only) */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#5C6158] dark:text-[#A6ABA1]">
            <span className="inline-flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#556B45] dark:text-[#8CA877]" />
              <span>{t.journey.legendCompleted}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-[#7A6B52] dark:text-[#C4B294]" />
              <span>{t.journey.legendRecovered}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Minus className="w-3.5 h-3.5 text-[#8A5A44] dark:text-[#D19B82]" />
              <span>{t.journey.legendMissed}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CircleDashed className="w-3.5 h-3.5 text-[#9B9990] dark:text-[#63685E]" />
              <span>{t.journey.legendPending}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-15 gap-2">
          {progress.calendarDays.map((day) => {
            const formattedDate = formatDisplayDate(day.dateKey, language);
            const statusText =
              day.status === 'completed'
                ? t.journey.legendCompleted
                : day.status === 'missed'
                  ? t.journey.legendMissed
                  : day.status === 'recovered'
                    ? t.journey.legendRecovered
                    : t.journey.legendPending;

            let cellStyle =
              'bg-[#F6F4EF] dark:bg-[#171916] border-[#DED8CB] dark:border-[#2E332B] text-[#6E7369] dark:text-[#888D83]';
            if (day.status === 'completed') {
              cellStyle =
                'bg-[#556B45] dark:bg-[#7D9868] border-[#556B45] dark:border-[#7D9868] text-white dark:text-[#151714]';
            } else if (day.status === 'missed') {
              cellStyle =
                'bg-[#F4EAE4] dark:bg-[#2F231E] border-[#DFC4B6] dark:border-[#52392F] text-[#7D4730] dark:text-[#E2AC93]';
            } else if (day.status === 'recovered') {
              cellStyle =
                'bg-[#EDE8DE] dark:bg-[#292620] border-[#CFC5B2] dark:border-[#494235] text-[#5B4F3B] dark:text-[#D6C6AA]';
            }

            return (
              <div
                key={day.dayNumber}
                title={`${t.journey.dayLabel} ${day.dayNumber} · ${formattedDate} · ${statusText}`}
                aria-label={`${t.journey.dayLabel} ${day.dayNumber}, ${formattedDate}, ${statusText}`}
                className={`relative rounded-xl border p-2 min-h-[54px] flex flex-col items-center justify-between transition-colors ${cellStyle} ${
                  day.isToday
                    ? 'ring-2 ring-offset-2 ring-[#556B45] dark:ring-[#7D9868] ring-offset-[#FCFBF8] dark:ring-offset-[#1E211C]'
                    : ''
                }`}
              >
                <span className="font-mono-tabular text-xs font-semibold leading-none">
                  {day.dayNumber}
                </span>
                <span className="mt-1">
                  {day.status === 'completed' && <Check className="w-3.5 h-3.5" />}
                  {day.status === 'missed' && <Minus className="w-3.5 h-3.5" />}
                  {day.status === 'recovered' && <RotateCcw className="w-3 h-3" />}
                  {day.status === 'pending' && (
                    <CircleDashed className="w-3 h-3 opacity-50" />
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Milestone Achievements */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
          {t.journey.milestonesTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {progress.milestones.map((m, idx) => (
            <div
              key={m.id}
              style={{ animationDelay: `${idx * 35}ms` }}
              className={`animate-fade-slide rounded-2xl border p-5 flex items-start gap-4 transition-colors ${
                m.unlocked
                  ? 'bg-[#FCFBF8] dark:bg-[#1E211C] border-[#B9C9AE] dark:border-[#415137]'
                  : 'bg-[#F6F4EF] dark:bg-[#191B17] border-[#DED8CB] dark:border-[#2C3029]'
              }`}
            >
              <MilestoneBadgeArt milestoneId={m.id} unlocked={m.unlocked} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-xs text-[#5C6158] dark:text-[#A6ABA1]">
                  <span className="font-mono-tabular font-semibold">
                    {t.home.dayPrefix} {m.day}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span
                    className={
                      m.unlocked
                        ? 'font-semibold text-[#556B45] dark:text-[#8CA877]'
                        : ''
                    }
                  >
                    {m.unlocked
                      ? t.journey.unlockedLabel
                      : `${m.daysRemaining} ${t.home.daysUntil}`}
                  </span>
                </div>
                <h3 className="mt-1 text-base font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
                  {language === 'ar' ? m.titleAr : m.titleEn}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#5C6158] dark:text-[#A6ABA1]">
                  {language === 'ar' ? m.subtitleAr : m.subtitleEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
