import "./App.css";
import React from "react";
import Preloader from "../Preloader/Preloader";
import Header from "../Header/Header";
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import Game from "../Game/Game";
import Leaderboard from "../Leaderboard/Leaderboard";
import Footer from "../Footer/Footer";
import ModalWithForm from "../Modals/ModalWithForm/ModalWithForm";

function App() {
  const [activeModal, setActiveModal] = React.useState("");
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      <button
        type="button"
        onClick={() => {
          setActiveModal("test");
        }}
      >
        Open Modal
      </button>
      <ModalWithForm
        isOpen={activeModal === "test"}
        title={"test"}
        submit={"submit"}
        onCloseButtonClick={() => {
          setActiveModal("");
        }}
      />
      <Preloader />
      <Footer />
    </div>
  );
}

export default App;
