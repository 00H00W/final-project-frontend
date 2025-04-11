import "./PlaySection.css";
import { useNavigate } from "react-router-dom";

function PlaySection() {
  const nav = useNavigate();
  return (
    <section className="play-section">
      <h2 className="play-section__heading">PinPoint</h2>
      <button
        onClick={() => {
          nav("/game");
        }}
      >
        Play Now
      </button>
      <p>Description of the game goes here.</p>
    </section>
  );
}

export default PlaySection;
