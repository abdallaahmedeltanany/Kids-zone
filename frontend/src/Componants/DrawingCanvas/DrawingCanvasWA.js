import React, { useRef, useState, useEffect } from "react";
import "./DrawingCanvas.css";
import { Hands } from "@mediapipe/hands";
import { drawHand } from "./Utilities";
const DrawingCanvasWA = () => {
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
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
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
    console.log(imageArray);
  }, [imageArray]);
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
    const dataUrl = canvas.toDataURL(); // Defaults to PNG format
    console.log("imageUrl", dataUrl);

    // Convert data URL to Blob
    const base64String = atob(dataUrl.split(",")[1]);
    const arrayBuffer = new ArrayBuffer(base64String.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < base64String.length; i++) {
      uint8Array[i] = base64String.charCodeAt(i);
    }
    setImageArray(dataUrl);

    //
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://ec2-54-167-187-236.compute-1.amazonaws.com:4000/checkEnglishNumbers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ image: dataUrl }),
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
    <div>
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
    </div>
  );
};

export default DrawingCanvasWA;
