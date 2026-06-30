import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import useAuth from "../hooks/useAuth";
import Toast from "../components/Toast";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setToast({ message: "Email and password are required", type: "error" });
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/auth/login", form);

      login(res.data.token, res.data.user);
      setToast({ message: "Login successful", type: "success" });

      setTimeout(() => {
        navigate("/dashboard");
      }, 600);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Login failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Toast message={toast.message} type={toast.type} />

      <div className="auth-left">
        <h1>MailPilot AI</h1>
        <p>
          Generate professional AI-powered email replies, improve tone, save
          drafts, and send emails directly from one dashboard.
        </p>

        <div className="auth-features">
          <span>AI Reply Generation</span>
          <span>Gmail SMTP Sending</span>
          <span>PostgreSQL History</span>
          <span>Professional Dashboard</span>
        </div>
      </div>

      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p>Login to continue to your email assistant</p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />

          <button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;