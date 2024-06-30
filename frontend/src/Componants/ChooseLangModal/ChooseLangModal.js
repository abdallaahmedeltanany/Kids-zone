import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Footer from "../Footer/Footer";
import ABC from "../Assets/ABC.png";
import arabic from "../Assets/arbic.png";
import kelma from "../Assets/kelma.png";
import word from "../Assets/word.png";
import { useNavigate } from "react-router-dom";
import "./ChooseLangModal.css";
const ChooseLangModal = (props) => {
  const navigate = useNavigate("");
  const handleNavigation = () => {
    navigate("/learnletter");
  };
  const handleNavigationA = () => {
    navigate("/learnletterarabic");
  };
  const numberNavigation = () => {
    navigate("/learnnumber");
  };
  const numberNavigationA = () => {
    navigate("/learnnumberarabic");
  };
  const handleWordNavigation = () => {
    navigate("/word");
  };
  const handleWordNavigationA = () => {
    navigate("/wordarabic");
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
          <div
            className="arabic"
            onClick={
              props.numberModal
                ? numberNavigationA
                : props.wordModal
                ? handleWordNavigationA
                : handleNavigationA
            }
          >
            <img src={arabic} alt="" />
            <p className="kelma">عربي</p>
          </div>
          <div
            className="english"
            onClick={
              
              props.numberModal
                ? numberNavigation
                : props.wordModal
                ? handleWordNavigation
                : handleNavigation
            }
          >
            <img src={ABC} alt="" />
            <p className="word">English</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChooseLangModal;
