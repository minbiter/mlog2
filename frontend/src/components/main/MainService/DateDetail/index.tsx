/** @jsxImportSource @emotion/react */
import React from "react";
import { useHistory, Route } from "react-router-dom";
import ReadDiary from "../ReadDiary";
import { articleTag } from "./style";

interface IDateDetailProps {
  clickedDate: string;
}

const DateDetail = ({ clickedDate }: IDateDetailProps) => {
  let history = useHistory();
  const clickDiaryWrite = (e: any) => {
    history.push(`/main/diary?compose=new&date=${clickedDate}`);
  };
  const clickDiaryRead = (e: any) => {
    history.push(`/main/diary/${clickedDate}`);
  };
  return (
    <>
      <article css={articleTag}>
        <p>아직 이날의 일기를 쓰지 않았어요.</p>
        <button onClick={clickDiaryWrite}>일기 작성</button>
        <Route path="/main/diary/:date">
          <ReadDiary />
        </Route>
      </article>
      <article css={articleTag}>
        <p>이 날은</p>
        <button onClick={clickDiaryRead}>일기 보기</button>
        <Route path="/main/diary/:date">
          <ReadDiary />
        </Route>
      </article>
    </>
  );
};

export default DateDetail;
