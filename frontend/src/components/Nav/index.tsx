/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import SignIn from "components/modal/SignIn";
import SignUp from "components/modal/SignUp";
import { AuthContext } from "context/AuthProvider";
import { signOutUser } from "api/userApi";
import logoImg from "assets/logo.png";
import {
  headerTag,
  navBar,
  logoModal,
  info,
  infoModal,
  signContainer,
  signInBtn,
  signUpBtn,
} from "./style";

const Nav = () => {
  const [isClickedSignIn, setIsClickedSignIn] = useState(false);
  const [isClickedSignUp, setIsClickedSignUp] = useState(false);
  const [isClickedInfo, setIsClickedInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const { auth, setAuth } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!auth.loading) {
      setLoading(false);
    }
  }, [auth]);

  const openSignInModal = useCallback(() => {
    setIsClickedSignIn((prev) => !prev);
  }, []);

  const openSignUpModal = useCallback(() => {
    setIsClickedSignUp((prev) => !prev);
  }, []);

  const signOut = async () => {
    try {
      const { data } = await signOutUser();
      if (data.result) {
        setAuth({});
        setIsClickedInfo(false);
        history.replace("/");
      }
    } catch (err) {
      alert("로그아웃에 실패했습니다.");
    }
  };

  const openInfoModal = () => {
    setIsClickedInfo((prev) => !prev);
  };

  const moveMain = () => {
    if (auth.accessToken) {
      history.push("/main");
    } else {
      history.push("/");
    }
  };

  return (
    <header css={headerTag}>
      <nav css={navBar}>
        <div css={logoModal} onClick={moveMain}>
          <img src={logoImg} alt="logo-modal" />
          <span>Mlog</span>
        </div>

        {loading ? null : auth.accessToken ? (
          <div css={info}>
            <button onClick={openInfoModal}>{auth.email}</button>
            {isClickedInfo ? (
              <div css={infoModal} onClick={signOut}>
                <button>로그아웃</button>
              </div>
            ) : null}
          </div>
        ) : (
          <div css={signContainer}>
            <button onClick={openSignInModal} css={signInBtn}>
              로그인
            </button>
            <button onClick={openSignUpModal} css={signUpBtn}>
              회원가입
            </button>
          </div>
        )}
        {isClickedSignIn ? (
          <SignIn
            closeSignInModal={openSignInModal}
            openSignUpModal={openSignUpModal}
          />
        ) : null}
        {isClickedSignUp ? (
          <SignUp
            closeSignUpModal={openSignUpModal}
            openSignInModal={openSignInModal}
          />
        ) : null}
      </nav>
    </header>
  );
};

export default Nav;
