import { css } from "@emotion/react";
import buttonFile from "assets/buttonFile.png";
import runWhitePng from "assets/runWhiteBtn.png";
import pauseWhitePng from "assets/pauseWhiteBtn.png";
import media from "styles/media";

export const modal = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
  z-index: 30;
  width: 360px;
  height: auto;
  padding: 24px;
  border-radius: 6px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.xsmall} {
    width: 100%;
  }
`;

export const hearderMsgContainer = css`
  width: 100%;
  margin-bottom: 10px;
  font-size: 17px;
  font-weight: 500;
  width: 100%;
`;

export const msgHighlight = css`
  background-color: #00c471;
  border-radius: 6px;
  padding: 2px 6px;
  display: inline-block;
  margin-bottom: 1px;
  color: white;
`;

export const formModal = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
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

export const musicContainer = css`
  height: 450px;
  overflow-y: scroll;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  & > li {
    width: 140px;
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    width: 4px;
    border-radius: 4px;
    background-color: #c4c4c4;
  }
`;

export const musicItem = css`
  display: flex;
  flex-direction: column;
  margin: 5px;
  position: relative;
  & > input {
    width: 0px;
    height: 0px;
    visibility: hidden;
  }
  & > label {
    position: relative;
    & > img {
      cursor: pointer;
      border-radius: 10px;
      &:hover {
        opacity: 0.7;
        filter: alpha(opacity=70); /* For IE8 and earlier */
      }
    }
  }
  & > span {
    font-size: 14px;
    text-align: center;
  }
`;

export const selectedImg = css`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  background-image: url(${buttonFile});
  background-size: 714px 706px;
  background-position: -421px -230px;
  width: 41px;
  height: 41px;
`;

export const runBtn = css`
  position: absolute;
  cursor: pointer;
  bottom: 25px;
  right: 5px;
  background-image: url(${runWhitePng});
  width: 30px;
  height: 30px;
  transform: scale(0.9);
  &:hover {
    transform: scale(1);
  }
`;
export const pauseBtn = css`
  position: absolute;
  cursor: pointer;
  bottom: 25px;
  right: 5px;
  background-image: url(${pauseWhitePng});
  width: 30px;
  height: 30px;
  transform: scale(1.1);
  &: hover {
    transform: scale(1.2);
  }
`;

export const musicController = css`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const playedControl = css`
  width: 100%;
  height: 8px;
  overflow: hidden;
  cursor: pointer;
  -webkit-appearance: none;
  background: transparent;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    background: #e5e4e3;
    border-radius: 2px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #3f3fff;
    cursor: pointer;
    box-shadow: -100vw 0 0 100vw #3f3fff;
    width: 8px;
    height: 8px;
    border-radius: 2px;
  }
`;
