import React, { useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import StatsCards from "@/components/dashboard/StatsCards";
import FilterBar from "@/components/dashboard/FilterBar";
import SeatGrid from "@/components/seats/SeatGrid";
import SeatDetailDrawer from "@/components/seats/SeatDetailDrawer";
import CheckInModal, { CheckInFormValues } from "@/components/seats/CheckInModal";
import { initialSeats } from "@/data/seats";
import type { Seat, PlanFilter, StatusFilter, PlanType, SeatStatus } from "@/types/seat";
import { isExpiringSoon } from "@/utils/time";

type SeatWithComputed = Seat & {
  isExpiringSoon: boolean;
};

function applyFilters(
  seats: Seat[],
  statusFilter: StatusFilter,
  planFilter: PlanFilter
): SeatWithComputed[] {
  const now = new Date();

  return seats
    .map((seat) => ({
      ...seat,
      isExpiringSoon:
        seat.status === "occupied" ? isExpiringSoon(seat.expireTime, now, 3) : false
    }))
    .filter((seat) => {
      if (statusFilter === "free" && seat.status !== "free") return false;
      if (statusFilter === "occupied" && seat.status !== "occupied") return false;
      if (statusFilter === "expiring" && !seat.isExpiringSoon) return false;

      if (planFilter !== "all") {
        if (seat.planType !== planFilter) return false;
      }

      return true;
    });
}

function computeStats(seats: Seat[]): {
  total: number;
  occupied: number;
  free: number;
  expiring: number;
} {
  const now = new Date();
  const total = seats.length;
  const occupiedSeats = seats.filter((s) => s.status === "occupied");
  const occupied = occupiedSeats.length;
  const free = seats.filter((s) => s.status === "free").length;
  const expiring = occupiedSeats.filter((s) => isExpiringSoon(s.expireTime, now, 3)).length;
  return { total, occupied, free, expiring };
}

function parseDateTimeLocal(value: string): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

const App: React.FC = () => {
  const [seats, setSeats] = useState<Seat[]>(initialSeats);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [planFilter, setPlanFilter] = useState<PlanFilter>("all");
  const [selectedSeatId, setSelectedSeatId] = useState<string | null>(null);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [checkInTargetSeatId, setCheckInTargetSeatId] = useState<string | null>(null);

  const stats = useMemo(() => computeStats(seats), [seats]);
  const filteredSeats = useMemo(
    () => applyFilters(seats, statusFilter, planFilter),
    [seats, statusFilter, planFilter]
  );

  const selectedSeat = useMemo(
    () => seats.find((s) => s.seatId === selectedSeatId) ?? null,
    [seats, selectedSeatId]
  );

  const checkInSeat = useMemo(
    () => seats.find((s) => s.seatId === checkInTargetSeatId) ?? null,
    [seats, checkInTargetSeatId]
  );

  const handleNewCheckIn = () => {
    setCheckInTargetSeatId(null);
    setIsCheckInModalOpen(true);
  };

  const handleSelectSeat = (seatId: string) => {
    setSelectedSeatId(seatId);
  };

  const handleCloseDrawer = () => {
    setSelectedSeatId(null);
  };

  const handleCheckInFromDrawer = (seatId: string) => {
    setCheckInTargetSeatId(seatId);
    setIsCheckInModalOpen(true);
  };

  const handleEditFromDrawer = (seatId: string) => {
    setCheckInTargetSeatId(seatId);
    setIsCheckInModalOpen(true);
  };

  const handleEndUsage = (seatId: string) => {
    setSeats((prev) =>
      prev.map((seat) =>
        seat.seatId === seatId
          ? { seatId: seat.seatId, status: "free" as SeatStatus }
          : seat
      )
    );
  };

  const handleCheckInSubmit = (values: CheckInFormValues) => {
    const startIso = parseDateTimeLocal(values.startTime);
    const expireIso = parseDateTimeLocal(values.expireTime);

    const planType: PlanType = values.planType;

    setSeats((prev) => {
      let targetId = values.seatId ?? checkInTargetSeatId;

      if (!targetId) {
        const freeSeat = prev.find((s) => s.status === "free");
        if (!freeSeat) {
          return prev;
        }
        targetId = freeSeat.seatId;
      }

      return prev.map((seat) =>
        seat.seatId === targetId
          ? {
              ...seat,
              status: "occupied",
              customerName: values.customerName,
              planType,
              startTime: startIso ?? seat.startTime,
              expireTime: expireIso ?? seat.expireTime,
              notes: values.notes
            }
          : seat
      );
    });

    setIsCheckInModalOpen(false);
    setCheckInTargetSeatId(null);
  };

  const handleCloseCheckInModal = () => {
    setIsCheckInModalOpen(false);
    setCheckInTargetSeatId(null);
  };

  const drawerOpen = !!selectedSeat;

  return (
    <div className="flex min-h-screen flex-col">
      <Header onNewCheckIn={handleNewCheckIn} />
      <main className="relative mx-auto flex w-full max-w-7xl flex-1 px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <div className="flex-1 space-y-6 pb-4 pr-0 lg:pr-8">
          <StatsCards
            total={stats.total}
            occupied={stats.occupied}
            free={stats.free}
            expiring={stats.expiring}
          />

          <FilterBar
            statusFilter={statusFilter}
            planFilter={planFilter}
            onStatusChange={setStatusFilter}
            onPlanChange={setPlanFilter}
          />

          <SeatGrid
            seats={filteredSeats}
            allSeats={seats}
            onSelectSeat={handleSelectSeat}
          />
        </div>
      </main>

      <SeatDetailDrawer
        seat={selectedSeat}
        open={drawerOpen}
        onClose={handleCloseDrawer}
        onCheckIn={handleCheckInFromDrawer}
        onEndUsage={handleEndUsage}
        onEdit={handleEditFromDrawer}
      />

      <CheckInModal
        open={isCheckInModalOpen}
        seat={checkInSeat}
        freeSeats={seats.filter((s) => s.status === "free")}
        onClose={handleCloseCheckInModal}
        onSubmit={handleCheckInSubmit}
      />
    </div>
  );
};

export default App;

