import React from "react";

interface IWriteDiary {
  searchDate: { date?: string };
}

const WriteDiary = ({ searchDate }: IWriteDiary) => {
  console.log(searchDate);
  // searchDate.date가 존재하지 않으면 /main으로 보내버림
  return (
    <>
      <div>{searchDate.date}</div>
    </>
  );
};

export default WriteDiary;
