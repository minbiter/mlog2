export interface IFetchSurveyMusicApi {
  (): Promise<{
    data: {
      result: boolean;
      data: {
        surveyMusic: Array<{
          title: string;
          artist: string;
          img: string;
          videoId: string;
          genreId: number;
          name: string;
        }>;
      };
    };
  }>;
}

export interface IPostSurveyApi {
  (data: {
    neutral: Array<number>;
    positive: Array<number>;
    negative: Array<number>;
  }): Promise<{
    data: {
      result: boolean;
      data: {
        survey: string;
      };
    };
  }>;
}
