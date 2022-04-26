import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import QueryString from "qs";
import Calendar from "./Calendar";
import WriteDiary from "../../modal/WriteDiary";

const MainService = () => {
  const searchDate = QueryString.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  });
  return (
    <>
      <Route path="/main" render={() => <Calendar searchDate={searchDate} />} />
      <Route
        path="/main/diary"
        render={() =>
          searchDate.compose === "new" ? (
            <WriteDiary searchDate={searchDate} />
          ) : null
        }
      />
    </>
  );
};

export default MainService;
