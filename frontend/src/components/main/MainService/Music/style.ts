import { css } from "@emotion/react";
import buttonFile from "assets/buttonFile.png";
import pausePng from "assets/pauseBtn.png";
import defaultMusicPng from "assets/defaultMusic.png";

export const articleTag = css`
  width: 100%;
  padding: 15px;
`;

export const sectionContainer = css`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 50%;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

export const headerContainer = css`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
`;

export const headerMenu = css`
  width: 25%;
  font-weight: 500;
  font-size: 16px;
  color: #808080;
  padding: 5px 0 5px 0;
  border-bottom: 2px solid #ededed;
  &:hover {
    opacity: 0.6;
    filter: alpha(opacity=60); /* For IE8 and earlier */
  }
`;

export const bottomBorder = (color: string) => css`
  border-bottom: 2px solid ${color};
`;

export const musicContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
  flex-grow: 1;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    width: 4px;
    border-radius: 4px;
    background-color: #c4c4c4;
  }
`;

export const loadingCenter = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: no-wrap;
  flex-grow: 1;
  overflow-y: scroll;
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
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const musicDetail = (isHover: Boolean) => css`
  position: relative;
  display: flex;
  ${isHover
    ? `cursor: pointer; &: hover {
    opacity: 0.6;
    filter: alpha(opacity=60); /* For IE8 and earlier */
  }`
    : ``}
  & > img {
    width: 70px;
    height: 70px;
    border-radius: 10px;
    margin-right: 10px;
  }
`;
export const musicInfo = css`
  width: 270px;
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
  margin-bottom: 6px;
`;
export const musicArtist = css``;

export const runBtn = css`
  cursor: pointer;
  margin-right: 30px;
  padding: 10px 10px;
  background-image: url(${buttonFile});
  background-size: 714px 706px;
  background-position: -472px -97px;
  width: 30px;
  height: 30px;
  &: hover {
    filter: brightness(2);
  }
`;

export const pauseBtn = css`
  cursor: pointer;
  margin-right: 30px;
  padding: 10px 10px;
  background-image: url(${pausePng});
  width: 30px;
  height: 30px;
  &: hover {
    filter: brightness(2);
  }
`;

export const defaultMusic = css`
  background-color: rgb(223, 223, 223);
  width: 180px;
  height: 180px;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    width: 60px;
    height: 60px;
    margin-bottom: 15px;
    background-image: url(${defaultMusicPng});
    background-repeat: no-repeat;
    opacity: 0.1;
    filter: alpha(opacity=10); /* For IE8 and earlier */
  }
`;

export const controlMusicInfo = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 18px;
  & > img {
    width: 180px;
    height: 180px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
`;
export const controlMusicTitle = css`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 6px;
`;
export const controlMusicArtist = css`
  font-size: 14px;
`;

export const playedController = css`
  align-self: center;
  width: 75%;
  height: 30px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-items: center;
  & > input {
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
  }
  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

export const playedControl = css``;

export const playListController = css`
  align-self: center;
  display: flex;
`;
export const controlLeft = css`
  background-image: url(${buttonFile});
  background-size: 714px 706px;
  background-position: -513px -45px;
  width: 40px;
  height: 40px;
  filter: brightness(0);
  &:hover {
    filter: brightness(0.5);
  }
`;

export const controlRun = css`
  background-image: url(${buttonFile});
  background-size: 714px 706px;
  background-position: -364px -426px;
  width: 40px;
  height: 40px;
  filter: brightness(0);
  margin: 0 15px 0 17px;
  &:hover {
    filter: brightness(0.5);
  }
`;

export const controlPause = css`
  background-image: url(${buttonFile});
  background-size: 714px 706px;
  background-position: -274px -426px;
  width: 40px;
  height: 40px;
  filter: brightness(0);
  margin: 0 15px 0 17px;
  &:hover {
    filter: brightness(0.5);
  }
`;
export const controlRight = css`
  background-image: url(${buttonFile});
  background-size: 714px 706px;
  background-position: -184px -426px;
  width: 40px;
  height: 40px;
  filter: brightness(0);
  &:hover {
    filter: brightness(0.5);
  }
`;
