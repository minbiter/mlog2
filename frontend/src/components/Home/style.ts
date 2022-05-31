import { css } from "@emotion/react";
import media from "styles/media";
import defaultPhoneFile from "assets/defaultPhone.png";
export const homeHeaderArticle = css`
  height: 520px;
  padding-left: 72px;
  padding-right: 72px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  ${media.xsmall} {
    padding-left: 15px;
    padding-right: 15px;
    flex-wrap: wrap;
    // height: auto;
    height: 700px;
  }
`;

export const headerMsg = css`
  width: 50%;
  display: flex;
  justify-content: center;
  ${media.xsmall} {
    width: 100%;
    margin-bottom: 15px;
    margin-top: 15px;
    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
export const headerImg = css`
  width: 50%;
  height: 100%;
  ${media.xsmall} {
    width: 100%;
  }
`;

export const headerMsgTitle = css`
  background-size: 100%;
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-color: rgb(52, 168, 83);
  background-image: linear-gradient(
    0deg,
    rgba(52, 168, 83, 1) 0%,
    rgba(66, 133, 244, 1) 100%
  );
  font-size: min(4vw, 60px);
  font-weight: 600;
  line-height: 1.3;
  ${media.xsmall} {
    font-size: 28px;
    text-align: center;
  }
`;
export const headerMsgContent = css`
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: min(2vw, 22px);
  ${media.xsmall} {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 16px;
  }
`;
export const guestButton = css`
  background-color: #1a73e8;
  padding: 10px 20px 10px 20px;
  border-radius: 5px;
  font-weight: 500;
  font-size: min(2vw, 22px);
  color: #fff;
  &:hover {
    background-color: #185abc;
  }
  ${media.xsmall} {
    font-size: 16px;
  }
`;

export const headerImgContainer = css`
  height: 100%;
  display: flex;
  justify-content: center;
  ${media.xsmall} {
    align-items: flex-start;
    margin-bottom: 15px;
  }
`;
export const phoneImg = css`
  position: relative;
  margin-top: 20px;
  background-image: url(${defaultPhoneFile});
  background-size: 1855px 1755px;
  background-position: -675px 0;
  width: 336px;
  height: 656px;
  overflow: hidden;
  & > img {
    min-width: 336px;
    min-height: 561px;
    position: absolute;
    top: -10px;
    left: 0;
    border: 1px solid #e4e2e2;
    border-radius: 10px;
    transform: scale(0.82);
  }
`;

export const homeBodyArticle = (bc: boolean) => css`
  width: 100%;
  height: auto;
  padding: 50px 72px 50px 72px;
  ${bc ? `background-color: #fff;` : null}
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media.xsmall} {
    padding: 30px 10px 30px 10px;
    flex-direction: column;
  }
`;

export const bodyMsg = css`
  width: 50%;
  display: flex;
  ${media.xsmall} {
    width: 100%;
    justify-content: center;
    margin-bottom: 30px;
    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
export const bodyImg = css`
  width: 50%;
  height: 100%;
  ${media.xsmall} {
    width: 100%;
  }
`;

export const bodyMsgTitle = css`
  display: flex;
  align-items: center;
  font-size: min(3vw, 32px);
  font-weight: 700;
  color: #2962ff;
  margin-bottom: 10px;
  & > svg {
    width: min(3vw, 25px);
    height: min(3vw, 25px);
    background-color: #2962ff;
    border-radius: 5px;
    padding: 4px;
    margin-right: 10px;
  }
  ${media.xsmall} {
    font-size: 26px;
  }
`;
export const bodyMsgContent = css`
  font-size: min(2vw, 22px);
  font-weight: 400;
  ${media.xsmall} {
    font-size: 16px;
  }
`;

export const bodyImgContainer = css`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    width: 50%;
  }
  ${media.xsmall} {
    align-items: flex-start;
    justify-content: space-between;
  }
`;

export const imgAI = css`
  ${media.xsmall} {
    width: 80% !important;
    margin: 0 auto 0 auto;
  }
`;
export const imgRecommend = css`
  width: 40% !important;
  border: 1px solid #e4e2e2;
  border-radius: 10px;
  ${media.xsmall} {
    width: 45% !important;
  }
`;
export const imgSurvey = css`
  width: 40% !important;
  border: 1px solid #e4e2e2;
  border-radius: 10px;
  margin-left: 20px;
  ${media.xsmall} {
    margin-left: 0;
    width: 45% !important;
  }
`;
export const imgPlayList = css`
  border: 1px solid #e4e2e2;
  border-radius: 10px;
  width: 100% !important;
`;
