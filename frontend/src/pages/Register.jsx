import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import useAuth from "../hooks/useAuth";
import Toast from "../components/Toast";
import "../styles/register.css";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setToast({ message: "All fields are required", type: "error" });
      return;
    }

    if (form.password.length < 6) {
      setToast({
        message: "Password must be at least 6 characters",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/auth/register", form);

      login(res.data.token, res.data.user);
      setToast({ message: "Registration successful", type: "success" });

      setTimeout(() => {
        navigate("/dashboard");
      }, 600);
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Registration failed",
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
          Build better email communication using AI-powered reply generation,
          professional tone control, and direct Gmail sending.
        </p>

        <div className="auth-features">
          <span>JWT Authentication</span>
          <span>Gemini AI Integration</span>
          <span>Draft Management</span>
          <span>Email History</span>
        </div>
      </div>

      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Start using your professional email assistant</p>

        <form onSubmit={handleRegister}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
          />

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
            placeholder="Minimum 6 characters"
            value={form.password}
            onChange={handleChange}
          />

          <button disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;