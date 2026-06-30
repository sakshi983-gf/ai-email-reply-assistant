import useAuth from "../hooks/useAuth";
import "../styles/navbar.css";

const Navbar = ({ title }) => {
  const { user } = useAuth();

  return (
    <div className="navbar">
      <div>
        <h2>{title}</h2>
        <p>AI-powered professional email reply assistant</p>
      </div>

      <div className="navbar-user">
        <div className="avatar">{user?.name?.charAt(0)?.toUpperCase()}</div>
        <div>
          <h4>{user?.name}</h4>
          <span>{user?.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;