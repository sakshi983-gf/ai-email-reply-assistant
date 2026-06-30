import { useState } from "react";
import {
  Sparkles,
  Send,
  Save,
  Copy,
  RefreshCcw,
  Wand2,
  FileText,
  Layers,
  BarChart3,
} from "lucide-react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import SummaryCard from "../components/SummaryCard";
import ReplyOptionCard from "../components/ReplyOptionCard";
import QualityScore from "../components/QualityScore";
import "../styles/generateReply.css";

const GenerateReply = () => {
  const [form, setForm] = useState({
    receivedEmail: "",
    receiverEmail: "",
    subject: "",
    purpose: "Accept",
    tone: "Professional",
  });

  const [generatedReply, setGeneratedReply] = useState("");
  const [summary, setSummary] = useState("");
  const [replyOptions, setReplyOptions] = useState([]);
  const [quality, setQuality] = useState(null);

  const [loading, setLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [qualityLoading, setQualityLoading] = useState(false);

  const [toast, setToast] = useState({ message: "", type: "" });

  const purposes = [
    "Accept",
    "Reject",
    "Reschedule",
    "Thank You",
    "Follow-up",
    "Apology",
    "Custom",
  ];

  const tones = ["Professional", "Formal", "Friendly", "Polite", "Confident"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const summarizeEmail = async () => {
    if (!form.receivedEmail) {
      setToast({ message: "Paste received email first", type: "error" });
      return;
    }

    try {
      setSummaryLoading(true);
      const res = await API.post("/summarize", {
        email: form.receivedEmail,
      });

      setSummary(res.data.summary);
      setToast({ message: "Email summarized successfully", type: "success" });
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to summarize email",
        type: "error",
      });
    } finally {
      setSummaryLoading(false);
    }
  };

  const generateSubject = async () => {
    if (!form.receivedEmail) {
      setToast({ message: "Paste received email first", type: "error" });
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/subject", {
        email: form.receivedEmail,
      });

      setForm((prev) => ({
        ...prev,
        subject: res.data.subject,
      }));

      setToast({ message: "Subject generated successfully", type: "success" });
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to generate subject",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateReplyOptions = async () => {
    if (!form.receivedEmail || !form.purpose) {
      setToast({
        message: "Received email and purpose are required",
        type: "error",
      });
      return;
    }

    try {
      setOptionsLoading(true);

      const res = await API.post("/reply-options", {
        receivedEmail: form.receivedEmail,
        subject: form.subject,
        purpose: form.purpose,
      });

      setReplyOptions(res.data.options || []);
      setToast({
        message: "3 reply options generated successfully",
        type: "success",
      });
    } catch (error) {
      setToast({
        message:
          error.response?.data?.message || "Failed to generate reply options",
        type: "error",
      });
    } finally {
      setOptionsLoading(false);
    }
  };

  const analyzeQuality = async () => {
    if (!generatedReply) {
      setToast({ message: "Generate or write a reply first", type: "error" });
      return;
    }

    try {
      setQualityLoading(true);

      const res = await API.post("/quality", {
        reply: generatedReply,
      });

      setQuality(res.data.quality);
      setToast({ message: "Reply quality analyzed", type: "success" });
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to analyze quality",
        type: "error",
      });
    } finally {
      setQualityLoading(false);
    }
  };

  const copySummary = async () => {
    if (!summary) return;
    await navigator.clipboard.writeText(summary);
    setToast({ message: "Summary copied", type: "success" });
  };

  const generateReply = async () => {
    if (!form.receivedEmail || !form.purpose || !form.tone) {
      setToast({
        message: "Received email, purpose and tone are required",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/emails/generate", {
        receivedEmail: form.receivedEmail,
        purpose: form.purpose,
        tone: form.tone,
        subject: form.subject,
      });

      setGeneratedReply(res.data.reply);
      setQuality(null);
      setToast({ message: "Reply generated successfully", type: "success" });
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to generate reply",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async () => {
    if (!form.receiverEmail || !form.subject || !generatedReply) {
      setToast({
        message: "Receiver email, subject and reply are required",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);

      await API.post("/emails/send", {
        receiverEmail: form.receiverEmail,
        subject: form.subject,
        receivedEmail: form.receivedEmail,
        purpose: form.purpose,
        tone: form.tone,
        generatedReply,
      });

      setToast({ message: "Email sent successfully", type: "success" });
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to send email",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveDraft = async () => {
    if (!generatedReply) {
      setToast({ message: "Generate or write a reply first", type: "error" });
      return;
    }

    try {
      await API.post("/drafts", {
        receiverEmail: form.receiverEmail,
        subject: form.subject,
        receivedEmail: form.receivedEmail,
        purpose: form.purpose,
        tone: form.tone,
        draftReply: generatedReply,
      });

      setToast({ message: "Draft saved successfully", type: "success" });
    } catch (error) {
      setToast({
        message: error.response?.data?.message || "Failed to save draft",
        type: "error",
      });
    }
  };

  const copyReply = async () => {
    if (!generatedReply) return;
    await navigator.clipboard.writeText(generatedReply);
    setToast({ message: "Reply copied", type: "success" });
  };

  const improveGrammar = async () => {
    if (!generatedReply) {
      setToast({ message: "Reply is empty", type: "error" });
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/emails/grammar", {
        reply: generatedReply,
      });

      setGeneratedReply(res.data.reply);
      setQuality(null);
      setToast({ message: "Grammar improved", type: "success" });
    } catch (error) {
      setToast({ message: "Failed to improve grammar", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const rewriteReply = async () => {
    if (!generatedReply) {
      setToast({ message: "Reply is empty", type: "error" });
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/emails/rewrite", {
        reply: generatedReply,
        tone: form.tone,
      });

      setGeneratedReply(res.data.reply);
      setQuality(null);
      setToast({ message: "Reply rewritten", type: "success" });
    } catch (error) {
      setToast({ message: "Failed to rewrite reply", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const useSelectedReply = (reply) => {
    setGeneratedReply(reply);
    setQuality(null);
    setToast({ message: "Reply selected successfully", type: "success" });
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <Toast message={toast.message} type={toast.type} />

      <main className="main-content">
        <Navbar title="Generate Reply" />

        <div className="generate-grid">
          <section className="compose-panel">
            <h3>Email Details</h3>

            <label>Received Email</label>
            <textarea
              name="receivedEmail"
              value={form.receivedEmail}
              onChange={handleChange}
              placeholder="Paste the received email here..."
              className="large-textarea"
            />

            <button className="secondary-action" onClick={summarizeEmail}>
              <FileText size={18} />
              {summaryLoading ? "Summarizing..." : "Summarize Email"}
            </button>

            <SummaryCard summary={summary} onCopy={copySummary} />

            <div className="two-column">
              <div>
                <label>Receiver Email</label>
                <input
                  type="email"
                  name="receiverEmail"
                  value={form.receiverEmail}
                  onChange={handleChange}
                  placeholder="receiver@example.com"
                />
              </div>

              <div>
                <label>Subject</label>
                <div className="subject-row">
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Email subject"
                  />
                  <button type="button" onClick={generateSubject}>
                    AI
                  </button>
                </div>
              </div>
            </div>

            <div className="two-column">
              <div>
                <label>Reply Purpose</label>
                <select
                  name="purpose"
                  value={form.purpose}
                  onChange={handleChange}
                >
                  {purposes.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Tone</label>
                <select name="tone" value={form.tone} onChange={handleChange}>
                  {tones.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="action-stack">
              <button className="primary-action" onClick={generateReply}>
                <Sparkles size={18} />
                {loading ? "Processing..." : "Generate AI Reply"}
              </button>

              <button className="secondary-action" onClick={generateReplyOptions}>
                <Layers size={18} />
                {optionsLoading
                  ? "Generating Options..."
                  : "Generate 3 Reply Options"}
              </button>
            </div>

            {replyOptions.length > 0 && (
              <div className="reply-options-section">
                <h3>AI Reply Suggestions</h3>
                {replyOptions.map((option, index) => (
                  <ReplyOptionCard
                    key={index}
                    option={option}
                    onSelect={useSelectedReply}
                  />
                ))}
              </div>
            )}
          </section>

          <section className="reply-panel">
            <div className="reply-header">
              <div>
                <h3>Generated Reply</h3>
                <p>Edit before sending</p>
              </div>
            </div>

            <textarea
              className="reply-editor"
              value={generatedReply}
              onChange={(e) => {
                setGeneratedReply(e.target.value);
                setQuality(null);
              }}
              placeholder="Your AI generated reply will appear here..."
            />

            <div className="reply-actions">
              <button onClick={improveGrammar}>
                <Wand2 size={17} />
                Grammar
              </button>

              <button onClick={rewriteReply}>
                <RefreshCcw size={17} />
                Rewrite
              </button>

              <button onClick={copyReply}>
                <Copy size={17} />
                Copy
              </button>

              <button className="analyze-btn" onClick={analyzeQuality}>
                <BarChart3 size={17} />
                {qualityLoading ? "Analyzing..." : "Analyze"}
              </button>

              <button onClick={saveDraft}>
                <Save size={17} />
                Save Draft
              </button>

              <button className="send-btn" onClick={sendEmail}>
                <Send size={17} />
                Send Email
              </button>
            </div>

            <QualityScore quality={quality} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default GenerateReply;