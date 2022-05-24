import { atom, selector } from "recoil";

// useRecoilState: 구독 o
// useRecoilValue: 구독 o
// useSetRecoilState: 구독 x
export const musicPlayState = atom({
  key: "MusicPlay",
  default: {
    isMusic: false,
    music: {
      title: "",
      artist: "",
      img: "",
      videoId: "",
      genreId: 0,
      name: "",
    },
  },
});

export const updateMusicList = atom({
  key: "UpdateMusicList",
  default: {
    topEmotion: "",
  },
});

export const musicPlayerOff = atom({
  key: "MusicPlayerOff",
  default: { off: false },
});
