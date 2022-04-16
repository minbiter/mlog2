import React, { useState } from "react";
import { signInUser } from "api/userApi/";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await signInUser({ email, password });
      if (data.result) {
        console.log("로그인 성공!");
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
    <div>
      <form onSubmit={submitSignIn}>
        <label htmlFor="email">
          <input
            id="email"
            type="text"
            placeholder="이메일"
            value={email}
            onChange={changeEmail}
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            type="text"
            placeholder="비밀번호"
            value={password}
            onChange={changePassword}
          />
        </label>
        <button>로그인</button>
      </form>
    </div>
  );
};

export default SignIn;
