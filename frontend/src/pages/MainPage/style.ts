import { css } from "@emotion/react";

export const mainContainer = css`
  // width: 1440px;
  height: 100vh;
  display: flex;
  background-color: #fafafa;
  & > section {
    padding: 15px;
    box-shadow: 2px 2px 4px rgb(0 0 0 / 5%), -2px -2px 4px rgb(0 0 0 / 5%);
    border-radius: 8px;
    overflow-y: scroll;
  }
`;

export const serviceSection = css`
  width: 900px;
  margin: 15px;
`;

export const musicSection = css`
  width: 540px;
  margin: 15px 15px 15px 0;
`;
