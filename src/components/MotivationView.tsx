import React, { useMemo, useState } from 'react';
import { Bookmark, Search, ShieldAlert } from 'lucide-react';
import { MOTIVATIONAL_MESSAGES } from '../data/motivations';
import type { Translations } from '../data/translations';
import type {
  Language,
  MotivationCategory,
  MotivationalMessage,
} from '../types/journey';

interface MotivationViewProps {
  dailyQuote: MotivationalMessage;
  favoriteIds: string[];
  language: Language;
  t: Translations;
  onToggleFavorite: (id: string) => void;
  onOpenEmergency: () => void;
}

const CATEGORIES: MotivationCategory[] = [
  'discipline',
  'patience',
  'self-control',
  'confidence',
  'consistency',
  'starting-again',
];

export const MotivationView: React.FC<MotivationViewProps> = ({
  dailyQuote,
  favoriteIds,
  language,
  t,
  onToggleFavorite,
  onOpenEmergency,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    MotivationCategory | 'all' | 'favorites'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MOTIVATIONAL_MESSAGES.filter((msg) => {
      if (selectedCategory === 'favorites' && !favoriteIds.includes(msg.id)) {
        return false;
      }
      if (
        selectedCategory !== 'all' &&
        selectedCategory !== 'favorites' &&
        msg.category !== selectedCategory
      ) {
        return false;
      }
      if (!q) return true;
      return (
        msg.en.toLowerCase().includes(q) || msg.ar.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery, favoriteIds]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
          {t.motivation.title}
        </h1>
        <p className="mt-1 text-sm text-[#5C6158] dark:text-[#A6ABA1]">
          {t.motivation.subtitle}
        </p>
      </div>

      {/* Emergency Motivation Banner + Daily Reflection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <section className="lg:col-span-5 rounded-3xl bg-[#273022] dark:bg-[#232B1E] text-[#F6F4EF] p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#C8D4C0]">
              <ShieldAlert className="w-4 h-4" />
              <span>{t.motivation.emergencyBtn}</span>
            </div>
            <h2 className="mt-3 text-xl font-semibold text-balance">
              {t.motivation.emergencyCardTitle}
            </h2>
            <p className="mt-2 text-sm text-[#D5DDD0] leading-relaxed">
              {t.motivation.emergencyCardSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenEmergency}
            className="mt-6 min-h-[48px] w-full rounded-xl bg-[#F6F4EF] text-[#1E201D] px-5 py-3 text-sm font-semibold hover:bg-white transition-colors"
          >
            {t.motivation.emergencyBtn}
          </button>
        </section>

        <section className="lg:col-span-7 rounded-3xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5C6158] dark:text-[#A6ABA1]">
              <span className="font-semibold text-[#556B45] dark:text-[#8CA877]">
                {t.motivation.featuredToday}
              </span>
              <span aria-hidden="true">·</span>
              <span>{t.motivation.categories[dailyQuote.category]}</span>
            </div>
            <blockquote className="mt-4 font-serif-display text-2xl sm:text-3xl leading-snug text-[#1E201D] dark:text-[#F2EFE9]">
              “{language === 'ar' ? dailyQuote.ar : dailyQuote.en}”
            </blockquote>
          </div>
          <p className="mt-5 text-xs text-[#5C6158] dark:text-[#A6ABA1]">
            {language === 'ar' ? dailyQuote.en : dailyQuote.ar}
          </p>
        </section>
      </div>

      {/* Filter Toolbar */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
            {t.motivation.libraryTitle}{' '}
            <span className="font-mono-tabular text-sm font-normal text-[#5C6158] dark:text-[#A6ABA1]">
              ({filteredMessages.length} {t.motivation.messagesCount})
            </span>
          </h2>
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#5C6158] dark:text-[#A6ABA1] absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.motivation.searchPlaceholder}
              aria-label={t.motivation.searchPlaceholder}
              className="w-full min-h-[44px] rounded-xl border border-[#DED8CB] dark:border-[#32372F] bg-[#FCFBF8] dark:bg-[#1E211C] ps-10 pe-4 py-2 text-sm text-[#1E201D] dark:text-[#F2EFE9] placeholder:text-[#8B8F85] focus:outline-none focus:ring-2 focus:ring-[#556B45] dark:focus:ring-[#7D9868]"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto pb-1"
          role="tablist"
          aria-label={t.motivation.libraryTitle}
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#556B45] dark:bg-[#7D9868] text-white dark:text-[#151714]'
                : 'bg-[#EDE8DE]/80 dark:bg-[#242822] text-[#5C6158] dark:text-[#A6ABA1] hover:text-[#1E201D] dark:hover:text-[#F2EFE9]'
            }`}
          >
            {t.motivation.allCategories}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === 'favorites'}
            onClick={() => setSelectedCategory('favorites')}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
              selectedCategory === 'favorites'
                ? 'bg-[#556B45] dark:bg-[#7D9868] text-white dark:text-[#151714]'
                : 'bg-[#EDE8DE]/80 dark:bg-[#242822] text-[#5C6158] dark:text-[#A6ABA1] hover:text-[#1E201D] dark:hover:text-[#F2EFE9]'
            }`}
          >
            {t.motivation.favoritesOnly} ({favoriteIds.length})
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#556B45] dark:bg-[#7D9868] text-white dark:text-[#151714]'
                  : 'bg-[#EDE8DE]/80 dark:bg-[#242822] text-[#5C6158] dark:text-[#A6ABA1] hover:text-[#1E201D] dark:hover:text-[#F2EFE9]'
              }`}
            >
              {t.motivation.categories[cat]}
            </button>
          ))}
        </div>

        {/* Messages Grid */}
        {filteredMessages.length === 0 ? (
          <div className="rounded-2xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-8 text-center text-sm text-[#5C6158] dark:text-[#A6ABA1]">
            {t.motivation.noMatches}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMessages.map((msg) => {
              const isFav = favoriteIds.includes(msg.id);
              const primaryText = language === 'ar' ? msg.ar : msg.en;
              return (
                <article
                  key={msg.id}
                  className="rounded-2xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-5 flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-medium text-[#556B45] dark:text-[#8CA877]">
                        {t.motivation.categories[msg.category]}
                      </span>
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(msg.id)}
                        aria-label={
                          isFav
                            ? `Remove ${msg.id} from saved`
                            : `Save ${msg.id}`
                        }
                        aria-pressed={isFav}
                        className="min-h-[44px] min-w-[44px] -m-2 flex items-center justify-center rounded-xl text-[#5C6158] dark:text-[#A6ABA1] hover:bg-[#EDE8DE] dark:hover:bg-[#262A24] transition-colors"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
                            isFav
                              ? 'fill-[#556B45] text-[#556B45] dark:fill-[#8CA877] dark:text-[#8CA877]'
                              : ''
                          }`}
                        />
                      </button>
                    </div>
                    <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#1E201D] dark:text-[#F2EFE9]">
                      {primaryText}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
