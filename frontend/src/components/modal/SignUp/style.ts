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
`;

export const dimmed = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(11, 19, 30, 0.37);
`;

export const signUpLink = css`
  border-bottom: 1px solid #858a8d;
  font-size: 13px;
  color: #616568;
  cursor: pointer;
`;

export const container = css`
  z-index: 200;
  width: 360px;
  height: auto;
  padding: 24px;
  border-radius: 6px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
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

export const logoModal = css`
  display: flex;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 24px;
  & > img {
    width: 35px;
    height: 35px;
  }
  & > span {
    height: 40px;
    line-height: 35px;
    margin-left: 6px;
    font-size: 30px;
    font-weight: 700;
    color: #4cdbce;
  }
`;

export const itemOfFormModal = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 13px;
  & > input {
    width: 312px;
    height: 48px;
    padding: 13px 12px;
    margin-top: 4px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    font-size: 15px;
    &:focus {
      outline: none;
      border-color: #00c471;
    }
  }
  & > p {
    margin-top: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #e5503c;
  }
`;
