import { useEffect, useState } from "react";
import { Trash2, Mail } from "lucide-react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import Toast from "../components/Toast";
import "../styles/sentEmails.css";

const SentEmails = () => {
  const [emails, setEmails] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState({ message: "", type: "" });

  const fetchEmails = async () => {
    const res = await API.get("/emails/sent");
    setEmails(res.data);
  };

  const searchEmails = async (value) => {
    setSearch(value);
    const res = await API.get(`/emails/search?q=${value}`);
    setEmails(res.data);
  };

  const deleteEmail = async (id) => {
    await API.delete(`/emails/${id}`);
    setToast({ message: "Email deleted", type: "success" });
    fetchEmails();
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />
      <Toast message={toast.message} type={toast.type} />

      <main className="main-content">
        <Navbar title="Sent Emails" />

        <div className="sent-top">
          <SearchBar
            value={search}
            onChange={searchEmails}
            placeholder="Search by receiver, subject, or reply..."
          />
        </div>

        {emails.length === 0 ? (
          <EmptyState
            title="No sent emails"
            message="Sent emails will appear here after you send replies."
          />
        ) : (
          <div className="email-list">
            {emails.map((email) => (
              <div className="email-card" key={email.id}>
                <div className="email-card-head">
                  <div className="mail-icon">
                    <Mail size={22} />
                  </div>

                  <div>
                    <h3>{email.subject}</h3>
                    <p>To: {email.receiver_email}</p>
                    <small>{new Date(email.sent_at).toLocaleString()}</small>
                  </div>

                  <button onClick={() => deleteEmail(email.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="email-meta">
                  <span>{email.reply_purpose}</span>
                  <span>{email.tone}</span>
                </div>

                <p className="email-body">{email.generated_reply}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SentEmails;