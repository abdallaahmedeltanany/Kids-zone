import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../Componants/Navbar/Navbar";
import Footer from "../../Componants/Footer/Footer";
import listen_icon from "../../Componants/Assets/playVideo.svg";

const StoryContent = () => {
  const location = useLocation();
  const dataRecieved = location.state || {}; // Initialize with an empty object
  const base64Audio = dataRecieved.audio;
  // console.log(dataRecieved.audio);

  const [viewAudio, setViewAudio] = useState(false);

  const handleViewAudio = () => {
    setViewAudio(true);
  };
  const [audioSrc, setAudioSrc] = useState(null);

  useEffect(() => {
    if (base64Audio) {
      const byteCharacters = atob(base64Audio);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      const blob = new Blob([byteArray], { type: "audio/mpeg" });

      const url = URL.createObjectURL(blob);
      setAudioSrc(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [base64Audio]);

  return (
    <>
      <Navbar />
      <div className="story-content">
        <div className="action-btn">
          <div className="listen" onClick={handleViewAudio}>
            <img src={listen_icon} alt="" />
            <p>Listen the story</p>
          </div>
        </div>
        <div className="response">
          <p className="story-text">
            {dataRecieved.description || ""} {/* Access description safely */}
          </p>
          <audio
            controls
            src={audioSrc}
            type="audio/mpeg"
            className={viewAudio ? "story-audio" : "audio-remove"}
          ></audio>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StoryContent;
