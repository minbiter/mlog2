import React from "react";
import { Route, useLocation } from "react-router-dom";
import QueryString from "qs";
import Calendar from "./Calendar";
import WriteDiary from "../../modal/WriteDiary";
import UpdateDiary from "components/modal/UpdateDiary";

const MainService = () => {
  const location = useLocation();
  const queryParameter = QueryString.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  });

  if (!queryParameter.date) {
    queryParameter.date = location.pathname
      .split("/")
      .find((v) => v.match(/\d{8}/));
  }

  return (
    <>
      <Route
        path="/main"
        render={() => <Calendar queryParameter={queryParameter} />}
      />
      <Route
        path="/main/diary"
        render={() =>
          queryParameter.compose === "new" ? (
            <WriteDiary queryParameter={queryParameter} />
          ) : null
        }
      />
      <Route
        path="/main/diary/:date"
        render={() =>
          queryParameter.compose === "update" ? <UpdateDiary /> : null
        }
      />
    </>
  );
};

export default MainService;
