import React from "react";
import { useState } from 'react';


const Carousel = ({ imagePaths }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex === imagePaths.length - 1 ? 0 : prevIndex + 1));
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? imagePaths.length - 1 : prevIndex - 1));
    };
  return (
    <div className="carousel">
    <button onClick={prevSlide}>Previous</button>
    <img src={imagePaths[currentIndex]} alt="carousel" />
    <button onClick={nextSlide}>Next</button>
  </div>
  );
};

export default Carousel;
