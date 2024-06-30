import React, { useState,useEffect } from "react";
import Navbar from "../../Componants/Navbar/Navbar";
import Footer from "../../Componants/Footer/Footer.js";
import "./LearnLetter.css";
import sketch from "../../Componants/Assets/sketch.svg";
import play_video from "../../Componants/Assets/playVideo.svg";
import DrawingCanvasA from "../../Componants/DrawingCanvas/DrawingCanvasA.js";

const LearnLetterA = () => {
  const [letters, setLetters] = useState([
    {
      id: 1,
      value: "أ",
      video: "https://www.youtube.com/embed/VEzvA8yWQMU?si=FW8pMGSDDjNmdM6i",
    },
    {
      id: 2,
      value: "ب",
      video: "https://www.youtube.com/embed/7qmBmmo2bkM?si=j2ai7WJ-uw7dD3gW",
    },
    {
      id: 3,
      value: "ت",
      video: "https://www.youtube.com/embed/QfHhh7OJTmM?si=FxrsjpEjC9Iai93G",
    },
    {
      id: 4,
      value: "ث",
      video: "https://www.youtube.com/embed/6o7wnshm42Y?si=xfSQgr1siSuhN_1N",
    },
    {
      id: 5,
      value: "ج",
      video: "https://www.youtube.com/embed/FWQTsAf-wxY?si=nLc10tpEd3fi0Vwo",
    },
    {
      id: 6,
      value: "ح",
      video: "https://www.youtube.com/embed/tKAyrtJAcMs?si=32eZDIAYTOdFgjL6",
    },
    {
      id: 7,
      value: "خ",
      video: "https://www.youtube.com/embed/V3nuBNzwVvI?si=YRMt-d0edmh1O5u-",
    },
    {
      id: 8,
      value: "د",
      video: "https://www.youtube.com/embed/GyvRXmOhdc8?si=ZqIUra5XkPpKvFFA",
    },
    {
      id: 9,
      value: "ذ",
      video: "https://www.youtube.com/embed/7JIBX0isDjc?si=nEukGzfzgXtN_R4I",
    },
    {
      id: 10,
      value: "ر",
      video: "https://www.youtube.com/embed/W26Qr5M7H8g?si=rZ4O2fqdkR6oVTCA",
    },
    {
      id: 11,
      value: "ز",
      video: "https://www.youtube.com/embed/lkIab0IezkI?si=e64OU0l-9P2j8rCo",
    },
    {
      id: 12,
      value: "س",
      video: "https://www.youtube.com/embed/6AXVcItp-D8?si=ykWGdtvo9-Z7ImZo",
    },
    {
      id: 13,
      value: "ش",
      video: "https://www.youtube.com/embed/WdmuAe3ieCo?si=pb0urQsqO-Oi5pve",
    },
    {
      id: 14,
      value: "ص",
      video: "https://www.youtube.com/embed/F6IgyTE2enE?si=zTGYWgyeuRsmj_C1",
    },
    {
      id: 15,
      value: "ض",
      video: "https://www.youtube.com/embed/Kf9up3L8oro?si=UBmE-Oj_IDDtZ6j_",
    },
    {
      id: 16,
      value: "ط",
      video: "https://www.youtube.com/embed/ukhpTJlOmNc?si=ZA6bFItHtLMKNPaY",
    },
    {
      id: 17,
      value: "ظ",
      video: "https://www.youtube.com/embed/NQPzAdL7DcY?si=Rl_P1cRb2TJ4vxOf",
    },
    {
      id: 18,
      value: "ع",
      video: "https://www.youtube.com/embed/pDmRNYwYJtg?si=fAGUWNuMthZPh9Wm",
    },
    {
      id: 19,
      value: "غ",
      video: "https://www.youtube.com/embed/n8lu340xfaw?si=2E6RRy_6p_kfHYo_",
    },
    {
      id: 20,
      value: "ف",
      video: "https://www.youtube.com/embed/hs55QY0kaUY?si=pewjvbHHftmzzNF_",
    },
    {
      id: 21,
      value: "ق",
      video: "https://www.youtube.com/embed/jhjwf3WeJOo?si=IK7Vyf9LZ7dZyoGp",
    },
    {
      id: 22,
      value: "ك",
      video: "https://www.youtube.com/embed/4wNXaQEKo2Q?si=CIhKanPq8m-Sr1MG",
    },
    {
      id: 23,
      value: "ل",
      video: "https://www.youtube.com/embed/-F8kMv0N5J8?si=WMpFwcjvCKq6ZMmt",
    },
    {
      id: 24,
      value: "م",
      video: "https://www.youtube.com/embed/gTUTAwAIPos?si=Pwpfxr3NJIpMnST1",
    },
    {
      id: 25,
      value: "ن",
      video: "https://www.youtube.com/embed/dp703Di5dp8?si=yl_GozuA6ADYTLmu",
    },
    {
      id: 26,
      value: "ه",
      video: "https://www.youtube.com/embed/BCM4Dd-fU2s?si=M7Wr80r2Bae6sU1x",
    },
  ]);
  const [chosenLetter, setChosenLetter] = useState("");
  const [letterVideo, setLetterVideo] = useState("");
  const [viewVideo, setViewVideo] = useState("false");
  const [viewBtn, setViewBtn] = useState("none");
  const[viewCanvas,SetViewCanvas] = useState(false);

  const handleVideo = () => {
    setViewVideo(true);
    setViewBtn("null");
  };
  const handleCloseVideo = () => {
    setViewVideo(false);
    setViewBtn("none");
  };
  const handleCanvas = () => {
    SetViewCanvas(!viewCanvas);
   
  };
  
  

  return (
    <div>
      <Navbar />
      <div className="learn-letter">
        <h1>اختر الحرف</h1>
        <div className="letters-list">
          <div className="letters-scroll">
            <ul className="letters">
              {letters.map((letter,id) => {
                return (
                  <li
                    key={id}
                    onClick={() => {
                      setChosenLetter(letter.value);
                      setLetterVideo(letter.video);
                      setViewVideo(false);
                      setViewBtn("none");
                    }}
                  >
                    {letter.value} <hr />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="to-do">
          <div className="view-video" onClick={handleVideo}>
            <img src={play_video} alt="" />
            <p>Play Video</p>
          </div>
          <div className="draw" onClick={handleCanvas}>
            <img src={sketch} alt="" />
            <p>Draw</p>
          </div>
          <div className="video-draw">
            <div className="video-frame">
            <iframe
              src={viewVideo === true ? letterVideo : null}
              frameborder="0"
            ></iframe>
            <button
              className="close-btn"
              onClick={handleCloseVideo}
              style={{ display: viewBtn === "none" ? "none" : "" }}
            >
              Close Video
            </button>
          </div>
          <div className={viewCanvas==true?"canvas-frame":"remove-canvas"}>
              <DrawingCanvasA 
              className="the-canvas"
              chosenLetter={chosenLetter} />
            </div>
          </div>
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LearnLetterA;
