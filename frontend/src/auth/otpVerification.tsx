import AuthWrapper from "./AuthWrapper";

interface PropeType {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const OTPVerify = ({ username, setUsername }: PropeType) => {
  return (
    <AuthWrapper
      header="Verify your Account"
      description="Enter Your OTP"
      buttonText="Verify OTP"
    >
      <div className="w-full basis-1/2 justify-end gap-2">
        <div className="mb-3">
          <div className="w-full px-4 py-2 bg-[#F3F4F6FF] flex items-center rounded-2xl border border-red-500">
            <input
              type="text"
              placeholder="OTP"
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
      </div>
    </AuthWrapper>
  );
};

export default OTPVerify;
