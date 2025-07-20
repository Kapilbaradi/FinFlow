import { ReactNode } from "react";

export interface AuthContextChildrenType {
  children: ReactNode;
}

export interface LoginContextDataType {
  email: string;
  password: string;
}

export interface UserInfoType extends LoginContextDataType {
  username: string;
  profilePic?: File;
}

export interface AuthContextType {
  user: UserInfoType;
  login: (userCredentials: LoginContextDataType) => Promise<
    | {
        success: boolean;
        token: string;
        message?: undefined;
      }
    | {
        success: boolean;
        message: string;
        token?: string;
      }
  >;
  signup: (
    userCredentials: UserInfoType
  ) => Promise<
    | { success: boolean; token: string; message?: string }
    | { success: boolean; message: string; token?: string }
  > | void;
}
