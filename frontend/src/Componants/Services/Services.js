import React, { useState } from "react";
import "../Services/Services.css";
import Artboard_70 from "../Assets/Artboard_70.png";
import number_blocks from "../Assets/number_blocks.svg";
import write_word from "../Assets/text.svg";
import draw from "../Assets/draw.png";
import story from "../Assets/storytelling.svg";
import learn_letter from "../Assets/learn letter.png";
import ChooseLang from "../ChooseLang/ChooseLang";
import { useNavigate } from "react-router-dom";
import ChooseLangModal from "../ChooseLangModal/ChooseLangModal";
import StoryLangModal from "../StoryLangModal/StoryLangModal";
const Services = () => {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate("");
  const [numberModal, setNumberModal] = useState(false);
  const [wordModal, setWordModal] = useState(false);
  const handleNumberModal = () => {
    setNumberModal(true);
    setModalShow(true);
  };
  const handleWordModal = () => {
    setWordModal(true);
    setModalShow(true);
  };
  const handleDraw=()=>{
    navigate("/draw");
  }
  const [storyModal, setStoryModal] = useState(false);
  return (
    <>
      <ChooseLangModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        numberModal={numberModal}
        setNumberModal={setNumberModal}
        wordModal={wordModal}
        setWordModal={setWordModal}
      />
      <StoryLangModal 
       show={storyModal}
       onHide={() => setStoryModal(false)}
      />
      <div className="services" id="Services">
        <h1>Services</h1>
        <div className="services-container">
          <div
            className="serv-card"
            onClick={() => {
              setModalShow(true);
            }}
          >
            <img src={learn_letter} alt="" />
            <p>learn letter</p>
          </div>
          <div className="serv-card" onClick={handleNumberModal}>
            <img src={number_blocks} alt="" />
            <p>learn number</p>
          </div>
          <div className="serv-card" onClick={()=>{
            setStoryModal(true);
          }}>
            <img src={story} alt="" />
            <p>Story</p>
          </div>
          
          <div className="serv-card" onClick={handleWordModal}>
            <img src={write_word} alt="" />
            <p>Write word</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
