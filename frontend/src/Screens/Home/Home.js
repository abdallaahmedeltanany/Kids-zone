import React from "react";
import Navbar from "../../Componants/Navbar/Navbar";
import Hero from "../../Componants/Hero/Hero";
import Services from "../../Componants/Services/Services";
import Footer from "../../Componants/Footer/Footer";
import AboutUs from "../../Componants/AboutUs/AboutUs";

const Home = () => {
  const loginToken = localStorage.getItem('token');
  const reloadPage=()=>{
    window.location.reload();
  }
  return (
    <div>
      <Navbar />
      <Hero />
      { loginToken ? <Services/> :null}
      {/* <Services /> */}
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Home;
