export function toDate(value?: string | Date | null): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatDateTime(value?: string | Date | null): string {
  const d = toDate(value);
  if (!d) return "--";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function formatDate(value?: string | Date | null): string {
  const d = toDate(value);
  if (!d) return "--";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDuration(ms: number): string {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function getUsageDurationMs(startTime?: string, now: Date = new Date()): number {
  const start = toDate(startTime);
  if (!start) return 0;
  return Math.max(0, now.getTime() - start.getTime());
}

export function getUsageDays(startTime?: string, now: Date = new Date()): number {
  const ms = getUsageDurationMs(startTime, now);
  return Math.floor(ms / (24 * 60 * 60 * 1000));
}

export function formatUsageDays(days: number): string {
  return `${days} 天`;
}

export function getRemainingMs(expireTime?: string, now: Date = new Date()): number | null {
  const expire = toDate(expireTime);
  if (!expire) return null;
  return expire.getTime() - now.getTime();
}

export function isExpiringSoon(
  expireTime?: string,
  now: Date = new Date(),
  thresholdDays = 3
): boolean {
  const remaining = getRemainingMs(expireTime, now);
  if (remaining === null) return false;
  if (remaining <= 0) return true;
  return remaining <= thresholdDays * 24 * 60 * 60 * 1000;
}

/**
 * Parse "月.日" (e.g. "12.1", "1.4") to ISO date string.
 * Year: if month >= current month use baseYear, else baseYear+1.
 * "26.3-4" is treated as 2026-03-04.
 */
export function parseMonthDay(monthDay: string, baseYear?: number): string | undefined {
  const s = monthDay.trim();
  if (!s) return undefined;

  const now = new Date();
  const yearHint = baseYear ?? now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  // Special: "26.3-4" -> 2026-03-04
  const special = /^26\.3-4$/i.test(s);
  if (special) {
    return `${yearHint + 1}-03-04T00:00:00.000Z`;
  }

  const match = s.match(/^(\d{1,2})\.(\d{1,2})$/);
  if (!match) return undefined;

  const month = parseInt(match[1], 10);
  const day = parseInt(match[2], 10);
  if (month < 1 || month > 12 || day < 1 || day > 31) return undefined;

  const year = month < currentMonth ? yearHint + 1 : yearHint;
  const m = String(month).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}T00:00:00.000Z`;
}

