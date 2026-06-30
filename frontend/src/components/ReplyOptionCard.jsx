const ReplyOptionCard = ({ option, onSelect }) => {
  return (
    <div className="reply-option-card">
      <div className="reply-option-head">
        <h4>{option.tone} Reply</h4>
        <button onClick={() => onSelect(option.reply)}>Use This</button>
      </div>

      <p>{option.reply}</p>
    </div>
  );
};

export default ReplyOptionCard;