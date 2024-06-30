import React, { useState } from "react";
import Navbar from "../../Componants/Navbar/Navbar";
import Footer from "../../Componants/Footer/Footer.js";
import "./LearnNumber.css";
import sketch from "../../Componants/Assets/sketch.svg";
import play_video from "../../Componants/Assets/playVideo.svg";
import DrawingCanvasNA from "../../Componants/DrawingCanvas/DrawingCanvasNA.js";

const LearnNumberA = () => {
  const [numbers, setNumbers] = useState([
    {
      id: 1,
      value: "١",
      video: "https://www.youtube.com/embed/Qnr6dl0xQV4?si=vdUYoXKYC4t62ahX",
    },
    {
      id: 2,
      value: "٢",
      video: "",
    },
    {
      id: 3,
      value: "٣",
      video: "",
    },
    {
      id: 4,
      value: "٤",
      video: "",
    },
    {
      id: 5,
      value: "٥",
      video: "",
    },
    {
      id: 6,
      value: "٦",
      video: "",
    },
    {
      id: 7,
      value: "٧",
      video: "",
    },
    {
      id: 8,
      value: "٨",
      video: "",
    },
    {
      id: 9,
      value: "٩",
      video: "",
    },
    {
      id: 10,
      value: "١٠",
      video: "",
    },
    {
      id: 11,
      value: "١١",
      video: "",
    },
    {
      id: 12,
      value: "١٢",
      video: "",
    },
    {
      id: 13,
      value: "١٣",
      video: "",
    },
    {
      id: 14,
      value: "١٤",
      video: "",
    },
    {
      id: 15,
      value: "١٥",
      video: "",
    },
    {
      id: 16,
      value: "١٦",
      video: "",
    },
    {
      id: 17,
      value: "١٧",
      video: "",
    },
    {
      id: 18,
      value: "١٨",
      video: "",
    },
    {
      id: 19,
      value: "١٩",
      video: "",
    },
    {
      id: 20,
      value: "٢٠",
      video: "",
    },
    {
      id: 21,
      value: "٢١",
      video: "",
    },
    {
      id: 22,
      value: "٢٢",
      video: "",
    },
    {
      id: 23,
      value: "٢٣",
      video: "",
    },
    {
      id: 24,
      value: "٢٤",
      video: "",
    },
    {
      id: 25,
      value: "٢٥",
      video: "",
    },
    {
      id: 26,
      value: "٢٦",
      video: "",
    },
    {
      id: 27,
      value: "٢٧",
      video: "",
    },
    {
      id: 28,
      value: "٢٨",
      video: "",
    },
    {
      id: 29,
      value: "٢٩",
      video: "",
    },
    {
      id: 30,
      value: "٣٠",
      video: "",
    },
    {
      id: 31,
      value: "٣١",
      video: "",
    },
    {
      id: 32,
      value: "٣٢",
      video: "",
    },
    {
      id: 33,
      value: "٣٣",
      video: "",
    },
    {
      id: 34,
      value: "٣٤",
      video: "",
    },
    {
      id: 35,
      value: "٣٥",
      video: "",
    },
    {
      id: 36,
      value: "٣٦",
      video: "",
    },
    {
      id: 37,
      value: "٣٧",
      video: "",
    },
    {
      id: 38,
      value: "٣٨",
      video: "",
    },
    {
      id: 39,
      value: "٣٩",
      video: "",
    },
    {
      id: 40,
      value: "٤٠",
      video: "",
    },
    {
      id: 41,
      value: "٤١",
      video: "",
    },
    {
      id: 42,
      value: "٤٢",
      video: "",
    },
    {
      id: 43,
      value: "٤٣",
      video: "",
    },
    {
      id: 44,
      value: "٤٤",
      video: "",
    },
    {
      id: 45,
      value: "٤٥",
      video: "",
    },
    {
      id: 46,
      value: "٤٦",
      video: "",
    },
    {
      id: 47,
      value: "٤٧",
      video: "",
    },
    {
      id: 48,
      value: "٤٨",
      video: "",
    },
    {
      id: 49,
      value: "٤٩",
      video: "",
    },
    {
      id: 50,
      value: "٥٠",
      video: "",
    },
    {
      id: 51,
      value: "٥١",
      video: "",
    },
    {
      id: 52,
      value: "٥٢",
      video: "",
    },
    {
      id: 53,
      value: "٥٣",
      video: "",
    },
    {
      id: 54,
      value: "٥٤",
      video: "",
    },
    {
      id: 55,
      value: "٥٥",
      video: "",
    },
    {
      id: 56,
      value: "٥٦",
      video: "",
    },
    {
      id: 57,
      value: "٥٧",
      video: "",
    },
    {
      id: 58,
      value: "٥٨",
      video: "",
    },
    {
      id: 59,
      value: "٥٩",
      video: "",
    },
    {
      id: 60,
      value: "٦٠",
      video: "",
    },
    {
      id: 61,
      value: "٦١",
      video: "",
    },
    {
      id: 62,
      value: "٦٢",
      video: "",
    },
    {
      id: 63,
      value: "٦٣",
      video: "",
    },
    {
      id: 64,
      value: "٦٤",
      video: "",
    },
    {
      id: 65,
      value: "٦٥",
      video: "",
    },
    {
      id: 66,
      value: "٦٦",
      video: "",
    },
    {
      id: 67,
      value: "٦٧",
      video: "",
    },
    {
      id: 68,
      value: "٦٨",
      video: "",
    },
    {
      id: 69,
      value: "٦٩",
      video: "",
    },
    {
      id: 70,
      value: "٧٠",
      video: "",
    },
    {
      id: 71,
      value: "٧١",
      video: "",
    },
    {
      id: 72,
      value: "٧٢",
      video: "",
    },
    {
      id: 73,
      value: "٧٣",
      video: "",
    },
    {
      id: 74,
      value: "٧٤",
      video: "",
    },
    {
      id: 75,
      value: "٧٥",
      video: "",
    },
    {
      id: 76,
      value: "٧٦",
      video: "",
    },
    {
      id: 77,
      value: "٧٧",
      video: "",
    },
    {
      id: 78,
      value: "٧٨",
      video: "",
    },
    {
      id: 79,
      value: "٧٩",
      video: "",
    },
    {
      id: 80,
      value: "٨٠",
      video: "",
    },
    {
      id: 81,
      value: "٨١",
      video: "",
    },
    {
      id: 82,
      value: "٨٢",
      video: "",
    },
    {
      id: 83,
      value: "٨٣",
      video: "",
    },
    {
      id: 84,
      value: "٨٤",
      video: "",
    },
    {
      id: 85,
      value: "٨٥",
      video: "",
    },
    {
      id: 86,
      value: "٨٦",
      video: "",
    },
    {
      id: 87,
      value: "٨٧",
      video: "",
    },
    {
      id: 88,
      value: "٨٨",
      video: "",
    },
    {
      id: 89,
      value: "٨٩",
      video: "",
    },
    {
      id: 90,
      value: "٩٠",
      video: "",
    },
    {
      id: 91,
      value: "٩١",
      video: "",
    },
    {
      id: 92,
      value: "٩٢",
      video: "",
    },
    {
      id: 93,
      value: "٩٣",
      video: "",
    },
    {
      id: 94,
      value: "٩٤",
      video: "",
    },
    {
      id: 95,
      value: "٩٥",
      video: "",
    },
    {
      id: 96,
      value: "٩٦",
      video: "",
    },
    {
      id: 97,
      value: "٩٧",
      video: "",
    },
    {
      id: 98,
      value: "٩٨",
      video: "",
    },
    {
      id: 99,
      value: "٩٩",
      video: "",
    },
    {
      id: 100,
      value: "١٠٠",
      video: "",
    },
  ]);
  const [chosenNumber, setChosenNumber] = useState(null);
  const [numberVideo, setNumberVideo] = useState("");
  const [viewVideo, setViewVideo] = useState("false");
  const [viewBtn, setViewBtn] = useState("none");
  const [viewCanvas, SetViewCanvas] = useState(false);

  const handleVideo = () => {
    setViewVideo(true);
    setViewBtn("null");
    console.log(viewBtn)
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
      <div className="learn-numbers">
        <h1>اختر الرقم</h1>
        <div className="numbers-list">
          <div className="numbers-scroll">
            <ul className="numbers">
              {numbers.map((number, id) => {
                return (
                  <li
                    key={id}
                    onClick={() => {
                      setChosenNumber(number.id);
                      setNumberVideo(number.video);
                      setViewVideo(false);
                      setViewBtn("none");
                      console.log(chosenNumber);
                    }}
                  >
                    {number.value} <hr />
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
              src={viewVideo === true ? numberVideo : null}
              frameborder="0"
            ></iframe>
            <button
              className="close-btn"
              onClick={handleCloseVideo}
              style={{ display: viewBtn === "none" ? "none" : "" }}
            >
              Close Video
            </button>
            <div
                className={
                  viewCanvas == true ? "canvas-frameNE" : "remove-canvasNE"
                }
              >
               <DrawingCanvasNA 
                className="the-canvasNE"
                chosenNumber={chosenNumber}/>
              </div>
          </div>
          </div>
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LearnNumberA;
