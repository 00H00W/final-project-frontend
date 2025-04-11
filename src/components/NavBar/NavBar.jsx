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
            Home
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink className={className} to={"/game"}>
            Play
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink className={className} to={"/leaderboard"}>
            Leader Boards
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
