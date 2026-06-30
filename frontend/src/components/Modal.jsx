const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <div className="modal-head">
          <h3>{title}</h3>
          <button onClick={onClose}>×</button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;