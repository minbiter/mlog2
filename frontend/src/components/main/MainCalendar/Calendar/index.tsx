/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Chart from "react-apexcharts";
import {
  monthList,
  yearListFcn,
  dayList,
  trKeyList,
  tdKeyList,
  toStringDateFcn,
} from "utils/calendar/variable";
import { useSetRecoilState, useRecoilValueLoadable } from "recoil";
import { calendarRangeState, getCalendar } from "atoms/diary";
import LoadingSpinner from "components/LoadingSpinner";
import {
  articleTag,
  articleContainer,
  yearSelect,
  monthSelect,
  monthContainer,
  prevButton,
  nextButton,
  gridTag,
  rowGroupTag,
  rowTag,
  columnheaderTag,
  gridCellTag,
  emotionSpan,
  selectedGridCellTag,
  calendarAnalysis,
  analysisTitle,
  noAnalysis,
} from "./style";
import { AuthContext } from "context/AuthProvider";

const options: any = {
  legend: {
    position: "bottom",
  },
  labels: ["긍정", "부정", "중립"],
  colors: ["#2196F3", "#F44336", "#00C471"],
};

interface ICalendarProps {
  queryParameter: { date?: string };
}

const Calendar = ({ queryParameter }: ICalendarProps) => {
  // selectedDate.
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [date, setDate] = useState(0);
  // calendarDate.
  const [calYear, setCalYear] = useState(-1);
  const [calMonth, setCalMonth] = useState(-1);
  const calendarDiary = useRecoilValueLoadable(getCalendar);
  const setCalendarRange = useSetRecoilState(calendarRangeState);
  // ...
  const today = new Date();
  const history = useHistory();
  const yearList = yearListFcn();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (
      queryParameter.date &&
      queryParameter.date.match(/\d{8}/) &&
      parseInt(queryParameter.date) <=
        parseInt(
          toStringDateFcn(today.getFullYear(), today.getMonth() + 1, 0)
        ) &&
      parseInt(queryParameter.date) >= 20170101
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
  }, [queryParameter]);

  useEffect(() => {
    if (calYear !== -1 && calMonth !== -1 && auth.accessToken) {
      setCalendarRange({
        startDate: toStringDateFcn(calYear, calMonth, 1),
        endDate: toStringDateFcn(calYear, calMonth, 32),
      });
    }
  }, [auth, calYear, calMonth]);

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
    setDate(parseInt(e.target.innerText));
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
        <div
          role="gridcell"
          css={[
            calYear === today.getFullYear() &&
            calMonth === today.getMonth() &&
            dateCount === today.getDate()
              ? gridCellTag("today")
              : gridCellTag(""),
            year === calYear && month === calMonth && date === dateCount
              ? selectedGridCellTag
              : null,
          ]}
          key={tdKey}
          onClick={clickDate}
        >
          <span
            css={
              calendarDiary.contents?.hasOwnProperty(
                toStringDateFcn(calYear, calMonth, dateCount)
              )
                ? emotionSpan(
                    calendarDiary.contents[
                      toStringDateFcn(calYear, calMonth, dateCount)
                    ].topEmotion
                  )
                : null
            }
          ></span>
          {dateCount++}
        </div>
      );
    } else {
      return <div role="gridcell" key={tdKey}></div>;
    }
  };

  return (
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
          <select value={calMonth + 1} onChange={changeMonth} css={monthSelect}>
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
        <div css={monthContainer}>
          <button
            onClick={prevMonth}
            disabled={calYear === 2017 && calMonth === 0}
            css={
              calYear === 2017 && calMonth === 0
                ? prevButton(-62, -632)
                : prevButton(-122, -632)
            }
          ></button>
          <button
            onClick={nextMonth}
            disabled={
              calYear === today.getFullYear() && calMonth === today.getMonth()
            }
            css={
              calYear === today.getFullYear() && calMonth === today.getMonth()
                ? nextButton(-152, -632)
                : nextButton(-212, -632)
            }
          ></button>
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
        {calendarDiary.state === "loading" ||
        (calendarDiary.state === "hasValue" && !calendarDiary.contents) ? (
          <LoadingSpinner />
        ) : null}
      </article>
      <article css={articleTag}>
        <div css={calendarAnalysis}>
          <p css={analysisTitle}>이 달의 감정비율</p>
          {calendarDiary.state === "loading" ||
          (calendarDiary.state === "hasValue" &&
            !calendarDiary.contents) ? null : calendarDiary.contents?.hasOwnProperty(
              "positiveCnt"
            ) ? (
            <Chart
              options={options}
              series={[
                calendarDiary.contents.positiveCnt,
                calendarDiary.contents.negativeCnt,
                calendarDiary.contents.neutralCnt,
              ]}
              type="donut"
              width="250"
            />
          ) : (
            <p css={noAnalysis}>작성된 일기가 없습니다.</p>
          )}
        </div>
      </article>
    </>
  );
};

export default Calendar;
