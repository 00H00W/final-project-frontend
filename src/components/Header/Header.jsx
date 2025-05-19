import "./Header.css";
import NavBar from "../NavBar/NavBar";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

function Header({ openModal, isLoggedIn, userData }) {
  return (
    <header className="header">
      <Link className="header__logo" to={"/"}>
        <img className="header__logo-image" src={logo} alt="PinPoint Logo" />
      </Link>
      <NavBar className={"header__nav-bar"} />
      <span className="header__account-buttons">
        {isLoggedIn ? (
          <>
            <span
              onClick={() => {
                openModal("profile");
              }}
              className="header__profile-button"
            >
              <img
                className="header__profile-image"
                src={userData?.data.avatar}
                alt="User's avatar"
              />
              <p className="header__profile-name">{userData?.data.name}</p>
            </span>
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
