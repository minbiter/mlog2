/** @jsxImportSource @emotion/react */
import React from "react";
import MainService from "components/main/MainService";
import MainMusic from "components/main/MainMusic";
import { mainContainer, serviceSection, musicSection } from "./style";

const MainPage = () => {
  return (
    <main>
      <div css={mainContainer}>
        <section css={serviceSection}>
          <MainService />
        </section>
        <section css={musicSection}>
          <MainMusic />
        </section>
      </div>
    </main>
  );
};

export default MainPage;
