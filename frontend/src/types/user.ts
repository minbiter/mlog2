export interface UserLoginRequestData {
  email: string;
  password: string;
}

export interface UserLoginResponseData {
  result: boolean;
  data: {
    id?: number;
    email?: string;
    login?: string;
  };
}

export interface LoginApi {
  (data: { email: string; password: string }): Promise<{
    result: boolean;
    data: {
      id?: number;
      email?: string;
      login?: string;
    };
  }>;
}
