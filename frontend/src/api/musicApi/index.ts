import { instance, instanceAuth } from "api";
import {
  IFetchSurveyMusicApi,
  IPostSurveyApi,
  IFetchAllPlayList,
  IFetchNamePlayList,
} from "types/music";

export const fetchSurveyMusicApi: IFetchSurveyMusicApi = async () => {
  return await instance.get("/survey");
};

export const postSurveyApi: IPostSurveyApi = async (data) => {
  return await instanceAuth.post("/survey", data, { withCredentials: true });
};

export const fetchAllPlayList: IFetchAllPlayList = async () => {
  return await instanceAuth.get("/music", { withCredentials: true });
};

export const fetchNamePlayList: IFetchNamePlayList = async (data) => {
  return await instanceAuth.get(`/music/${data.name}`, {
    withCredentials: true,
  });
};
