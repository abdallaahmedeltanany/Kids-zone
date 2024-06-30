import React, { useState } from "react";
import Navbar from "../../Componants/Navbar/Navbar";
import Footer from "../../Componants/Footer/Footer";
import "./Story.css";
import ChooseArabicStoryModal from "../../Componants/ChooseStory/ChooseArabicStoryModal";

const ArabicStory = () => {
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [sport, setSport] = useState("");
  const [color, setColor] = useState("");
  const [chooseStoryModal,setchooseStoryModal]=useState(false);
  const [gender , setGender] = useState("")
  const [responseData,setResponseData] = useState(null);



  const ChooseBoyStory =  async() => {
    
    try {
      const token=localStorage.getItem("token")
      const response = await fetch(
        "http://ec2-54-167-187-236.compute-1.amazonaws.com:4000/generate-stories-arabic",
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
        },gender:"ولد"}),
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
    setGender("ولد");
    setchooseStoryModal(true);
  };
  const ChooseGirlStory =async () => {
    try {
      const token=localStorage.getItem("token")
      const response = await fetch(
        "http://ec2-54-167-187-236.compute-1.amazonaws.com:4000/generate-stories-arabic",
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
        },gender:"بنت"}),
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
    setGender("بنت");
    setchooseStoryModal(true);
  };

  const handleStoryInfo = () => {};
  return (
    <>
    <ChooseArabicStoryModal
    show={chooseStoryModal}
    onHide={() => setchooseStoryModal(false)}
    gender={gender}
    setGender={setGender}
    stories={responseData ? responseData.stories : null}
    
    />
      <Navbar />
      <div className="arabic-story">
        <div className="story-form">
          <h1>القصه</h1>
          <div class="input-box">
            <input
              className="usernamea"
              type="text"
              placeholder="اسمك"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              className="usernamea"
              type="text"
              placeholder="الهوايه"
              required
              value={hobby}
              onChange={(e) => {
                setHobby(e.target.value);
              }}
            />
            <input
              className="usernamea"
              type="text"
              placeholder="الرياضه"
              required
              value={sport}
              onChange={(e) => {
                setSport(e.target.value);
              }}
            />
            <input
              className="usernamea"
              type="text"
              placeholder="اللون"
              required
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </div>
          <div className="choose-gender">
            <button class="signup-btn " onClick={ChooseBoyStory}> ولد</button>
            <button class="signup-btn" onClick={ChooseGirlStory}> بنت</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ArabicStory;
