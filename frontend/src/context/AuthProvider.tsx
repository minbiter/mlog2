import React, { createContext, useState, useEffect } from "react";
import { refreshUser } from "api/userApi";
import { instanceAuth } from "api";

interface IAuth {
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

  useEffect(() => {
    const fetchAccessToken = async () => {
      const { data } = await refreshUser();
      if (data.result) {
        setAuth({
          email: data.data.email,
          accessToken: data.data.accessToken,
          isSurvey: data.data.isSurvey,
        });
        instanceAuth.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.accessToken}`;
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
      {children}
    </AuthContext.Provider>
  );
};
