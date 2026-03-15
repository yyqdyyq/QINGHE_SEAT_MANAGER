export type SeatStatus = "free" | "occupied";

export type PlanType = "single" | "daily" | "weekly" | "monthly";

export interface Seat {
  seatId: string;
  status: SeatStatus;
  customerName?: string;
  planType?: PlanType;
  startTime?: string;
  expireTime?: string;
  notes?: string;
}

export type StatusFilter = "all" | "free" | "occupied" | "expiring";
export type PlanFilter = "all" | PlanType;

export const PLAN_TYPE_LABEL: Record<PlanType, string> = {
  single: "次卡",
  daily: "日卡",
  weekly: "周卡",
  monthly: "月卡"
};

export const STATUS_LABEL: Record<SeatStatus, string> = {
  free: "空闲",
  occupied: "占用中"
};

