import { instance, instanceAuth } from "api";
import { IFetchSurveyMusicApi, IPostSurveyApi } from "types/music";

export const fetchSurveyMusicApi: IFetchSurveyMusicApi = async () => {
  return await instance.get("/survey");
};

export const postSurveyApi: IPostSurveyApi = async (data) => {
  return await instanceAuth.post("/survey", data);
};
