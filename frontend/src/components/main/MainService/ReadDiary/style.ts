import { css } from "@emotion/react";
// padding: 15px
export const headerContainer = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 67px;
  border-bottom: 1px solid #ededed;
`;
export const headerDateMusic = css`
  display: flex;
  & > p {
    width: 230px;
    display: flex;
    align-items: center;
    padding: 15px 15px 15px 17px;
    font-size: 22px;
    font-weight: 600;
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
  max-width: 180px;
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
  // margin-left: 30px;
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
`;
export const headerContainerTool = css`
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const headerToolEdit = css`
  background-image: url(https://www.music-flo.com/img/sp_button@2x.97bb1f02.png);
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
  background-image: url(https://www.music-flo.com/img/sp_button@2x.97bb1f02.png);
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
`;
export const bodyDiary = css`
  width: 50%;
  display: flex;
  flex-direction: column;
`;
export const diaryTitle = css`
  font-size: 18px;
  font-weight: 500;
  padding: 0 0 8px 4px;
`;
export const diaryContent = css`
  height: 100%;
  padding: 2px 2px 2px 4px;
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
`;
export const bodyAnalysis = css`
  width: 50%;
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
`;
