import { useEffect, useState } from "react";
import { Trash2, FileText } from "lucide-react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EmptyState from "../components/EmptyState";
import Toast from "../components/Toast";
import "../styles/drafts.css";

const SavedDrafts = () => {
  const [drafts, setDrafts] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "" });

  const fetchDrafts = async () => {
    const res = await API.get("/drafts");
    setDrafts(res.data);
  };

  const deleteDraft = async (id) => {
    await API.delete(`/drafts/${id}`);
    setToast({ message: "Draft deleted", type: "success" });
    fetchDrafts();
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />
      <Toast message={toast.message} type={toast.type} />

      <main className="main-content">
        <Navbar title="Saved Drafts" />

        {drafts.length === 0 ? (
          <EmptyState
            title="No saved drafts"
            message="Your saved email drafts will appear here."
          />
        ) : (
          <div className="draft-list">
            {drafts.map((draft) => (
              <div className="draft-card" key={draft.id}>
                <div className="draft-head">
                  <div className="draft-icon">
                    <FileText size={22} />
                  </div>

                  <div>
                    <h3>{draft.subject || "No Subject"}</h3>
                    <p>To: {draft.receiver_email || "Not added"}</p>
                    <small>{new Date(draft.created_at).toLocaleString()}</small>
                  </div>

                  <button onClick={() => deleteDraft(draft.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="draft-meta">
                  <span>{draft.reply_purpose || "Purpose not selected"}</span>
                  <span>{draft.tone || "Tone not selected"}</span>
                </div>

                <p className="draft-body">{draft.draft_reply}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedDrafts;