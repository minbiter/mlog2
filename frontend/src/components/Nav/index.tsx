/** @jsxImportSource @emotion/react */
import React, { useState, useContext, useCallback } from "react";
import SignIn from "components/modal/SignIn";
import SignUp from "components/modal/SignUp";
import { AuthContext } from "context/AuthProvider";
import { Link } from "react-router-dom";
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
  const { auth } = useContext(AuthContext);

  const openSignInModal = useCallback(() => {
    setIsClickedSignIn((prev) => !prev);
  }, []);

  const openSignUpModal = useCallback(() => {
    setIsClickedSignUp((prev) => !prev);
  }, []);

  return (
    <header css={headerTag}>
      <nav css={navBar}>
        <div css={logoModal}>
          <img src={logoImg} alt="logo-modal" />
          <span>Mlog</span>
        </div>
        {/* <Link to="/">Home</Link>
  <Link to="/main">Main</Link> */}
        {auth.accessToken ? (
          auth.email
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
