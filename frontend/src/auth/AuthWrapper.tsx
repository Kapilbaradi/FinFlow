import { FormEvent } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import {
  WrapperPropeType,
  LoginDataType,
  SignUpDataType,
  ErrorTypes,
} from "../types/authTypes.ts/AuthWrapperTypes";
import finflowlogo from "../assets/finflowlogo.webp";
import { useForm } from "../context/FormContext";
import { useAuth } from "../context/AuthContext";

function AuthWrapper({
  children,
  header,
  description,
  buttonText,
  buttonStyle,
  navigationLink,
  navigationText,
  buttonNavigation,
  validate,
  handleError,
}: WrapperPropeType) {
  const navigator = useNavigate();
  const { validateOnSubmit } = useForm();
  const { login, signup } = useAuth();
  const location = useLocation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pathname = location.pathname;
    const form = new FormData(event.currentTarget); // getting form data

    //converting FormData array into object key value pair. entries() contains the [name, value] of input as key value pair as array.
    const formData = Object.fromEntries(form.entries());

    // This method take signup, login fun as parameter and data as a paremeter and send to context api where data is send to server.
    const sendData = async (fun, data: LoginDataType | SignUpDataType) => {
      const { success, message, token } = await fun(data);

      // If success then generated authotoken will be stored in localstorage and navigated to home page.
      if (success && token) {
        localStorage.setItem("authtoken", token);
        navigator(buttonNavigation);
      } else {
        // if success failed then error message is sent to ui. These message is sent from server.
        const error: ErrorTypes = {
          email: message as string,
          password: message as string,
        };
        if (pathname == "/signup") {
          error.confirmPassword = message as string;
          error.username = message as string;
        }

        // This method is present in login and createAccount page. Sets the error.
        handleError(error);
      }
    };

    // validateOnSubmit validates input as returns true if input is correct else return the error message which is present in validate object that is sent from the login or createAccountPage.
    const { isValid, error } = validateOnSubmit(formData, validate);
    if (!isValid) {
      // This method is present in login and createAccount page. Sets the error.
      handleError(error);
      return;
    }

    //making login data match the type of the context login data.
    const loginData: LoginDataType = {
      email: formData["email"] as string,
      password: formData["password"] as string,
    };
    if (pathname == "/login") {
      sendData(login, loginData);
    } else {
      //making signup data match the type of the context signup data.
      const signUpData: SignUpDataType = {
        ...loginData,
        username: formData["username"] as string,
        profilePic: formData["profilePic"] as File,
      };
      sendData(signup, signUpData);
    }
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
                  {navigationText}
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
