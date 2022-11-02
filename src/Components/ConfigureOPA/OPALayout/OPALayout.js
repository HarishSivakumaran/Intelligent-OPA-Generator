import React from "react";
import Navbar from "../../NavBar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Odata from "../oData/Odata";

const OPALayout = () => {
  toast("Poject uploaded Successfuly !", {
    position: toast.POSITION.BOTTOM_LEFT,
  });
  return (
    <div>
      <Navbar />
      <Odata></Odata>
      <ToastContainer />
    </div>
  );
};

export default OPALayout;
