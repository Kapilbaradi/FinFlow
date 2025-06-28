import { FormEvent, JSX } from "react";
import { useNavigate, Link } from "react-router-dom";

import finflowlogo from "../assets/finflowlogo.webp";

interface WrapperPropeType {
  children: JSX.Element;
  buttonText: string;
  header: string;
  description: string;
  buttonStyle?: string;
  navigationLink: string;
  buttonNavigation: string;
}

function AuthWrapper({
  children,
  header,
  description,
  buttonText,
  buttonStyle,
  navigationLink,
  buttonNavigation,
}: WrapperPropeType) {
  const navigator = useNavigate();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    //converting FormData array into object key value pair. entries() contains the [name, value] of input as key value pair as array.
    const data = Object.fromEntries(form.entries());

    if (!data.email) {
      console.log("Please enter your email address");
      return;
    }
    if (!data.password || `${data.password}`.length < 8) {
      console.log("Password should contain atleast 8 charecters");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(`${data.email}`);
    if (!isValidEmail) {
      console.log("Please enter valid email");
      return;
    }

    console.log("Validation completed");
  };
  return (
    <div className="lg:min-h-screen sm:flex xl:flex-row items-center justify-center bg-white p-4 sm:py-8">
      <div className="w-full bg-white p-2 rounded-2xl sm:p-6 sm:shadow-md sm:inset-shadow-md sm:py-[48px] sm:w-[500px] md:w-[700px] xl:w-[1100px] sm:h-full flex items-center">
        <form
          className="w-full space-y-4 flex flex-col items-center justify-between"
          onSubmit={handleSubmit}
          noValidate
        >
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
            <div className="flex items-center justify-between mt-2 md:mt-9">
              {/* <div> */}
              <p className="text-sm">
                <Link
                  to={`/${navigationLink}`}
                  className="text-[#636AE8FF] p-3 hover:bg-[#636AE808] hover:rounded-full"
                >
                  Create Account
                </Link>
              </p>
              {/* </div> */}
              <button
                type="submit"
                className={`w-auto block ms-5 bg-[#636AE8FF] text-white py-[6px] px-4 rounded-full text-base cursor-pointer self-end ${buttonStyle}`}
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
