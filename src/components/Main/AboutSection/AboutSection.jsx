import "./AboutSection.css";
import { useState, useEffect } from "react";
import headshot from "../../../assets/headshot.jpg";
import headshotAlt from "../../../assets/headshot-alt.jpg";

function AboutSection() {
  const [headshotPhoto, setHeadshotPhoto] = useState(headshot);

  const handlePhotoClick = () => {
    setHeadshotPhoto(headshotAlt);
    setTimeout(() => {
      setHeadshotPhoto(headshot);
    }, 200);
  };

  return (
    <section className="about-section">
      <div className="about-section__text-content">
        <h2 className="about-section__heading">About the author</h2>
        <p className="about-section__body">Hi, I'm Sam!</p>
        <p className="about-section__body">
          &emsp;I can't keep still, so I'm always working on anything from 3d
          printing and laser cutting to cooking and gardening. Lately I've been
          focusing on software engineering, opening the door to many janky
          videogame prototypes, silly websites, and ambitious server ideas.
          Learning the ins and outs of HTML, CSS, and Javascript, as well as
          frameworks like React and Express, has been a tricky challenge but
          opened up so much more potential for me.
        </p>
      </div>
      <img
        onClick={handlePhotoClick}
        className="about-section__headshot"
        src={headshotPhoto}
        alt="picture of author"
      />
    </section>
  );
}

export default AboutSection;
