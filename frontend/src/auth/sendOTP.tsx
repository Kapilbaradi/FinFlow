import finflowlogo from "../assets/finflowlogo.webp";

interface PropeType {
  email: string;
  username: string;
  error: { errorField: string; errorStatus: boolean; errorMessage: string }[];
  nextStep: () => void;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const SendOTP = ({
  email,
  setEmail,
  username,
  setUsername,
  nextStep,
}: PropeType) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white px-4 py-8">
      <div className="w-full bg-white p-6 rounded-2xl shadow-md inset-shadow-md md:py-[48px] xl:w-[1100px] h-100 flex items-center">
        <form className="w-full space-y-4 flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-center">
            <div className="mb-4 px-4 text-left basis-1/2">
              <img src={finflowlogo} alt="FinFlow Logo" className="h-8 mb-2" />
              <h2 className="text-5xl my-3">Create your FinFlow Account</h2>
              <p className="text-base">Enter Your Email</p>
            </div>
            <div className="basis-1/2 justify-end gap-2">
              <div className="mb-3">
                <div className="w-full px-4 py-2 bg-[#F3F4F6FF] flex items-center rounded-2xl border border-red-500">
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
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>

                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-2 bg-transparent border-0 outline-none text-base"
                    name="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
                <p className="text-red-600 text-sm font-semibold text-left ms-2">
                  Username should atleast contain 4 letters
                </p>
              </div>
              <div className="w-full px-4 py-2 bg-[#F3F4F6FF] flex items-center rounded-2xl border border-red-500">
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
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <p className="text-red-600 text-sm font-semibold text-left ms-2">
                Please Enter valid Email
              </p>
            </div>
          </div>
          <button
            type="button"
            className="w-auto block ms-auto bg-[#636AE8FF] text-white py-[6px] px-4 rounded-xl text-base cursor-pointer self-end"
            onClick={nextStep}
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendOTP;
