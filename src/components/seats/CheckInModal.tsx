import React, { useEffect, useState } from "react";
import Modal from "@/components/common/Modal";
import type { PlanType, Seat } from "@/types/seat";
import { PLAN_TYPE_LABEL } from "@/types/seat";

export interface CheckInFormValues {
  seatId?: string;
  customerName: string;
  planType: PlanType;
  startTime: string;
  expireTime: string;
  notes?: string;
}

interface CheckInModalProps {
  open: boolean;
  seat: Seat | null;
  freeSeats: Seat[];
  onClose: () => void;
  onSubmit: (values: CheckInFormValues) => void;
}

function toLocalInputValue(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const defaultPlan: PlanType = "single";

const CheckInModal: React.FC<CheckInModalProps> = ({ open, seat, freeSeats, onClose, onSubmit }) => {
  const [selectedSeatId, setSelectedSeatId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [planType, setPlanType] = useState<PlanType>(defaultPlan);
  const [startTime, setStartTime] = useState("");
  const [expireTime, setExpireTime] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (open) {
      if (seat && seat.status === "occupied") {
        setSelectedSeatId(seat.seatId);
        setCustomerName(seat.customerName ?? "");
        setPlanType(seat.planType ?? defaultPlan);
        setStartTime(toLocalInputValue(seat.startTime));
        setExpireTime(toLocalInputValue(seat.expireTime));
        setNotes(seat.notes ?? "");
      } else {
        const firstFree = freeSeats[0]?.seatId ?? "";
        setSelectedSeatId(firstFree);
        const now = new Date();
        const later = new Date(now.getTime() + 2 * 60 * 60 * 1000);
        setCustomerName("");
        setPlanType(defaultPlan);
        setStartTime(toLocalInputValue(now.toISOString()));
        setExpireTime(toLocalInputValue(later.toISOString()));
        setNotes("");
      }
    }
  }, [open, seat, freeSeats]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      return;
    }
    if (!seat && !selectedSeatId) {
      return;
    }

    onSubmit({
      seatId: (seat?.seatId) ?? (selectedSeatId || undefined),
      customerName: customerName.trim(),
      planType,
      startTime,
      expireTime,
      notes: notes.trim() || undefined
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={seat ? `安排 / 编辑入座 - ${seat.seatId}` : "新增入座"}
    >
      <form onSubmit={handleSubmit} className="space-y-5 text-sm">
        {!seat ? (
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-600">
              座位号 <span className="text-rose-500">*</span>
            </label>
            <select
              className="block w-full rounded-lg border border-border bg-surface-muted px-3 py-2.5 text-sm text-slate-900 transition-colors focus:border-primary-500 focus:bg-surface focus:outline-none focus:ring-1 focus:ring-primary-500"
              value={selectedSeatId}
              onChange={(e) => setSelectedSeatId(e.target.value)}
              required
            >
              <option value="">请选择座位</option>
              {freeSeats.map((s) => (
                <option key={s.seatId} value={s.seatId}>
                  {s.seatId}
                </option>
              ))}
            </select>
            {freeSeats.length === 0 && (
              <p className="mt-1 text-xs text-amber-600">当前没有空闲座位</p>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-600">座位号</label>
            <div className="rounded-lg border border-border bg-surface-muted px-3 py-2.5 text-sm text-slate-900">
              {seat.seatId}
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-600">
            客户姓名 <span className="text-rose-500">*</span>
          </label>
          <input
            className="block w-full rounded-lg border border-border bg-surface-muted px-3 py-2.5 text-sm text-slate-900 transition-colors focus:border-primary-500 focus:bg-surface focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="请输入客户姓名"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-600">套餐类型</label>
          <select
            className="block w-full rounded-lg border border-border bg-surface-muted px-3 py-2.5 text-sm text-slate-900 transition-colors focus:border-primary-500 focus:bg-surface focus:outline-none focus:ring-1 focus:ring-primary-500"
            value={planType}
            onChange={(e) => setPlanType(e.target.value as PlanType)}
          >
            <option value="single">{PLAN_TYPE_LABEL["single"]}</option>
            <option value="daily">{PLAN_TYPE_LABEL["daily"]}</option>
            <option value="weekly">{PLAN_TYPE_LABEL["weekly"]}</option>
            <option value="monthly">{PLAN_TYPE_LABEL["monthly"]}</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-600">开始时间</label>
          <input
            type="datetime-local"
            className="block w-full rounded-lg border border-border bg-surface-muted px-3 py-2.5 text-sm text-slate-900 transition-colors focus:border-primary-500 focus:bg-surface focus:outline-none focus:ring-1 focus:ring-primary-500"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-600">到期时间</label>
          <input
            type="datetime-local"
            className="block w-full rounded-lg border border-border bg-surface-muted px-3 py-2.5 text-sm text-slate-900 transition-colors focus:border-primary-500 focus:bg-surface focus:outline-none focus:ring-1 focus:ring-primary-500"
            value={expireTime}
            onChange={(e) => setExpireTime(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-600">备注</label>
          <textarea
            className="block w-full rounded-lg border border-border bg-surface-muted px-3 py-2.5 text-sm text-slate-900 transition-colors focus:border-primary-500 focus:bg-surface focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="选填，如调转、补卡等"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-surface-muted"
          >
            取消
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-soft transition-colors hover:bg-primary-700"
          >
            确认
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CheckInModal;

