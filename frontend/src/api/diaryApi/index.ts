import { instanceAuth } from "api";
import { ICreateDiary } from "types/diary";

export const createDiary: ICreateDiary = async (date, data) => {
  return await instanceAuth.post(`/diary/${date}`, data, {
    withCredentials: true,
  });
};
