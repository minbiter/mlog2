import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
});

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.patch["Content-Type"] = "application/json";

// instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;

export default instance;
