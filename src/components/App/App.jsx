import "./App.css";
import React from "react";
import Preloader from "../Preloader/Preloader";
import Header from "../Header/Header";
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import Game from "../Game/Game";
import Leaderboard from "../Leaderboard/Leaderboard";
import Footer from "../Footer/Footer";
import LoginModal from "../Modals/LoginModal/LoginModal";
import RegisterModal from "../Modals/RegisterModal/RegisterModal";

function App() {
  const [activeModal, setActiveModal] = React.useState("");
  const escapeModal = React.useCallback((e) => {
    if (e.key === "Escape") {
      closeActiveModal();
    }
  }, []);
  const openModal = (modal) => {
    if (activeModal === "") document.addEventListener("keyup", escapeModal);
    setActiveModal(modal);
  };
  const closeActiveModal = () => {
    document.removeEventListener("keyup", escapeModal);
    setActiveModal("");
  };
  return (
    <div className="app">
      <Header openModal={openModal} />
      <div className="app__content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
      <LoginModal
        isOpen={activeModal === "login"}
        closeActiveModal={closeActiveModal}
      />
      <RegisterModal
        isOpen={activeModal === "register"}
        closeActiveModal={closeActiveModal}
      />
      <Preloader />
      <Footer />
    </div>
  );
}

export default App;
