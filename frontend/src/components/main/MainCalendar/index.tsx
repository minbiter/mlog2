import React, { useContext } from "react";
import { Route, useLocation } from "react-router-dom";
import QueryString from "qs";
import Calendar from "./Calendar";
import { AuthContext } from "context/AuthProvider";
import Survey from "components/modal/Survey";

const MainCalendar = () => {
  const { auth } = useContext(AuthContext);
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
      {auth.isSurvey ? null : <Survey />}
    </>
  );
};

export default MainCalendar;
