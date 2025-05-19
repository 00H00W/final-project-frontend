import "./NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar({ className }) {
  const generateClassName = ({ isActive }) =>
    "navbar__button" + (isActive ? " navbar__button_selected" : "");
  return (
    <nav className={`navbar ${className}`}>
      <ul className="navbar__list">
        <li className="navbar__item">
          <NavLink className={generateClassName} to={"/"}>
            <p className="navbar__button-text">Home</p>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink className={generateClassName} to={"/game"}>
            <p className="navbar__button-text">Play</p>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink className={generateClassName} to={"/leaderboard"}>
            <p className="navbar__button-text">Leaderboard</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
