import { instanceAuth } from "api";
import {
  ICreateDiary,
  IFetchDiaryApi,
  IUpdateDiaryApi,
  IDeleteDiaryApi,
} from "types/diary";

export const createDiary: ICreateDiary = async (date, data) => {
  return await instanceAuth.post(`/diary/${date}`, data, {
    withCredentials: true,
  });
};

export const fetchDiaryApi: IFetchDiaryApi = async (date) => {
  return await instanceAuth.get(`/diary/${date}`, { withCredentials: true });
};

export const updateDiaryApi: IUpdateDiaryApi = async (date, data) => {
  return await instanceAuth.put(`/diary/${date}`, data, {
    withCredentials: true,
  });
};

export const deleteDiaryApi: IDeleteDiaryApi = async (date) => {
  return await instanceAuth.delete(`/diary/${date}`, { withCredentials: true });
};
