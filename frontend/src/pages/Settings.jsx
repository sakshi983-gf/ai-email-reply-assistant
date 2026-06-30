import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import "../styles/settings.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    defaultTone: "Professional",
    emailSignature: "",
    theme: "Light",
  });

  const [toast, setToast] = useState({ message: "", type: "" });

  const fetchSettings = async () => {
    const res = await API.get("/settings");

    setSettings({
      defaultTone: res.data.default_tone || "Professional",
      emailSignature: res.data.email_signature || "",
      theme: res.data.theme || "Light",
    });
  };

  const updateSettings = async (e) => {
    e.preventDefault();

    await API.put("/settings", settings);
    setToast({ message: "Settings updated successfully", type: "success" });
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />
      <Toast message={toast.message} type={toast.type} />

      <main className="main-content">
        <Navbar title="Settings" />

        <form className="settings-card" onSubmit={updateSettings}>
          <h3>Email Preferences</h3>

          <label>Default Tone</label>
          <select
            value={settings.defaultTone}
            onChange={(e) =>
              setSettings({ ...settings, defaultTone: e.target.value })
            }
          >
            <option>Professional</option>
            <option>Formal</option>
            <option>Friendly</option>
            <option>Polite</option>
            <option>Confident</option>
          </select>

          <label>Email Signature</label>
          <textarea
            value={settings.emailSignature}
            onChange={(e) =>
              setSettings({ ...settings, emailSignature: e.target.value })
            }
            placeholder="Example: Regards, Sakshi"
          />

          <label>Theme</label>
          <select
            value={settings.theme}
            onChange={(e) =>
              setSettings({ ...settings, theme: e.target.value })
            }
          >
            <option>Light</option>
            <option>Dark</option>
          </select>

          <button>Save Settings</button>
        </form>
      </main>
    </div>
  );
};

export default Settings;