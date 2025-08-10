import { createContext, ReactNode, useContext } from "react";

import { SEND_SIGNUP_OTP, VERIFY_OTP } from "../routes/OTPRoutes";

interface verifyOTPType {
  email: string;
  otp: number;
}

interface OTPContextType {
  signUPOTP: (email: string) => Promise<{ success: boolean }>;
  verifyOTP: (verifyData: verifyOTPType) => Promise<{ success: boolean }>;
}

const OTPContext = createContext<OTPContextType | null>(null);

export const OTProvider = ({ children }: ReactNode) => {
  const signUPOTP = async (email: string) => {
    const response = await fetch(SEND_SIGNUP_OTP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });

    const data = await response.json();
    const { success, message } = data;
    console.log(message);
    return success;
  };

  const verifyOTP = async (verifyData: verifyOTPType) => {
    const response = await fetch(VERIFY_OTP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(verifyData),
    });

    const data = await response.json();
    const { success, message } = data;
    console.log(message);
    return success;
  };

  return (
    <OTPContext.Provider value={{ signUPOTP, verifyOTP }}>
      {children}
    </OTPContext.Provider>
  );
};

export const useOTPContext = () => {
  const context = useContext(OTPContext);
  if (context === null) {
    throw new Error("Auth context is null");
  }
  return context;
};
