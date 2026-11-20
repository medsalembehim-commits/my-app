import React, { useState } from 'react';
import { HeartHandshake, X } from 'lucide-react';
import type { Translations } from '../data/translations';

interface SupportiveRecoveryModalProps {
  open: boolean;
  onClose: () => void;
  t: Translations;
  onRecover: (mode: 'continue-forward' | 'recommit-today', note: string) => void;
}

export const SupportiveRecoveryModal: React.FC<SupportiveRecoveryModalProps> = ({
  open,
  onClose,
  t,
  onRecover,
}) => {
  const [note, setNote] = useState('');
  if (!open) return null;

  const handleAction = (mode: 'continue-forward' | 'recommit-today') => {
    onRecover(mode, note);
    setNote('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="recovery-modal-title"
    >
      <div className="animate-fade-slide w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-[#556B45] dark:text-[#8CA877]">
            <HeartHandshake className="w-5 h-5 shrink-0" />
            <span className="text-xs font-semibold">
              {t.journey.recoveryButton}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.journey.cancel}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#5C6158] hover:text-[#1E201D] dark:text-[#A6ABA1] dark:hover:text-[#F2EFE9] hover:bg-[#EDE8DE] dark:hover:bg-[#262A24] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h2
          id="recovery-modal-title"
          className="mt-4 text-2xl font-semibold text-[#1E201D] dark:text-[#F2EFE9] text-balance"
        >
          {t.journey.recoveryModalTitle}
        </h2>
        <p className="mt-2.5 text-sm leading-relaxed text-[#5C6158] dark:text-[#A6ABA1]">
          {t.journey.recoveryModalBody}
        </p>

        <div className="mt-5">
          <label
            htmlFor="recovery-note-input"
            className="block text-xs font-medium text-[#5C6158] dark:text-[#A6ABA1] mb-2"
          >
            {t.journey.recoveryNoteLabel}
          </label>
          <textarea
            id="recovery-note-input"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t.journey.recoveryNotePlaceholder}
            className="w-full rounded-2xl border border-[#DED8CB] dark:border-[#32372F] bg-[#F6F4EF] dark:bg-[#171916] px-4 py-3 text-sm text-[#1E201D] dark:text-[#F2EFE9] placeholder:text-[#8B8F85] focus:outline-none focus:ring-2 focus:ring-[#556B45] dark:focus:ring-[#7D9868]"
          />
        </div>

        <div className="mt-6 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => handleAction('recommit-today')}
            className="min-h-[46px] w-full rounded-xl bg-[#556B45] dark:bg-[#7D9868] px-5 py-3 text-sm font-semibold text-white dark:text-[#151714] hover:bg-[#465938] dark:hover:bg-[#8FA97A] transition-colors"
          >
            {t.journey.recoveryRecommit}
          </button>
          <button
            type="button"
            onClick={() => handleAction('continue-forward')}
            className="min-h-[46px] w-full rounded-xl border border-[#DED8CB] dark:border-[#32372F] bg-[#F6F4EF] dark:bg-[#262A24] px-5 py-3 text-sm font-medium text-[#1E201D] dark:text-[#F2EFE9] hover:bg-[#EDE8DE] dark:hover:bg-[#30352D] transition-colors"
          >
            {t.journey.recoveryContinue}
          </button>
        </div>
      </div>
    </div>
  );
};
