/** @jsxImportSource @emotion/react */
import React, { useContext } from "react";
import { AuthContext } from "context/AuthProvider";
import Survey from "components/modal/Survey";
import MainCalendar from "components/main/MainCalendar";
import MainService from "components/main/MainService";
import { mainContainer, calendarSection, mainSection } from "./style";

const MainPage = () => {
  const { auth } = useContext(AuthContext);
  return (
    <main>
      <div css={mainContainer}>
        <section css={calendarSection}>
          <MainCalendar />
        </section>
        <section css={mainSection}>
          <MainService />
        </section>
      </div>
      {auth.accessToken ? auth.isSurvey ? null : <Survey /> : null}
    </main>
  );
};

export default MainPage;
