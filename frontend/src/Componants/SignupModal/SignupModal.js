import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const SignupModal = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://ec2-54-167-187-236.compute-1.amazonaws.com:4000/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData.msg);
        localStorage.setItem("token", responseData.token);
        props.onHide();
        props.openLoginModal();
      } else {
        console.error("Error signing up:", responseData.msg);
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="login-container">
          <h1>Sign Up</h1>
          <div class="input-box">
            <input
              className="username"
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              className="email"
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div class="input-box">
            <input
              className="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i class="bx bxs-lock-alt"></i>
          </div>
          <button class="signup-btn" onClick={handleSubmit}>
            Sign Up
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SignupModal;
