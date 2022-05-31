import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { refreshUser } from "api/userApi";
import { instanceAuth } from "api";

interface IAuth {
  loading?: boolean;
  accessToken?: string;
  email?: string;
  isSurvey?: number;
}

interface IAuthContext {
  auth: IAuth;
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [auth, setAuth] = useState<IAuth>({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const { data } = await refreshUser();
      setLoading(false);
      if (data.result) {
        setAuth({
          loading: false,
          email: data.data.email,
          accessToken: data.data.accessToken,
          isSurvey: data.data.isSurvey,
        });
        instanceAuth.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.accessToken}`;
      } else {
        setAuth((prev) => {
          return { ...prev, loading: false };
        });
        history.replace("/");
      }
    };
    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (auth.accessToken) {
      instanceAuth.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth.accessToken}`;
    } else {
      delete instanceAuth.defaults.headers.common["Authorization"];
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {!loading ? children : null}
    </AuthContext.Provider>
  );
};
