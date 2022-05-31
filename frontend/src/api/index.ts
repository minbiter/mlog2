import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const instanceAuth = axios.create({
  baseURL: process.env.REACT_APP_API,
});

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.patch["Content-Type"] = "application/json";
instanceAuth.defaults.headers.post["Content-Type"] = "application/json";
instanceAuth.defaults.headers.patch["Content-Type"] = "application/json";
