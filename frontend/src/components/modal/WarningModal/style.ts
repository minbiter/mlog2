import { css } from "@emotion/react";

export const modal = css`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const dimmed = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(11, 19, 30, 0.37);
`;

export const msgItem = css`
  margin-bottom: 25px;
  color: #484848;
`;

export const container = css`
  z-index: 20;
  width: 360px;
  height: auto;
  padding: 24px;
  border-radius: 6px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const callbackBtn = css`
  height: 36px;
  margin: 0 5px;
  padding: 0 15px;
  border-radius: 4px;
  background-color: #00c471;
  border: 1px solid #e4e2e2;
  color: #fff;
  font-weight: 500;
  &: hover {
    border: 1px solid #2962ff;
  }
`;

export const closeBtn = css`
  height: 36px;
  margin: 0 5px;
  padding: 0 15px;
  border-radius: 4px;
  font-weight: 500;
  border: 1px solid #e4e2e2;
  &: hover {
    border: 1px solid #2962ff;
  }
`;
