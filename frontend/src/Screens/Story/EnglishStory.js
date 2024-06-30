import React, { useState } from "react";
import Navbar from "../../Componants/Navbar/Navbar";
import Footer from "../../Componants/Footer/Footer";
import "./Story.css";
import ChooseStoryModal from "../../Componants/ChooseStory/ChooseStoryModal";
const EnglishStory = () => {
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [sport, setSport] = useState("");
  const [color, setColor] = useState("");
  const [chooseStoryModal, setchooseStoryModal] = useState(false);
  const [gender, setGender] = useState(null);
  const [responseData,setResponseData] = useState(null);
 
  const ChooseBoyStory =  async() => {
    
    try {
      const token=localStorage.getItem("token")
      const response = await fetch(
        "http://ec2-54-167-187-236.compute-1.amazonaws.com:4000/generate-stories-english",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ inputs: 
        {
            name ,
            sport,
            hobby,
            color
        },gender:"M"}),
        }
      );

        const data = await response.json();

      if (response.ok) {
        setResponseData(data);

        
      } else {
        console.error("Error:", data.msg);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
    setGender("M");
    setchooseStoryModal(true);
  };
  const ChooseGirlStory =async () => {
    try {
      const token=localStorage.getItem("token")
      const response = await fetch(
        "http://ec2-54-167-187-236.compute-1.amazonaws.com:4000/generate-stories-english",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ inputs: 
        {
            name ,
            sport,
            hobby,
            color
        },gender:"F"}),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResponseData(data);
      } else {
        console.error("Error:",data.msg);
      }
    } catch (error) {
      console.error("Error:", );
    }
    setGender("F");
    setchooseStoryModal(true);
  };
  return (
    <>
      <ChooseStoryModal
        show={chooseStoryModal}
        onHide={() => setchooseStoryModal(false)}
        gender={gender}
        setGender={setGender}
        stories={responseData ? responseData.stories : null}
      />
      <Navbar />
      <div className="arabic-story">
        <div className="story-form">
          <h1>Story</h1>
          <div class="input-box">
            <input
              className="usernameE"
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              className="usernameE"
              type="text"
              placeholder="Hobby"
              required
              value={hobby}
              onChange={(e) => {
                setHobby(e.target.value);
              }}
            />
            <input
              className="usernameE"
              type="text"
              placeholder="Sport"
              required
              value={sport}
              onChange={(e) => {
                setSport(e.target.value);
              }}
            />
            <input
              className="usernameE"
              type="text"
              placeholder="Color"
              required
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </div>
          <div className="choose-gender">
            <button class="signup-btn " onClick={ChooseBoyStory}>
              {" "}
              Boy
            </button>
            <button class="signup-btn" onClick={ChooseGirlStory}>
              {" "}
              Girl
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EnglishStory;
