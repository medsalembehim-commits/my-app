import React from 'react';

interface CircularProgressRingProps {
  completedCount: number;
  totalDays: number;
  percentage: number;
  currentDayNumber: number;
  dayPrefix: string;
  dayOfLabel: string;
  completedLabel: string;
  isCheckedInToday: boolean;
}

export const CircularProgressRing: React.FC<CircularProgressRingProps> = ({
  completedCount,
  totalDays,
  percentage,
  currentDayNumber,
  dayPrefix,
  dayOfLabel,
  completedLabel,
  isCheckedInToday,
}) => {
  const size = 236;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPct = Math.max(0, Math.min(100, percentage));
  const strokeDashoffset = circumference - (clampedPct / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center select-none"
      role="img"
      aria-label={`${dayPrefix} ${currentDayNumber} ${dayOfLabel} - ${clampedPct}% ${completedLabel}`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90 transform"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-[#E6E0D4] dark:text-[#2A2E27]"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-[#556B45] dark:text-[#7D9868] transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <span className="text-xs font-medium tracking-wider text-[#5C6158] dark:text-[#A6ABA1]">
          {dayPrefix}
        </span>
        <div className="mt-0.5 flex items-baseline gap-1.5">
          <span className="font-mono-tabular text-5xl font-semibold tracking-tight text-[#1E201D] dark:text-[#F2EFE9]">
            {currentDayNumber}
          </span>
          <span className="text-sm font-medium text-[#5C6158] dark:text-[#A6ABA1]">
            {dayOfLabel}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs font-medium text-[#556B45] dark:text-[#9BB587]">
          <span className="font-mono-tabular">{clampedPct}%</span>
          <span aria-hidden="true">·</span>
          <span>
            {completedCount}/{totalDays}
          </span>
        </div>
        {isCheckedInToday && (
          <span className="mt-1 text-[11px] font-medium text-[#556B45] dark:text-[#9BB587]">
            ✓ {completedLabel}
          </span>
        )}
      </div>
    </div>
  );
};
