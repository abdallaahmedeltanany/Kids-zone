import React, { useState } from "react";
import Navbar from "../../Componants/Navbar/Navbar";
import Footer from "../../Componants/Footer/Footer.js";
import "./LearnNumber.css";
import sketch from "../../Componants/Assets/sketch.svg";
import play_video from "../../Componants/Assets/playVideo.svg";
import DrawingCanvas from "../../Componants/DrawingCanvas/DrawingCanvas.js";
import DrawingCanvasNE from "../../Componants/DrawingCanvas/DrawingCanvasNE.js";

const LearnNumber = () => {
  const [numbers, setNumbers] = useState([
    {
      id: 1,
      value: "1",
      video: "https://www.youtube.com/embed/vrXnfSod4y4?si=Eu4Iv4Ca1tkBjO2H",
    },
    {
      id: 2,
      value: "2",
      video: "",
    },
    {
      id: 3,
      value: "3",
      video: "",
    },
    {
      id: 4,
      value: "4",
      video: "",
    },
    {
      id: 5,
      value: "5",
      video: "",
    },
    {
      id: 6,
      value: "6",
      video: "",
    },
    {
      id: 7,
      value: "7",
      video: "",
    },
    {
      id: 8,
      value: "8",
      video: "",
    },
    {
      id: 9,
      value: "9",
      video: "",
    },
    {
      id: 10,
      value: "10",
      video: "",
    },
    {
      id: 11,
      value: "11",
      video: "",
    },
    {
      id: 12,
      value: "12",
      video: "",
    },
    {
      id: 13,
      value: "13",
      video: "",
    },
    {
      id: 14,
      value: "14",
      video: "",
    },
    {
      id: 15,
      value: "15",
      video: "",
    },
    {
      id: 16,
      value: "16",
      video: "",
    },
    {
      id: 17,
      value: "17",
      video: "",
    },
    {
      id: 18,
      value: "18",
      video: "",
    },
    {
      id: 19,
      value: "19",
      video: "",
    },
    {
      id: 20,
      value: "20",
      video: "",
    },
    {
      id: 21,
      value: "21",
      video: "",
    },
    {
      id: 22,
      value: "22",
      video: "",
    },
    {
      id: 23,
      value: "23",
      video: "",
    },
    {
      id: 24,
      value: "24",
      video: "",
    },
    {
      id: 25,
      value: "25",
      video: "",
    },
    {
      id: 26,
      value: "26",
      video: "",
    },
    {
      id: 27,
      value: "27",
      video: "",
    },
    {
      id: 28,
      value: "28",
      video: "",
    },
    {
      id: 29,
      value: "29",
      video: "",
    },
    {
      id: 30,
      value: "30",
      video: "",
    },
    {
      id: 31,
      value: "31",
      video: "",
    },
    {
      id: 32,
      value: "32",
      video: "",
    },
    {
      id: 33,
      value: "33",
      video: "",
    },
    {
      id: 34,
      value: "34",
      video: "",
    },
    {
      id: 35,
      value: "35",
      video: "",
    },
    {
      id: 36,
      value: "36",
      video: "",
    },
    {
      id: 37,
      value: "37",
      video: "",
    },
    {
      id: 38,
      value: "38",
      video: "",
    },
    {
      id: 39,
      value: "39",
      video: "",
    },
    {
      id: 40,
      value: "40",
      video: "",
    },
    {
      id: 41,
      value: "41",
      video: "",
    },
    {
      id: 42,
      value: "42",
      video: "",
    },
    {
      id: 43,
      value: "43",
      video: "",
    },
    {
      id: 44,
      value: "44",
      video: "",
    },
    {
      id: 45,
      value: "45",
      video: "",
    },
    {
      id: 46,
      value: "46",
      video: "",
    },
    {
      id: 47,
      value: "47",
      video: "",
    },
    {
      id: 48,
      value: "48",
      video: "",
    },
    {
      id: 49,
      value: "49",
      video: "",
    },
    {
      id: 50,
      value: "50",
      video: "",
    },
    {
      id: 51,
      value: "51",
      video: "",
    },
    {
      id: 52,
      value: "52",
      video: "",
    },
    {
      id: 53,
      value: "53",
      video: "",
    },
    {
      id: 54,
      value: "54",
      video: "",
    },
    {
      id: 55,
      value: "55",
      video: "",
    },
    {
      id: 56,
      value: "56",
      video: "",
    },
    {
      id: 57,
      value: "57",
      video: "",
    },
    {
      id: 58,
      value: "58",
      video: "",
    },
    {
      id: 59,
      value: "59",
      video: "",
    },
    {
      id: 60,
      value: "60",
      video: "",
    },
    {
      id: 61,
      value: "61",
      video: "",
    },
    {
      id: 62,
      value: "62",
      video: "",
    },
    {
      id: 63,
      value: "63",
      video: "",
    },
    {
      id: 64,
      value: "64",
      video: "",
    },
    {
      id: 65,
      value: "65",
      video: "",
    },
    {
      id: 66,
      value: "66",
      video: "",
    },
    {
      id: 67,
      value: "67",
      video: "",
    },
    {
      id: 68,
      value: "68",
      video: "",
    },
    {
      id: 69,
      value: "69",
      video: "",
    },
    {
      id: 70,
      value: "70",
      video: "",
    },
    {
      id: 71,
      value: "71",
      video: "",
    },
    {
      id: 72,
      value: "72",
      video: "",
    },
    {
      id: 73,
      value: "73",
      video: "",
    },
    {
      id: 74,
      value: "74",
      video: "",
    },
    {
      id: 75,
      value: "75",
      video: "",
    },
    {
      id: 76,
      value: "76",
      video: "",
    },
    {
      id: 77,
      value: "77",
      video: "",
    },
    {
      id: 78,
      value: "78",
      video: "",
    },
    {
      id: 79,
      value: "79",
      video: "",
    },
    {
      id: 80,
      value: "80",
      video: "",
    },
    {
      id: 80,
      value: "80",
      video: "",
    },
    {
      id: 81,
      value: "81",
      video: "",
    },
    {
      id: 82,
      value: "82",
      video: "",
    },
    {
      id: 83,
      value: "83",
      video: "",
    },
    {
      id: 84,
      value: "84",
      video: "",
    },
    {
      id: 85,
      value: "85",
      video: "",
    },
    {
      id: 86,
      value: "86",
      video: "",
    },
    {
      id: 87,
      value: "87",
      video: "",
    },
    {
      id: 88,
      value: "88",
      video: "",
    },
    {
      id: 89,
      value: "89",
      video: "",
    },
    {
      id: 90,
      value: "90",
      video: "",
    },
    {
      id: 91,
      value: "91",
      video: "",
    },
    {
      id: 92,
      value: "92",
      video: "",
    },
    {
      id: 93,
      value: "93",
      video: "",
    },
    {
      id: 94,
      value: "94",
      video: "",
    },
    {
      id: 95,
      value: "95",
      video: "",
    },
    {
      id: 96,
      value: "96",
      video: "",
    },
    {
      id: 97,
      value: "97",
      video: "",
    },
    {
      id: 98,
      value: "98",
      video: "",
    },
    {
      id: 99,
      value: "99",
      video: "",
    },
    {
      id: 100,
      value: "100",
      video: "",
    },
  ]);
  const [chosenNumber, setChosenNumber] = useState("");
  const [numberVideo, setNumberVideo] = useState("");
  const [viewVideo, setViewVideo] = useState("false");
  const [viewBtn, setViewBtn] = useState("none");
  const [viewCanvas, SetViewCanvas] = useState(false);

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
  console.log(chosenNumber);
  return (
    <div>
      <Navbar />
      <div className="learn-numbers">
        <h1>Choose The Number</h1>
        <div className="numbers-list">
          <div className="numbers-scroll">
            <ul className="numbers">
              {numbers.map((number, id) => {
                return (
                  <li
                    key={id}
                    onClick={() => {
                      setChosenNumber(number.value);
                      setNumberVideo(number.video);
                      setViewVideo(false);
                      setViewBtn("none");
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
          <div className="video-drawNE">
            <div className="video-frameNE">
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
               <DrawingCanvasNE
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

export default LearnNumber;
