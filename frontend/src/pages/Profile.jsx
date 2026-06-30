import { useEffect, useState } from "react";
import API from "../services/api";
import useAuth from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import "../styles/profile.css";

const Profile = () => {
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    bio: "",
  });

  const [toast, setToast] = useState({ message: "", type: "" });

  const fetchProfile = async () => {
    const res = await API.get("/profile");
    setForm({
      name: res.data.name || "",
      phone: res.data.phone || "",
      bio: res.data.bio || "",
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    const res = await API.put("/profile", form);
    setUser(res.data.user);
    setToast({ message: "Profile updated successfully", type: "success" });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />
      <Toast message={toast.message} type={toast.type} />

      <main className="main-content">
        <Navbar title="Profile" />

        <form className="profile-card" onSubmit={updateProfile}>
          <h3>Manage Profile</h3>

          <label>Full Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <label>Phone</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Enter phone number"
          />

          <label>Bio</label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            placeholder="Write something about yourself"
          />

          <button>Update Profile</button>
        </form>
      </main>
    </div>
  );
};

export default Profile;