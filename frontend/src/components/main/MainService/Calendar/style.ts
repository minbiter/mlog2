import { css } from "@emotion/react";

const articleWidth = 485;

export const articleTag = css`
  width: ${articleWidth}px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 3px 3px 0 rgb(0 0 0 / 5%), 0 5px 15px 0 rgb(0 0 0 / 5%);
`;

export const articleContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
export const yearSelect = css`
  ${selectTag}
  width: 100px;
  margin-right: 10px;
  font-weight: 500;
`;
export const monthSelect = css`
  ${selectTag}
  width: 75px;
  font-weight: 500;
`;

export const prevButton = css`
  width: 37px;
  height: 37px;
  margin-right: 4px;
  padding: 0;
  &: hover {
    background-color: #bdc1c6;
    border-radius: 50%;
  }
`;
export const nextButton = css`
  width: 37px;
  height: 37px;
  padding: 0;
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
  grid-template-columns: repeat(7, 1fr);
`;
export const columnheaderTag = css`
  text-align: center;
  font-weight: 500;
  margin-bottom: 5px;
`;
export const gridCellTag = css`
  display: flex;
  height: ${(articleWidth - 30) / 7 - 30}px;
  margin: 15px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &: hover {
    background-color: #bdc1c6;
    border-radius: 50%;
  }
`;
