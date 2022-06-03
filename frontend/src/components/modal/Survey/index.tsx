/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef, useContext } from "react";
import ReactPlayer from "react-player/youtube";
import Duration from "utils/music/Duration";
import { AuthContext } from "context/AuthProvider";
import { fetchSurveyMusicApi, postSurveyApi } from "api/musicApi";
import {
  modal,
  dimmed,
  container,
  formModal,
  hearderMsgContainer,
  msgHighlight,
  musicContainer,
  musicItem,
  selectedImg,
  runBtn,
  pauseBtn,
  musicController,
  playedControl,
} from "./style";

interface ISurveyMusic {
  title: string;
  artist: string;
  img: string;
  videoId: string;
  genreId: number;
  name: string;
}

const headerMsgList = ["평소에", "신날 때", "우울할 때"];
const Survey = () => {
  const [surveyNum, setSurveyNum] = useState(0);
  const [surveyMusic, setSurveyMusic] = useState([] as ISurveyMusic[]);
  const [surveyResult, setSurveyResult] = useState<Array<Array<number>>>([
    [],
    [],
    [],
  ]);
  const [listenVideoId, setListenVideoId] = useState("");
  const ulEl = useRef<HTMLUListElement>(null);
  const { auth, setAuth } = useContext(AuthContext);

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
    let loading = true;
    const fetch = async () => {
      const { data } = await fetchSurveyMusicApi();
      if (data.result && loading) {
        setSurveyMusic(data.data.surveyMusic);
      }
    };
    fetch();
    return () => {
      loading = false;
    };
  }, []);

  const nextSurvey = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (surveyResult[surveyNum].length >= 3) {
      setListenVideoId("");
      if (surveyNum === 2) {
        try {
          const { data } = await postSurveyApi({
            neutral: surveyResult[0],
            positive: surveyResult[1],
            negative: surveyResult[2],
          });
          if (data.result) {
            alert(data.data.survey);
            setAuth({
              ...auth,
              isSurvey: 1,
            });
          } else {
            alert(data.data.survey);
          }
        } catch (err) {
          alert("서비스를 이용하실 수 없습니다.");
        }
      } else {
        setSurveyNum((prev) => prev + 1);
        if (ulEl.current) {
          ulEl.current.scrollTop = 0;
        }
      }
    } else {
      alert("최소 3가지 음악을 선택해주세요.");
    }
  };

  const selectMusic = (
    genreId: number,
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    if (surveyNum === 0) {
      if (surveyResult[surveyNum].includes(genreId)) {
        const genreIdIndex = surveyResult[0].indexOf(genreId);
        setSurveyResult((prev) => [
          [
            ...prev[0].slice(0, genreIdIndex),
            ...prev[0].slice(genreIdIndex + 1),
          ],
          [...prev[1]],
          [...prev[2]],
        ]);
      } else {
        setSurveyResult((prev) => [
          [...prev[0], genreId],
          [...prev[1]],
          [...prev[2]],
        ]);
      }
    } else if (surveyNum === 1) {
      if (surveyResult[surveyNum].includes(genreId)) {
        const genreIdIndex = surveyResult[1].indexOf(genreId);
        setSurveyResult((prev) => [
          [...prev[0]],
          [
            ...prev[1].slice(0, genreIdIndex),
            ...prev[1].slice(genreIdIndex + 1),
          ],
          [...prev[2]],
        ]);
      } else {
        setSurveyResult((prev) => [
          [...prev[0]],
          [...prev[1], genreId],
          [...prev[2]],
        ]);
      }
    } else {
      if (surveyResult[surveyNum].includes(genreId)) {
        const genreIdIndex = surveyResult[2].indexOf(genreId);
        setSurveyResult((prev) => [
          [...prev[0]],
          [...prev[1]],
          [
            ...prev[2].slice(0, genreIdIndex),
            ...prev[2].slice(genreIdIndex + 1),
          ],
        ]);
      } else {
        setSurveyResult((prev) => [
          [...prev[0]],
          [...prev[1]],
          [...prev[2], genreId],
        ]);
      }
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
    if (targetVideoId === videoId && playing) {
      setPlaying(false);
    } else if (targetVideoId === videoId && !playing) {
      setPlaying(true);
    } else {
      setPlayed(0);
      setTargetVideoId(videoId);
      setPlaying(true);
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

  const handleSeekTouchDown = (e: React.TouchEvent<HTMLInputElement>) => {
    setSeeking(true);
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
    setTargetVideoId("");
    setPlaying(false);
  };

  return (
    <div css={modal}>
      <div css={dimmed}></div>
      <div css={container}>
        <form css={formModal} onSubmit={nextSurvey}>
          <div css={hearderMsgContainer}>
            <span css={msgHighlight}>{headerMsgList[surveyNum]}</span>
            <p>어떤 분위기의 음악을</p>
            <p>들으시나요 (최소 3가지)</p>
          </div>
          <ul css={musicContainer} ref={ulEl}>
            {surveyMusic.map((music) => (
              <li key={music.name} css={musicItem}>
                <input
                  type="checkbox"
                  id={music.name}
                  onClick={(e) => {
                    selectMusic(music.genreId, e);
                  }}
                />
                <label htmlFor={music.name}>
                  <img src={music.img} alt={music.title} />
                  {surveyResult[surveyNum].includes(music.genreId) ? (
                    <div css={selectedImg}></div>
                  ) : null}
                </label>
                {renderPlayPauseButton(music.videoId)}
                <span>{music.name}</span>
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
              onTouchStart={handleSeekTouchDown}
              onTouchEnd={handleSeekTouchUp}
              css={playedControl}
            />
            <Duration seconds={duration} />
          </div>
          <button>
            {surveyNum === 2 ? <>제출하기</> : <>{surveyNum + 1}/3</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Survey;
