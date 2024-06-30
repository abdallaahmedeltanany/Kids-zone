import React, { useState } from "react";
import { Link } from "react-scroll";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import LoginModal from "../LoginModal/LoginModal";
import boy from "../../Componants/Assets/boy.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogoNavigation = () => {
    navigate("/");
    window.location.reload();
  };
  const [modalShow, setModalShow] = useState(false);
  const closeLogin = () => {
    setModalShow(false);
  };
  const loginToken = localStorage.getItem("token");
  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <>
      <LoginModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        closeLogin={closeLogin}
      />
      <div className="navbar">
        <div className="nav-logo" onClick={handleLogoNavigation}>
          <img src={logo} alt="" />
        </div>
        <div className="nav-toggle">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className="nav-menu">
          <li>
            <Link
              activeClass="active"
              to="hero"
              spy={false}
              smooth={true}
              offset={30}
              duration={100}
              style={{ textDecoration: "none" }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="Services"
              spy={false}
              smooth={true}
              offset={10}
              duration={100}
              style={{ textDecoration: "none" }}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="About"
              spy={false}
              smooth={true}
              offset={30}
              duration={100}
              style={{ textDecoration: "none" }}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="footer"
              spy={false}
              smooth={true}
              offset={30}
              duration={100}
              style={{ textDecoration: "none" }}
            >
              Demo
            </Link>
          </li>
        </ul>
        {loginToken ? (
          <img
            className="profile-pic"
            src={boy}
            alt=""
            onClick={handleProfile}
          />
        ) : (
          <div className="navbar-login">
            <button onClick={() => setModalShow(true)}>login</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
