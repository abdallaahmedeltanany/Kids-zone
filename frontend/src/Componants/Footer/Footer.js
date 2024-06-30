import React from "react";
import footer from "../Assets/Artboard_63.png";
import "../Footer/Footer.css";
import Fb from "../Assets/facebook_icon.png";
import IG from "../Assets/IG.png";
import X from "../Assets/twitter.png";
import logo from "../Assets/logo.png";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="content">
        <ul>
          <li className="head">
            <h1>Content</h1>
          </li>
          <li>Services</li>
          <li>New updates</li>
          <li>The most populer story</li>
          <li>Search letter</li>
        </ul>
      </div>
      <div className="information">
        <ul>
          <li className="head">
            <h1>information</h1>
          </li>
          <li>about us</li>
          <li>Pricing</li>
          <li>Services</li>
        </ul>
      </div>
      <div className="legal">
        <ul>
          <li className="head">
            <h1>Legal</h1>
          </li>
          <li>Terms of us</li>
          <li>License agreement</li>
          <li>Privacy policy</li>
          <li>Copyright information</li>
          <li>Cookies policy</li>
          <li>Cookies settings</li>
        </ul>
      </div>
      <div className="support">
        <ul>
          <li className="head">
            <h1>Support</h1>
          </li>
          <li>FaQ</li>
          <li>contact</li>
        </ul>
      </div>
      <div className="social-media">
        <h1>Social media</h1>
        <div className="icons">
          <img src={Fb} alt="" />
          <img src={IG} alt="" />
          <img src={X} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
