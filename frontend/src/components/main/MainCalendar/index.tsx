import React, { useContext } from "react";
import { Route, useLocation } from "react-router-dom";
import QueryString from "qs";
import Calendar from "./Calendar";

const MainCalendar = () => {
  const location = useLocation();
  const queryParameter = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <>
      <Route
        path="/main"
        render={() => <Calendar queryParameter={queryParameter} />}
      />
    </>
  );
};

export default MainCalendar;
