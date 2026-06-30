import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MailPlus,
  Send,
  FileText,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import "../styles/sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const links = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/generate", label: "Generate Reply", icon: <MailPlus size={20} /> },
    { path: "/sent", label: "Sent Emails", icon: <Send size={20} /> },
    { path: "/drafts", label: "Saved Drafts", icon: <FileText size={20} /> },
    { path: "/profile", label: "Profile", icon: <User size={20} /> },
    { path: "/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">M</div>
        <div>
          <h2>MailPilot AI</h2>
          <p>Smart Reply Suite</p>
        </div>
      </div>

      <nav>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={location.pathname === link.path ? "active" : ""}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;