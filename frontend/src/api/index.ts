import axios from "axios";

const defaultAPI = process.env.REACT_APP_API ? process.env.REACT_APP_API : "http://localhost:8082/"

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_API,
  baseURL: defaultAPI,
});

export const instanceAuth = axios.create({
  // baseURL: process.env.REACT_APP_API,
  baseURL: defaultAPI,
});

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.patch["Content-Type"] = "application/json";
instanceAuth.defaults.headers.post["Content-Type"] = "application/json";
instanceAuth.defaults.headers.patch["Content-Type"] = "application/json";
