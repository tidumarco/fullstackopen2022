export type Diary = {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
};

export type NewDiary = Omit<Diary, "id">;
export type DiaryFormProps = {
  diaries: Diary[];
  createDiary: (newDiary: NewDiary) => Promise<Diary>;
  newDiary: NewDiary;
  setNewDiary: (newDiary: NewDiary) => void;
  setDiaries: (diaries: Diary[]) => void;
};
