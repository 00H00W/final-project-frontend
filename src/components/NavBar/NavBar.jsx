import "./NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  const className = ({ isActive }) =>
    "navbar__button" + (isActive ? " navbar__button_selected" : "");
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <NavLink className={className} to={"/"}>
            <p className="navbar__button-text">Home</p>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink className={className} to={"/game"}>
            <p className="navbar__button-text">Play</p>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink className={className} to={"/leaderboard"}>
            <p className="navbar__button-text">Leaderboard</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
