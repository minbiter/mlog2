import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  monthList,
  yearListFuc,
  dayList,
  trKeyList,
  tdKeyList,
  toStringDateFuc,
} from "utils/calendar/variable";
import DateDetail from "../DateDetail";

interface ICalendarProps {
  searchDate: { date?: string };
}

const Calendar = ({ searchDate }: ICalendarProps) => {
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [date, setDate] = useState(0);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const today = new Date();
  const yearList = yearListFuc();
  useEffect(() => {
    if (
      searchDate.date &&
      searchDate.date.match(/\d{8}/) &&
      parseInt(searchDate.date.slice(0, 4)) <= today.getFullYear() &&
      parseInt(searchDate.date.slice(4, 6)) - 1 <= today.getMonth()
    ) {
      setYear(parseInt(searchDate.date.slice(0, 4)));
      setMonth(parseInt(searchDate.date.slice(4, 6)) - 1);
      setDate(parseInt(searchDate.date.slice(6)));
    } else {
      setYear(today.getFullYear());
      setMonth(today.getMonth());
      setDate(today.getDate());
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    history.replace(`/main?date=${toStringDateFuc(year, month, date)}`);
  }, [year, month, date]);

  const changeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (
      e.target.value === today.getFullYear().toString() &&
      month > today.getMonth()
    ) {
      setMonth(0);
    }
    setYear(parseInt(e.target.value));
    setDate(1);
  };

  const changeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(parseInt(e.target.value) - 1);
    setDate(1);
  };

  const prevMonth = () => {
    if (month === 0) {
      setYear((prev) => prev - 1);
      setMonth(11);
    } else {
      setMonth((prev) => prev - 1);
    }
    setDate(1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setYear((prev) => prev + 1);
      setMonth(0);
    } else {
      setMonth((prev) => prev + 1);
    }
    setDate(1);
  };

  const clickDate = (e: any) => {
    setDate(e.target.innerText);
  };

  const createTrTag = (trKey: string) => {
    return (
      <tr key={trKey}>
        {tdKeyList[parseInt(trKey)].map((tdKey) => createTdTag(tdKey))}
      </tr>
    );
  };

  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);
  let dateCount = 1;
  let dateCheck = false;

  const createTdTag = (tdKey: string) => {
    if (!dateCheck && tdKey === `1-${firstDate.getDay()}`) {
      dateCheck = true;
    }
    if (dateCheck && dateCount <= lastDate.getDate()) {
      return (
        <td key={tdKey} onClick={clickDate}>
          {dateCount++}
        </td>
      );
    } else {
      return <td key={tdKey}></td>;
    }
  };

  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : (
        <div>
          <div>
            <button onClick={prevMonth} disabled={year === 2017 && month === 0}>
              좌
            </button>
            <select value={year} onChange={changeYear}>
              {yearList.map((yearValue) => (
                <option key={`option-${yearValue}년`} value={yearValue}>
                  {yearValue}년
                </option>
              ))}
            </select>
            <select value={month + 1} onChange={changeMonth}>
              {monthList.map((monthValue) =>
                year !== 2022 ? (
                  <option key={`option-${monthValue}월`} value={monthValue}>
                    {monthValue}월
                  </option>
                ) : monthValue <= today.getMonth() + 1 ? (
                  <option key={`option-${monthValue}월`} value={monthValue}>
                    {monthValue}월
                  </option>
                ) : null
              )}
            </select>
            <button
              onClick={nextMonth}
              disabled={
                year === today.getFullYear() && month === today.getMonth()
              }
            >
              우
            </button>
          </div>
          <table>
            <thead>
              <tr>
                {dayList.map((dayValue) => (
                  <th key={`th-${dayValue}`}>{dayValue}</th>
                ))}
              </tr>
            </thead>
            <tbody>{trKeyList.map((trKey) => createTrTag(trKey))}</tbody>
          </table>
          <DateDetail clickedDate={toStringDateFuc(year, month, date)} />
        </div>
      )}
    </>
  );
};

export default Calendar;
