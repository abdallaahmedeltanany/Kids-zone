import React from "react";
import Artboard_58 from "../Assets/Artboard_58.png";
import Artboard_59 from "../Assets/Artboard_59.png";
import Artboard_60 from "../Assets/Artboard_60.png";
import Carousel from 'react-bootstrap/Carousel';



const Hero = () => {
  return (
    <div className="hero" id="hero">
    <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={Artboard_60}
        alt="First slide"
      />

    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={Artboard_58}
        alt="Second slide"
      />
      
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={Artboard_59}
        alt="Third slide"
      />
     
    </Carousel.Item>
  </Carousel>
    </div>
  );
};

export default Hero;
