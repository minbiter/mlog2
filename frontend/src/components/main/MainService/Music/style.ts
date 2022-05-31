import { css } from "@emotion/react";
import buttonFile from "assets/buttonFile.png";
import pausePng from "assets/pauseBtn.png";
import defaultMusicPng from "assets/defaultMusic.png";
import media from "styles/media";

export const articleTag = css`
  width: 100%;
  padding: 15px;
  ${media.xsmall} {
    border-top: 1px solid #eff1f6;
    min-width: 360px;
    position: fixed !important;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    bord
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0 !important;
  }
`;

export const sectionContainerHeader = css`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 50%;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
  ${media.xsmall} {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    // margin-bottom: 15px;
    padding: 0;
  }
`;
export const sectionContainerBody = (isOpenMusic: boolean) => css`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 50%;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
  ${media.xsmall} {
    ${isOpenMusic ? null : `display: none;`}
    width: 100%;
    height: 60vh;
    margin-top: 35px;
    margin-bottom: 15px;
    padding: 0 10px 0 10px;
  }
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
  ${media.xsmall} {
    font-size: 15px;
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
  ${media.xsmall} {
    &: hover {
      filter: brightness(0);
    }
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
  ${media.xsmall} {
    &: hover {
      filter: brightness(0);
    }
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
  ${media.xsmall} {
    width: 50px;
    height: 50px;
    margin: 0;
    margin-right: 10px;
    & > div {
      width: 50px;
      height: 60px;
      margin: 0;
      margin-bottom: 10px;
    }
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
  ${media.xsmall} {
    flex-direction: row;
    margin: 10px;
    & > img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      margin-bottom: 0;
    }
  }
`;
export const controlMusicTitle = css`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 6px;
  ${media.xsmall} {
    font-size: 14px;
    margin-bottom: 2px;
  }
`;
export const controlMusicArtist = css`
  font-size: 14px;
  ${media.xsmall} {
    font-size: 12px;
  }
`;

export const playedController = (isOpenMusic: boolean) => css`
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
  ${media.xsmall} {
    ${isOpenMusic ? null : `display: none;`}
    width: 100%;
    padding: 0 10px 0 10px;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    margin: auto;
  }
`;

export const playedControl = css``;

export const playListController = css`
  align-self: center;
  display: flex;
  ${media.xsmall} {
    margin: 10px;
  }
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
  ${media.xsmall} {
    width: 30px;
    transform: scale(0.7);
    margin-right: 3px;
    &: hover {
      filter: brightness(0);
    }
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
  ${media.xsmall} {
    transform: scale(0.7);
    width: 34px;
    margin: 0px;
    &: hover {
      filter: brightness(0);
    }
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
  ${media.xsmall} {
    transform: scale(0.7);
    width: 34px;
    margin: 0px;
    &: hover {
      filter: brightness(0);
    }
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
  ${media.xsmall} {
    width: 30px;
    transform: scale(0.7);
    &: hover {
      filter: brightness(0);
    }
  }
`;

export const controlMusicList = (isOpenMusic: boolean) => css`
  background-image: url(${buttonFile});
  background-size: 714px 706px;
  background-position: ${isOpenMusic ? `-137px -475px` : `-405px -555px`};
  width: 35px;
  height: 40px;
  transform: ${isOpenMusic ? `scale(0.6)` : `scale(0.7)`};
  margin-left: 25px;
  filter: ${isOpenMusic ? `brightness(0.3)` : `brightness(0)`};
`;
