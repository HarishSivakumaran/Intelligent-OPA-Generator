import { faCloudArrowUp, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Uploader.scss";

const Uploader = () => {
  return (
    <div className="uploader">
      <div className="select">
        <FontAwesomeIcon onClick={()=>{document.getElementById('file-upload').click();}} icon={faCloudArrowUp} />
        <h2>Upload your project here</h2>
        <input id="file-upload" type="file" name="fileUpload" />
      </div>
    </div>
  );
};

export default Uploader;
