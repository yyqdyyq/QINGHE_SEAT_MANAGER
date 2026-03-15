import React from "react";
import type { Seat } from "@/types/seat";
import SeatCard from "./SeatCard";

interface SeatGridProps {
  seats: Seat[];
  onSelectSeat: (seatId: string) => void;
}

const SeatGrid: React.FC<SeatGridProps> = ({ seats, onSelectSeat }) => {
  if (seats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
        <p className="text-sm font-medium text-slate-500">没有符合当前筛选条件的座位。</p>
        <p className="mt-1 text-xs text-slate-400">尝试调整筛选条件</p>
      </div>
    );
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {seats.map((seat) => (
        <SeatCard
          key={seat.seatId}
          seat={seat}
          onClick={() => onSelectSeat(seat.seatId)}
        />
      ))}
    </section>
  );
};

export default SeatGrid;
