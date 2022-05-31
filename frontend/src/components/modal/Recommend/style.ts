import { css } from "@emotion/react";
import buttonFile from "assets/buttonFile.png";
import pausePng from "assets/pauseBtn.png";

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
  z-index: 20;
  overflow: hidden;
  width: 360px;
  height: auto;
  border-radius: 6px;
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const formModal = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px 24px 0 24px;
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

export const headerMsgContainer = css`
  margin-left: 2px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 500;
`;

export const musicContainer = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

export const musicItem = css`
  display: flex;
  align-items: center;
  padding: 5px 0;
  & > input {
    width: 0px;
    height: 0px;
    display: none;
  }
  & > label {
    position: relative;
    display: flex;
    cursor: pointer;
    &: hover {
      opacity: 0.6;
      filter: alpha(opacity=60); /* For IE8 and earlier */
    }
    & > img {
      width: 70px;
      height: 70px;
      border-radius: 10px;
      margin-right: 10px;
    }
  }
`;

export const musicInfo = css`
  width: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > p {
    font-size: 14px;
  }
`;

export const selectedMusic = css`
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

export const musicTitle = css`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 6px;
`;

export const musicArtist = css``;

export const runBtn = css`
  cursor: pointer;
  margin-left: 8px;
  padding: 0 10px;
  background-image: url(${buttonFile});
  background-size: 714px 706px;
  background-position: -472px -97px;
  width: 30px;
  height: 30px;
  &: hover {
    background-position: -472px -51px;
  }
`;

export const pauseBtn = css`
  cursor: pointer;
  margin-left: 8px;
  padding: 0 10px;
  background-image: url(${pausePng});
  width: 30px;
  height: 30px;
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
