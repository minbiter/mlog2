import { css } from "@emotion/react";
import media from "styles/media";

export const headerTag = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: #fff;
`;

export const navBar = css`
  min-width: 576px;
  height: 60px;
  padding: 0 30px;
  border-bottom: 1px solid #eff1f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${media.xsmall} {
    min-width: 320px;
  }
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
    ${media.xsmall} {
      display: none;
    }
  }
`;

export const info = css`
  position: relative;
  & > button {
    font-size: 16px;
  }
`;

export const infoModal = css`
  position: absolute;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #e4e2e2;
  top: 35px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100px;
  padding: 8px 16px;
  text-align: center;
  cursor: pointer;
  &: hover {
    border: 1px solid #2962ff;
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
