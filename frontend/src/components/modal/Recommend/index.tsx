/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import ReactPlayer from "react-player/youtube";
import Duration from "utils/music/Duration";
import { diaryState, calendarRangeState } from "atoms/diary";
import { updateMusicList, musicPlayerOff } from "atoms/music";
import { fetchRcdMusic, postDiaryMusic } from "api/diaryApi";
import {
  modal,
  dimmed,
  container,
  formModal,
  headerMsgContainer,
  musicContainer,
  musicItem,
  musicInfo,
  selectedMusic,
  musicTitle,
  musicArtist,
  runBtn,
  pauseBtn,
  musicController,
  playedControl,
} from "./style";
import LoadingSpinner from "components/LoadingSpinner";

interface IRecommendParams {
  date: string;
  closeRecommend?(): void;
}

interface IMusic {
  id: number;
  title: string;
  artist: string;
  genreId: number;
  img: string;
  videoId: string;
}

const Recommend = ({ date, closeRecommend }: IRecommendParams) => {
  const [recommendMusic, setRecommendMusic] = useState([] as Array<IMusic>);
  const [addRecommendMusic, setAddRecommendMusic] = useState(
    [] as Array<IMusic>
  );
  const [submitResult, setSubmitResult] = useState(
    {} as { genreId: number; musicId: number }
  );
  const [loading, setLoading] = useState(true);
  const [isMusicPlayerOff, setIsMusicPlayerOff] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const setCalendarRange = useSetRecoilState(calendarRangeState);
  const setUpdateMusicList = useSetRecoilState(updateMusicList);
  const setMusicPlayerOff = useSetRecoilState(musicPlayerOff);
  const setDiaryDate = useSetRecoilState(diaryState);
  const history = useHistory();
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
    if (isMusicPlayerOff) {
      setMusicPlayerOff({ off: true });
    } else {
      setMusicPlayerOff({ off: false });
    }
  }, [isMusicPlayerOff]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await fetchRcdMusic(date);
        setLoading(false);
        if (data.result) {
          setRecommendMusic(data.data.diaryMusic.recommend);
          setAddRecommendMusic(data.data.diaryMusic.addRecommend);
        } else {
          throw Error();
        }
      } catch (err) {
        alert("서비스를 이용하실 수 없습니다.");
      }
    };
    fetch();
  }, []);

  const musicSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitResult.genreId && submitResult.musicId) {
      try {
        setSubmitLoading(true);
        const { data } = await postDiaryMusic(date, submitResult);
        setSubmitLoading(false);
        if (data.result) {
          setCalendarRange({
            startDate: `${date.slice(0, 6)}01`,
            endDate: `${date.slice(0, 6)}32`,
          });
          setDiaryDate({ date: date });
          setUpdateMusicList({
            topEmotion: data.data.topEmotion,
            musicCreate: true,
            musicDelete: false,
          });
          if (closeRecommend) {
            closeRecommend();
          } else {
            history.push(`/main?date=${date}`);
          }
        } else {
          throw Error();
        }
      } catch (err) {
        alert("서비스를 이용하실 수 없습니다.");
      }
    } else {
      alert("음악을 선택하지 않았습니다.");
    }
  };

  const selectMusic = (
    musicId: number,
    genreId: number,
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    if (submitResult.genreId === genreId && submitResult.musicId === musicId) {
      setSubmitResult({ genreId: 0, musicId: 0 });
    } else {
      setSubmitResult({ genreId, musicId });
    }
  };

  const closeModal = () => {
    if (closeRecommend) {
      closeRecommend();
    } else {
      history.push(`/main?date=${date}`);
    }
  };

  const renderPlayPauseButton = (videoId: string) => {
    return (
      <div
        onClick={() => handlePlayPause(videoId)}
        css={playing && videoId === targetVideoId ? pauseBtn : runBtn}
      ></div>
    );
  };

  const handlePlayPause = (videoId: string) => {
    console.log(`${videoId}`);
    if (targetVideoId === videoId && playing) {
      // console.log("똑같은 음악 일시중지");
      setPlaying(false);
    } else if (targetVideoId === videoId && !playing) {
      // console.log("똑같은 음악 지금시점부터 다시 재생");
      setPlaying(true);
    } else {
      // console.log("다른 음악 재생");
      setPlayed(0);
      setTargetVideoId(videoId);
      setPlaying(true);
      if (!isMusicPlayerOff) setIsMusicPlayerOff(true);
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

  return (
    <div css={modal}>
      <div css={dimmed}></div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div css={container}>
          <form css={formModal} onSubmit={musicSubmit}>
            <svg
              width="16px"
              height="12px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12 12"
              onClick={closeModal}
            >
              <path
                fill="#3E4042"
                fillRule="evenodd"
                d="M.203.203c.27-.27.708-.27.979 0L6 5.02 10.818.203c.27-.27.709-.27.98 0 .27.27.27.708 0 .979L6.978 6l4.818 4.818c.27.27.27.709 0 .98-.27.27-.709.27-.979 0L6 6.978l-4.818 4.818c-.27.27-.709.27-.98 0-.27-.27-.27-.709 0-.979L5.022 6 .203 1.182c-.27-.27-.27-.709 0-.98z"
                clipRule="evenodd"
              ></path>
            </svg>
            <div css={headerMsgContainer}>
              <p>이 음악은 어때요?</p>
            </div>
            <ul css={musicContainer}>
              {recommendMusic.map((music) => (
                <li key={music.title} css={musicItem}>
                  <input
                    type="checkbox"
                    id={`${music.genreId}`}
                    onClick={(e) => {
                      selectMusic(music.id, music.genreId, e);
                    }}
                  />
                  <label htmlFor={`${music.genreId}`}>
                    <img src={music.img} alt={music.title} />
                    {submitResult.musicId === music.id ? (
                      <div css={selectedMusic}></div>
                    ) : null}
                    <div css={musicInfo}>
                      <p css={musicTitle}>{music.title}</p>
                      <p css={musicArtist}>{music.artist}</p>
                    </div>
                  </label>
                  {renderPlayPauseButton(music.videoId)}
                </li>
              ))}
            </ul>
            <div css={headerMsgContainer}>
              <p>다른 분위기</p>
              <p>음악은 어때요?</p>
            </div>
            <ul css={musicContainer}>
              {addRecommendMusic.map((music) => (
                <li key={music.title} css={musicItem}>
                  <input
                    type="checkbox"
                    id={`${music.genreId}`}
                    onClick={(e) => {
                      selectMusic(music.id, music.genreId, e);
                    }}
                  />
                  <label htmlFor={`${music.genreId}`}>
                    <img src={music.img} alt={music.title} />
                    {submitResult.musicId === music.id ? (
                      <div css={selectedMusic}></div>
                    ) : null}
                    <div css={musicInfo}>
                      <p css={musicTitle}>{music.title}</p>
                      <p css={musicArtist}>{music.artist}</p>
                    </div>
                  </label>
                  {renderPlayPauseButton(music.videoId)}
                </li>
              ))}
            </ul>
            <div css={musicController}>
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
              <Duration seconds={duration * played} />

              <input
                type="range"
                min={0}
                max={0.999999}
                step="any"
                value={played}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
                css={playedControl}
              />
              <Duration seconds={duration} />
            </div>
            <button>선택 완료</button>
          </form>
          {submitLoading ? <LoadingSpinner /> : null}
        </div>
      )}
    </div>
  );
};

export default Recommend;
