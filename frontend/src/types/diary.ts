export interface ICreateDiary {
  (date: string, data: { title: string; content: string }): Promise<{
    data: { result: boolean; data: { diary: string | { diaryId: number } } };
  }>;
}
