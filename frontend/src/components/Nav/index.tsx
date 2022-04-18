import React, { useState, useContext, useCallback } from "react";
import SignIn from "components/modal/SignIn";
import SignUp from "components/modal/SignUp";
import { AuthContext } from "context/AuthProvider";
import { Link } from "react-router-dom";

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
    <>
      <Link to="/">Home</Link>
      <Link to="/main">Main</Link>
      <Link to="/:id/test">test</Link>
      {auth.accessToken ? (
        auth.email
      ) : (
        <div>
          <button onClick={openSignInModal}>Sign In</button>
          <button onClick={openSignUpModal}>Sign Up</button>
        </div>
      )}
      {isClickedSignIn ? <SignIn /> : null}
      {isClickedSignUp ? <SignUp /> : null}
    </>
  );
};

export default Nav;
