import React from "react";
import type { Seat } from "@/types/seat";
import { PLAN_TYPE_LABEL } from "@/types/seat";
import { StatusTag } from "@/components/common/Tag";
import { formatDate, formatUsageDays, getUsageDays } from "@/utils/time";

interface SeatCardProps {
  seat: Seat;
  onClick: () => void;
}

const SeatCard: React.FC<SeatCardProps> = ({ seat, onClick }) => {
  const now = new Date();
  const usageDays = getUsageDays(seat.startTime, now);
  const isFree = seat.status === "free";
  const planText = seat.planType ? PLAN_TYPE_LABEL[seat.planType] : "--";
  const durationText = isFree ? "--" : formatUsageDays(usageDays);
  const expireText = isFree ? "--" : formatDate(seat.expireTime);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full flex-col rounded-2xl border border-border bg-surface p-4 text-left shadow-soft transition-all duration-200 hover:border-slate-300 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-semibold tabular-nums text-slate-900">
          {seat.seatId}
        </span>
        <StatusTag status={seat.status} expireTime={seat.expireTime} />
      </div>
      <div className="mt-3 space-y-1.5 border-t border-border-muted pt-3">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-slate-500">客户</span>
          <span className="truncate font-medium text-slate-800">
            {isFree ? "—" : seat.customerName ?? "—"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-slate-500">套餐</span>
          <span className="text-slate-600">{planText}</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-slate-500">已用</span>
          <span className="tabular-nums text-slate-600">{durationText}</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-slate-500">到期</span>
          <span className="font-mono tabular-nums text-slate-600">{expireText}</span>
        </div>
      </div>
    </button>
  );
};

export default SeatCard;
