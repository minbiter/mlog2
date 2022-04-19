/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { signUpUser } from "api/userApi";
import {
  isValidEmail,
  isValidPassword,
  isValidPasswordConfirm,
} from "utils/validation/userValidation";

import {
  modal,
  dimmed,
  container,
  formModal,
  logoModal,
  itemOfFormModal,
} from "./style";
import logoImg from "assets/logo.png";

interface ISignUpProps {
  closeSignUpModal: () => void;
}

const SignUp = ({ closeSignUpModal }: ISignUpProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordWarn, setPasswordWarn] = useState(false);

  const submitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await signUpUser({ email, password, passwordConfirm });
      console.log(data);
      if (data.result) {
        console.log("회원가입 성공!");
      } else {
        alert(data.data);
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

  const openPasswordWarn = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPasswordWarn((prev) => !prev);
  };

  const changePasswordConfirm = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPasswordConfirm(e.target.value);
  };

  return (
    <div css={modal}>
      <div css={dimmed} onClick={closeSignUpModal}></div>
      <div css={container}>
        <form onSubmit={submitSignUp} css={formModal}>
          <svg
            width="16px"
            height="12px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
            onClick={closeSignUpModal}
          >
            <path
              fill="#3E4042"
              fill-rule="evenodd"
              d="M.203.203c.27-.27.708-.27.979 0L6 5.02 10.818.203c.27-.27.709-.27.98 0 .27.27.27.708 0 .979L6.978 6l4.818 4.818c.27.27.27.709 0 .98-.27.27-.709.27-.979 0L6 6.978l-4.818 4.818c-.27.27-.709.27-.98 0-.27-.27-.27-.709 0-.979L5.022 6 .203 1.182c-.27-.27-.27-.709 0-.98z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div css={logoModal}>
            <img src={logoImg} alt="logo-modal" />
            <span>Mlog</span>
          </div>
          <label htmlFor="email" css={itemOfFormModal}>
            이메일
            <input
              id="email"
              type="text"
              placeholder="example@mlog.com"
              value={email}
              onChange={changeEmail}
            />
            {email ? (
              isValidEmail(email) ? null : (
                <p>이메일 형식이 올바르지 않습니다.</p>
              )
            ) : null}
          </label>
          <label htmlFor="password" css={itemOfFormModal}>
            비밀번호
            <input
              id="password"
              type="password"
              placeholder="******"
              value={password}
              autoComplete="off"
              onChange={changePassword}
              onFocus={openPasswordWarn}
              onBlur={openPasswordWarn}
            />
            {passwordWarn || password ? (
              isValidPassword(password) ? null : (
                <p>8자 이상 28자 이하 입력 (공백 제외)</p>
              )
            ) : null}
          </label>
          <label htmlFor="passwordConfirm" css={itemOfFormModal}>
            비밀번호 확인
            <input
              id="passwordConfirm"
              type="password"
              placeholder="******"
              value={passwordConfirm}
              autoComplete="off"
              onChange={changePasswordConfirm}
            />
            {passwordConfirm ? (
              isValidPasswordConfirm(password, passwordConfirm) ? null : (
                <p>비밀번호가 일치하지 않습니다.</p>
              )
            ) : null}
          </label>
          <button>가입하기</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
