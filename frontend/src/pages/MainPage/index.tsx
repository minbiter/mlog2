/** @jsxImportSource @emotion/react */
import React from "react";
import MainCalendar from "components/main/MainCalendar";
import MainService from "components/main/MainService";
import { mainContainer, calendarSection, mainSection } from "./style";

const MainPage = () => {
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
    </main>
  );
};

export default MainPage;
