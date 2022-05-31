export interface ISignInApi {
  (data: { email: string; password: string }): Promise<{
    data: {
      result: boolean;
      data: {
        id?: number;
        email?: string;
        signin?: string;
        accessToken?: string;
        isSurvey?: number;
      };
    };
  }>;
}

export interface ISignUpApi {
  (data: {
    email: string;
    password: string;
    passwordConfirm: string;
  }): Promise<{
    data: {
      result: boolean;
      data: {
        email?: string;
        password?: string;
        passwordConfirm?: string;
      };
    };
  }>;
}

export interface IRefreshApi {
  (): Promise<{
    data: {
      result: boolean;
      data: { email?: string; accessToken?: string; isSurvey?: number };
    };
  }>;
}

export interface ISignOutApi {
  (): Promise<{
    data: {
      result: boolean;
    };
  }>;
}
