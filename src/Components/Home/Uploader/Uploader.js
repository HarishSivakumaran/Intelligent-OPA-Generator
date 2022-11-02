import { faCloudArrowUp, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import FileContext from "../../../Context/FileContext";
import "./Uploader.scss";
import OPAFileHandler from "../../../Utilities/FileHandler";
import { useNavigate } from "react-router-dom";

const Uploader = () => {
  const [file, setFile] = useContext(FileContext);
  const navigate = useNavigate();

  const setSelectedFile = (zFile) => {
    OPAFileHandler.parseZip(zFile, setFile);
    navigate("/addOPA");
  };
  return (
    <div className="uploader">
      <div className="select">
        <FontAwesomeIcon
          onClick={() => {
            document.getElementById("file-upload").click();
          }}
          icon={faCloudArrowUp}
        />
        <h2>Upload your project here</h2>
        <input
          id="file-upload"
          type="file"
          name="fileUpload"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
      </div>
    </div>
  );
};

export default Uploader;
