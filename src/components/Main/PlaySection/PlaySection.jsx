import "./PlaySection.css";
import { useNavigate } from "react-router-dom";
import Button from "../../Button/Button";

function PlaySection() {
  const nav = useNavigate();
  return (
    <section className="play-section">
      <div className="play-section__gradient"></div>
      <div className="play-section__content">
        <h2 className="play-section__heading">PinPoint</h2>
        <Button
          onClick={() => {
            nav("/game");
          }}
        >
          Play Now!
        </Button>
        <p className="play-section__description">
          Identify winding streets, infer geographic features, interpret
          architecure, and pinpoint your location on the globe!
        </p>
      </div>
    </section>
  );
}

export default PlaySection;
