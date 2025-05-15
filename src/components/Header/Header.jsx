import "./Header.css";
import NavBar from "../NavBar/NavBar";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

function Header({ openModal, isLoggedIn }) {
  return (
    <header className="header">
      <Link className="header__logo" to={"/"}>
        <img className="header__logo-image" src={logo} alt="PinPoint Logo" />
      </Link>
      <NavBar />
      <span className="header__account-buttons">
        {isLoggedIn ? (
          <>
            {/* TODO change this to include avatar and name */}
            <Button>Profile</Button>
          </>
        ) : (
          <>
            {" "}
            <Button
              onClick={() => {
                openModal("login");
              }}
            >
              Log in
            </Button>
            <Button
              onClick={() => {
                openModal("register");
              }}
            >
              Sign up
            </Button>
          </>
        )}
      </span>
    </header>
  );
}

export default Header;
