import React, { useState } from 'react';
import { BookOpen, Lock, Pencil, Trash2 } from 'lucide-react';
import type { Translations } from '../data/translations';
import type { JournalEntry, Language } from '../types/journey';
import { formatDisplayDate, getLocalDateKey } from '../utils/journeyMath';

interface JournalViewProps {
  entries: JournalEntry[];
  language: Language;
  t: Translations;
  onSaveEntry: (payload: {
    id?: string;
    howWasDay: string;
    whatWentWell: string;
    whatChallengedYou: string;
    gratefulFor: string;
  }) => void;
  onDeleteEntry: (id: string) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({
  entries,
  language,
  t,
  onSaveEntry,
  onDeleteEntry,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [howWasDay, setHowWasDay] = useState('');
  const [whatWentWell, setWhatWentWell] = useState('');
  const [whatChallengedYou, setWhatChallengedYou] = useState('');
  const [gratefulFor, setGratefulFor] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const resetForm = () => {
    setEditingId(null);
    setHowWasDay('');
    setWhatWentWell('');
    setWhatChallengedYou('');
    setGratefulFor('');
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !howWasDay.trim() &&
      !whatWentWell.trim() &&
      !whatChallengedYou.trim() &&
      !gratefulFor.trim()
    ) {
      setErrorMsg(t.journal.validationEmpty);
      return;
    }

    onSaveEntry({
      id: editingId ?? undefined,
      howWasDay: howWasDay.trim(),
      whatWentWell: whatWentWell.trim(),
      whatChallengedYou: whatChallengedYou.trim(),
      gratefulFor: gratefulFor.trim(),
    });
    resetForm();
  };

  const startEdit = (entry: JournalEntry) => {
    setEditingId(entry.id);
    setHowWasDay(entry.howWasDay);
    setWhatWentWell(entry.whatWentWell);
    setWhatChallengedYou(entry.whatChallengedYou);
    setGratefulFor(entry.gratefulFor);
    setErrorMsg(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
            {t.journal.title}
          </h1>
          <p className="mt-1 text-sm text-[#5C6158] dark:text-[#A6ABA1]">
            {t.journal.subtitle}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#556B45] dark:text-[#8CA877]">
          <Lock className="w-3.5 h-3.5" />
          <span>{t.journal.privacyBadge}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Card */}
        <section className="lg:col-span-6 rounded-3xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-6 sm:p-7">
          <div className="flex items-center justify-between gap-3 mb-5">
            <h2 className="text-base font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
              {editingId ? t.journal.editEntryTitle : t.journal.newEntryTitle}
            </h2>
            <span className="text-xs text-[#5C6158] dark:text-[#A6ABA1]">
              {formatDisplayDate(getLocalDateKey(), language)}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="journal-q1"
                className="block text-xs font-semibold text-[#1E201D] dark:text-[#F2EFE9] mb-1.5"
              >
                {t.journal.qHowWasDay}
              </label>
              <textarea
                id="journal-q1"
                rows={2}
                value={howWasDay}
                onChange={(e) => {
                  setHowWasDay(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder={t.journal.placeholderGeneral}
                className="w-full rounded-xl border border-[#DED8CB] dark:border-[#32372F] bg-[#F6F4EF] dark:bg-[#171916] px-3.5 py-2.5 text-sm text-[#1E201D] dark:text-[#F2EFE9] placeholder:text-[#8B8F85] focus:outline-none focus:ring-2 focus:ring-[#556B45] dark:focus:ring-[#7D9868]"
              />
            </div>

            <div>
              <label
                htmlFor="journal-q2"
                className="block text-xs font-semibold text-[#1E201D] dark:text-[#F2EFE9] mb-1.5"
              >
                {t.journal.qWhatWentWell}
              </label>
              <textarea
                id="journal-q2"
                rows={2}
                value={whatWentWell}
                onChange={(e) => {
                  setWhatWentWell(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder={t.journal.placeholderGeneral}
                className="w-full rounded-xl border border-[#DED8CB] dark:border-[#32372F] bg-[#F6F4EF] dark:bg-[#171916] px-3.5 py-2.5 text-sm text-[#1E201D] dark:text-[#F2EFE9] placeholder:text-[#8B8F85] focus:outline-none focus:ring-2 focus:ring-[#556B45] dark:focus:ring-[#7D9868]"
              />
            </div>

            <div>
              <label
                htmlFor="journal-q3"
                className="block text-xs font-semibold text-[#1E201D] dark:text-[#F2EFE9] mb-1.5"
              >
                {t.journal.qWhatChallenged}
              </label>
              <textarea
                id="journal-q3"
                rows={2}
                value={whatChallengedYou}
                onChange={(e) => {
                  setWhatChallengedYou(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder={t.journal.placeholderGeneral}
                className="w-full rounded-xl border border-[#DED8CB] dark:border-[#32372F] bg-[#F6F4EF] dark:bg-[#171916] px-3.5 py-2.5 text-sm text-[#1E201D] dark:text-[#F2EFE9] placeholder:text-[#8B8F85] focus:outline-none focus:ring-2 focus:ring-[#556B45] dark:focus:ring-[#7D9868]"
              />
            </div>

            <div>
              <label
                htmlFor="journal-q4"
                className="block text-xs font-semibold text-[#1E201D] dark:text-[#F2EFE9] mb-1.5"
              >
                {t.journal.qGratefulFor}
              </label>
              <textarea
                id="journal-q4"
                rows={2}
                value={gratefulFor}
                onChange={(e) => {
                  setGratefulFor(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder={t.journal.placeholderGeneral}
                className="w-full rounded-xl border border-[#DED8CB] dark:border-[#32372F] bg-[#F6F4EF] dark:bg-[#171916] px-3.5 py-2.5 text-sm text-[#1E201D] dark:text-[#F2EFE9] placeholder:text-[#8B8F85] focus:outline-none focus:ring-2 focus:ring-[#556B45] dark:focus:ring-[#7D9868]"
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

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="min-h-[46px] flex-1 rounded-xl bg-[#556B45] dark:bg-[#7D9868] px-5 py-2.5 text-sm font-semibold text-white dark:text-[#151714] hover:bg-[#465938] dark:hover:bg-[#8FA97A] transition-colors"
              >
                {editingId ? t.journal.updateEntry : t.journal.saveEntry}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="min-h-[46px] rounded-xl border border-[#DED8CB] dark:border-[#32372F] px-4 py-2.5 text-sm font-medium text-[#5C6158] dark:text-[#A6ABA1] hover:bg-[#EDE8DE] dark:hover:bg-[#262A24] transition-colors"
                >
                  {t.journal.cancelEdit}
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Entries List */}
        <section className="lg:col-span-6 space-y-4">
          <h2 className="text-base font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
            {t.journal.savedEntriesTitle}{' '}
            <span className="font-mono-tabular text-xs font-normal text-[#5C6158] dark:text-[#A6ABA1]">
              ({entries.length})
            </span>
          </h2>

          {entries.length === 0 ? (
            <div className="rounded-3xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-8 text-center">
              <BookOpen className="w-8 h-8 mx-auto text-[#8A8F84]" />
              <h3 className="mt-3 text-sm font-semibold text-[#1E201D] dark:text-[#F2EFE9]">
                {t.journal.emptyStateTitle}
              </h3>
              <p className="mt-1 text-xs text-[#5C6158] dark:text-[#A6ABA1] leading-relaxed max-w-xs mx-auto">
                {t.journal.emptyStateBody}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <article
                  key={entry.id}
                  className="rounded-2xl bg-[#FCFBF8] dark:bg-[#1E211C] border border-[#DED8CB] dark:border-[#32372F] p-5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#DED8CB] dark:border-[#32372F]">
                    <span className="text-xs font-semibold text-[#556B45] dark:text-[#8CA877]">
                      {formatDisplayDate(entry.dateKey, language)}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => startEdit(entry)}
                        aria-label={`${t.journal.edit} ${entry.dateKey}`}
                        className="min-h-[40px] min-w-[40px] inline-flex items-center justify-center rounded-lg text-[#5C6158] dark:text-[#A6ABA1] hover:bg-[#EDE8DE] dark:hover:bg-[#262A24] transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      {confirmDeleteId === entry.id ? (
                        <button
                          type="button"
                          onClick={() => {
                            onDeleteEntry(entry.id);
                            setConfirmDeleteId(null);
                          }}
                          className="min-h-[40px] px-3 rounded-lg bg-[#7D4730] text-white text-xs font-semibold"
                        >
                          {t.journal.confirmDelete}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(entry.id)}
                          aria-label={`${t.journal.delete} ${entry.dateKey}`}
                          className="min-h-[40px] min-w-[40px] inline-flex items-center justify-center rounded-lg text-[#5C6158] dark:text-[#A6ABA1] hover:text-[#7D4730] dark:hover:text-[#E2AC93] hover:bg-[#EDE8DE] dark:hover:bg-[#262A24] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {entry.howWasDay && (
                    <div>
                      <p className="text-[11px] font-medium text-[#5C6158] dark:text-[#A6ABA1]">
                        {t.journal.qHowWasDay}
                      </p>
                      <p className="mt-0.5 text-sm text-[#1E201D] dark:text-[#F2EFE9] leading-relaxed">
                        {entry.howWasDay}
                      </p>
                    </div>
                  )}
                  {entry.whatWentWell && (
                    <div>
                      <p className="text-[11px] font-medium text-[#5C6158] dark:text-[#A6ABA1]">
                        {t.journal.qWhatWentWell}
                      </p>
                      <p className="mt-0.5 text-sm text-[#1E201D] dark:text-[#F2EFE9] leading-relaxed">
                        {entry.whatWentWell}
                      </p>
                    </div>
                  )}
                  {entry.whatChallengedYou && (
                    <div>
                      <p className="text-[11px] font-medium text-[#5C6158] dark:text-[#A6ABA1]">
                        {t.journal.qWhatChallenged}
                      </p>
                      <p className="mt-0.5 text-sm text-[#1E201D] dark:text-[#F2EFE9] leading-relaxed">
                        {entry.whatChallengedYou}
                      </p>
                    </div>
                  )}
                  {entry.gratefulFor && (
                    <div>
                      <p className="text-[11px] font-medium text-[#5C6158] dark:text-[#A6ABA1]">
                        {t.journal.qGratefulFor}
                      </p>
                      <p className="mt-0.5 text-sm text-[#1E201D] dark:text-[#F2EFE9] leading-relaxed">
                        {entry.gratefulFor}
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
