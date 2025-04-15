import "./Header.css";
import NavBar from "../NavBar/NavBar";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function Header({ openModal }) {
  return (
    <header className="header">
      <Link className="header__logo" to={"/"}>
        <img className="header__logo-image" src={logo} alt="PinPoint Logo" />
      </Link>
      <NavBar />
      <span className="header__account-buttons">
        <button
          className="header__button"
          type="button"
          onClick={() => {
            openModal("login");
          }}
        >
          Log in
        </button>
        <button
          className="header__button"
          type="button"
          onClick={() => {
            openModal("register");
          }}
        >
          Sign up
        </button>
      </span>
    </header>
  );
}

export default Header;
