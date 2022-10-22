import React from "react";
import Home from "../Home/Home";
import Uploader from "../Home/Uploader/Uploader";
import Navbar from "../NavBar/Navbar";
import "./Layout.scss";

const Layout = () => {
    return(
        <div className="Layout">
            <Navbar/>
            <Home/>
            <Uploader/>
        </div>
    );
};

export default Layout;