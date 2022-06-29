import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useTheme } from "../hooks/useTheme";

import "./styles/Navbar.css";

export default function Navbar() {
  const { color, changeColor } = useTheme();
  return (
    <div className="navbar" style={{ backgroundColor: color }}>
      <nav onClick={() => changeColor("pink")}>
        <Link to="/" className="brand">
          <h1>Cooking Ninja</h1>
        </Link>
        <SearchBar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}
