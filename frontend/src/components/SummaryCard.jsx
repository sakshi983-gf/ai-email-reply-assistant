import { Copy, Sparkles } from "lucide-react";

const SummaryCard = ({ summary, onCopy }) => {
  if (!summary) return null;

  return (
    <div className="summary-card">
      <div className="summary-head">
        <div>
          <h3>
            <Sparkles size={19} />
            AI Email Summary
          </h3>
          <p>Important points extracted from the received email</p>
        </div>

        <button onClick={onCopy}>
          <Copy size={16} />
          Copy
        </button>
      </div>

      <div className="summary-body">{summary}</div>
    </div>
  );
};

export default SummaryCard;