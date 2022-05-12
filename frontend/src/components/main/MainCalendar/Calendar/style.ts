import { css } from "@emotion/react";

const articleWidth = 380;

export const articleTag = css`
  width: ${articleWidth}px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #ffffff;
  border-radius: 12px;
`;

export const articleContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
`;

export const selectTag = css`
  padding: 10px 12px;
  border: 1px solid #eff1f6;
  border-radius: 8px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBzdHJva2U9IiM2NTc3OEYiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMSAxbDUuNSA1LjQ5OUwxMiAxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==);
  background-repeat: no-repeat;
  background-position: right 12px top 15px;
`;

export const monthContainer = css`
  display: flex;
  align-items: center;
`;
export const yearSelect = css`
  ${selectTag}
  width: 100px;
  margin-right: 10px;
  font-weight: 600;
`;
export const monthSelect = css`
  ${selectTag}
  width: 75px;
  font-weight: 600;
`;

export const prevButton = (x: number, y: number) => css`
  width: 25px;
  height: 25px;
  margin-right: 4px;
  padding: 0;
  background-image: url(https://www.music-flo.com/img/sp_button@2x.97bb1f02.png);
  background-size: 714px 706px;
  background-position: ${x}px ${y}px;
  &: hover {
    background-color: #bdc1c6;
    border-radius: 50%;
  }
`;
export const nextButton = (x: number, y: number) => css`
  width: 25px;
  height: 25px;
  padding: 0;
  background-image: url(https://www.music-flo.com/img/sp_button@2x.97bb1f02.png);
  background-size: 714px 706px;
  background-position: ${x}px ${y}px;
  &: hover {
    background-color: #bdc1c6;
    border-radius: 50%;
  }
`;

export const gridTag = css`
  width: 100%;
`;
export const rowGroupTag = css``;
export const rowTag = css`
  display: grid;
  grid-template-columns: repeat(7, 50px);
`;
export const columnheaderTag = css`
  text-align: center;
  font-weight: 500;
  color: #808080;
  margin-bottom: 5px;
`;
export const gridCellTag = (date: string) => css`
  position: relative;
  display: flex;
  padding: 10px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${date === "today" ? "#d2e3fc" : null};
  border-radius: ${date === "today" ? "50%" : null};
  font-weight: 500;
  &: hover {
    background-color: #bdc1c6;
    border-radius: 50%;
  }
`;

export const emotionSpan = (topEmotion: string) => css`
  position: absolute;
  top: 3px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${topEmotion === "positive"
    ? "blue"
    : topEmotion === "negative"
    ? "red"
    : "#00c471"};
`;

export const selectedGridCellTag = css`
  background-color: #94f0e8;
  border-radius: 50%;
`;
