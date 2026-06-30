const EmailEditor = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      className="reply-editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default EmailEditor;