/** @jsxImportSource @emotion/react */
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { signInUser } from "api/userApi/";
import { AuthContext } from "context/AuthProvider";
import {
  modal,
  dimmed,
  container,
  formModal,
  logoModal,
  itemOfFormModal,
  signUpLink,
} from "./../SignUp/style";
import logoImg from "assets/logo.png";

interface ISignInProps {
  closeSignInModal: () => void;
  openSignUpModal: () => void;
}

const SignIn = ({ closeSignInModal, openSignUpModal }: ISignInProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setAuth } = useContext(AuthContext);
  let history = useHistory();

  const changeSignUp = () => {
    closeSignInModal();
    openSignUpModal();
  };

  const submitSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await signInUser({ email, password });
      if (data.result) {
        setAuth({
          email: data.data.email,
          accessToken: data.data.accessToken,
        });
        closeSignInModal();
        history.push("/main");
      } else {
        alert(data.data.signin);
      }
    } catch (err) {
      alert("서비스를 이용하실 수 없습니다.");
    }
  };

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <div css={modal}>
      <div css={dimmed} onClick={closeSignInModal}></div>
      <div css={container}>
        <form onSubmit={submitSignIn} css={formModal}>
          <svg
            width="16px"
            height="12px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
            onClick={closeSignInModal}
          >
            <path
              fill="#3E4042"
              fillRule="evenodd"
              d="M.203.203c.27-.27.708-.27.979 0L6 5.02 10.818.203c.27-.27.709-.27.98 0 .27.27.27.708 0 .979L6.978 6l4.818 4.818c.27.27.27.709 0 .98-.27.27-.709.27-.979 0L6 6.978l-4.818 4.818c-.27.27-.709.27-.98 0-.27-.27-.27-.709 0-.979L5.022 6 .203 1.182c-.27-.27-.27-.709 0-.98z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div css={logoModal}>
            <img src={logoImg} alt="logo-modal" />
            <span>Mlog</span>
          </div>
          <label htmlFor="email" css={itemOfFormModal}>
            <input
              id="email"
              type="text"
              placeholder="이메일"
              value={email}
              onChange={changeEmail}
            />
          </label>
          <label htmlFor="password" css={itemOfFormModal}>
            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={changePassword}
            />
          </label>
          <button>로그인</button>
        </form>
        <p css={signUpLink} onClick={changeSignUp}>
          회원가입
        </p>
      </div>
    </div>
  );
};

export default SignIn;
