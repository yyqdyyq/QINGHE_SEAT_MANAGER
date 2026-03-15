import React from "react";

interface StatsCardsProps {
  total: number;
  occupied: number;
  free: number;
  expiring: number;
}

const icons = {
  total: (
    <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  occupied: (
    <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  free: (
    <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  expiring: (
    <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

const StatCard: React.FC<{
  label: string;
  value: number;
  description?: string;
  icon: React.ReactNode;
}> = ({ label, value, description, icon }) => (
  <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft transition-shadow hover:shadow-card-hover">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
        <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-slate-900 sm:text-3xl">
          {value}
        </p>
        {description && (
          <p className="mt-1.5 text-xs text-slate-400">{description}</p>
        )}
      </div>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted">
        {icon}
      </div>
    </div>
  </div>
);

const StatsCards: React.FC<StatsCardsProps> = ({ total, occupied, free, expiring }) => (
  <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <StatCard
      label="总座位数"
      value={total}
      description="当前自习室全部可用座位"
      icon={icons.total}
    />
    <StatCard
      label="占用中"
      value={occupied}
      description="正在使用的座位数量"
      icon={icons.occupied}
    />
    <StatCard
      label="空闲中"
      value={free}
      description="可立即安排入座"
      icon={icons.free}
    />
    <StatCard
      label="即将到期"
      value={expiring}
      description="剩余 ≤ 3 天"
      icon={icons.expiring}
    />
  </section>
);

export default StatsCards;
