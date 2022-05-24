/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { musicPlayState, updateMusicList, musicPlayerOff } from "atoms/music";
import ReactPlayer from "react-player";
import { fetchAllPlayList, fetchNamePlayList } from "api/musicApi";
import Duration from "utils/music/Duration";
import { IPopular, IEmotionMusic } from "types/music";
import { AuthContext } from "context/AuthProvider";
import {
  articleTag,
  sectionContainer,
  headerContainer,
  headerMenu,
  bottomBorder,
  musicContainer,
  loadingCenter,
  musicItem,
  defaultMusic,
  musicDetail,
  musicInfo,
  musicTitle,
  musicArtist,
  runBtn,
  pauseBtn,
  controlMusicInfo,
  controlMusicTitle,
  controlMusicArtist,
  playedController,
  playListController,
  emptyControlLeft,
  controlLeft,
  controlPause,
  controlRun,
  controlRight,
} from "./style";
import LoadingSpinner from "components/LoadingSpinner";

interface IMusicList {
  popular: Array<IPopular>;
  positive: Array<IEmotionMusic>;
  negative: Array<IEmotionMusic>;
  neutral: Array<IEmotionMusic>;
  [propsName: string]: any;
}

const Music = () => {
  const { auth } = useContext(AuthContext);
  const history = useHistory();
  const musicPlayValue = useRecoilValue(musicPlayState);
  const updateMusicListValue = useRecoilValue(updateMusicList);
  const musicPlayerOffValue = useRecoilValue(musicPlayerOff);
  const [loading, setLoading] = useState(true);
  const [isPlayingDM, setIsPlayingDM] = useState(false);
  const [musicList, setMusicList] = useState<IMusicList>({} as IMusicList);
  const [selectedPlayList, setSelectedPlayList] = useState("popular");
  // running PlayList
  const [curPlayList, setCurPlayList] = useState("");
  // PlayList Order
  const [playOrder, setPlayOrder] = useState(-10);
  // ReactPlayer
  const player = useRef<ReactPlayer>(null);
  // targetted Music
  const [targetVideoId, setTargetVideoId] = useState<string>("");
  // Music Play or Pause
  const [playing, setPlaying] = useState(false);
  // Music Max Time
  const [duration, setDuration] = useState<number>(0);
  // Music Current Time(duration * played)
  const [played, setPlayed] = useState<number>(0);
  // Music isSeeking
  const [seeking, setSeeking] = useState(false);

  useEffect(() => {
    if (musicPlayerOffValue.off) {
      setPlaying(false);
    }
  }, [musicPlayerOffValue]);

  useEffect(() => {
    const fetch = async (topEmotion: string) => {
      const { data } = await fetchNamePlayList({ name: topEmotion });
      if (data.result) {
        setMusicList((prev) => {
          prev[topEmotion] = data.data[topEmotion];
          return { ...prev };
        });
      }
    };
    if (updateMusicListValue.topEmotion) {
      fetch(updateMusicListValue.topEmotion);
    }
  }, [updateMusicListValue]);

  useEffect(() => {
    if (musicPlayValue.isMusic) {
      setPlayed(0);
      setDuration(0);
      setTargetVideoId(musicPlayValue.music.videoId);
      setPlaying(true);
      setIsPlayingDM(true);
    }
  }, [musicPlayValue]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await fetchAllPlayList();
      setLoading(false);
      if (data.result) {
        setMusicList(data.data);
      } else {
        alert("서비스를 이용하실 수 없습니다.");
      }
    };
    if (auth.accessToken) {
      fetch();
    }
  }, [auth]);

  const changePlayList = (e: any) => {
    setSelectedPlayList(e.target.value);
  };

  const renderPlayPauseButton = (playListName: string, index: number) => {
    return (
      <button
        onClick={() => handlePlayPause(playListName, index)}
        css={
          playing &&
          !isPlayingDM &&
          musicList[playListName][index].videoId === targetVideoId
            ? pauseBtn
            : runBtn
        }
      />
    );
  };

  const handlePlayPause = (playListName: string, index: number) => {
    if (targetVideoId === musicList[playListName][index].videoId && playing) {
      setPlaying(false);
    } else if (
      targetVideoId === musicList[playListName][index].videoId &&
      !playing
    ) {
      setPlaying(true);
    } else {
      setPlayed(0);
      setTargetVideoId(musicList[playListName][index].videoId);
      setPlaying(true);
      setCurPlayList(playListName);
      setPlayOrder(index);
    }
  };

  // Duration에 적용
  const handleProgress = (state: any) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  // handleProgress을 위한 함수
  const handleSeekMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(true);
  };

  // ReactPlayer에 적용.
  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    player?.current?.seekTo(parseFloat(e.currentTarget.value));
  };

  // 변화를 감지하여 <Duration />에 적용.
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  // Duration의 time rerendering을 위한 것임.
  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  // 음악이 끝나면 초기화
  const handleEnded = () => {
    setPlayed(0);
    setDuration(0);
    setTargetVideoId("");
    setPlaying(false);
  };

  useEffect(() => {
    if (!targetVideoId && isPlayingDM) {
      setIsPlayingDM(false);
      if (curPlayList) {
        setTargetVideoId(musicList[curPlayList][playOrder].videoId);
        setPlaying(true);
      }
    } else if (
      !targetVideoId &&
      musicList[curPlayList]?.length - 1 >= playOrder + 1
    ) {
      // 다음 음악 실행
      setTargetVideoId(musicList[curPlayList][playOrder + 1].videoId);
      setPlayOrder((prev) => prev + 1);
      setPlaying(true);
    } else if (
      !targetVideoId &&
      musicList[curPlayList]?.length - 1 === playOrder
    ) {
      setTargetVideoId(musicList[curPlayList][0].videoId);
      setPlayOrder(0);
      setPlaying(true);
    }
  }, [targetVideoId]);

  const nextMusic = () => {
    setPlayed(0);
    setDuration(0);
    setTargetVideoId("");
    setPlaying(false);
  };
  const prevMusic = () => {
    setPlayed(0);
    setDuration(0);
    setTargetVideoId("");
    setPlaying(false);
    if (playOrder !== -10) {
      if (playOrder - 2 >= 0) {
        setPlayOrder((prev) => prev - 2);
      } else if (playOrder === 1) {
        setPlayOrder(musicList[curPlayList]?.length - 1);
      } else if (playOrder === 0) {
        setPlayOrder(musicList[curPlayList]?.length - 2);
      }
    }
  };
  const playingPlayPause = () => {
    if (targetVideoId) {
      setPlaying((prev) => !prev);
    }
  };

  const moveDiary = (diaryDate: number) => {
    if (selectedPlayList !== "popular") {
      history.replace(`/main?date=${diaryDate}`);
    }
  };

  return (
    <article css={articleTag}>
      <section css={sectionContainer}>
        <div css={controlMusicInfo}>
          {!targetVideoId ? (
            <>
              <div css={defaultMusic}>
                <div></div>
              </div>
              <p css={controlMusicTitle}>재생 목록이</p>
              <p css={controlMusicArtist}>비어있습니다.</p>
            </>
          ) : isPlayingDM ? (
            <>
              <img
                src={musicPlayValue.music.img}
                alt={musicPlayValue.music.title}
              />
              <p css={controlMusicTitle}>{musicPlayValue.music.title}</p>
              <p css={controlMusicArtist}>{musicPlayValue.music.artist}</p>
            </>
          ) : (
            <>
              <img
                src={musicList[curPlayList][playOrder].img}
                alt={musicList[curPlayList][playOrder].title}
              />
              <p css={controlMusicTitle}>
                {musicList[curPlayList][playOrder].title}
              </p>
              <p css={controlMusicArtist}>
                {musicList[curPlayList][playOrder].artist}
              </p>
            </>
          )}
        </div>
        <div css={playedController}>
          <ReactPlayer
            ref={player}
            width="0%"
            height="0%"
            url={`https://www.youtube.com/watch?v=${targetVideoId}`}
            playing={playing}
            onDuration={handleDuration}
            onProgress={handleProgress}
            onEnded={handleEnded}
          />
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />
          <div>
            <Duration seconds={duration * played} />
            <Duration seconds={duration} />
          </div>
        </div>
        <div css={playListController}>
          {isPlayingDM ? (
            <div css={emptyControlLeft}></div>
          ) : (
            <button css={controlLeft} onClick={prevMusic} />
          )}
          <button
            css={playing ? controlPause : controlRun}
            onClick={playingPlayPause}
          />
          <button css={controlRight} onClick={nextMusic} />
        </div>
      </section>
      <section css={sectionContainer}>
        <div css={headerContainer}>
          <button
            onClick={changePlayList}
            value="popular"
            css={[
              headerMenu,
              selectedPlayList === "popular" ? bottomBorder("#00c471") : null,
            ]}
          >
            인기
          </button>
          <button
            onClick={changePlayList}
            value="positive"
            css={[
              headerMenu,
              selectedPlayList === "positive" ? bottomBorder("#2196F3") : null,
            ]}
          >
            긍정
          </button>
          <button
            onClick={changePlayList}
            value="negative"
            css={[
              headerMenu,
              selectedPlayList === "negative" ? bottomBorder("#F44336") : null,
            ]}
          >
            부정
          </button>
          <button
            onClick={changePlayList}
            value="neutral"
            css={[
              headerMenu,
              selectedPlayList === "neutral" ? bottomBorder("#00c471") : null,
            ]}
          >
            중립
          </button>
        </div>
        {loading ? (
          <div css={loadingCenter}>
            <LoadingSpinner />
          </div>
        ) : (
          <ul css={musicContainer}>
            {musicList.hasOwnProperty(selectedPlayList) &&
            musicList[selectedPlayList].length ? (
              musicList[selectedPlayList].map(
                (music: IPopular | IEmotionMusic, i: number) => (
                  <li key={`${i}-${music.id}`} css={musicItem}>
                    <div
                      css={
                        selectedPlayList === "popular"
                          ? musicDetail(false)
                          : musicDetail(true)
                      }
                      onClick={() =>
                        moveDiary(
                          musicList[selectedPlayList][i].diaryDate
                            ? musicList[selectedPlayList][i].diaryDate
                            : null
                        )
                      }
                    >
                      <img src={music.img} alt={music.title} />
                      <div css={musicInfo}>
                        <p css={musicTitle}>{music.title}</p>
                        <p css={musicArtist}>{music.artist}</p>
                      </div>
                    </div>
                    {renderPlayPauseButton(selectedPlayList, i)}
                  </li>
                )
              )
            ) : (
              <p style={{ fontSize: "14px", color: "#808080" }}>
                재생목록이 없습니다.
              </p>
            )}
          </ul>
        )}
      </section>
    </article>
  );
};

export default Music;
