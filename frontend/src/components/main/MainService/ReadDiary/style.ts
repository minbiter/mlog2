import { css } from "@emotion/react";
import buttonFile from "assets/buttonFile.png";
import media from "styles/media";

export const articleTag = css``;

export const headerContainer = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 67px;
  border-bottom: 1px solid #ededed;
  ${media.xsmall} {
    height: auto;
    padding: 15px;
  }
`;
export const headerDateMusic = css`
  display: flex;
  & > p {
    width: 230px;
    display: flex;
    align-items: center;
    padding: 15px 15px 15px 35px;
    font-size: 18px;
    font-weight: 600;
  }
  ${media.xsmall} {
    flex-direction: column;
    & > p {
      padding: 0;
      margin-bottom: 15px;
    }
  }
`;
export const headerMusic = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  & > img {
    width: 55px;
    height: 55px;
    border-radius: 10px;
    margin-right: 10px;
  }
  &: hover {
    opacity: 0.6;
    filter: alpha(opacity=60); /* For IE8 and earlier */
  }
`;
export const musicInfo = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > p {
    font-size: 14px;
  }
`;
export const musicTitle = css`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 4px;
`;
export const musicArtist = css``;

export const headerNoMusic = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > p {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;
  }
  & > button {
    background-color: #d2e3fc;
    font-weight: 500;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid #e4e2e2;
    &: hover {
      border: 1px solid #2962ff;
    }
  }
  ${media.xsmall} {
    flex-direction: row;
    & > p {
      margin: 0 10px 0 0;
    }
  }
`;
export const headerContainerTool = css`
  padding: 15px 25px 15px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.xsmall} {
    padding: 0;
    align-self: flex-start;
  }
`;

export const headerToolEdit = css`
  background-image: url(${buttonFile});
  background-size: 714px 706px;
  background-position: -597px -315px;
  width: 30px;
  height: 30px;
  margin-right: 4px;
  &: hover {
    background-color: #bdc1c6;
    border-radius: 50%;
  }
`;
export const headerToolDelete = css`
  background-image: url(${buttonFile});
  background-size: 714px 706px;
  background-position: -450px -630px;
  width: 30px;
  height: 30px;
  &: hover {
    background-color: #bdc1c6;
    border-radius: 50%;
  }
`;
export const bodyContainer = css`
  width: 100%;
  height: 309px;
  padding: 15px;
  display: flex;
  ${media.xsmall} {
    height: auto;
    flex-wrap: wrap;
    padding: 0;
  }
`;
export const bodyDiary = css`
  width: 50%;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.xsmall} {
    width: 100%;
    padding: 0;
    padding: 15px;
    border-bottom: 1px solid #ededed;
  }
`;
export const diaryTitle = css`
  align-self: flex-start;
  font-size: 18px;
  font-weight: 500;
  padding: 0 0 8px 0;
`;
export const diaryContent = css`
  width: 100%;
  height: 100%;
  padding: 2px 2px 2px 4px;
  margin-right: 8px;
  background-color: #eef2f7;
  border: 1px solid #e4e2e2;
  border-radius: 12px;
  word-break: break-all;
  line-height: 1.5;
  overflow: auto;
  font-size: 14px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    width: 4px;
    border-radius: 4px;
    background-color: #c4c4c4;
  }
  ${media.xsmall} {
    border-radius: 5px;
  }
`;
export const bodyAnalysis = css`
  width: 50%;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.xsmall} {
    width: 100%;
    padding: 20px;
  }
`;

export const bodyNoDiary = css`
  display: flex;
  flex-direction: column;
  & > p {
    font-size: 17px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  & > button {
    align-self: center;
    font-size: 16px;
    background-color: #d2e3fc;
    font-weight: 500;
    padding: 6px 15px;
    border-radius: 5px;
    border: 1px solid #e4e2e2;
    &: hover {
      border: 1px solid #2962ff;
    }
  }
  ${media.xsmall} {
    margin: 15px 0 15px 0;
  }
`;
