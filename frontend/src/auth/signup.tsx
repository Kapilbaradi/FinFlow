import React from "react";
import finflowlogo from "../assets/finflowlogo.webp"

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white px-4 py-8">
      {/* Left Image Section */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <img
          src="../assets/finflowLogo.webp" // Replace with your actual image
          alt="Signup Graphic"
          className="max-w-xs md:max-w-sm lg:max-w-md"
        />
      </div>

      {/* Signup Form Section */}
      <div className="w-full md:w-1/2 max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <img src={finflowlogo} alt="FinFlow Logo" className="h-8 mb-2" />
          <h2 className="text-2xl font-bold text-gray-900">
            Let's Get Started <span role="img" aria-label="rocket">🚀</span>
          </h2>
          <p className="text-gray-500 text-sm">Sign up your account</p>
        </div>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="jrobinson@hotmail.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Hellojrobinson@123"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <p className="text-green-600 text-sm font-semibold">
            Great job! Your password is strong.
          </p>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md transition duration-300"
          >
            Create my account
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4">
          By continuing you agree to our <span className="font-semibold">Terms & Conditions</span> and <span className="font-semibold">Privacy Policy</span>.
        </p>

        <p className="text-sm mt-2">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
