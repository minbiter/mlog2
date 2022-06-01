import React from "react";
import { Route, useLocation } from "react-router-dom";
import ReadDiary from "./ReadDiary";
import WriteDiary from "../../modal/WriteDiary";
import UpdateDiary from "components/modal/UpdateDiary";
import Music from "components/main/MainService/Music";
import QueryString from "qs";
import { toStringDateFcn } from "utils/calendar/variable";

interface IQueryParameter {
  date?: string;
  compose?: string;
}

const MainService = () => {
  const location = useLocation();
  const queryParameter: IQueryParameter = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const today = new Date();
  if (
    !(
      queryParameter.date &&
      queryParameter.date.match(/\d{8}/) &&
      parseInt(queryParameter.date) <=
        parseInt(
          toStringDateFcn(today.getFullYear(), today.getMonth() + 1, 0)
        ) &&
      parseInt(queryParameter.date) >= 20170101
    )
  ) {
    queryParameter.date = toStringDateFcn(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
  }

  return (
    <>
      <Route
        path="/main"
        render={() =>
          queryParameter.hasOwnProperty("date") ? (
            <ReadDiary queryParameter={queryParameter} />
          ) : null
        }
      />
      <Music />
      <Route
        path="/main"
        render={() =>
          queryParameter.compose === "new" ? (
            <WriteDiary queryParameter={queryParameter} />
          ) : null
        }
      />
      <Route
        path="/main"
        render={() =>
          queryParameter.compose === "update" ? (
            <UpdateDiary queryParameter={queryParameter} />
          ) : null
        }
      />
    </>
  );
};

export default MainService;
