import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { FormProvider } from "./context/FormContext";
import Login from "./auth/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import UserSettings from "./pages/UserSettings";
import ChangeUserDetail from "./pages/ChangeUserDetail";
import NotFound from "./pages/NotFound";
import CreateAccount from "./auth/CreateAccount";
import OTPVerify from "./auth/otpVerification";
import { OTProvider } from "./context/OPTContext";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <CreateAccount /> },
  { path: "/verify-otp", element: <OTPVerify /> },
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
        <Footer />
      </div>
    ),
  },
  {
    path: "/reports",
    element: (
      <div>
        <Navbar />
        <Reports />
        <Footer />
      </div>
    ),
  },
  {
    path: "/user-settings",
    element: (
      <div>
        <Navbar />
        <UserSettings />
        <Footer />
      </div>
    ),
    children: [
      {
        path: "change-username",
        element: <ChangeUserDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  const [showModal, setShowModal] = useState(false);
  // const setModal = () => {
  //   if(showModal) {
  //     const body = document.getElementsByTagName("body")
  //     body[0].style.backgroundColor = "rgba("
  //   }
  // }
  return (
    <>
      {/* <Navbar /> */}
      <AuthProvider>
        <OTProvider>
          <FormProvider>
            <RouterProvider router={router} />
          </FormProvider>
        </OTProvider>
      </AuthProvider>
    </>
  );
}

export default App;
