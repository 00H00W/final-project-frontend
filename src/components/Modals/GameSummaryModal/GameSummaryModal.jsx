import "./GameSummaryModal.css";
import Modal from "../Modal/Modal";
import Button from "../../Button/Button";
import { useNavigate } from "react-router-dom";

function GameSummaryModal({
  isOpen,
  modalData,
  openModal,
  isLoggedIn,
  resetGame,
}) {
  const navigate = useNavigate();
  return (
    <Modal isOpen={isOpen}>
      <div className="game-summary-modal__content">
        <h2 className="game-summary-modal__title">Game Summary</h2>
        <div className="game-summary-modal__stats">
          <p className="game-summary-modal__text">Score: {modalData?.score}</p>
          <p className="game-summary-modal__text">
            Rounds: {modalData?.rounds}
          </p>
        </div>
        {isLoggedIn ? (
          <Button
            className={"game-summary-modal__button"}
            onClick={() => {
              navigate("/leaderboard");
            }}
          >
            Leaderboard
          </Button>
        ) : (
          <>
            <p className="game-summary-modal__text">
              Want your score on the leaderboard?
            </p>
            <span className="game-summary-modal__text">
              <Button
                className={"game-summary-modal__button"}
                onClick={() => openModal("login")}
              >
                Log in
              </Button>{" "}
              or{" "}
              <Button
                className={"game-summary-modal__button"}
                onClick={() => openModal("register")}
              >
                Sign up
              </Button>
            </span>
          </>
        )}
        <Button className={"game-summary-modal__button"} onClick={resetGame}>
          Play Again
        </Button>
      </div>
    </Modal>
  );
}

export default GameSummaryModal;
