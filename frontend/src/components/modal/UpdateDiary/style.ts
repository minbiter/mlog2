import { css } from "@emotion/react";

export const modal = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &: focus {
    background-color: red;
  }
  z-index: 20;
`;

export const dimmed = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(11, 19, 30, 0.37);
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
  justify-content: center;
  align-items: center;
`;

export const formModal = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  & > svg {
    margin-left: auto;
    padding: 2px 2px;
    cursor: pointer;
  }
  & > button {
    width: 312px;
    height: 48px;
    padding: 0 12px;
    margin: 12px 0;
    border-radius: 4px;
    background-color: #00c471;
    color: #fff;
    font-weight: 700;
  }
`;

export const itemOfFormModal = css`
  width: 100%;
  & > p {
    padding: 10px 0;
    border-bottom: 1px solid #eff1f6;
    font-weight: 500;
    font-size: 16px;
  }

  & > input {
    width: 100%;
    padding: 10px 0;
    border: 0px;
    border-bottom: 1px solid #eff1f6;
    font-size: 16px;
    font-weight: 500;
    &: focus {
      outline: none;
    }
  }
`;

export const textboxTag = css`
  width: 100%;
  height: 350px;
  border: 0px;
  resize: none;
  letter-spacing: -0.3px;
  font-family: "Noto Sans KR", sans-serif;
  padding-top: 10px;
  border-bottom: 1px solid #eff1f6;
  overflow: auto;
  word-break: break-all;
  line-height: 1.5;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    width: 4px;
    border-radius: 4px;
    background-color: #c4c4c4;
  }
  &:focus {
    outline: none;
  }
`;
