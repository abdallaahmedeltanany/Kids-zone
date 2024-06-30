import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Footer from "../Footer/Footer";
import ABC from "../Assets/ABC.png";
import arabic from "../Assets/arbic.png";
import kelma from "../Assets/kelma.png";
import word from "../Assets/word.png";
import { useNavigate } from "react-router-dom";
import "./LoginModal.css";

const LoginAdminModal = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://ec2-54-167-187-236.compute-1.amazonaws.com:4000/admin/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData.msg);
        localStorage.setItem("AdminToken", responseData.token);
        navigate("/feedbacks");
      } else {
        console.error("Error logging in:", responseData.msg);
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }

    setEmail("");
    setPassword("");
  };
  const navigate = useNavigate();
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="login-container">
          <h1>Login as Admin</h1>
          <div class="input-box">
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <i class="bx bxs-user"></i>
          </div>
          <div class="input-box">
            <input
              type={props.visiblePassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i class="bx bxs-lock-alt"></i>
          </div>
          <div class="remember-forgot">
            <label className="lbl">
              <input type="checkbox" onChange={props.handleVvisibility} />
              Show Password
            </label>
            <a href="#">Forgot Password</a>
          </div>
          <button class="admin-btn" onClick={handleLogin}>
            Login
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginAdminModal;
