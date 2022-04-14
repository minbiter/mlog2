import React, { useState } from "react";
import { userLogin } from "api/userApi/";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await userLogin({ email, password });
    console.log(response);
  };

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };
  return (
    <div>
      <form onSubmit={submitLogin}>
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

export default Login;
