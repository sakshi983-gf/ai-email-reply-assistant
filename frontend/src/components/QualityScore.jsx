const QualityScore = ({ quality }) => {
  if (!quality) return null;

  const items = [
    { label: "Grammar", value: quality.grammar },
    { label: "Professionalism", value: quality.professionalism },
    { label: "Clarity", value: quality.clarity },
    { label: "Confidence", value: quality.confidence },
  ];

  return (
    <div className="quality-card">
      <div className="quality-top">
        <div>
          <h3>Email Quality Score</h3>
          <p>AI evaluation of your generated reply</p>
        </div>

        <div className="overall-score">
          <span>{quality.overall}</span>
          <small>/100</small>
        </div>
      </div>

      <div className="quality-bars">
        {items.map((item) => (
          <div className="quality-item" key={item.label}>
            <div className="quality-label">
              <span>{item.label}</span>
              <strong>{item.value}%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {quality.suggestions?.length > 0 && (
        <div className="quality-suggestions">
          <h4>Suggestions</h4>
          {quality.suggestions.map((item, index) => (
            <p key={index}>• {item}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default QualityScore;