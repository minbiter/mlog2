import React from "react";
import { useHistory, Route } from "react-router-dom";
import ReadDiary from "../ReadDiary";

interface IDateDetailProps {
  clickedDate: string;
}

const DateDetail = ({ clickedDate }: IDateDetailProps) => {
  let history = useHistory();
  const clickDiaryWrite = (e: any) => {
    history.push(`/main/diary?compose=new&diaryid=${clickedDate}`);
  };
  const clickDiaryRead = (e: any) => {
    history.push(`/main/diary/${clickedDate}`);
  };
  return (
    <article>
      <p>{clickedDate}</p>
      <button onClick={clickDiaryWrite}>일기 쓰기</button>
      <button onClick={clickDiaryRead}>일기 읽기</button>
      <Route path="/main/diary/:date">
        <ReadDiary />
      </Route>
    </article>
  );
};

export default DateDetail;
