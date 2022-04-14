import instance from "api";
import { LoginApi } from "types/user";

export const userLogin: LoginApi = async (data) => {
  return await instance.post("/user", { email: data.email });
};
