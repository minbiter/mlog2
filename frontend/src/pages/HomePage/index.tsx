import React, { useState } from "react";
import Login from "components/modal/Login";

const HomePage = () => {
  const [isClickedLogin, setIsClickedLogin] = useState(false);

  const openLoginModal = () => {
    setIsClickedLogin((prev) => !prev);
  };
  console.log("HomePage Rendering");

  return (
    <>
      <button onClick={openLoginModal}>로그인</button>
      {isClickedLogin ? <Login /> : null}
    </>
  );
};

export default HomePage;
