import { JSX } from "react";

import finflowlogo from "../assets/finflowlogo.webp";

interface WrapperPropeType {
  children: JSX.Element;
  buttonText: string;
  header: string;
  description: string;
  buttonStyle?: string;
}

function AuthWrapper({
  children,
  header,
  description,
  buttonText,
  buttonStyle,
}: WrapperPropeType) {
  return (
    <div className="lg:min-h-screen sm:flex xl:flex-row items-center justify-center bg-white sm:px-4 py-2 sm:py-8">
      <div className="w-full bg-white p-2 rounded-2xl sm:p-6 sm:shadow-md sm:inset-shadow-md sm:py-[48px] sm:w-[500px] md:w-[700px] xl:w-[1100px] sm:h-full flex items-center">
        <form className="w-full space-y-4 flex flex-col items-center justify-between">
          <div className="w-full flex flex-col md:flex-row items-center justify-center">
            <div className="w-full mb-9 sm:mb-4 xl:px-4 text-left basis-1/2">
              <img src={finflowlogo} alt="FinFlow Logo" className="h-8 mb-2" />
              <h2 className="text-4xl xl:text-5xl mt-8 mb-3 xl:my-3">
                {header}
              </h2>
              <p className="text-base">{description}</p>
            </div>
            {children}
          </div>
          <div className="w-full md:w-1/2 ms-auto">
            <div className="flex items-center mt-2 md:mt-9">
              {/* <div> */}
              <p className="text-sm ms-auto">
                <a href="/login" className="text-[#636AE8FF] p-3 hover:bg-[#636AE808] hover:rounded-full">
                  Create Account
                </a>
              </p>
              {/* </div> */}
              <button
                type="button"
                className={`w-auto block ms-5 bg-[#636AE8FF] text-white py-[6px] px-4 rounded-xl text-base cursor-pointer self-end ${buttonStyle}`}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthWrapper;
