import React, { useState } from 'react';
import { Check, Flame, HeartHandshake, ShieldAlert } from 'lucide-react';
import type { Translations } from '../data/translations';
import type {
  JourneyProgressSummary,
  Language,
  MotivationalMessage,
  UserProfile,
} from '../types/journey';
import { TOTAL_JOURNEY_DAYS } from '../utils/journeyMath';
import { CircularProgressRing } from './CircularProgressRing';
import { MilestoneBadgeArt } from './MilestoneBadgeArt';

const SUNRISE_IMG = '/src/assets/images/mountain_sunrise_dawn_1795207033329.jpg';

interface HomeDashboardProps {
  profile: UserProfile;
  progress: JourneyProgressSummary;
  dailyQuote: MotivationalMessage;
  language: Language;
  t: Translations;
  onCommitToday: () => void;
  onOpenEmergency: () => void;
  onOpenRecovery: () => void;
  onNavigateJourney: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  profile,
  progress,
  dailyQuote,
  language,
  t,
  onCommitToday,
  onOpenEmergency,
  onOpenRecovery,
  onNavigateJourney,
}) => {
  const [bannerImgFailed, setBannerImgFailed] = useState(false);

  const quoteText = language === 'ar' ? dailyQuote.ar : dailyQuote.en;
  const quoteCategoryLabel = t.motivation.categories[dailyQuote.category];

  return (
    <div className="space-y-6">
      {/* Subtle Sunrise Banner Card */}
      <div className="relative rounded-3xl overflow-hidden border border-[#DED8CB] dark:border-[#32372F] min-h-[140px] flex items-end p-6 sm:p-7">
        {!bannerImgFailed ? (
          <img
            src={SUNRISE_IMG}
            alt="Quiet mountain sunrise"
            referrerPolicy="no-referrer"
            onError={() => setBannerImgFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D4B33] to-[#273022]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
        <div className="relative z-10 w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-xs font-medium text-[#D5DDD0]">
              {t.appName} · {t.home.dayPrefix} {progress.currentDayNumber} {t.home.dayOf}
            </p>
            <h1 className="mt-1.5 text-lg sm:text-xl font-medium text-[#F6F4EF] leading-snug text-balance">
              {t.slogan}
            </h1>
          </div>
          <button
            type="button"
            onClick={onOpenEmergency}
            className="min-h-[44px] self-start sm:self-end inline-flex items-center gap-2 rounded-xl bg-[#FCFBF8]/95 text-[#1E201D] px-4 py-2.5 text-xs font-semibold hover:bg-white transition-colors whitespace-nowrap shrink-0"
          >
            <ShieldAlert className="w-4 h-4 text-[#556B45]" />
            <span>{t.home.emergencyBtn}</span>
          </button>
        </div>
      </div>

      {/* Gentle Missed-Days Recovery Prompt */}
      {progress.hasUnacknowledgedMissedDays && (
        <div className="rounded-2xl bg-[#EDE8DE] dark:bg-[#262A24] border border-[#DED8CB] dark:border-[#32372F] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-[#556B45] dark:text-[#8CA877] shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
                {t.home.missedBannerTitle}
              </h2>
              <p className="mt-0.5 text-xs text-[#5C6158] dark:text-[#A6ABA1] leading-relaxed">
                {t.home.missedBannerBody}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenRecovery}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#556B45] dark:bg-[#7D9868] text-white dark:text-[#151714] text-xs font-semibold hover:bg-[#465938] dark:hover:bg-[#8FA97A] transition-colors whitespace-nowrap shrink-0"
          >
            {t.home.openRecovery}
          </button>
        </div>
      )}

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Focal Anchor: Progress Ring + Daily Commitment */}
        <section className="lg:col-span-7 rounded-3xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-6 sm:p-8 flex flex-col items-center justify-between text-center">
          <div className="my-2">
            <CircularProgressRing
              completedCount={progress.completedCount}
              totalDays={TOTAL_JOURNEY_DAYS}
              percentage={progress.percentageCompleted}
              currentDayNumber={progress.currentDayNumber}
              dayPrefix={t.home.dayPrefix}
              dayOfLabel={t.home.dayOf}
              completedLabel={t.home.completedPct}
              isCheckedInToday={progress.isCheckedInToday}
            />
          </div>

          {/* 3-Metric Strip */}
          <div className="w-full mt-6 pt-6 border-t border-[#DED8CB] dark:border-[#32372F] grid grid-cols-3 gap-3">
            <div className="p-2">
              <p className="text-xs text-[#5C6158] dark:text-[#A6ABA1]">
                {t.home.completedPct}
              </p>
              <p className="mt-1 font-mono-tabular text-xl sm:text-2xl font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
                {progress.percentageCompleted}%
              </p>
            </div>
            <div className="p-2">
              <p className="text-xs text-[#5C6158] dark:text-[#A6ABA1]">
                {t.home.daysRemaining}
              </p>
              <p className="mt-1 font-mono-tabular text-xl sm:text-2xl font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
                {progress.daysRemaining}
              </p>
            </div>
            <div className="p-2">
              <p className="text-xs text-[#5C6158] dark:text-[#A6ABA1]">
                {t.home.currentStreak}
              </p>
              <p className="mt-1 font-mono-tabular text-xl sm:text-2xl font-semibold text-[#556B45] dark:text-[#8CA877] inline-flex items-center justify-center gap-1">
                <Flame className="w-4 h-4" />
                <span>{progress.currentStreak}</span>
              </p>
            </div>
          </div>

          {/* Primary Daily Commitment CTA */}
          <div className="w-full mt-6">
            <button
              type="button"
              onClick={onCommitToday}
              disabled={progress.isCheckedInToday}
              className={`min-h-[52px] w-full rounded-2xl px-6 py-3.5 text-sm sm:text-base font-semibold inline-flex items-center justify-center gap-2.5 transition-[transform,colors] active:scale-[0.985] ${
                progress.isCheckedInToday
                  ? 'bg-[#E9EFE4] dark:bg-[#252E1F] text-[#465938] dark:text-[#A8C294] border border-[#C6D5BC] dark:border-[#3A4930] cursor-default'
                  : 'bg-[#556B45] dark:bg-[#7D9868] text-white dark:text-[#151714] hover:bg-[#465938] dark:hover:bg-[#8FA97A]'
              }`}
            >
              <Check className="w-5 h-5" />
              <span>
                {progress.isCheckedInToday
                  ? t.home.committedToday
                  : t.home.commitToday}
              </span>
            </button>
            {progress.isCheckedInToday && (
              <p className="mt-2 text-xs text-[#5C6158] dark:text-[#A6ABA1]">
                {t.home.committedHint}
              </p>
            )}
          </div>
        </section>

        {/* Right Column: Daily Quote + Next Milestone + Personal Anchor */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Daily Quote Card */}
          <section className="rounded-3xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-6 sm:p-7 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#5C6158] dark:text-[#A6ABA1]">
                <span className="font-semibold text-[#556B45] dark:text-[#8CA877]">
                  {t.home.dailyQuote}
                </span>
                <span aria-hidden="true">·</span>
                <span>{quoteCategoryLabel}</span>
              </div>
              <blockquote className="mt-4 font-serif-display text-2xl sm:text-[26px] leading-snug text-[#1E201D] dark:text-[#F2EFE9]">
                “{quoteText}”
              </blockquote>
            </div>

            {profile.personalReasons.trim().length > 0 && (
              <div className="mt-6 pt-5 border-t border-[#DED8CB] dark:border-[#32372F]">
                <p className="text-xs font-medium text-[#5C6158] dark:text-[#A6ABA1]">
                  {t.home.yourWhy}
                </p>
                <p className="mt-1.5 text-sm text-[#1E201D] dark:text-[#F2EFE9] leading-relaxed">
                  {profile.personalReasons}
                </p>
              </div>
            )}
          </section>

          {/* Next Milestone Card */}
          <section className="rounded-3xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-xs font-semibold text-[#5C6158] dark:text-[#A6ABA1]">
                {t.home.nextMilestone}
              </h2>
              <button
                type="button"
                onClick={onNavigateJourney}
                className="min-h-[36px] text-xs font-semibold text-[#556B45] dark:text-[#8CA877] hover:underline whitespace-nowrap"
              >
                {t.nav.journey}
              </button>
            </div>

            {progress.nextMilestone ? (
              <div className="flex items-center gap-4">
                <MilestoneBadgeArt
                  milestoneId={progress.nextMilestone.id}
                  unlocked={false}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
                    {t.home.dayPrefix} {progress.nextMilestone.day}:{' '}
                    {language === 'ar'
                      ? progress.nextMilestone.titleAr
                      : progress.nextMilestone.titleEn}
                  </p>
                  <p className="mt-0.5 text-xs text-[#5C6158] dark:text-[#A6ABA1]">
                    {language === 'ar'
                      ? progress.nextMilestone.subtitleAr
                      : progress.nextMilestone.subtitleEn}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-1.5 flex-1 rounded-full bg-[#E6E0D4] dark:bg-[#2A2E27] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#556B45] dark:bg-[#7D9868] transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.round(
                              (progress.completedCount / progress.nextMilestone.day) *
                                100,
                            ),
                          )}%`,
                        }}
                      />
                    </div>
                    <span className="font-mono-tabular text-xs font-medium text-[#5C6158] dark:text-[#A6ABA1] whitespace-nowrap">
                      {progress.nextMilestone.daysRemaining} {t.home.daysUntil}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <MilestoneBadgeArt milestoneId="finisher" unlocked />
                <p className="text-sm font-semibold text-[#556B45] dark:text-[#8CA877]">
                  {t.home.allMilestonesReached}
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
