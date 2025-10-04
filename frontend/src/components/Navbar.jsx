import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import "./Navbar.css";

function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/profile");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          AI Career Companion
        </Link>

        <ul className="nav-menu">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/jobs">Jobs</Link>
          </li>
          <li>
            <Link to="/learning">Learning</Link>
          </li>
        </ul>

        <div className="nav-right">
          <span className="user-name">{user?.displayName || user?.email}</span>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
