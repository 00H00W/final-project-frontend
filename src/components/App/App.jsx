import "./App.css";
import Preloader from "../Preloader/Preloader";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Game from "../Game/Game";
import Leaderboard from "../Leaderboard/Leaderboard";
import Footer from "../Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Main />
      <Game />
      <Leaderboard />
      <Preloader />
      <Footer />
    </>
  );
}

export default App;
