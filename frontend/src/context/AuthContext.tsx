import { createContext, ReactNode, useContext, useState } from "react";

import { LOGIN_URL, SIGNUP_URL } from "../routes/UserRoutes";

interface AuthContextChildrenType {
  children: ReactNode;
}

interface AuthContextType {
  user: UserInfoType;
  login: (userCredentials: LoginDataType) => Promise<
    | {
        success: boolean;
        token: string;
        message?: undefined;
      }
    | {
        success: boolean;
        message: string;
        token?: undefined;
      }
  >;
}

interface LoginDataType {
  email: string;
  password: string;
}

interface UserInfoType {
  username: string;
  email: string;
  password: string;
  profilePic: File;
  // profilePicId: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthContextChildrenType) => {
  const [user, setUser] = useState<UserInfoType>({} as UserInfoType);

  const login = async (userCredentials: LoginDataType) => {
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

  const signup = async () => {
    const response = await fetch(SIGNUP_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
    })
  }
  return (
    <AuthContext.Provider value={{ user, login }}>
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
