import React from 'react';

interface MilestoneBadgeArtProps {
  milestoneId: string;
  unlocked: boolean;
}

export const MilestoneBadgeArt: React.FC<MilestoneBadgeArtProps> = ({
  milestoneId,
  unlocked,
}) => {
  const strokeClass = unlocked
    ? 'text-[#556B45] dark:text-[#8CA877]'
    : 'text-[#B5B0A4] dark:text-[#4B5147]';

  return (
    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
        unlocked
          ? 'bg-[#E9EFE4] dark:bg-[#252E1F]'
          : 'bg-[#EDE8DE]/70 dark:bg-[#242822]'
      }`}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        className={strokeClass}
        aria-hidden="true"
      >
        {milestoneId === 'beginning' && (
          <>
            <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.75" />
            <path d="M16 10v12M11 16h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </>
        )}
        {milestoneId === 'beginner' && (
          <>
            <path d="M16 5L26 24H6L16 5Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
            <path d="M16 13v6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </>
        )}
        {milestoneId === 'disciplined' && (
          <>
            <rect x="7" y="7" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.75" />
            <path d="M11.5 16.5l3 3 6-6.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
        {milestoneId === 'builder' && (
          <>
            <path d="M6 24h20M8 24V13l8-5 8 5v11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 24v-6h6v6" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
          </>
        )}
        {milestoneId === 'strong' && (
          <>
            <path d="M16 4l9 4v7c0 6.2-3.9 10.7-9 13-5.1-2.3-9-6.8-9-13V8l9-4z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
            <path d="M12.5 16l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
        {milestoneId === 'finisher' && (
          <>
            <path d="M4 23l8-11 5 6 4-5 7 10H4z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
            <circle cx="22" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.75" />
          </>
        )}
      </svg>
    </div>
  );
};
