import React from "react";
import type { Seat } from "@/types/seat";
import { PLAN_TYPE_LABEL, STATUS_LABEL } from "@/types/seat";
import { StatusTag } from "@/components/common/Tag";
import { formatDate, formatUsageDays, getUsageDays } from "@/utils/time";

interface SeatDetailDrawerProps {
  seat: Seat | null;
  open: boolean;
  onClose: () => void;
  onCheckIn: (seatId: string) => void;
  onEndUsage: (seatId: string) => void;
  onEdit: (seatId: string) => void;
}

const SeatDetailDrawer: React.FC<SeatDetailDrawerProps> = ({
  seat,
  open,
  onClose,
  onCheckIn,
  onEndUsage,
  onEdit
}) => {
  if (!open || !seat) return null;

  const now = new Date();
  const usageDays = getUsageDays(seat.startTime, now);
  const isFree = seat.status === "free";
  const planText = seat.planType ? PLAN_TYPE_LABEL[seat.planType] : "--";

  return (
    <aside className="fixed inset-y-0 right-0 z-30 w-full max-w-sm border-l border-border bg-surface shadow-modal">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-slate-900">
              座位详情
            </h2>
            <p className="mt-0.5 font-mono text-sm text-slate-500">{seat.seatId}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-surface-muted hover:text-slate-600"
            aria-label="关闭详情"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                当前状态
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-medium text-slate-900">
                  {STATUS_LABEL[seat.status]}
                </span>
                <StatusTag status={seat.status} expireTime={seat.expireTime} />
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                客户信息
              </p>
              <div className="mt-2 rounded-xl border border-border-muted bg-surface-muted/50 px-4 py-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">客户姓名</span>
                  <span className="font-medium text-slate-900">
                    {isFree ? "暂无（空闲座位）" : seat.customerName ?? "--"}
                  </span>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-slate-500">套餐类型</span>
                  <span className="text-slate-900">{planText}</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                时间信息
              </p>
              <div className="mt-2 rounded-xl border border-border-muted bg-surface-muted/50 px-4 py-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">开始时间</span>
                  <span className="font-mono text-xs text-slate-900">
                    {seat.startTime ? formatDate(seat.startTime) : "--"}
                  </span>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-slate-500">已用天数</span>
                  <span className="font-mono text-xs text-slate-900">
                    {isFree ? "--" : formatUsageDays(usageDays)}
                  </span>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-slate-500">到期时间</span>
                  <span className="font-mono text-xs text-slate-900">
                    {seat.expireTime ? formatDate(seat.expireTime) : "--"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                备注
              </p>
              <div className="mt-2 rounded-xl border border-border-muted bg-surface-muted/50 px-4 py-3 text-sm">
                <p className="whitespace-pre-wrap text-slate-700">
                  {seat.notes?.trim() ? seat.notes : "无"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border bg-surface-muted/30 px-5 py-4">
          <div className="flex flex-wrap gap-3">
            {isFree ? (
              <button
                type="button"
                onClick={() => onCheckIn(seat.seatId)}
                className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-soft transition-colors hover:bg-primary-700"
              >
                安排入座
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => onEndUsage(seat.seatId)}
                  className="inline-flex flex-1 items-center justify-center rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-surface-muted"
                >
                  结束使用
                </button>
                <button
                  type="button"
                  onClick={() => onEdit(seat.seatId)}
                  className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-soft transition-colors hover:bg-primary-700"
                >
                  编辑信息
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SeatDetailDrawer;
