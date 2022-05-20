/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { calendarRangeState, diaryState, getDiary } from "atoms/diary";
import { AuthContext } from "context/AuthProvider";
import { deleteDiaryApi } from "api/diaryApi";
import WarningModal from "components/modal/WarningModal";
import Recommend from "components/modal/Recommend";
import LoadingSpinner from "components/LoadingSpinner";
import DiaryAnalysis from "./DiaryAnalysis";
import {
  headerContainer,
  headerDateMusic,
  headerMusic,
  musicInfo,
  musicTitle,
  musicArtist,
  headerNoMusic,
  headerContainerTool,
  headerToolEdit,
  headerToolDelete,
  bodyContainer,
  bodyDiary,
  diaryTitle,
  diaryContent,
  bodyAnalysis,
  bodyNoDiary,
} from "./style";

interface IReadDiaryParams {
  queryParameter: { date?: string };
}

const ReadDiary = ({ queryParameter }: IReadDiaryParams) => {
  const diary = useRecoilValueLoadable(getDiary);
  const setDiary = useSetRecoilState(diaryState);
  const setCalendarDiary = useSetRecoilState(calendarRangeState);
  const [isClickedDelete, setIsClickedDelete] = useState(false);
  const [isOpenRecommend, setIsOpenRecommend] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { auth } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (queryParameter.date && auth.accessToken) {
      setDiary({ date: queryParameter.date });
    }
  }, [auth, queryParameter.date]);

  const openUpdateModal = () => {
    history.push(`/main?date=${queryParameter.date}&compose=update`);
  };

  const openWarningModal = () => {
    setIsClickedDelete((prev) => !prev);
  };

  const deleteDiary = async () => {
    try {
      if (queryParameter.date) {
        setSubmitLoading(true);
        const { data } = await deleteDiaryApi(queryParameter.date);
        setSubmitLoading(false);
        if (data.result) {
          setDiary({ date: queryParameter.date });
          setCalendarDiary({
            startDate: `${queryParameter.date.slice(0, 6)}01`,
            endDate: `${queryParameter.date.slice(0, 6)}32`,
          });
          openWarningModal();
          history.push(`/main?date=${queryParameter.date}`);
        } else {
          alert(data.data.diary);
          openWarningModal();
        }
      }
    } catch {
      alert("서비스를 이용하실 수 없습니다.");
    }
  };

  const openWriteModal = () => {
    history.push(`/main?date=${queryParameter.date}&compose=new`);
  };

  const openRecommend = () => {
    setIsOpenRecommend((prev) => !prev);
  };

  return (
    <article>
      {isOpenRecommend ? (
        <Recommend
          date={queryParameter.date as string}
          closeRecommend={openRecommend}
        />
      ) : null}
      {diary.state === "hasValue" && diary.contents ? (
        diary.contents.title ? (
          <>
            <section css={headerContainer}>
              <div css={headerDateMusic}>
                <p>
                  {queryParameter.date?.slice(0, 4)}년{" "}
                  {queryParameter.date?.slice(4, 6)}월{" "}
                  {queryParameter.date?.slice(6, 8)}일
                </p>
                {diary.contents.isMusic ? (
                  <div css={headerMusic}>
                    <img
                      src={diary.contents.music.img}
                      alt={diary.contents.music.title}
                    />
                    <div css={musicInfo}>
                      <p css={musicTitle}>{diary.contents.music.title}</p>
                      <p css={musicArtist}>{diary.contents.music.artist}</p>
                    </div>
                  </div>
                ) : (
                  <div css={headerNoMusic}>
                    <p>음악을 선택해주세요.</p>
                    <button onClick={openRecommend}>선택하기</button>
                  </div>
                )}
              </div>
              <div css={headerContainerTool}>
                <button css={headerToolEdit} onClick={openUpdateModal}></button>
                <button
                  css={headerToolDelete}
                  onClick={openWarningModal}
                ></button>
              </div>
            </section>
            <section css={bodyContainer}>
              <div css={bodyDiary}>
                <p css={diaryTitle}>
                  {diary.contents.title.length < 60
                    ? diary.contents.title
                    : `${diary.contents.title.slice(0, 60)}...`}
                </p>
                <div css={diaryContent}>
                  {diary.contents.content
                    ?.split("\n")
                    .map((row: string, i: number) => (
                      <div key={`content-${i}`}>{row}</div>
                    ))}
                </div>
              </div>
              <div css={bodyAnalysis}>
                <DiaryAnalysis
                  topEmotion={diary.contents.topEmotion}
                  emotionData={[
                    diary.contents.positive,
                    diary.contents.negative,
                    diary.contents.neutral,
                  ]}
                />
              </div>
            </section>
            {isClickedDelete ? (
              <WarningModal
                msg="정말 삭제하시겠습니까?"
                closeWarningModal={openWarningModal}
                callback={deleteDiary}
                closeMsg="취소하기"
                callbackMsg="삭제하기"
                submitLoading={submitLoading}
              />
            ) : null}
          </>
        ) : (
          <section css={bodyNoDiary}>
            <p>작성된 일기가 없습니다.</p>
            <button onClick={openWriteModal}>일기 작성</button>
          </section>
        )
      ) : (
        <LoadingSpinner />
      )}
    </article>
  );
};

export default ReadDiary;
