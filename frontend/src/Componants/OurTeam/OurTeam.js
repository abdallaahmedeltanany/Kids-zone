import React from 'react'
import "../OurTeam/OurTeam.css"
import images from "../Assets/boy.svg"
const OurTeam = () => {
  return (
    <div className='our-team'>
        <div className="our-team-container">
        <div className="our-team-card">
            <img src={images} alt="" />
            <p>Abdullah</p>
        </div>
        <div className="our-team-card">
            <img src={images} alt="" />
            <p>Andrew</p>
        </div>
        <div className="our-team-card">
            <img src={images} alt="" />
            <p>Ahmed</p>
        </div>
        <div className="our-team-card">
            <img src={images} alt="" />
            <p>Khaled</p>
        </div>
        <div className="our-team-card">
            <img src={images} alt="" />
            <p>Said</p>
        </div>
        <div className="our-team-card">
            <img src={images} alt="" />
            <p>Eman</p>
        </div>
        <div className="our-team-card">
            <img src={images} alt="" />
            <p>Ranim</p>
        </div>
        <div className="our-team-card">
            <img src={images} alt="" />
            <p>Aya</p>
        </div>
        </div>
        
    </div>
  )
}

export default OurTeam