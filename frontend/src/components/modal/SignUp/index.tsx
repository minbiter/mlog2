import React, { useState } from "react";
import { signUpUser } from "api/userApi";
import {
  isValidEmail,
  isValidPassword,
  isValidPasswordConfirm,
} from "utils/validation/userValidation";

const SignUp = () => {
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
    <div>
      <form onSubmit={submitSignUp}>
        <label htmlFor="email">
          이메일
          <input
            id="email"
            type="text"
            placeholder="example@mlog.com"
            value={email}
            onChange={changeEmail}
          />
        </label>
        {email ? (
          isValidEmail(email) ? null : (
            <p>이메일 형식이 올바르지 않습니다.</p>
          )
        ) : null}
        <label htmlFor="password">
          비밀번호
          <input
            id="password"
            type="text"
            placeholder="******"
            value={password}
            onChange={changePassword}
            onFocus={openPasswordWarn}
            onBlur={openPasswordWarn}
          />
        </label>
        {passwordWarn || password ? (
          isValidPassword(password) ? null : (
            <p>8자 이상 28자 이하 입력 (공백 제외)</p>
          )
        ) : null}
        <label htmlFor="passwordConfirm">
          비밀번호 확인
          <input
            id="passwordConfirm"
            type="text"
            placeholder="******"
            value={passwordConfirm}
            onChange={changePasswordConfirm}
          />
        </label>
        {passwordConfirm ? (
          isValidPasswordConfirm(password, passwordConfirm) ? null : (
            <p>비밀번호가 일치하지 않습니다.</p>
          )
        ) : null}
        <button>가입하기</button>
      </form>
    </div>
  );
};

export default SignUp;
