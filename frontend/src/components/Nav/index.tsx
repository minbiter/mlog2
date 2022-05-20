/** @jsxImportSource @emotion/react */
import React, { useState, useContext, useCallback } from "react";
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
  signContainer,
  signInBtn,
  signUpBtn,
} from "./style";

const Nav = () => {
  const [isClickedSignIn, setIsClickedSignIn] = useState(false);
  const [isClickedSignUp, setIsClickedSignUp] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const history = useHistory();

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
        history.push("/");
      }
    } catch (err) {
      alert("로그아웃에 실패했습니다.");
    }
  };

  return (
    <header css={headerTag}>
      <nav css={navBar}>
        <div css={logoModal}>
          <img src={logoImg} alt="logo-modal" />
          <span>Mlog</span>
        </div>
        {auth.accessToken ? (
          <>
            <p>{auth.email}</p>
            <button onClick={signOut}>로그아웃</button>
          </>
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
