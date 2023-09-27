import React from "react";
import CoverPhoto from "../assets/CoverPhoto.jpg";
import Typewriter from "typewriter-effect";
import "../index.css";

const Home = () => {
  return (
    <div className="container">
      <div className="image-container">
      <img src={CoverPhoto} alt="FreshFitCover" />
      <div className="text-overlay">
      <h1 className="main-title">FreshFit Express</h1>
      <div className="typewriter-text">
      <Typewriter
                  options={{
                    autoStart: true,
                    loop: true,
                  }} 
                    onInit={(typewriter) => {
                        typewriter 
                            .typeString("Guilt free Binges!")
                            .pauseFor(2000)
                            .deleteAll()
                            .typeString("Healthy and Wholesome meals 💚")
                            .pauseFor(2000)
                            .deleteAll()
                            .typeString("Free Delivery for orders above 25$")
                            .pauseFor(2000)
                            .deleteAll()
                            .start();
                    }}
                />
                </div>
      <p></p>
      </div>
    </div>
    </div>
    
  );
};

export default Home;