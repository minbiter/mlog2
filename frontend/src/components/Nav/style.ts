import { css } from "@emotion/react";

export const headerTag = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
`;

export const navBar = css`
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid #eff1f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const logoModal = css`
  display: flex;
  align-items: center;
  cursor: pointer;
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

export const signContainer = css`
  font-size: 20px;
  & > button {
    color: #fff;
    padding: 10px;
    border-radius: 4px;
  }
`;

export const signInBtn = css`
  background-color: #00c471;
`;

export const signUpBtn = css`
  margin-left: 10px;
  background-color: #ff7867;
`;
