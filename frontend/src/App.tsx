import { useState } from "react";

// import Login from './auth/Login'
// import Signup from "./auth/signup";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserSettings from "./pages/UserSettings";
// import Home from "./pages/Home";
//import SendOTP from "./auth/sendOTP";

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
      {/* <SendOTP /> */}
      {/* <Login />  */}
      {/* <Signup /> */}
      <Navbar />
      {/* <Home setShowModal={setShowModal} showModal={showModal} /> */}
      <UserSettings />
      <Footer setShowModal={setShowModal}/>
    </>
  );
}

export default App;
