import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./FeedbackModal.css";

const FeedbackModal = (props) => {
  const [feedback, setFeedback] = useState("");
  const handleFeedback = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://ec2-54-167-187-236.compute-1.amazonaws.com:4000/user/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ feedback }),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData.msg);
      } else {
        console.error("Error sending feedback:", responseData.msg);
      }
    } catch (error) {
      console.error("Error sending feedback:", error.message);
    }
    setFeedback("");
    props.closeFeedbackModal();
  };
//   const handleFeedback = () => {
//     props.closeFeedbackModal();
//     if (feedback.length === 0) {
//       console.log("please enter a feedback");
//     } else {
//       console.log(feedback);
//       alert('feedback sent successfully')
//     }
//   };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="feedback-modal">
        <h1>Feedback</h1>
        <textarea
          placeholder="Enter your feedback"
          value={feedback}
          onChange={(e) => {
            setFeedback(e.target.value);
          }}
        ></textarea>
        <button onClick={handleFeedback}>Send</button>
      </div>
    </Modal>
  );
};

export default FeedbackModal;
