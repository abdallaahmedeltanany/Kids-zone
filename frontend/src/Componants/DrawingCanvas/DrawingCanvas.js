import React, { useRef, useState, useEffect } from "react";
import "./DrawingCanvas.css";
import { Hands } from "@mediapipe/hands";
import { drawHand } from "./Utilities";

const DrawingCanvas = ({chosenLetter}) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [context, setContext] = useState(null);
  const [startDrawing, setStartDrawing] = useState(null);
  const [imageArray, setImageArray] = useState("");
  const [responseData, setResponseData] = useState(null);
  // const [ChoosenLetter, setChoosenLetter] = useState("");
  // useEffect(() => {
  //   setChoosenLetter(props.ChosenLetter);
  //   console.log(ChoosenLetter)
  // }, [props.ChosenLetter]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 780;
    canvas.height = 490;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 15;
    setContext(ctx);

    const setupCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      return new Promise((resolve) => {
        videoRef.current.onloadedmetadata = () => {
          resolve(videoRef.current);
        };
      });
    };

    const onResults = (results) => {
      if (context) {
        if (results.multiHandLandmarks) {
          for (const landmarks of results.multiHandLandmarks) {
            drawHand(landmarks, context, canvas.width, canvas.height);
          }
        }
      }
    };

    const runMediapipe = async () => {
      const hands = new Hands({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      hands.onResults(onResults);

      await setupCamera();

      const video = videoRef.current;
      video.play();

      const sendFrameToMediapipe = async () => {
        await hands.send({ image: video });
        requestAnimationFrame(sendFrameToMediapipe);
      };

      sendFrameToMediapipe();
    };

    runMediapipe();
  }, [context]);
   
  useEffect(() => {
    console.log(imageArray)
  }, [imageArray])
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.isDrawing = false; // Reset drawing state
    ctx.prevX = null;
    ctx.prevY = null;
  };

  const captureImage = async () => {
    const canvas = canvasRef.current;
const context = canvas.getContext('2d');

// Create an off-screen canvas
const offscreenCanvas = document.createElement('canvas');
const offscreenContext = offscreenCanvas.getContext('2d');

// Set the off-screen canvas dimensions to match the original canvas
offscreenCanvas.width = canvas.width;
offscreenCanvas.height = canvas.height;

// Flip the image horizontally
offscreenContext.translate(canvas.width, 0); // Move the canvas context to the right edge
offscreenContext.scale(-1, 1); // Flip the context horizontally
offscreenContext.drawImage(canvas, 0, 0); // Draw the original canvas onto the off-screen canvas

// Get the data URL from the off-screen canvas
const dataUrl = offscreenCanvas.toDataURL(); // Defaults to PNG format

console.log(dataUrl);
console.log(chosenLetter);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://ec2-54-167-187-236.compute-1.amazonaws.com:4000/checkEnglishLetters",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ image: dataUrl, letter: chosenLetter }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        alert(data.msg);
      } else {
        console.error("Error:", data.msg);
      }
    } catch (error) {
      console.error("Error:");
    }
    // clearCanvas();
  };

  return (
    <div className="canvas-container">
      <video className="camera-view" ref={videoRef} />
      <canvas className="Canvas-style" ref={canvasRef} id="canvas" />
      <div className="buttons-style">
        <button onClick={clearCanvas} className="clear-btn">
          Clear
        </button>
        <button onClick={captureImage} className="clear-btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default DrawingCanvas;
