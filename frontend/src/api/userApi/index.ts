import instance from "api";
import { SignInApi, SignUpApi } from "types/user";

export const signInUser: SignInApi = async (data) => {
  return await instance.post("/user", data, { withCredentials: true });
};

export const signUpUser: SignUpApi = async (data) => {
  return await instance.post("/user/signup", data, { withCredentials: true });
};
