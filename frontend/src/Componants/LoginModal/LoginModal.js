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
import LoginAdminModal from "./LoginAdminModal";
import SignupModal from "../SignupModal/SignupModal";

const LoginModal = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://ec2-54-167-187-236.compute-1.amazonaws.com:4000/user/signin",
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
        console.log(responseData.userData.username); //user info
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("userToken",responseData.userData.username);
        localStorage.setItem("emailToken",responseData.userData.email);
        props.closeLogin();
        window.location.reload();
      } else {
        alert(responseData.msg);
      }
    } catch (error) {
      alert(error.message);
    }
    setEmail("");
    setPassword("");
  };
  const [modalShow, setModalShow] = useState(false);
  const handleAdminLogin = () => {
    props.closeLogin();
    setModalShow(true);
  };
  const [SignupModalShow, setSignupModalShow] = useState(false);
  const handleSignup = () => {
    props.closeLogin();
    setSignupModalShow(true);
  };
  const [visiblePassword, setVisiblePassword] = useState(false);
  const handleVvisibility = () => {
    setVisiblePassword(!visiblePassword);
  };
  const openLoginModal = () => {
    setModalShow(true);
  }
  return (
    <>
      <SignupModal
        show={SignupModalShow}
        onHide={() => setSignupModalShow(false)}
        openLoginModal={openLoginModal}
      />
      <LoginAdminModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        visiblePassword={visiblePassword}
        setVisiblePassword={setVisiblePassword}
        handleVvisibility={handleVvisibility}
      />
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="login-container">
          <h1>Login</h1>
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
              type={visiblePassword ? "text" : "Password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i class="bx bxs-lock-alt"></i>
          </div>
          <div class="remember-forgot">
            <label className="lbl">
              <input
                type="checkbox"
                onChange={handleVvisibility}
                className="fg-pass"
              />
              Show password
            </label>
            <a href="#">Forgot Password</a>
          </div>
          <button class="btnn" onClick={handleLogin}>
            Login
          </button>
          <div class="register-link">
            <p>
              Dont have an account? <a onClick={handleSignup}>Register</a>
            </p>
          </div>
          <div className="login-as-admin">
            <p onClick={handleAdminLogin}>Login as Admin</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
