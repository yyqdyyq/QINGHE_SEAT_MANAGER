import React, { useMemo } from "react";
import type { Seat } from "@/types/seat";
import SeatCard from "./SeatCard";

const ZONE_ORDER = ["A", "B", "C", "D", "E"];

function getZone(seatId: string): string {
  return seatId.charAt(0).toUpperCase();
}

interface SeatGridProps {
  seats: Seat[];
  allSeats?: Seat[];
  onSelectSeat: (seatId: string) => void;
}

const SeatGrid: React.FC<SeatGridProps> = ({ seats, allSeats, onSelectSeat }) => {
  const zonesWithStats = useMemo(() => {
    const fullList = allSeats ?? seats;
    const zoneStats = new Map<string, { total: number; occupied: number }>();
    for (const seat of fullList) {
      const z = getZone(seat.seatId);
      if (!zoneStats.has(z)) zoneStats.set(z, { total: 0, occupied: 0 });
      const stat = zoneStats.get(z)!;
      stat.total += 1;
      if (seat.status === "occupied") stat.occupied += 1;
    }
    const zonesWithFilteredSeats = new Set(seats.map((s) => getZone(s.seatId)));
    return ZONE_ORDER.filter(
      (z) => zoneStats.has(z) && zonesWithFilteredSeats.has(z)
    ).map((zone) => ({
      zone,
      ...zoneStats.get(zone)!
    }));
  }, [allSeats, seats]);

  const seatsByZone = useMemo(() => {
    const map = new Map<string, Seat[]>();
    for (const seat of seats) {
      const z = getZone(seat.seatId);
      if (!map.has(z)) map.set(z, []);
      map.get(z)!.push(seat);
    }
    for (const z of ZONE_ORDER) {
      if (map.has(z)) map.get(z)!.sort((a, b) => a.seatId.localeCompare(b.seatId));
    }
    return map;
  }, [seats]);

  if (seats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
        <p className="text-sm font-medium text-slate-500">没有符合当前筛选条件的座位。</p>
        <p className="mt-1 text-xs text-slate-400">尝试调整筛选条件</p>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      {zonesWithStats.map(({ zone, total, occupied }) => {
        const zoneSeats = seatsByZone.get(zone) ?? [];
        return (
          <div key={zone}>
            <div className="mb-3 flex items-baseline gap-2">
              <h3 className="text-sm font-semibold tracking-tight text-slate-800">
                {zone}区
              </h3>
              <span className="text-xs text-slate-500 tabular-nums">
                {occupied}/{total} 占用
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {zoneSeats.map((seat) => (
                <SeatCard
                  key={seat.seatId}
                  seat={seat}
                  onClick={() => onSelectSeat(seat.seatId)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default SeatGrid;
