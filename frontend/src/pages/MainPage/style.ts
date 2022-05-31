import { css } from "@emotion/react";
import media from "styles/media";

export const mainContainer = css`
  display: flex;
  min-width: 1440px;
  ${media.xsmall} {
    min-width: 200px;
    flex-direction: column;
    flex-wrap: no-wrap;
    padding: 20px;
  }
`;

export const calendarSection = css`
  margin: 20px 25px 25px 25px;
  ${media.xsmall} {
    width: 100%;
    margin: 0;
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
  }
  ${media.xsmall} {
    width: 100%;
    min-width: 320px;
    margin: 0;
    & > article {
      height: auto;
    }
  }
`;
