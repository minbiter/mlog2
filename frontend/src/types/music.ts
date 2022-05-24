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

export interface IPopular {
  id: number;
  title: string;
  artist: string;
  genreId: number;
  img: string;
  videoId: string;
}

export interface IEmotionMusic extends IPopular {
  diaryDate: number;
  updateAt: Date;
}

export interface IFetchAllPlayList {
  (): Promise<{
    data: {
      result: boolean;
      data: {
        popular: Array<IPopular>;
        positive: Array<IEmotionMusic>;
        negative: Array<IEmotionMusic>;
        neutral: Array<IEmotionMusic>;
      };
    };
  }>;
}
export interface IFetchNamePlayList {
  (data: { name: string }): Promise<{
    data: {
      result: boolean;
      data: {
        positive?: Array<IEmotionMusic>;
        negative?: Array<IEmotionMusic>;
        neutral?: Array<IEmotionMusic>;
        [propsName: string]: any;
      };
    };
  }>;
}
