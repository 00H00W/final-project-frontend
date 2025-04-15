import "./Header.css";
import NavBar from "../NavBar/NavBar";

function Header({ openModal }) {
  return (
    <header className="header">
      <span>
        <button
          type="button"
          onClick={() => {
            openModal("login");
          }}
        >
          Log in
        </button>
        <button
          type="button"
          onClick={() => {
            openModal("register");
          }}
        >
          Sign up
        </button>
      </span>
      <NavBar />
    </header>
  );
}

export default Header;
