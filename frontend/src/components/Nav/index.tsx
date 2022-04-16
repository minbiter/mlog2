import { useState } from "react";
import SignIn from "components/modal/SignIn";
import SignUp from "components/modal/SignUp";

const Nav = () => {
  const [isClickedSignIn, setIsClickedSignIn] = useState(false);
  const [isClickedSignUp, setIsClickedSignUp] = useState(false);

  const openSignInModal = () => {
    setIsClickedSignIn((prev) => !prev);
  };
  const openSignUpModal = () => {
    setIsClickedSignUp((prev) => !prev);
  };

  return (
    <>
      <button onClick={openSignInModal}>Sign In</button>
      {isClickedSignIn ? <SignIn /> : null}
      <button onClick={openSignUpModal}>Sign Up</button>
      {isClickedSignUp ? <SignUp /> : null}
    </>
  );
};

export default Nav;
