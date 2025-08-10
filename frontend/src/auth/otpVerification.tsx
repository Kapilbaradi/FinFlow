import { useState } from "react";

import AuthWrapper from "./AuthWrapper";

const OTPVerify = () => {
  const [error, setError] = useState<Record<string, string | null>>({
    otp: null,
  });

  const validateOTP = {
    otp: function (otp: string) {
      return otp && otp.length == 5 ? null : "Please enter correct OTP";
    },
  };

  const handleError = (formError: Record<string, string | null>) => {
    setError(formError);
    console.log(error.otp);
  };

  return (
    <AuthWrapper
      header="Verify your Account"
      description="Enter Your OTP"
      buttonText="Verify OTP"
      navigationText="Back"
      navigationLink="/signup"
      buttonNavigation="/"
      validate={validateOTP}
      handleError={handleError}
    >
      <div className="w-full basis-1/2 justify-end gap-2">
        <div className="mb-3">
          <div className="w-full px-4 py-2 bg-[#F3F4F6FF] flex items-center rounded-2xl border border-red-500">
            <input
              type="text"
              placeholder="OTP"
              className="w-full px-2 bg-transparent border-0 outline-none text-base"
              name="otp"
            />
          </div>
          {error.otp && (
            <p className="text-red-600 text-sm font-semibold text-left ms-2">
              {error.otp}
            </p>
          )}
        </div>
      </div>
    </AuthWrapper>
  );
};

export default OTPVerify;
