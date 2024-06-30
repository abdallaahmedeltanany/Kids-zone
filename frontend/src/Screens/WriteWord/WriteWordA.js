import React from "react";
import Navbar from "../../Componants/Navbar/Navbar";
import Footer from "../../Componants/Footer/Footer.js";
import "./WriteWord.css";
import DrawingCanvasWA from "../../Componants/DrawingCanvas/DrawingCanvasWA.js";

const WriteWordA = () => {
  return (
    <>
      <Navbar />
      
      <div className="write-word">
      <h1>Write Word</h1>
      <div className="Word-Draw"></div>
        <DrawingCanvasWA/>
      </div>
      <Footer />
    </>
  );
};

export default WriteWordA;
