import React, { useEffect, useState } from "react";
import { formatDate } from "@/utils/time";

interface HeaderProps {
  onNewCheckIn: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewCheckIn }) => {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000 * 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-surface shadow-soft">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-baseline gap-4">
          <h1 className="truncate text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            青禾自习室座位管理
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <span className="rounded-lg border border-border bg-surface-muted/80 px-3 py-1.5 font-mono text-xs text-slate-600 tabular-nums">
            {formatDate(now)}
          </span>
          <button
            type="button"
            onClick={onNewCheckIn}
            className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-medium text-white shadow-soft transition-colors hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
          >
            新增入座
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
