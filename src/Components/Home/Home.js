import React from "react";
import "./Home.scss";
import image from "../../Assets/Images/image.jpg";

const Home = () => {
  return (
    <div className="Home">
      <div className="text">
        <h1># Generate</h1>
        <h1> Intelligent</h1>
        <h1> OPA</h1>
      </div>
      <div>
        <img src={image}></img>
      </div>
    </div>
  );
};

export default Home;
