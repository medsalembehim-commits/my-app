import React from 'react';
import {
  BookOpen,
  CalendarDays,
  Compass,
  Home,
  Settings,
} from 'lucide-react';
import type { Translations } from '../data/translations';
import type { Language } from '../types/journey';

export type NavTab = 'home' | 'journey' | 'motivation' | 'journal' | 'settings';

interface NavigationShellProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  language: Language;
  t: Translations;
  dayNumber: number;
  children: React.ReactNode;
}

export const NavigationShell: React.FC<NavigationShellProps> = ({
  activeTab,
  onSelectTab,
  t,
  dayNumber,
  children,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t.nav.home, icon: <Home className="w-5 h-5" /> },
    {
      id: 'journey',
      label: t.nav.journey,
      icon: <CalendarDays className="w-5 h-5" />,
    },
    {
      id: 'motivation',
      label: t.nav.motivation,
      icon: <Compass className="w-5 h-5" />,
    },
    {
      id: 'journal',
      label: t.nav.journal,
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      id: 'settings',
      label: t.nav.settings,
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F4EF] dark:bg-[#151714] text-[#1E201D] dark:text-[#F2EFE9]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-screen">
        {/* Desktop Sidebar Rail */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 border-e border-[#DED8CB] dark:border-[#2C3129] bg-[#FCFBF8]/60 dark:bg-[#191B17]/80 px-5 py-8 sticky top-0 h-screen justify-between">
          <div>
            <div className="px-3 mb-8">
              <p className="font-serif-display text-2xl font-semibold tracking-tight text-[#1E201D] dark:text-[#F2EFE9]">
                {t.appName}
              </p>
              <p className="mt-1 text-xs text-[#5C6158] dark:text-[#A6ABA1]">
                {t.home.dayPrefix} {dayNumber} {t.home.dayOf}
              </p>
            </div>

            <nav aria-label="Primary navigation" className="space-y-1.5">
              {navItems.map((item) => {
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectTab(item.id)}
                    aria-current={active ? 'page' : undefined}
                    className={`w-full min-h-[46px] flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-[#E9EFE4] dark:bg-[#252E1F] text-[#3F5232] dark:text-[#B9D0A8] font-semibold'
                        : 'text-[#5C6158] dark:text-[#A6ABA1] hover:bg-[#EDE8DE]/70 dark:hover:bg-[#232721] hover:text-[#1E201D] dark:hover:text-[#F2EFE9]'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <p className="px-3 text-xs leading-relaxed text-[#72776D] dark:text-[#868B81]">
            {t.slogan}
          </p>
        </aside>

        {/* Main Scrollable Content */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 pt-5 sm:pt-8 pb-24 lg:pb-12">
          <div className="max-w-5xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Mobile Fixed Bottom Navigation Bar (compact <= 15% mobile height) */}
      <nav
        aria-label="Mobile bottom navigation"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 h-16 bg-[#FCFBF8]/95 dark:bg-[#1A1D18]/95 backdrop-blur-md border-t border-[#DED8CB] dark:border-[#2E332B]"
      >
        <div className="grid grid-cols-5 h-full max-w-lg mx-auto">
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                aria-current={active ? 'page' : undefined}
                className={`flex flex-col items-center justify-center min-h-[44px] px-1 transition-colors ${
                  active
                    ? 'text-[#556B45] dark:text-[#8CA877]'
                    : 'text-[#6E7369] dark:text-[#8E9389]'
                }`}
              >
                {item.icon}
                <span className="mt-1 text-[10px] font-semibold leading-none whitespace-nowrap truncate max-w-full">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
