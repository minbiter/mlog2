import { atom, selector } from "recoil";

// useRecoilState: 구독 o
// useRecoilValue: 구독 o
// useSetRecoilState: 구독 x
export const diaryMusicDate = atom({
  key: "DiaryMusicDate",
  default: {
    topEmotion: "",
    diaryDate: 0,
  },
});

export const updateMusicList = atom({
  key: "UpdateMusicList",
  default: {
    topEmotion: "",
    musicCreate: false,
    musicDelete: false,
  },
});

export const musicPlayerOff = atom({
  key: "MusicPlayerOff",
  default: { off: false },
});
