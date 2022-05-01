import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateDiaryApi } from "api/diaryApi";

interface IUpdateDiaryParams {
  date: string;
}

const UpdateDiary = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { date } = useParams<IUpdateDiaryParams>();
  const history = useHistory();

  useEffect(() => {
    if (!date) {
      history.push("/main");
    }
  }, []);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const changeContent = (e: React.ChangeEvent<HTMLDivElement>) => {
    setContent(e.target.innerText);
  };

  const submitDiary = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await updateDiaryApi(date, {
        title,
        content,
      });
      if (data.result) {
        alert(data.data.diary);
        history.push(`/main/diary/${date}`);
      } else {
        alert(data.data.diary);
      }
    } catch (err) {
      alert("서비스를 이용하실 수 없습니다.");
    }
  };

  return (
    <div>
      <form onSubmit={submitDiary}>
        <p>
          {date.slice(0, 4)}년 {date.slice(4, 6)}월 {date.slice(6)}일
        </p>
        <input placeholder="제목" onChange={changeTitle} />
        <div contentEditable="true" onInput={changeContent}></div>
        <button>수정하기</button>
      </form>
    </div>
  );
};

export default UpdateDiary;
