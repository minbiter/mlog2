export interface ICreateDiary {
  (date: string, data: { title: string; content: string }): Promise<{
    data: { result: boolean; data: { diary: string | { diaryId: number } } };
  }>;
}

export interface IFetchDiaryApi {
  (date: string): Promise<{
    data: {
      result: boolean;
      data: {
        diary:
          | string
          | {
              id: number;
              uid: number;
              diaryDate: string;
              title: string;
              content: string;
            };
      };
    };
  }>;
}

export interface IUpdateDiaryApi {
  (date: string, data: { title: string; content: string }): Promise<{
    data: { result: boolean; data: { diary: string } };
  }>;
}

export interface IDeleteDiaryApi {
  (date: string): Promise<{
    data: { result: boolean; data: { diary: string } };
  }>;
}
