import React,{useState} from "react";
import Navbar from "../../Componants/Navbar/Navbar";
import "./Profile.css";
import boy from "../../Componants/Assets/boy.svg"
import feedback from "../../Componants/Assets/feedback.svg"
import logOut from "../../Componants/Assets/log-out.svg"
import { useNavigate } from "react-router-dom";
import FeedbackModal from "../../Componants/FeedbackModal/FeedbackModal";

const Profile = () => {
  const navigate = useNavigate('');
    const [modalShow, setModalShow] = useState(false);
    const showFeedbackModal=()=>{
        setModalShow(true);
    }
    const closeFeedbackModal=()=>{
      setModalShow(false);
    }
    const HandleLogOut = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://ec2-54-167-187-236.compute-1.amazonaws.com:4000/user/signout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        const responseData = await response.json();
        if (response.ok) {
          console.log(responseData.msg);
          localStorage.removeItem("token");
          localStorage.removeItem("userToken");
          localStorage.removeItem("emailToken");
          navigate("/")
        } else {
          console.error("Error signing out:", responseData.msg);
        }
      } catch (error) {
        console.error("Error signing out:", error.message);
      }
    };
    const username=localStorage.getItem("userToken");
    const email=localStorage.getItem("emailToken");
  return (
    <>
      <Navbar />
      <FeedbackModal 
      show={modalShow}
      onHide={() => setModalShow(false)}
      closeFeedbackModal={closeFeedbackModal}/>
      <div className="profile">
        <div className="left">
          <div className="image">
            <img src={boy} alt="" />
          </div>
          <div className="email">
            <h2>Email:</h2>
            <p>{email}</p>
          </div>
        </div>
        <div className="right">
          <div className="name">
            <h2>Username:</h2>
            <p>{username} </p>
          </div>
          <div className="buttons">
            <div className="settings">
                <img src={logOut} alt=""  onClick={HandleLogOut}/>
                <p>log out</p>
            </div>
            <div className="send-feedback" onClick={showFeedbackModal} >
                <img src={feedback} alt="" />
                <p>Feedbacks</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
