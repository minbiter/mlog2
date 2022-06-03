/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { diaryMusicDate, updateMusicList, musicPlayerOff } from "atoms/music";
import ReactPlayer from "react-player";
import { fetchAllPlayList, fetchNamePlayList } from "api/musicApi";
import Duration from "utils/music/Duration";
import { IPopular, IEmotionMusic } from "types/music";
import { AuthContext } from "context/AuthProvider";
import {
  articleTag,
  sectionContainerHeader,
  sectionContainerBody,
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
  controlLeft,
  controlPause,
  controlRun,
  controlRight,
  controlMusicList,
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
  const diaryMusicDateValue = useRecoilValue(diaryMusicDate);
  const [loadingDMDV, setLoadingDMDV] = useState(false);
  // MusicList update해야함
  const updateMusicListValue = useRecoilValue(updateMusicList);
  // Recommend music이 실행되면 음악을 off
  const musicPlayerOffValue = useRecoilValue(musicPlayerOff);
  const [loading, setLoading] = useState(true);
  // 인기, 긍정, 부정, 중립의 모든 musicList
  const [musicList, setMusicList] = useState<IMusicList>({} as IMusicList);
  // 선택된 카테고리
  const [selectedPlayList, setSelectedPlayList] = useState("popular");
  // playing PlayListName
  const [playingPlayList, setPlayingPlayList] = useState("");
  // playing Music
  const [playingMusic, setPlayingMusic] = useState<IEmotionMusic>(
    {} as IEmotionMusic
  );
  // playing Music Order
  const [playOrder, setPlayOrder] = useState(-1);
  const ulRef = useRef<HTMLUListElement>(null);
  // ReactPlayer
  const player = useRef<ReactPlayer>(null);
  // targetted Music
  const [targetVideoId, setTargetVideoId] = useState({ target: "" });
  // Music Play or Pause
  const [playing, setPlaying] = useState(false);
  // Music Max Time
  const [duration, setDuration] = useState<number>(0);
  // Music Current Time(duration * played)
  const [played, setPlayed] = useState<number>(0);
  // Music isSeeking
  const [seeking, setSeeking] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 575 ? true : false
  );
  const [isOpenMusic, setIsOpenMusic] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (musicPlayerOffValue.off) {
      setPlaying(false);
    }
  }, [musicPlayerOffValue]);

  useEffect(() => {
    const fetch = async (topEmotion: string) => {
      const { data } = await fetchNamePlayList({ name: topEmotion });
      if (data.result) {
        if (
          topEmotion === playingPlayList &&
          updateMusicListValue.musicCreate
        ) {
          data.data[topEmotion].forEach(
            (music: IEmotionMusic, index: number) => {
              if (music.diaryDate === playingMusic.diaryDate) {
                setPlayOrder(index);
                return false;
              }
              return true;
            }
          );
        } else if (
          topEmotion === playingPlayList &&
          updateMusicListValue.musicDelete &&
          data.data[topEmotion].length !== 0
        ) {
          let checkMusic = false;
          data.data[topEmotion].forEach(
            (music: IEmotionMusic, index: number) => {
              if (music.diaryDate === playingMusic.diaryDate) {
                setPlayOrder(index);
                checkMusic = true;
                return false;
              }
              return true;
            }
          );
          if (!checkMusic) {
            if (playOrder > musicList[topEmotion].length - 1) {
              setPlayOrder(data.data[topEmotion].length - 1);
            } else if (playOrder === 0) {
              setPlayOrder(data.data[topEmotion].length - 1);
            } else {
              setPlayOrder((prev) => prev - 1);
            }
          }
        } else {
          setPlayOrder(-1);
        }
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
    if (diaryMusicDateValue.topEmotion) {
      setPlayed(0);
      setDuration(0);
      setPlaying(false);
      musicList[diaryMusicDateValue.topEmotion].forEach(
        (music: IEmotionMusic, index: number) => {
          if (music.diaryDate === diaryMusicDateValue.diaryDate) {
            setPlayingPlayList(diaryMusicDateValue.topEmotion);
            setPlayOrder(index);
            setLoadingDMDV(true);
            setTargetVideoId({ target: "" });
            if (selectedPlayList !== diaryMusicDateValue.topEmotion) {
              setSelectedPlayList(diaryMusicDateValue.topEmotion);
            }
            return false;
          }
          return true;
        }
      );
    }
  }, [diaryMusicDateValue]);

  useEffect(() => {
    if (loadingDMDV) {
      ulRef?.current?.children[playOrder].scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [loadingDMDV]);

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

  useEffect(() => {
    if (loadingDMDV) {
      setPlayingMusic(musicList[playingPlayList][playOrder]);
      setTargetVideoId({
        target: musicList[diaryMusicDateValue.topEmotion][playOrder].videoId,
      });
      setLoadingDMDV(false);
      setPlaying(true);
    } else if (
      !targetVideoId.target &&
      musicList[playingPlayList]?.length - 1 >= playOrder + 1
    ) {
      // 다음 음악 실행
      setTargetVideoId((prev) => {
        prev.target = musicList[playingPlayList][playOrder + 1].videoId;
        return { ...prev };
      });
      setPlayingMusic(musicList[playingPlayList][playOrder + 1]);
      setPlayOrder((prev) => prev + 1);
      setPlaying(true);
    } else if (
      !targetVideoId.target &&
      playOrder !== -1 &&
      musicList[playingPlayList]?.length - 1 === playOrder
    ) {
      setTargetVideoId((prev) => {
        prev.target = musicList[playingPlayList][0].videoId;
        return { ...prev };
      });
      setPlayingMusic(musicList[playingPlayList][0]);
      setPlayOrder(0);
      setPlaying(true);
    } else if (!targetVideoId.target && playOrder === -1 && playingPlayList) {
      setPlayingPlayList("");
      setPlayingMusic({} as IEmotionMusic);
    }
  }, [targetVideoId]);

  const changePlayList = (e: any) => {
    setSelectedPlayList(e.target.value);
  };

  const renderPlayPauseButton = (playListName: string, index: number) => {
    return (
      <button
        onClick={() => handlePlayPause(playListName, index)}
        css={
          playing &&
          musicList[playListName][index].videoId === targetVideoId.target
            ? pauseBtn
            : runBtn
        }
      />
    );
  };

  const handlePlayPause = (playListName: string, index: number) => {
    if (
      targetVideoId.target === musicList[playListName][index].videoId &&
      playing
    ) {
      setPlaying(false);
    } else if (
      targetVideoId.target === musicList[playListName][index].videoId &&
      !playing
    ) {
      setPlaying(true);
    } else {
      setPlayed(0);
      setTargetVideoId((prev) => {
        prev.target = musicList[playListName][index].videoId;
        return { ...prev };
      });
      setPlayingMusic(musicList[playListName][index]);
      setPlaying(true);
      setPlayingPlayList(playListName);
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
  const handleSeekTouchDown = (e: React.TouchEvent<HTMLInputElement>) => {
    setSeeking(true);
  };

  // ReactPlayer에 적용.
  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    player?.current?.seekTo(parseFloat(e.currentTarget.value));
  };
  const handleSeekTouchUp = (e: React.TouchEvent<HTMLInputElement>) => {
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
    setTargetVideoId({ target: "" });
    setPlaying(false);
  };

  const nextMusic = () => {
    setPlayed(0);
    setDuration(0);
    setTargetVideoId({ target: "" });
    setPlaying(false);
  };

  const prevMusic = () => {
    setPlayed(0);
    setDuration(0);
    setTargetVideoId({ target: "" });
    setPlaying(false);
    if (playOrder !== -1) {
      if (playOrder === 1) {
        setPlayOrder(musicList[playingPlayList]?.length - 1);
      } else if (playOrder === 0) {
        setPlayOrder(musicList[playingPlayList]?.length - 2);
      } else {
        setPlayOrder((prev) => prev - 2);
      }
    }
  };

  const playingPlayPause = () => {
    if (targetVideoId.target) {
      setPlaying((prev) => !prev);
    }
  };

  const moveDiary = (diaryDate: number) => {
    if (selectedPlayList !== "popular") {
      if (isMobile && isOpenMusic) {
        setIsOpenMusic(false);
      }
      history.replace(`/main?date=${diaryDate}`);
    }
  };

  const handleResize = () => {
    if (window.innerWidth <= 575) {
      setIsMobile(true);
      setIsOpenMusic(false);
    } else {
      setIsMobile(false);
      setIsOpenMusic(false);
    }
  };

  const openMusic = () => {
    setIsOpenMusic((prev) => !prev);
  };

  return (
    <article css={articleTag}>
      <section css={sectionContainerHeader}>
        <div css={controlMusicInfo}>
          {!targetVideoId.target ? (
            <>
              <div css={defaultMusic}>
                <div></div>
              </div>
              <div>
                <p css={controlMusicTitle}>재생 목록이</p>
                <p css={controlMusicArtist}>비어있습니다.</p>
              </div>
            </>
          ) : (
            <>
              <img src={playingMusic.img} alt={playingMusic.title} />
              {isMobile ? (
                <div>
                  <p css={controlMusicTitle}>
                    {playingMusic.title.length > 30
                      ? `${playingMusic.title.slice(0, 30)}...`
                      : playingMusic.title}
                  </p>
                  <p css={controlMusicArtist}>{playingMusic.artist}</p>
                </div>
              ) : (
                <>
                  <p css={controlMusicTitle}>{playingMusic.title}</p>
                  <p css={controlMusicArtist}>{playingMusic.artist}</p>
                </>
              )}
            </>
          )}
        </div>
        <div css={playedController(isOpenMusic)}>
          <ReactPlayer
            ref={player}
            width="0%"
            height="0%"
            url={`https://www.youtube.com/watch?v=${targetVideoId.target}`}
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
            onTouchStart={handleSeekTouchDown}
            onTouchEnd={handleSeekTouchUp}
          />
          {isMobile ? (
            isOpenMusic ? (
              <>
                <div>
                  <Duration seconds={duration * played} />
                  <Duration seconds={duration} />
                </div>
              </>
            ) : null
          ) : (
            <>
              <div>
                <Duration seconds={duration * played} />
                <Duration seconds={duration} />
              </div>
            </>
          )}
        </div>
        <div css={playListController}>
          <button css={controlLeft} onClick={prevMusic} />
          <button
            css={playing ? controlPause : controlRun}
            onClick={playingPlayPause}
          />
          <button css={controlRight} onClick={nextMusic} />
          {isMobile ? (
            <button
              css={controlMusicList(isOpenMusic)}
              onClick={openMusic}
            ></button>
          ) : null}
        </div>
      </section>
      <section css={sectionContainerBody(isOpenMusic)}>
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
          <ul css={musicContainer} ref={ulRef}>
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
