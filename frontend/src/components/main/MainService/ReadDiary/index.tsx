import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "context/AuthProvider";
import { deleteDiaryApi, fetchDiaryApi } from "api/diaryApi";
import WarningModal from "components/modal/WarningModal";
interface IReadDiaryParams {
  queryParameter: { date?: string };
}

const ReadDiary = ({ queryParameter }: IReadDiaryParams) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDiary, setIsDiary] = useState(false);
  const [isClickedDelete, setIsClickedDelete] = useState(false);
  const { auth } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        if (queryParameter.date) {
          const { data } = await fetchDiaryApi(queryParameter.date);
          if (data.result && typeof data.data.diary !== "string") {
            setTitle(data.data.diary.title);
            setContent(data.data.diary.content);
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
          <div>
            <button onClick={openUpdateModal}>수정</button>
            <button onClick={openWarningModal}>삭제</button>
          </div>
          <p>{title}</p>
          <p style={{ whiteSpace: "pre-wrap" }}>{content}</p>
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
