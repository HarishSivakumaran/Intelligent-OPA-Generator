import React from "react";
import "./Navbar.scss";
import {
  faHammer,
  faJetFighter,
  faMagicWandSparkles,
  faSearchDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav-bar">
      <div className="nav-logo">
        <Link to="/">
          <FontAwesomeIcon icon={faMagicWandSparkles} color="black" />
        </Link>
        <h2 color="#252525">SAP IntelliCode</h2>
      </div>
      <div className="nav-tabs">
        <h2>Documentation</h2>
        <h2
          onClick={() => {
            window.open(
              "https://sap.sharepoint.com/sites/201295/SitePages/SAP-IntelliCode.aspx",
              "_blank"
            );
          }}
        >
          About Us
        </h2>
        <h2>Help</h2>
      </div>
    </div>
  );
};

export default Navbar;
