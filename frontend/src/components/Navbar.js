import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">ServeEasy</div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {user && <Link to="/dashboard">Dashboard</Link>}

        {user?.role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}
      </div>

      <div className="nav-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀ Light"}
        </button>

        {user ? (
          <>
            <span className="user-name">Hi, {user.name}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;