import React from "react";
import EntitySet from "../EntitySet/EntitySet";
import "./Odata.scss";

const Odata = () => {
  return (
    <div className="oData">
      <div id="div1">
        <div id="rock1"></div>
        <div id="rock2"></div>
        <div id="rock3"></div>
        <div id="rock4"></div>
        <div id="rock5"></div>
        <div id="rock6"></div>
        <div id="rock7"></div>
        <div id="rock8"></div>
        <div id="diva1">
          <h1>oData Services</h1>
        </div>
      </div>
      <EntitySet />
    </div>
  );
};

export default Odata;
