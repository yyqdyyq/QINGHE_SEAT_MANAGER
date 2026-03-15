import type { Seat } from "@/types/seat";
import { parseMonthDay } from "@/utils/time";

function exp(monthDay: string): string | undefined {
  return parseMonthDay(monthDay);
}

export const initialSeats: Seat[] = [
  // A区 A1–A9
  { seatId: "A1", status: "free" },
  { seatId: "A2", status: "occupied", customerName: "可达鸭", expireTime: exp("3.26") },
  { seatId: "A3", status: "occupied", customerName: "孙浩原", expireTime: exp("4.2") },
  { seatId: "A4", status: "occupied", customerName: "崔明俐", expireTime: exp("3.20") },
  { seatId: "A5", status: "free" },
  { seatId: "A6", status: "occupied", customerName: "丁婉炜", expireTime: exp("3.12") },
  { seatId: "A7", status: "free", notes: "李心怡 3.22" },
  { seatId: "A8", status: "free" },
  { seatId: "A9", status: "occupied", customerName: "杨依林", expireTime: exp("3.13") },
  // B区 B1–B8
  { seatId: "B1", status: "free" },
  { seatId: "B2", status: "occupied", customerName: "王星然", expireTime: exp("3.28") },
  { seatId: "B3", status: "free" },
  { seatId: "B4", status: "free" },
  { seatId: "B5", status: "occupied", customerName: "杨若琳", expireTime: exp("3.15") },
  { seatId: "B6", status: "free" },
  {
    seatId: "B7",
    status: "occupied",
    customerName: "于涵",
    expireTime: exp("4.6"),
    notes: "3.4 来后,一直未来"
  },
  { seatId: "B8", status: "free" },
  // C区 C1–C15
  { seatId: "C1", status: "free" },
  { seatId: "C2", status: "occupied", customerName: "宋旭", expireTime: exp("4.1") },
  { seatId: "C3", status: "free" },
  { seatId: "C4", status: "free" },
  { seatId: "C5", status: "occupied", customerName: "胡普威", expireTime: exp("4.6") },
  { seatId: "C6", status: "free" },
  {
    seatId: "C7",
    status: "occupied",
    customerName: "张萍",
    notes: "30次；12.30 开始-90天"
  },
  { seatId: "C8", status: "free" },
  { seatId: "C9", status: "occupied", customerName: "刘通", expireTime: exp("3.15") },
  { seatId: "C10", status: "occupied", customerName: "魏政", expireTime: exp("3.23") },
  { seatId: "C11", status: "free" },
  { seatId: "C12", status: "occupied", customerName: "宋旭", expireTime: exp("4.1") },
  { seatId: "C13", status: "occupied", customerName: "梁雨豪", expireTime: exp("3.15") },
  { seatId: "C14", status: "occupied", customerName: "李心怡", expireTime: exp("3.22") },
  { seatId: "C15", status: "occupied", customerName: "李林博", expireTime: exp("3.13") },
  // D区 D1–D7
  { seatId: "D1", status: "free" },
  { seatId: "D2", status: "occupied", customerName: "吴承烨", expireTime: exp("3.16") },
  { seatId: "D3", status: "occupied", customerName: "郭浩" },
  { seatId: "D4", status: "occupied", customerName: "李嫣" },
  { seatId: "D5", status: "occupied", customerName: "黄玉航", expireTime: exp("4.1") },
  { seatId: "D6", status: "occupied", customerName: "孙诗娅", expireTime: exp("3.8") },
  { seatId: "D7", status: "occupied", customerName: "刘博通", expireTime: exp("3.11") },
  // E区 E1–E10
  { seatId: "E1", status: "free" },
  { seatId: "E2", status: "free" },
  { seatId: "E3", status: "free" },
  { seatId: "E4", status: "free" },
  { seatId: "E5", status: "occupied", customerName: "孙聪", expireTime: exp("3.29") },
  {
    seatId: "E6",
    status: "occupied",
    customerName: "赵晗旭",
    notes: "3.15 用完 15次卡后,再开月卡"
  },
  { seatId: "E7", status: "occupied", customerName: "李翎", expireTime: exp("3.16") },
  { seatId: "E8", status: "free" },
  { seatId: "E9", status: "free" },
  { seatId: "E10", status: "occupied", customerName: "王振宁", expireTime: exp("4.18") }
];
