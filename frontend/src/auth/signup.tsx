import { useState } from "react";
// import finflowlogo from "../assets/finflowlogo.webp";
import SendOTP from "./sendOTP";
import { useSessionStorage } from "../customHooks/useSessionStorage";
import OTPVerify from "./otpVerification";
import CreatePassword from "./CreatePassword";
import AddProfilePic from "./AddProfilePic";

const SignUp = () => {
  //const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useSessionStorage("username", "");
  const [email, setEmail] = useSessionStorage("email", "");
  const [step, setStep] = useState<number>(4);

  const nextStep = () => {
    setStep((prev) => prev + 1);
    console.log(step);
  };
  return (
    <>
      {step == 1 && (
        <SendOTP
          email={email}
          setEmail={setEmail}
          username={username}
          setUsername={setUsername}
        />
      )}
      {step == 2 && <OTPVerify username={username} setUsername={setUsername} />}
      {step == 3 && <CreatePassword />}
      {step == 4 && <AddProfilePic />}
    </>
  );
};

export default SignUp;
