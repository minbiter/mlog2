import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import QueryString from "qs";
import Calendar from "./Calendar";
import WriteDiary from "./WriteDiary";

const MainService = () => {
  const searchDate = QueryString.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  });
  return (
    <>
      <Switch>
        <Route path="/main/diary/new">
          <WriteDiary searchDate={searchDate} />
        </Route>
        <Route path="/main">
          <Calendar searchDate={searchDate} />
        </Route>
      </Switch>
    </>
  );
};

export default MainService;
