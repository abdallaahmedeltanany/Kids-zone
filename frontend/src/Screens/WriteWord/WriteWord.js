import React from "react";
import Navbar from "../../Componants/Navbar/Navbar";
import Footer from "../../Componants/Footer/Footer.js";
import "./WriteWord.css";
import DrawingCanvasW from "../../Componants/DrawingCanvas/DrawingCanvasW.js";

const WriteWord = () => {
  return (
    <>
      <Navbar />
      
      <div className="write-word">
      <h1>Write Word</h1>
      <div className="Word-Draw"></div>
        <DrawingCanvasW/>
      </div>
      <Footer />
    </>
  );
};

export default WriteWord;
