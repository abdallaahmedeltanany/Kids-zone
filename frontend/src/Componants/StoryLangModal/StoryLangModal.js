import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Footer from "../Footer/Footer";
import ABC from "../Assets/ABC.png";
import arabic from "../Assets/arbic.png";
import kelma from "../Assets/kelma.png";
import word from "../Assets/word.png";

const StoryLangModal = (props) => {
  const navigate = useNavigate("");
  const handleArabicStory = () => {
    navigate("/arabicstory");
  };
  const handleEnglishStory = () => {
    navigate("/englishstory");
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="choose-language">
        <p>Choose language</p>
        <div className="languages">
          <div className="arabic" onClick={handleArabicStory}>
            <img src={arabic} alt="" />
            <p className="kelma">عربي</p>
          </div>
          <div className="english" onClick={handleEnglishStory}>
            <img src={ABC} alt="" />
            <p className="word">English</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default StoryLangModal;
