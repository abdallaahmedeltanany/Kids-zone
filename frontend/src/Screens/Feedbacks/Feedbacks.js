import React, { useState,useEffect } from "react";
import Navbar from "../../Componants/Navbar/Navbar";
import Footer from "../../Componants/Footer/Footer.js";
import "./Feedbacks.css";
import boy from '../../Componants/Assets/boy.svg';
import logOut from "../../Componants/Assets/log-out.svg"
import { useNavigate } from "react-router-dom";

const Feedbacks = () => {
  const navigate = useNavigate("");
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("AdminToken");
        const response = await fetch(
          "http://ec2-54-167-187-236.compute-1.amazonaws.com:4000/admin/feedbacks",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        const responseData = await response.json();
        if (response.ok) {
          console.log(responseData.feedbackArray);
          setFeedbacks(responseData.feedbackArray);
        } else {
          console.error("Error logging in:", responseData.msg);
        }
      } catch (error) {
        console.error("Error logging in:", error.message);
      }
    };
    fetchFeedbacks();
  }, []);
  const HandleLogOut = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("AdminToken");
      const response = await fetch("http://ec2-54-167-187-236.compute-1.amazonaws.com:4000/admin/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData.msg);
        localStorage.removeItem("AdminToken");
        navigate("/")
      } else {
        console.error("Error signing out:", responseData.msg);
      }
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="feedbacks">
        <h1>Feedbacks</h1>
        <div className="feedback-container">
          <div className="feedback-scroll">
            <ul className="feedback-list">
              {feedbacks.map((feedback, id) => {
                return (
                  <li key={id} className="feedback">
                    <div className="info">
                    <img src={boy} alt="" />
                    <p className="username">{feedback.username}</p>
                    </div>
                    <div className="feedback-content">{feedback.feedback}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="log-out" on onClick={HandleLogOut}>
          <img src={logOut} alt="" />
          <p>log out</p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Feedbacks;
