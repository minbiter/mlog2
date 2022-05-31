/** @jsxImportSource @emotion/react */
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "context/AuthProvider";
import { signInUser } from "api/userApi/";
import {
  homeHeaderArticle,
  homeBodyArticle,
  headerMsg,
  headerMsgTitle,
  headerMsgContent,
  guestButton,
  headerImg,
  headerImgContainer,
  phoneImg,
  bodyMsg,
  bodyImg,
  bodyMsgTitle,
  bodyMsgContent,
  bodyImgContainer,
  imgAI,
  imgRecommend,
  imgSurvey,
  imgPlayList,
} from "./style";
import homeCalendarFile from "assets/homeCalendar.png";
import homeGoogleFile from "assets/homeGoogle.png";
import homeRecommendFile from "assets/homeRecommend.png";
import homeSurveyFile from "assets/homeSurvey.png";
import homeMusicListOneFile from "assets/homeMusicListOne.png";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const history = useHistory();
  const submitGuest = async () => {
    try {
      const { data } = await signInUser({
        email: "guest@mlog.com",
        password: "mlog1234",
      });
      if (data.result) {
        setAuth({
          email: data.data.email,
          accessToken: data.data.accessToken,
          isSurvey: data.data.isSurvey,
        });
        history.push("/main");
      } else {
        alert(data.data.signin);
      }
    } catch (err) {
      alert("서비스를 이용하실 수 없습니다.");
    }
  };

  return (
    <>
      <article css={homeHeaderArticle}>
        <div css={headerMsg}>
          <div>
            <p css={headerMsgTitle}>
              인공지능 일기 분석
              <br />
              음악 추천 서비스
            </p>
            <p css={headerMsgContent}>음악으로 하루를 기록해보세요.</p>
            <button css={guestButton} onClick={submitGuest}>
              Guest계정으로 사용하기
            </button>
          </div>
        </div>
        <div css={headerImg}>
          <div css={headerImgContainer}>
            <div css={phoneImg}>
              <img src={homeCalendarFile} alt="mlog calendar" />
            </div>
          </div>
        </div>
      </article>
      <article css={homeBodyArticle(false)}>
        <div css={bodyMsg}>
          <div>
            <p css={bodyMsgTitle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill=""
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
              </svg>
              인공지능
            </p>
            <p css={bodyMsgContent}>일기를 감정 분석하기 위해</p>
            <p css={bodyMsgContent}>Google Natural Language AI를 사용합니다.</p>
          </div>
        </div>
        <div css={bodyImg}>
          <div css={bodyImgContainer}>
            <img
              src={homeGoogleFile}
              alt="google natural language ai"
              css={imgAI}
            />
          </div>
        </div>
      </article>
      <article css={homeBodyArticle(true)}>
        <div css={bodyMsg}>
          <div>
            <p css={bodyMsgTitle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
              음악추천
            </p>
            <p css={bodyMsgContent}>사용자의 취향과 일기 감정을 분석하여</p>
            <p css={bodyMsgContent}>음악을 추천합니다.</p>
          </div>
        </div>
        <div css={bodyImg}>
          <div css={bodyImgContainer}>
            <img
              src={homeRecommendFile}
              alt="mlog recommend"
              css={imgRecommend}
            />
            <img src={homeSurveyFile} alt="mlog survey" css={imgSurvey} />
          </div>
        </div>
      </article>
      <article css={homeBodyArticle(false)}>
        <div css={bodyMsg}>
          <div>
            <p css={bodyMsgTitle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
              </svg>
              플레이리스트
            </p>
            <p css={bodyMsgContent}>감정에 따라 재생목록 편집 없이 손쉽게</p>
            <p css={bodyMsgContent}>음악을 즐길 수 있습니다.</p>
          </div>
        </div>
        <div css={bodyImg}>
          <div css={bodyImgContainer}>
            <img
              src={homeMusicListOneFile}
              alt="mlog musicList"
              css={imgPlayList}
            />
          </div>
        </div>
      </article>
    </>
  );
};

export default Home;
