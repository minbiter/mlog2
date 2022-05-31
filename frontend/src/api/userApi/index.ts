import { instance, instanceAuth } from "api";
import { ISignInApi, ISignUpApi, IRefreshApi, ISignOutApi } from "types/user";

export const signInUser: ISignInApi = async (data) => {
  return await instance.post("/user", data, { withCredentials: true });
};

export const signUpUser: ISignUpApi = async (data) => {
  return await instance.post("/user/signup", data, { withCredentials: true });
};

export const refreshUser: IRefreshApi = async () => {
  return await instance.get("/refresh", { withCredentials: true });
};

export const signOutUser: ISignOutApi = async () => {
  return await instanceAuth.delete("/user", { withCredentials: true });
};
