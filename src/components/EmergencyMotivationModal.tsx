import React, { useState } from 'react';
import { RefreshCw, ShieldCheck, X } from 'lucide-react';
import { EMERGENCY_MESSAGES } from '../data/motivations';
import type { Translations } from '../data/translations';
import type { Language } from '../types/journey';

interface EmergencyMotivationModalProps {
  open: boolean;
  onClose: () => void;
  language: Language;
  t: Translations;
  personalReasons: string;
}

export const EmergencyMotivationModal: React.FC<EmergencyMotivationModalProps> = ({
  open,
  onClose,
  language,
  t,
  personalReasons,
}) => {
  const [index, setIndex] = useState(0);
  if (!open) return null;

  const current = EMERGENCY_MESSAGES[index % EMERGENCY_MESSAGES.length];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % EMERGENCY_MESSAGES.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-modal-title"
    >
      <div className="animate-fade-slide w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-[#556B45] dark:text-[#8CA877]">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <span className="text-xs font-semibold tracking-wide">
              {t.motivation.emergencyModalTitle}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={language === 'ar' ? 'إغلاق' : 'Close'}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#5C6158] hover:text-[#1E201D] dark:text-[#A6ABA1] dark:hover:text-[#F2EFE9] hover:bg-[#EDE8DE] dark:hover:bg-[#262A24] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5">
          <h2
            id="emergency-modal-title"
            className="text-2xl font-semibold text-[#1E201D] dark:text-[#F2EFE9] text-balance"
          >
            {language === 'ar' ? current.titleAr : current.titleEn}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#42463F] dark:text-[#D5D8D0]">
            {language === 'ar' ? current.bodyAr : current.bodyEn}
          </p>

          <div className="mt-5 rounded-2xl bg-[#EDE8DE]/70 dark:bg-[#262A24] p-4 border border-[#DED8CB]/80 dark:border-[#32372F]">
            <p className="text-xs font-semibold text-[#556B45] dark:text-[#8CA877]">
              {t.motivation.suggestedAction}
            </p>
            <p className="mt-1 text-sm font-medium text-[#1E201D] dark:text-[#F2EFE9]">
              {language === 'ar' ? current.actionAr : current.actionEn}
            </p>
          </div>

          {personalReasons.trim().length > 0 && (
            <div className="mt-4 rounded-2xl bg-[#F6F4EF] dark:bg-[#171916] p-4 border border-[#DED8CB] dark:border-[#2E332B]">
              <p className="text-xs font-medium text-[#5C6158] dark:text-[#A6ABA1]">
                {t.home.yourWhy}
              </p>
              <p className="mt-1 text-sm text-[#1E201D] dark:text-[#F2EFE9] leading-relaxed">
                {personalReasons}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleNext}
            className="min-h-[46px] flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-[#DED8CB] dark:border-[#32372F] bg-[#F6F4EF] dark:bg-[#262A24] px-4 py-2.5 text-sm font-medium text-[#1E201D] dark:text-[#F2EFE9] hover:bg-[#EDE8DE] dark:hover:bg-[#30352D] transition-colors whitespace-nowrap"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t.motivation.nextGuidance}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[46px] flex-1 inline-flex items-center justify-center rounded-xl bg-[#556B45] dark:bg-[#7D9868] px-5 py-2.5 text-sm font-semibold text-white dark:text-[#151714] hover:bg-[#465938] dark:hover:bg-[#8FA97A] transition-colors whitespace-nowrap"
          >
            {t.motivation.close}
          </button>
        </div>
      </div>
    </div>
  );
};
