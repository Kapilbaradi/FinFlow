import { useState, FormEvent } from "react";
import finflowlogo from "../assets/finflowlogo.webp";
const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // getting the formdata which has triggred onsubmit event.
    const formData = new FormData(event.currentTarget);
    //getting formdata of inputs based on their names.
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return;
    }
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md inset-shadow-md md:py-[48px]">
        <div className="mb-4 px-4 text-left">
          <img src={finflowlogo} alt="FinFlow Logo" className="h-8 mb-2" />
          <p className="text-gray-500 text-sm">Login</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="w-full px-4 py-2 bg-[#F3F4F6FF] flex items-center rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-2 bg-transparent border-0 outline-none text-base"
              name="email"
            />
          </div>
          <div className="w-full px-4 py-2 bg-[#F3F4F6FF] flex items-center rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
            {showPassword ? (
              <>
                <input
                  type="text"
                  placeholder="Password"
                  className="w-full px-2 bg-transparent border-0 outline-none text-base"
                  name="password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </>
            ) : (
              <>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-2 bg-transparent border-0 outline-none text-base"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </>
            )}
          </div>

          {/* <p className="text-green-600 text-sm font-semibold">
            Great job! Your password is strong.
          </p> */}

          <button
            type="submit"
            className="w-full bg-[#636AE8FF] text-white py-[6px] px-4 rounded-xl text-base cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4">
          By continuing you agree to our
        </p>
        <p className="text-xs text-gray-500 mt-1 mb-5">
          <span className="font-semibold text-black">Terms & Conditions</span>{" "}
          and <span className="font-semibold text-black">Privacy Policy</span>.
        </p>

        <p className="text-sm mt-2 md:mt-9">
          Don't have an account?{" "}
          <a href="/login" className="text-[#636AE8FF] hover:underline">
            SignUP
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
