import React from "react";
import { SeatStatus } from "@/types/seat";
import { isExpiringSoon } from "@/utils/time";

interface TagProps {
  status: SeatStatus;
  expireTime?: string;
}

export const StatusTag: React.FC<TagProps> = ({ status, expireTime }) => {
  const now = new Date();
  const expiring = status === "occupied" && isExpiringSoon(expireTime, now, 3);

  let text = "";
  let dotBg = "";
  let wrapper =
    "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-2xs font-medium";

  if (status === "free") {
    text = "空闲";
    dotBg = "bg-emerald-500";
    wrapper += " border-emerald-200/80 bg-emerald-50/90 text-emerald-700";
  } else if (expiring) {
    text = "即将到期";
    dotBg = "bg-amber-500";
    wrapper += " border-amber-200/80 bg-amber-50/90 text-amber-700";
  } else {
    text = "占用中";
    dotBg = "bg-sky-500";
    wrapper += " border-sky-200/80 bg-sky-50 text-sky-700";
  }

  return (
    <span className={wrapper}>
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotBg}`} aria-hidden />
      {text}
    </span>
  );
};
