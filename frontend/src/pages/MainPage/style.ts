import { css } from "@emotion/react";

export const mainContainer = css`
  display: flex;
  min-width: 1440px;
  background-color: #eef2f7;
`;

export const calendarSection = css`
  margin: 20px 25px 25px 25px;
  & > article {
  }
`;

export const mainSection = css`
  display: flex;
  flex-direction: column;
  margin: 20px 25px 0 0;
  border-radius: 8px;
  flex-grow: 1;
  & > article {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 376px;
    border-radius: 12px;
    background-color: #ffffff;
    margin-bottom: 15px;
    // box-shadow: 0 3px 3px 0 rgb(0 0 0 / 5%), 0 5px 15px 0 rgb(0 0 0 / 5%);
  }
`;
//
