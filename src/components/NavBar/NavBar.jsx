import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__button">Home</li>
        <li className="navbar__button">Play</li>
        <li className="navbar__button">Leader boards</li>
      </ul>
    </nav>
  );
}

export default NavBar;
