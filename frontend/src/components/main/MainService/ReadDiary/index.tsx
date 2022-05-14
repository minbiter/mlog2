/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { diaryState } from "atoms/diary";
import { AuthContext } from "context/AuthProvider";
import { deleteDiaryApi, fetchDiaryApi } from "api/diaryApi";
import WarningModal from "components/modal/WarningModal";
import {
  headerContainer,
  headerDateMusic,
  headerMusic,
  headerNoMusic,
  headerContainerTool,
  headerToolEdit,
  headerToolDelete,
  bodyContainer,
  bodyDiary,
  diaryTitle,
  diaryContent,
  bodyAnalysis,
} from "./style";

interface IReadDiaryParams {
  queryParameter: { date?: string };
}

const ReadDiary = ({ queryParameter }: IReadDiaryParams) => {
  const [{ title, content, isMusic, music }, setDairy] =
    useRecoilState(diaryState);
  const [isDiary, setIsDiary] = useState(false);
  const [isClickedDelete, setIsClickedDelete] = useState(false);
  const { auth } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    setIsDiary(true);
  }, [title, content]);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        if (queryParameter.date) {
          const { data } = await fetchDiaryApi(queryParameter.date);
          if (data.result && typeof data.data.diary !== "string") {
            console.log(data.data.diary);
            setDairy(data.data.diary);
            setIsDiary(true);
          } else {
            setIsDiary(false);
          }
        }
      } catch (err) {
        alert("서비스를 이용하실 수 없습니다.");
      }
    };
    if (auth) fetchDiary();
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
        const { data } = await deleteDiaryApi(queryParameter.date);
        if (data.result) {
          alert(data.data.diary);
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
  return (
    <>
      {isDiary ? (
        <article>
          <section css={headerContainer}>
            <div css={headerDateMusic}>
              <p>
                {queryParameter.date?.slice(0, 4)}년{" "}
                {queryParameter.date?.slice(4, 6)}월{" "}
                {queryParameter.date?.slice(6, 8)}일
              </p>
              {isMusic ? (
                <div css={headerMusic}>
                  {music.title}-{music.artist}
                </div>
              ) : (
                <div css={headerNoMusic}>
                  <p>음악을 선택해주세요.</p>
                  <button>선택하기</button>
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
              <p css={diaryTitle}>{title}</p>
              <div css={diaryContent}>
                {content?.split("\n").map((row: string, i: number) => (
                  <div key={`content-${i}`}>{row}</div>
                ))}
              </div>
            </div>
            <div css={bodyAnalysis}>
              <p>AI분석</p>
            </div>
          </section>
          {isClickedDelete ? (
            <WarningModal
              msg="정말 삭제하시겠습니까?"
              closeWarningModal={openWarningModal}
              callback={deleteDiary}
            />
          ) : null}
        </article>
      ) : (
        <article>
          <p>작성된 일기가 없습니다.</p>
          <button onClick={openWriteModal}>일기 작성</button>
        </article>
      )}
    </>
  );
};

export default ReadDiary;
