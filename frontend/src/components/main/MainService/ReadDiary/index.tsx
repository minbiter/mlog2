import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AuthContext } from "context/AuthProvider";
import { deleteDiaryApi, fetchDiaryApi } from "api/diaryApi";
import WarningModal from "components/modal/WarningModal";
interface IReadDiaryParams {
  date: string;
}

const ReadDiary = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDiary, setIsDiary] = useState(false);
  const [isClickedDelete, setIsClickedDelete] = useState(false);
  const { auth } = useContext(AuthContext);
  const history = useHistory();
  const { date } = useParams<IReadDiaryParams>();

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const { data } = await fetchDiaryApi(date);
        if (data.result && typeof data.data.diary !== "string") {
          setTitle(data.data.diary.title);
          setContent(data.data.diary.content);
          setIsDiary(true);
        } else {
          setIsDiary(false);
        }
      } catch (err) {
        alert("서비스를 이용하실 수 없습니다.");
      }
    };
    if (auth) fetchDiary();
  }, [auth]);

  const openUpdateModal = () => {
    history.push(`/main/diary/${date}?compose=update`);
  };

  const openWarningModal = () => {
    setIsClickedDelete((prev) => !prev);
  };

  const deleteDiary = async () => {
    try {
      const { data } = await deleteDiaryApi(date);
      if (data.result) {
        alert(data.data.diary);
        history.push(`/main?date=${date}`);
      } else {
        alert(data.data.diary);
        openWarningModal();
      }
    } catch {
      alert("서비스를 이용하실 수 없습니다.");
    }
  };
  return (
    <>
      {isDiary ? (
        <div>
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
        </div>
      ) : (
        <p>작성된 일기가 없습니다.</p>
      )}
    </>
  );
};

export default ReadDiary;
