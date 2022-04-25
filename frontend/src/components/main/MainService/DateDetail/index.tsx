import React from "react";
import { useHistory } from "react-router-dom";

interface IDateDetailProps {
  clickedDate: string;
}

const DateDetail = ({ clickedDate }: IDateDetailProps) => {
  let history = useHistory();
  const clickDiaryWrite = (e: any) => {
    history.push(`/main/diary/new?date=${clickedDate}`);
  };
  const clickDiaryRead = (e: any) => {};
  return (
    <div>
      <p>{clickedDate}</p>
      <button onClick={clickDiaryWrite}>일기 쓰기</button>
      <button onClick={clickDiaryRead}>일기 읽기</button>
    </div>
  );
};

export default DateDetail;
