import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createDiary } from "api/diaryApi";
interface IWriteDiary {
  searchDate: { date?: string };
}

const WriteDiary = ({ searchDate }: IWriteDiary) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (!searchDate.date) {
      // modal로 띄워주기 or /main으로 push
      alert("날짜를 선택해주세요.");
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
      if (searchDate.date) {
        const { data } = await createDiary(searchDate.date, { title, content });
        console.log(data);
        if (data.result) {
          alert("일기 작성이 완료되었습니다.");
        } else {
          alert(data.data.diary);
        }
      }
    } catch (err) {
      alert("서비스를 이용하실 수 없습니다.");
    }
  };

  return (
    <div>
      <form onSubmit={submitDiary}>
        <p>
          {searchDate.date?.slice(0, 4)}년 {searchDate.date?.slice(4, 6)}월{" "}
          {searchDate.date?.slice(6)}일
        </p>
        <input placeholder="제목" onChange={changeTitle} />
        <div contentEditable="true" onInput={changeContent}></div>
        <button>기록하기</button>
      </form>
    </div>
  );
};

export default WriteDiary;
