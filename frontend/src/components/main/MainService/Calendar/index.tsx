/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  monthList,
  yearListFcn,
  dayList,
  trKeyList,
  tdKeyList,
  toStringDateFcn,
} from "utils/calendar/variable";
import DateDetail from "../DateDetail";
import {
  articleTag,
  articleContainer,
  yearSelect,
  monthSelect,
  prevButton,
  nextButton,
  gridTag,
  rowGroupTag,
  rowTag,
  columnheaderTag,
  gridCellTag,
} from "./style";

interface ICalendarProps {
  queryParameter: { date?: string };
}

const Calendar = ({ queryParameter }: ICalendarProps) => {
  // selectedDate.
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [date, setDate] = useState(0);
  // calendarDate.
  const [calYear, setCalYear] = useState(0);
  const [calMonth, setCalMonth] = useState(0);
  // loading.
  const [loading, setLoading] = useState(true);
  // ...
  const history = useHistory();
  const today = new Date();
  const yearList = yearListFcn();
  useEffect(() => {
    if (
      queryParameter.date &&
      queryParameter.date.match(/\d{8}/) &&
      parseInt(queryParameter.date.slice(0, 4)) <= today.getFullYear() &&
      parseInt(queryParameter.date.slice(4, 6)) - 1 <= today.getMonth()
    ) {
      setYear(parseInt(queryParameter.date.slice(0, 4)));
      setMonth(parseInt(queryParameter.date.slice(4, 6)) - 1);
      setDate(parseInt(queryParameter.date.slice(6)));
      setCalYear(parseInt(queryParameter.date.slice(0, 4)));
      setCalMonth(parseInt(queryParameter.date.slice(4, 6)) - 1);
    } else {
      setYear(today.getFullYear());
      setMonth(today.getMonth());
      setDate(today.getDate());
      setCalYear(today.getFullYear());
      setCalMonth(today.getMonth());
    }
    setLoading(false);
  }, []);

  const changeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (
      e.target.value === today.getFullYear().toString() &&
      calMonth > today.getMonth()
    ) {
      setCalMonth(today.getMonth());
    }
    setCalYear(parseInt(e.target.value));
  };

  const changeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCalMonth(parseInt(e.target.value) - 1);
  };

  const prevMonth = () => {
    if (calMonth === 0) {
      setCalYear((prev) => prev - 1);
      setCalMonth(11);
    } else {
      setCalMonth((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    if (calMonth === 11) {
      setCalYear((prev) => prev + 1);
      setCalMonth(0);
    } else {
      setCalMonth((prev) => prev + 1);
    }
  };

  const clickDate = (e: any) => {
    setYear(calYear);
    setMonth(calMonth);
    setDate(e.target.innerText);
    history.replace(
      `/main?date=${toStringDateFcn(calYear, calMonth, e.target.innerText)}`
    );
  };

  const createTrTag = (trKey: string) => {
    return (
      <div role="row" css={rowTag} key={trKey}>
        {tdKeyList[parseInt(trKey)].map((tdKey) => createTdTag(tdKey))}
      </div>
    );
  };

  const firstDate = new Date(calYear, calMonth, 1);
  const lastDate = new Date(calYear, calMonth + 1, 0);
  let dateCount = 1;
  let dateCheck = false;
  const createTdTag = (tdKey: string) => {
    if (!dateCheck && tdKey === `0-${firstDate.getDay()}`) {
      dateCheck = true;
    }
    if (dateCheck && dateCount <= lastDate.getDate()) {
      return (
        <div role="gridcell" css={gridCellTag} key={tdKey} onClick={clickDate}>
          {dateCount++}
        </div>
      );
    } else {
      return <div role="gridcell" key={tdKey}></div>;
    }
  };

  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : (
        <>
          <article css={[articleTag, articleContainer]}>
            <div>
              <select value={calYear} onChange={changeYear} css={yearSelect}>
                {yearList.map((yearValue) => (
                  <option key={`option-${yearValue}년`} value={yearValue}>
                    {yearValue}년
                  </option>
                ))}
              </select>
              <select
                value={calMonth + 1}
                onChange={changeMonth}
                css={monthSelect}
              >
                {monthList.map((monthValue) =>
                  calYear !== 2022 ? (
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
            </div>
            <div>
              <button
                onClick={prevMonth}
                disabled={calYear === 2017 && calMonth === 0}
                css={prevButton}
              >
                <img
                  src="https://img.icons8.com/ios/15/000000/back--v1.png"
                  alt="prev-button img"
                />
              </button>
              <button
                onClick={nextMonth}
                disabled={
                  calYear === today.getFullYear() &&
                  calMonth === today.getMonth()
                }
                css={nextButton}
              >
                <img
                  src="https://img.icons8.com/ios/15/000000/forward--v1.png"
                  alt="next-button img"
                />
              </button>
            </div>
          </article>
          <article css={articleTag}>
            <div role="grid" css={gridTag}>
              <div role="rowgroup" css={rowGroupTag}>
                <div role="row" css={rowTag}>
                  {dayList.map((dayValue) => (
                    <div
                      role="columnheader"
                      css={columnheaderTag}
                      key={`th-${dayValue}`}
                    >
                      {dayValue}
                    </div>
                  ))}
                </div>
              </div>
              <div role="rowgroup" css={rowGroupTag}>
                {trKeyList.map((trKey) => createTrTag(trKey))}
              </div>
            </div>
          </article>
          <DateDetail clickedDate={toStringDateFcn(year, month, date)} />
        </>
      )}
    </>
  );
};

export default Calendar;
