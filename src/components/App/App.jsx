import "./App.css";
import Preloader from "../Preloader/Preloader";
import Header from "../Header/Header";
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import Game from "../Game/Game";
import Leaderboard from "../Leaderboard/Leaderboard";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      <Preloader />
      <Footer />
    </div>
  );
}

export default App;
