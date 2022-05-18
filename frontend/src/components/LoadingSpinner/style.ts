import { css } from "@emotion/react";

export const loader = css`
  z-index: 100;
  position: absolute;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  &:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
  font-size: 30px;
  text-indent: -9999em;
  border-top: 7px solid rgb(246, 246, 246, 0.8);
  border-right: 7px solid rgb(246, 246, 246, 0.8);
  border-bottom: 7px solid rgb(246, 246, 246, 0.8);
  border-left: 7px solid #00c471;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
