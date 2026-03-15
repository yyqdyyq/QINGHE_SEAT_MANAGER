import React from "react";
import type { PlanFilter, StatusFilter, PlanType } from "@/types/seat";
import { PLAN_TYPE_LABEL } from "@/types/seat";

interface FilterBarProps {
  statusFilter: StatusFilter;
  planFilter: PlanFilter;
  onStatusChange: (value: StatusFilter) => void;
  onPlanChange: (value: PlanFilter) => void;
}

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "free", label: "空闲" },
  { value: "occupied", label: "占用中" },
  { value: "expiring", label: "即将到期" }
];

const planOptions: { value: PlanFilter; label: string }[] = [
  { value: "all", label: "全部套餐" },
  { value: "single", label: PLAN_TYPE_LABEL["single"] },
  { value: "daily", label: PLAN_TYPE_LABEL["daily"] },
  { value: "weekly", label: PLAN_TYPE_LABEL["weekly"] },
  { value: "monthly", label: PLAN_TYPE_LABEL["monthly"] }
];

function segmentClass(active: boolean): string {
  return [
    "inline-flex items-center rounded-lg px-3.5 py-2 text-xs font-medium transition-all duration-150",
    active
      ? "bg-slate-900 text-white shadow-soft"
      : "text-slate-600 hover:bg-surface-muted hover:text-slate-900"
  ].join(" ");
}

const FilterBar: React.FC<FilterBarProps> = ({
  statusFilter,
  planFilter,
  onStatusChange,
  onPlanChange
}) => (
  <section className="flex flex-col gap-4 rounded-2xl border border-border bg-surface px-4 py-4 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:gap-6">
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-medium uppercase tracking-wider text-slate-500">
        状态
      </span>
      <div className="inline-flex rounded-xl bg-surface-muted p-1">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={segmentClass(statusFilter === option.value)}
            onClick={() => onStatusChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-medium uppercase tracking-wider text-slate-500">
        套餐
      </span>
      <div className="inline-flex rounded-xl bg-surface-muted p-1">
        {planOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={segmentClass(planFilter === option.value)}
            onClick={() => onPlanChange(option.value as PlanFilter | PlanType)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  </section>
);

export default FilterBar;
