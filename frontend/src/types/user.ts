export interface SignInApi {
  (data: { email: string; password: string }): Promise<{
    data: {
      result: boolean;
      data: {
        id?: number;
        email?: string;
        signin?: string;
        accessToken?: string;
      };
    };
  }>;
}

export interface SignUpApi {
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
