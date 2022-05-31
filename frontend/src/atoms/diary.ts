import { atom, selector } from "recoil";
import { fetchCalendarApi, fetchDiaryApi } from "api/diaryApi";

// useRecoilState: 구독 o
// useRecoilValue: 구독 o
// useSetRecoilState: 구독 x
export const calendarRangeState = atom({
  key: "CalendarRange",
  default: { startDate: "", endDate: "" },
});

// useRecoilState를 사용가능하나, suspense를 사용해야함.
// React Suspense는 아직 실험단계이므로 Loadable을 사용.
// useRecoilStateLoadable: 구독 o
// useRecoilValueLoadable: 구독 o
export const getCalendar = selector({
  key: "Get/Calendar",
  get: async ({ get }) => {
    const { startDate, endDate } = get(calendarRangeState);
    if (!startDate || !endDate) return;
    try {
      const { data } = await fetchCalendarApi(startDate, endDate);
      if (data.result) {
        return data.data.diary;
      } else {
        return {};
      }
    } catch (err) {
      alert("서비스를 이용하실 수 없습니다.");
    }
  },
});

export const diaryState = atom({
  key: "DiaryState",
  default: { date: "" },
});

export const getDiary = selector({
  key: "Get/Diary",
  get: async ({ get }) => {
    const { date } = get(diaryState);
    if (!date) return;
    try {
      const { data } = await fetchDiaryApi(date);
      if (data.result) {
        return data.data.diary;
      } else {
        return {} as any;
      }
    } catch (err) {
      alert("서비스를 이용하실 수 없습니다.");
    }
  },
});
