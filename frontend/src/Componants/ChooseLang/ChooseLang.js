import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./ChooseLang.css";
import ABC from "../Assets/ABC.png";
import arabic from "../Assets/arbic.png";
import kelma from "../Assets/kelma.png";
import word from "../Assets/word.png";
import { useNavigate } from "react-router-dom";
const ChooseLang = () => {
  const navigate = useNavigate("");
  const handleNavigation = () => {
    navigate("/learnletter");
  };

  return (
    <>
      <Navbar />
      <div className="choose-language" id="">
        <h1>Learn Letter</h1>
        <div className="cl-container">
          <p>Choose language</p>
          <div className="languages">
            <div className="arabic" onClick={handleNavigation}>
              <img src={arabic} alt="" />
              <p className="kelma">عربي</p>
            </div>
            <div className="english">
              <img src={ABC} alt="" />
              <p className="word">English</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChooseLang;
