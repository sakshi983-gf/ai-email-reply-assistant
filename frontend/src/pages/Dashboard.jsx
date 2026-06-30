import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MailPlus, Send, FileText, Activity } from "lucide-react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    sent: 0,
    drafts: 0,
    activities: [],
  });

  const fetchDashboardData = async () => {
    try {
      const sentRes = await API.get("/emails/sent");
      const draftRes = await API.get("/drafts");
      const activityRes = await API.get("/activity");

      setStats({
        sent: sentRes.data.length,
        drafts: draftRes.data.length,
        activities: activityRes.data,
      });
    } catch (error) {
      console.log("Dashboard fetch error", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar title="Dashboard" />

        <section className="dashboard-hero">
          <div>
            <h1>Write smarter email replies with AI</h1>
            <p>
              Paste any received email, choose purpose and tone, generate a
              professional reply, edit it, and send it directly.
            </p>

            <Link to="/generate" className="hero-btn">
              Generate New Reply
            </Link>
          </div>
        </section>

        <section className="stats-grid">
          <Card>
            <div className="stat-card">
              <div className="stat-icon">
                <Send size={26} />
              </div>
              <div>
                <h3>{stats.sent}</h3>
                <p>Sent Emails</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="stat-card">
              <div className="stat-icon">
                <FileText size={26} />
              </div>
              <div>
                <h3>{stats.drafts}</h3>
                <p>Saved Drafts</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="stat-card">
              <div className="stat-icon">
                <MailPlus size={26} />
              </div>
              <div>
                <h3>9</h3>
                <p>Reply Tones</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="stat-card">
              <div className="stat-icon">
                <Activity size={26} />
              </div>
              <div>
                <h3>{stats.activities.length}</h3>
                <p>Recent Activities</p>
              </div>
            </div>
          </Card>
        </section>

        <section className="dashboard-grid">
          <Card>
            <h3>Recent Activity</h3>

            <div className="activity-list">
              {stats.activities.length === 0 ? (
                <p className="muted">No activities yet</p>
              ) : (
                stats.activities.map((item) => (
                  <div className="activity-item" key={item.id}>
                    <span></span>
                    <div>
                      <p>{item.action}</p>
                      <small>
                        {new Date(item.created_at).toLocaleString()}
                      </small>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card>
            <h3>Project Features</h3>

            <div className="feature-list">
              <p>AI reply generation using Gemini API</p>
              <p>Direct email sending using Gmail SMTP</p>
              <p>JWT authentication with protected routes</p>
              <p>Draft saving and sent email history</p>
              <p>PostgreSQL database integration</p>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;