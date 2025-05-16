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
import * as auth from "../../utils/auth";
import { postItem } from "../../utils/mockApi";
import Button from "../Button/Button";

function App() {
  const [activeModal, setActiveModal] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    avatar: "",
    email: "",
    name: "",
    token: "",
  });

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
  function handleSubmit(request) {
    setLoading(true);
    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setLoading(false));
  }
  const handleRegistration = (data) => {
    handleSubmit(() => {
      return auth
        .signup(data)
        .then(() => auth.signin({ email: data.email, password: data.password }))
        .then((res) => {
          if (res) {
            localStorage.setItem("jwt", res.token);
            closeActiveModal();
            return auth.getUserData(res.token);
          } else return Promise.reject(res);
        })
        .then((res) => {
          setCurrentUser({ ...res, token: localStorage.getItem("jwt") });
          setIsLoggedIn(true);
        })
        .catch(console.error);
    });
  };
  const handleAuthorization = (data) => {
    handleSubmit(() => {
      return auth
        .signin(data)
        .then((res) => {
          if (res) {
            localStorage.setItem("jwt", res.token);
            closeActiveModal();
            return auth.getUserData(res.token);
          } else return Promise.reject(res);
        })
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser({ ...res, token: localStorage.getItem("jwt") });
        })
        .catch(console.error);
    });
  };
  const postGameData = (data) => {
    console.log(currentUser);
    console.log({ ...data, username: currentUser.data.name });
    return postItem({ ...data, username: currentUser.data.name });
  };
  return (
    <div className="app">
      <Header openModal={openModal} isLoggedIn={isLoggedIn} />
      <div className="app__content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/game"
            element={
              <Game
                setActiveModal={openModal}
                isLoggedIn={isLoggedIn}
                postGameData={postGameData}
              />
            }
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
      <LoginModal
        isOpen={activeModal === "login"}
        openRegisterModal={() => openModal("register")}
        closeActiveModal={closeActiveModal}
        handleAuthorization={handleAuthorization}
      />
      <RegisterModal
        isOpen={activeModal === "register"}
        openLoginModal={() => openModal("login")}
        closeActiveModal={closeActiveModal}
        handleRegistration={handleRegistration}
      />

      <Footer />
    </div>
  );
}

export default App;
