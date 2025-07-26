import { createContext, useContext, useState } from "react";

import {
  AuthContextChildrenType,
  LoginContextDataType,
  UserInfoType,
  AuthContextType,
} from "../types/contextTypes/AuthContextTypes";
import { LOGIN_URL, SIGNUP_URL } from "../routes/UserRoutes";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthContextChildrenType) => {
  const [user, setUser] = useState<UserInfoType>({} as UserInfoType);

  const login = async (userCredentials: LoginContextDataType) => {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    });
    const data = await response.json();
    const success: boolean = data.success;
    if (data.success) {
      setUser(data.user);
      const token: string = data.token;
      return { success, token };
    } else {
      console.log(data);
      const message: string = data.message;
      return { success, message };
    }
  };

  const signup = async (userCredentials: UserInfoType) => {
    console.log(userCredentials)
    const response = await fetch(SIGNUP_URL, {
      method: "POST",
      body: userCredentials,
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("Auth context is null");
  }
  return context;
}
