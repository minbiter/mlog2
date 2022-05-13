import { atom, selectorFamily } from "recoil";
import { fetchCalendarApi } from "api/diaryApi";

export const calendarState = atom({
  key: "CalendarState",
  default: {} as any,
});

export const diaryState = atom({
  key: "DiaryState",
  default: {} as any,
});
