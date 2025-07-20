import { JSX } from "react";

interface ValidateLoginPropeType {
  email: (email: string) => string | null;
  password: (password: string) => string | null;
}

interface ValidateSignUPProp extends ValidateLoginPropeType {
  username: (username: string) => string | null;
  confirmPassword: (
    confirmPassword: string,
    password: string
  ) => string | string | null;
}
export interface WrapperPropeType {
  children: JSX.Element;
  buttonText: string;
  header: string;
  description: string;
  buttonStyle?: string;
  navigationLink: string;
  navigationText: string;
  buttonNavigation: string;
  validate: ValidateLoginPropeType | ValidateSignUPProp;
  handleError: (formError: Record<string, string | null>) => void;
}

export interface LoginDataType {
  email: string;
  password: string;
}

export interface SignUpDataType extends LoginDataType {
  username: string;
  confirmPassword?: string;
  profilePic: File;
}

export interface ErrorTypes{
  email: string | null;
  password: string | null;
  confirmPassword?: string | null;
  username?: string | null;
}
